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
    bg_HideMask: cc.Node = null;
    @property(cc.Node)
    btn_Upgrade: cc.Node = null;
    @property(cc.Node)
    icon_Upgrade: cc.Node = null;

    @property(cc.Node)
    hint_CatHand: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;

    // Array

    // Effects

    // State
    check: cc.Label

    protected onLoad(): void {
      
    }

    protected start(): void {
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        this.overlay.getComponent(cc.Animation).play("Fade");

        this.scheduleOnce(() => {
            this.icon_Upgrade.getComponent(cc.Animation).play("Blink");
            this.hint_CatHand.getComponent(cc.Animation).play("Hint_HandAnim");
        }, 0.5);

        this.registerEvent();
    }


    private registerEvent(): void {
        // others
        this.btn_Upgrade.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // mtg & applovin
        this.bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    protected update(dt: number): void {

    }
}
