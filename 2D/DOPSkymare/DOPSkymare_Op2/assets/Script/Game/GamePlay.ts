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

    // Node
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

    isPlayingGame: boolean = true;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;

    eraserSoundState: number = null;

    protected onLoad(): void {
      
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.point.getComponent(cc.Animation).play("Eraser_Anim");
            // this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
            this.registerEvent();
        }, 1)

        this.scheduleOnce(() => {
            this.point.getComponent(cc.Animation).play("Blink_Anim");
            this.isPlayingGame = false;
            // cc.audioEngine.stop(this.eraserSoundState);
        }, 3);
    }       

    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
    } 

    private handleBgTouchStart(e: cc.Touch): void {
        this.GameController.installHandle();
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

        // if(this.Scratchable.getComponent("Scratchable").isWin) {
        //     this.isDoneEraser = true;
        //     this.Scratchable.active = false;
        // }
        
        // this.handleShowEndGame();
    }
}
