import AudioManager from "./AudioManager";
import { Constants } from "./Data/constants";
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
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();


        // To Store
        this.onToStore();
        // -----------------
    }


    private onToStore(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.point.getComponent(cc.Animation).play("Eraser_Anim");
            // this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
            // this.registerEvent();
        }, 1)

        this.scheduleOnce(() => {
            this.point.getComponent(cc.Animation).play("Blink_Anim");
            // cc.audioEngine.stop(this.eraserSoundState);
        }, 5);
    }

    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
    }

    private handleBgTouchStart(e: cc.Touch): void {
        this.GameController.installHandle();
    }

    protected update(dt: number): void {

        // To Store
        // if (Constants.ironSource.isEndGame) {
        //     cc.audioEngine.stop(this.eraserSoundState);
        // }
        // -----------------

        // if(this.Scratchable.getComponent("Scratchable").isWin) {
        //     this.isDoneEraser = true;
        //     this.Scratchable.active = false;
        // }

        // this.handleShowEndGame();
    }
}
