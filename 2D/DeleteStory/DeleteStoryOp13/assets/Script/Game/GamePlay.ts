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
    ScratchAble: cc.Node = null;


    // Node
    @property(cc.Node)
    UI: cc.Node = null;
    @property(cc.Node)
    Text: cc.Node = null;
    @property(cc.Node)
    Logo: cc.Node = null;
    @property(cc.Node)
    Logo_Horizontal: cc.Node = null;
    @property(cc.Node)
    Point: cc.Node = null;
    @property(cc.Node)
    HideMask: cc.Node = null;
    @property(cc.Node)
    Hand: cc.Node = null;
    @property(cc.Node)
    Ponmi: cc.Node = null;
    @property(cc.Node)
    BtnMore: cc.Node = null;
    @property(cc.Node)
    BtnMore_Hand: cc.Node = null;
    @property(cc.Node)
    Overlay: cc.Node = null;
    

    @property(cc.Node)
    Children_Boy: cc.Node = null;
    @property(cc.Node)
    Children_Boy_Cry: cc.Node = null;
    @property(cc.Node)
    Children_Girl: cc.Node = null;
    @property(cc.Node)
    Children_Girl_Cry: cc.Node = null;

    
    // Effects


    // State
    curentPosition: cc.Vec2 = null;

    isPlayingGame: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;

    babySoundState: number = null;
    eraserSoundState: number = null;


    protected onLoad(): void {
        this.Children_Boy_Cry.active = false;
        this.Children_Girl_Cry.active = false;
        this.Ponmi.active = false;
        this.BtnMore.active = false;
        this.Overlay.active = false
        this.Logo.active = false;
    }


    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        // this.babySoundState =  cc.audioEngine.play(this.AudioManager.babyCry, true, 0.15);
        this.handleGamePlay();
        this.registerEvent();
    }


    private registerEvent(): void {
        this.HideMask.on(cc.Node.EventType.TOUCH_START, this.onHideMaskTouchStart, this);
        this.HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.onHideMaskTouchMove, this);
        this.HideMask.on(cc.Node.EventType.TOUCH_END, this.onHideMaskTouchEnd, this);
        this.HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.onHideMaskTouchEnd, this);
    }


    private offEvent(): void {
        this.HideMask.off(cc.Node.EventType.TOUCH_START);
        this.HideMask.off(cc.Node.EventType.TOUCH_MOVE);
        this.HideMask.off(cc.Node.EventType.TOUCH_END);
        this.HideMask.off(cc.Node.EventType.TOUCH_CANCEL);
    }


    private handleGamePlay(): void {
        this.Point.getComponent(cc.Animation).play("PointAnim");
        this.Children_Boy.getComponent(cc.Animation).play("Baby_Anim");
        this.Children_Girl.getComponent(cc.Animation).play("Baby_Anim");
    }


    private onHideMaskTouchStart(e: cc.Touch): void {
        this.curentPosition = e.getLocation();
        this.Hand.active = false;
        this.Point.getComponent(cc.Animation).stop("PointAnim")

        this.isPlayingGame = true;

        if(Constants.ironSource.SoundState) {
            this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        }

        this.handleIronSourcePlaySound();

    }


    private onHideMaskTouchMove(e: cc.Touch): void {
        this.Point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.Point.y = this.curentPosition.y - cc.winSize.height / 2;

        this.curentPosition = e.getLocation();
    }


    private onHideMaskTouchEnd(): void {
        this.isPlayingGame = false;

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            this.babySoundState =  cc.audioEngine.play(this.AudioManager.babyCry, true, 0.15);
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


    private handleCheckDone(): void {

        this.offEvent();
        if(Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.babySoundState);
            cc.audioEngine.stop(this.eraserSoundState);
            cc.audioEngine.play(this.AudioManager.screamSound, false, 1);
        }

  
        this.Ponmi.active = true;
        this.BtnMore.active = true;
        this.Overlay.active = true;
        this.Text.active = false;
        this.Point.active = false;
        this.ScratchAble.active = false;
        this.Logo.active = true;
        this.Logo_Horizontal.active = false;


        this.Ponmi.getComponent(cc.Animation).play("Ponmi_ShowAnim");
        this.UI.getComponent(cc.Animation).play("UI_ShowCTAAnim");


        this.scheduleOnce(() => {
            this.Children_Boy_Cry.active = true;    
            this.Children_Girl_Cry.active = true;  
            if(Constants.ironSource.SoundState) {
                cc.audioEngine.play(this.AudioManager.babyCryLouder, false, 1);
            }
        }, 0.5);
        this.scheduleOnce(() => {
            this.BtnMore_Hand.getComponent(cc.Animation).play("BtnMore_HandAnim");
            this.BtnMore.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

            // mtg & applovin
            // this.HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        }, 1);
    }


    protected update(dt: number): void {
        if(this.ScratchAble.getComponent("Scratchable").isWin && !this.isDoneEraser) {
            this.isDoneEraser = true;
            this.handleCheckDone();
        }

        // ironsoource
        this.handleMuteSoundIronSource();
    }
}
