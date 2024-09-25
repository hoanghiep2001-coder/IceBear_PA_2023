import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // Component
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(GameController)
    GameController: GameController = null;
    @property(cc.Node)
    Scratchable: cc.Node = null;

    // Node
    @property(cc.Node)
    hand_1: cc.Node = null;
    @property(cc.Node)
    hand_2: cc.Node = null;
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    bg_clearFix: cc.Node = null;
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    button: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;


    // Array

    // Effects
    @property([cc.ParticleSystem])
    FireWorks: cc.ParticleSystem[] = [];

    // State
    curentPosition: cc.Vec2 = null;

    // ironsource
    ironSourceState: number = 1;
    ironSourceSoundState: boolean = true;
    isEndGame: boolean = false;

    isPlayingGame: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;

    bgSoundState: number = null;
    eraserSoundState: number = null;

    protected onLoad(): void {
        this.button.active = false;
        this.button.opacity = 0;
        this.hand_2.active = false;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        this.point.getComponent(cc.Animation).play("Point_EraserAnim");

        this.scheduleOnce(() => {
            if(this.hand_1.active) {
                this.hand_2.active = true;
                this.point.getComponent(cc.Animation).play("Point_HandHintAnim");
                this.hand_1.active = false;
            }
        }, 2.67);
        this.registerEvent();

        // To Store
        // this.onToStore();
        // --------------
    }


    private onToStore(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.onHideMaskTouchStart, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.onHideMaskTouchMove, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_END, this.onHideMaskTouchEnd, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.onHideMaskTouchEnd, this);
    }


    private onHideMaskTouchStart(e: cc.Touch): void {
        this.curentPosition = e.getLocation();
        this.hand_1.active = false;
        this.hand_2.active = false;
        
        this.point.getComponent(cc.Animation).stop("Point_EraserAnim");
        // this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);

        // ironsource
        if(this.ironSourceSoundState) {
            this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        }
        this.handleIronSourceSound();
        // ----------------
    }


    private onHideMaskTouchMove(e: cc.Touch): void {
        this.curentPosition = e.getLocation();
        this.isPlayingGame = true;

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;
    }


    private onHideMaskTouchEnd(): void {
        this.isPlayingGame = false;

        if(this.eraserSoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }
    }


    private showResult(): void {
        if(this.eraserSoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }

        this.point.active = false;
        this.Scratchable.active = false;

        this.Bg_HideMask.off(cc.Node.EventType.TOUCH_START);
        this.Bg_HideMask.off(cc.Node.EventType.TOUCH_CANCEL);
        this.Bg_HideMask.off(cc.Node.EventType.TOUCH_END);
        this.Bg_HideMask.off(cc.Node.EventType.TOUCH_CANCEL);

        if (this.ironSourceSoundState) {
            cc.audioEngine.play(this.AudioManager.winSound, false, 1);
        }

        this.FireWorks[0].resetSystem();

        this.scheduleOnce(() => {
            this.FireWorks[1].resetSystem();
        }, 0.5);

        this.scheduleOnce(() => {
            this.FireWorks[2].resetSystem();
            this.getComponent(cc.Animation).play("GamePlay_Anim");
        }, 1.5);

        this.scheduleOnce(() => {
            this.button.active = true;
            this.button.getComponent(cc.Animation).play("Button_ShowAnim");

            // others
            this.button.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);

            // mtg & applovin
            // this.overlay.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);
        }, 2)

        this.scheduleOnce(() => {
            this.button.getComponent(cc.Animation).play("Button_HandAnim");
        }, 3.1)
    }


    private handleIronSourceSound(): void {
        if (this.isPlayBgSound) {
            return;
        }

        if (this.ironSourceSoundState) {
           cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        }

        this.isPlayBgSound = true;
    }


    private handleIronSourceMuteSound(): void {
        this.ironSourceState = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (this.ironSourceState) {
            if (this.ironSourceState === 1 && !this.ironSourceSoundState && !this.isEndGame) {
                this.ironSourceSoundState = true;
                cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            }

            if (this.ironSourceState === 2 && this.ironSourceSoundState) {
                this.ironSourceSoundState = false;
                cc.audioEngine.stopAll();
            }
        }
    }


    private handleInstall(): void {
        this.isEndGame = true;
        this.GameController.installHandle();
    }


    protected update(dt: number): void {
        
        if (this.Scratchable.getComponent("Scratchable").isWin && !this.isDoneEraser) {
            this.isDoneEraser = true;
            this.Scratchable.active = false;
            this.showResult();
        }

        // ironsource
        this.handleIronSourceMuteSound();
    }
}
