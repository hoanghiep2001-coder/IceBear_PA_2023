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
    spine: cc.Node = null;
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;

    // Array


    // Effects


    // State
    curentPosition: cc.Vec2 = null;

    isPlayingGame: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;

    eraserSoundState: number = null;

    protected onLoad(): void {
      
    }

    protected start(): void {
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.Scratchable.getComponent(cc.Animation).play("Blink_Anim");
            this.point.getComponent(cc.Animation).play("Point_Anim")
            this.registerEvent();
        }, 1)

        this.scheduleOnce(() => {
            this.Scratchable.getComponent(cc.Animation).stop();
        }, 3)
    }       

    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.handleBgTouchMove, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_END, this.handleBgTouchEnd, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.handleBgTouchCancel, this);
    } 

    private handleBgTouchStart(e: cc.Touch): void {
        this.isPlayingGame = true;
        this.point.getComponent(cc.Animation).stop();
        this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        this.point.active = true;

        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;

        // ironsource
        // if(this.isPlayBgSound) {
        //     return;
        // }

        // this.isPlayBgSound = true;
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }

    private handleBgTouchMove(e: cc.Touch): void {
        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;
    }

    private handleBgTouchCancel(e: cc.Touch): void {
        cc.audioEngine.stop(this.eraserSoundState);
        this.point.active = false;
    }

    private handleBgTouchEnd(e: cc.Touch): void {
        if(this.isEndGame) {
            this.GameController.installHandle();
        }

        cc.audioEngine.stop(this.eraserSoundState);
        this.point.active = false;
    }

    private handleShowEndGame(): void {
        if(this.isDoneEraser && !this.isEndGame) {
            this.isEndGame = true;
            cc.audioEngine.stop(this.eraserSoundState);

            this.spine.getComponent(sp.Skeleton).setAnimation(0, "Level 42_c", true);

            this.Bg_HideMask.off(cc.Node.EventType.TOUCH_START);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_MOVE);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_END);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_CANCEL);
        }
    }

    protected update(dt: number): void {
        if(this.Scratchable.getComponent("Scratchable").isWin) {
            this.isDoneEraser = true;
            this.Scratchable.active = false;
        }
        
        this.handleShowEndGame();
    }
}
