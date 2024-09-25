import { Constants } from "../Data/constants";
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
    @property(cc.Node)
    icon: cc.Node = null;

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
        this.Scratchable.getComponent(cc.Animation).stop("Blink_Anim");
        this.Scratchable.opacity = 255;

        if(Constants.ironSource.SoundState) {
            this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        }

        this.point.active = true;
        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;

        // ironsource
        // this.handleIronSourcePlaySound()
    }

    private handleBgTouchMove(e: cc.Touch): void {
        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;
    }

    private handleBgTouchCancel(e: cc.Touch): void {
        if(Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }

        this.point.active = false;
    }

    private handleBgTouchEnd(e: cc.Touch): void {
        if(this.isEndGame) {
            this.GameController.installHandle();
        }

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }

        this.point.active = false;
    }

    private handleShowEndGame(): void {
        if(this.isDoneEraser && !this.isEndGame) {
            this.isEndGame = true;

            if(Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.eraserSoundState);
            }

            this.spine.getComponent(sp.Skeleton).setAnimation(0, "Level 42_c", true);

            this.Bg_HideMask.off(cc.Node.EventType.TOUCH_START);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_MOVE);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_END);
            // this.Bg_HideMask.off(cc.Node.EventType.TOUCH_CANCEL);
        }
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            Constants.bgSoundState = cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                cc.audioEngine.stopAll();
            }
        }
    }



    protected update(dt: number): void {

        // ironsource
        // this.handleMuteSoundIronSource();

        if(this.Scratchable.getComponent("Scratchable").isWin) {
            this.isDoneEraser = true;
            this.Scratchable.active = false;
        }
        
        this.handleShowEndGame();
    }
}
