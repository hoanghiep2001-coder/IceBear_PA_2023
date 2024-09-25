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
    @property(cc.Node)
    Scratchable: cc.Node = null;

    // Node
    @property(cc.Node)
    Bg_Vertical: cc.Node = null;
    @property(cc.Node)
    Bg_Horizontal: cc.Node = null;
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    endGame: cc.Node = null;
    @property(cc.Node)
    rotateLight: cc.Node = null;
    @property(cc.Node)
    endGame_Hand: cc.Node = null;
    
    // Array


    // Effects


    // State
    curentPosition: cc.Vec2 = null;

    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;

    eraserSoundState: number = null;

    protected onLoad(): void {
        this.endGame.active  = false;
         this.hand.active = false;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 0.6);
        this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");
        this.handleGamePlay();
    }

    private handleGamePlay(): void {

        // others
        // this.scheduleOnce(() => {
        //     if(!Constants.ironSource.isEndGame) {
        //         cc.audioEngine.play(this.AudioManager.screamSound1, false, 1);
        //     }
        // }, 0.2);

        // this.scheduleOnce(() => {
        //     if(!Constants.ironSource.isEndGame) {
        //         cc.audioEngine.play(this.AudioManager.screamSound2, false, 1);
        //     }
        // }, 0.4);

        // this.scheduleOnce(() => {
        //     if(!Constants.ironSource.isEndGame) {
        //         cc.audioEngine.play(this.AudioManager.screamSound3, false, 1);
        //     }
        // }, 0.6);

        // this.scheduleOnce(() => {
        //     if(!Constants.ironSource.isEndGame) {
        //         cc.audioEngine.play(this.AudioManager.breathSound, false, 1);
        //     }
        // }, 1);
        // -------------------- others

        this.scheduleOnce(() => {
            this.hand.getComponent(cc.Animation).play("Hint_HandAnim");
            this.hand.active = true;
            this.registerEvent();
        }, 2.5)
        

          // To Store
          this.onToStore();
          // ---------------------------
    }


    private onToStore(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        
    }


    private registerEvent(): void {

        // this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
        // this.Bg_HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.handleBgTouchMove, this);
        // this.Bg_HideMask.on(cc.Node.EventType.TOUCH_END, this.handleBgTouchEnd, this);
        // this.Bg_HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.handleBgTouchCancel, this);
    } 

    // private handleBgTouchStart(e: cc.Touch): void {
    //     this.hand.active = false;
    //     this.hand.getComponent(cc.Animation).stop();
    //     this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
    //     this.point.active = true;

    //     this.curentPosition = e.getLocation();

    //     this.point.x = this.curentPosition.x - cc.winSize.width / 2;
    //     this.point.y = this.curentPosition.y - cc.winSize.height / 2;

    //     // ironsource
    //     // if(this.isPlayBgSound) {
    //     //     return;
    //     // }

    //     // this.isPlayBgSound = true;
    //     // cc.audioEngine.play(this.AudioManager.bgSound, true, 0.6);
    // }

    // private handleBgTouchMove(e: cc.Touch): void {
    //     // if(this.isEndGame) {
    //     //     this.GameController.installHandle();
    //     //     return;
    //     // }
    //     this.curentPosition = e.getLocation();

    //     this.point.x = this.curentPosition.x - cc.winSize.width / 2;
    //     this.point.y = this.curentPosition.y - cc.winSize.height / 2;
    // }

    // private handleBgTouchCancel(e: cc.Touch): void {
    //     cc.audioEngine.stop(this.eraserSoundState);
    //     this.point.active = false;
    // }

    // private handleBgTouchEnd(e: cc.Touch): void {
    //     cc.audioEngine.stop(this.eraserSoundState);
    //     this.point.active = false;
    // }

    // private handleShowEndGame(): void {
    //     if(this.isDoneEraser && !this.isEndGame) {
    //         this.isEndGame = true;
    //         this.point.active = false;
    //         cc.audioEngine.stop(this.eraserSoundState);
    //         cc.audioEngine.play(this.AudioManager.winSound, false, 2);

    //         this.endGame.active = true;
    //         this.endGame.getComponent(cc.Animation).play("EndGame_Anim");

    //         this.rotateLight.getComponent(cc.Animation).play("EndGame_RotateAnim");
    //         this.endGame_Hand.getComponent(cc.Animation).play("Hint_EndGameHandAnim");

    //         this.Bg_HideMask.off(cc.Node.EventType.TOUCH_START);
    //         this.Bg_HideMask.off(cc.Node.EventType.TOUCH_MOVE);
    //         this.Bg_HideMask.off(cc.Node.EventType.TOUCH_END);
    //         this.Bg_HideMask.off(cc.Node.EventType.TOUCH_CANCEL);

    //         this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, () => {
    //             this.GameController.installHandle();
    //         })

    //     }
    // }

    protected update(dt: number): void {
        // if(this.Scratchable.getComponent("Scratchable").isWin) {
        //     this.isDoneEraser = true;
        //     this.Scratchable.active = false;
        // }
        
        // this.handleShowEndGame();
    }
}
