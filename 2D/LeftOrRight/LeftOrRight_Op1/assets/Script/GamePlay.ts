import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // component
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(GameController)
    GameController: GameController = null;

    // node
    @property(cc.Node)
    tab: cc.Node = null;
    @property(cc.Node)
    OptionContainer_Bottom: cc.Node = null;
    @property(cc.Node)
    OptionContainer_Top: cc.Node = null;

    @property(cc.Node)
    Btn1: cc.Node = null;
    @property(cc.Node)
    Btn2: cc.Node = null;

    // background
    @property(cc.Node)
    bg_Main: cc.Node = null;
    @property(cc.Node)
    bg_HideMask: cc.Node = null;

    // character

    // effect

    // array

    // state    
    isClickBtn1: boolean = false;
    isCanClick: boolean = true;
    isPlayBgSound: boolean = false;

    step: number = 1;

    protected onLoad(): void {
    
    }

    protected start(): void {
        this.handleGamePlay();

    }

    private handleGamePlay(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.getComponent(cc.Animation).play("GamePlay_Anim");

        this.registerEvent();

        this.bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);
    }

    private handleTouchStart(): void {
        if(this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }

    private registerEvent(): void {
        // mtg & applovin
        // this.bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // others
        this.Btn1.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        this.Btn2.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }

    protected update(dt: number): void {

    }

}
