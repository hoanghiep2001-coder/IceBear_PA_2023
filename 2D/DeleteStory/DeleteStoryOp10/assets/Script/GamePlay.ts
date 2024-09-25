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
    hand: cc.Node = null;
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;


    // Array
    @property([cc.Node])
    options: cc.Node[] = [];

    // Effects


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
        this.hand.opacity = 0;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        // ironsource
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleIronSourcePlaySound, this);

        if(this.isPlayBgSound && this.ironSourceSoundState) {
            this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        }
        // ----------------------


        // this.eraserSoundState = cc.audioEngine.play(this.AudioManager.eraserSound, true, 1);
        this.point.getComponent(cc.Animation).play("Point_EraserAnim");

        this.scheduleOnce(() => {
            this.getComponent(cc.Animation).play("GamePlay_Anim");
            if(this.eraserSoundState) {
                cc.audioEngine.stop(this.eraserSoundState);
            }
            this.registerEvent();


            // To Store
            // this.onToStore();
            // ------------------------
        }, 1);

        this.scheduleOnce(() => {
            this.point.getComponent(cc.Animation).play("Point_Anim");
        }, 1.5);

        this.scheduleOnce(() => {
            this.hand.opacity = 255;
            this.hand.getComponent(cc.Animation).play("Hint_HandAnim");
        }, 2);
    }


    // private onToStore(): void {
    //     this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    // }


    private registerEvent(): void {

        // mtg & applovin
        // this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // others
        this.options.forEach(op => {
            op.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);
        })
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


    private handleInstall(): void {
        this.isEndGame = true;
        this.GameController.installHandle();
    }


    protected update(dt: number): void {
      this.handleMuteSoundIronSource();
    }
}
