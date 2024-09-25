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
    @property(sp.Skeleton)
    spine_OpenScene: sp.Skeleton = null;
    @property(sp.Skeleton)
    spine_NextLevel: sp.Skeleton = null;

    // Node
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    erarser: cc.Node = null;

    @property(cc.Node)
    Text_delete: cc.Node = null;
    @property(cc.Node)
    Text_TheTruth: cc.Node = null;

    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    btn_Next: cc.Node = null;
    @property(cc.Node)
    btn_install: cc.Node = null;

    // Array

    // Effects

    // State
    curentPosition: cc.Vec2 = null;
    device: string = "";

    isPlayingGame: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;
    isPlayingScreamSound: boolean = false;
    isNextLevel: boolean = false;

    eraserSoundState: number = null;
    ScreamSoundState: number = null;
    
    ScreamSound: cc.AudioClip = null;


    protected onLoad(): void {
        this.btn_Next.active = false;
        this.Text_TheTruth.active = false;
    }


    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();
        this.registerEvent();


        // To Store
        // this.onToStore();
        // -------------------
    }


    private onToStore(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    private handleGamePlay(): void {
        this.Scratchable.getComponent(cc.Animation).play("ScratchAble_IdleAnim");
        this.erarser.getComponent(cc.Animation).play("Point_HintAnim");
    }


    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.handleBgTouchMove, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_END, this.handleBgTouchEnd, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.handleBgTouchEnd, this);
        this.btn_Next.on(cc.Node.EventType.TOUCH_START, this.handleShowNextLevel, this);
        this.btn_install.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
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


    private handleBgTouchStart(e: cc.Touch): void {
        if (this.isNextLevel) {
            this.GameController.installHandle();
            cc.audioEngine.stopAll();
            return
        }

        this.isPlayingGame = true;
        this.hand.active = false;
        this.erarser.getComponent(cc.Animation).stop();
        this.erarser.x = 0;
        this.erarser.y = 0;

        if(Constants.ironSource.SoundState) {
            this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        }


        if(!this.isDoneEraser) {
            this.point.active = true;
        }

        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;

        // ironsource
        this.handleIronSourcePlaySound();
    }


    private handleBgTouchMove(e: cc.Touch): void {
        this.curentPosition = e.getLocation();

        this.point.x = this.curentPosition.x - cc.winSize.width / 2;
        this.point.y = this.curentPosition.y - cc.winSize.height / 2;

        if (this.point.getBoundingBox().intersects(this.Scratchable.getBoundingBox())) {
            if(Constants.ironSource.SoundState) {
                this.handlePlayScreamSound();
            }
        }
    }


    private handleBgTouchEnd(e: cc.Touch): void {
        this.isPlayingGame = false;

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.eraserSoundState);
        }

    }


    private handlePlayScreamSound(): void {
        if (!this.isPlayingScreamSound) {
            let random = Math.floor(Math.random() * 2) + 1;
            random === 1 
            ? this.ScreamSound = this.AudioManager.screamSound2 
            : this.ScreamSound = this.AudioManager.screamSound3;

            if (this.ScreamSound && !this.isPlayingScreamSound) {
                this.ScreamSoundState = cc.audioEngine.play(this.ScreamSound, false, 1);
                this.isPlayingScreamSound = true;

                cc.audioEngine.setFinishCallback(this.ScreamSoundState, () => {
                    this.scheduleOnce(() => {
                        this.isPlayingScreamSound = false;
                    }, 1);
                });
            }
        }

    }


    private handleShowEndGame(): void {
        if (this.isDoneEraser && !this.isEndGame) {
            this.isEndGame = true;
            this.point.active = false;

            if(Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.eraserSoundState);
                cc.audioEngine.play(this.AudioManager.winSound, false, 1);
            }


            // show & set anim for btn Next
            this.btn_Next.active = true;
            this.btn_Next.getComponent(cc.Animation).play("BtnNext_Anim");

            this.scheduleOnce(() => {
                this.btn_Next.getComponent(cc.Animation).play("BtnNext_ScaleAnim");
            }, 0.4);

            // set anim for open spine
            this.spine_OpenScene.getComponent(sp.Skeleton).setAnimation(0, "khong co vay/Level 09_c", true);
            this.Bg_HideMask.off(cc.Node.EventType.TOUCH_MOVE);
        }
    }


    private handleShowNextLevel(): void {

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        }


        this.Text_delete.active = false;
        this.Text_TheTruth.active = true;
        this.hand.active = true;
        this.point.active = true;
        this.erarser.getComponent(cc.Animation).play("Point_HintNextLevel");

        this.isNextLevel = true;
        this.spine_OpenScene.node.active = false;
        this.spine_NextLevel.node.active = true;
        this.btn_Next.active = false;
    }


    private handleResponisvePointLv2(): void {
        if(this.device === "vertical_IPX") {
            this.point.x = 30;
            this.point.y = -65;
            return;
        }

        if(this.device === "horizontal_IPX") {
            this.point.x = 0;
            this.point.y = -70;
            return;
        }

        if(this.device === "vertical_Mobile") {
            this.point.x = 20;
            this.point.y = -55;
            return;
        }
    }


    protected update(dt: number): void {

        if (this.Scratchable.getComponent("Scratchable").isWin) {
            this.isDoneEraser = true;
            this.Scratchable.active = false;
        }
        
        if(this.isNextLevel) {
            this.handleResponisvePointLv2();
        }
        
        this.handleShowEndGame();

        // ironsource
        this.handleMuteSoundIronSource();
    }
}
