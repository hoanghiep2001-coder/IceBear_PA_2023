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
    text: cc.Node = null;
    @property(cc.Node)
    character: cc.Node = null;
    @property(cc.Node)
    boy: cc.Node = null;

    @property(cc.Node)
    Button_Container: cc.Node = null;
    @property(cc.Node)
    Button2: cc.Node = null;
    @property(cc.Node)
    Button3: cc.Node = null;

    @property(cc.Node)
    hand_2: cc.Node = null;

    // background
    // @property(cc.Node)
    // bg_HideMask: cc.Node = null;
    @property(cc.Node)
    bg_Vertical_2: cc.Node = null;
    @property(cc.Node)
    bg_Horizontal_2: cc.Node = null;
    @property(cc.Node)
    bg_Horizontal_Flip_2: cc.Node = null;

    // character
    @property(cc.Node)
    character_DressDefault: cc.Node = null;
    @property(cc.Node)
    character_Dress1: cc.Node = null;
    @property(cc.Node)
    character_Dress2: cc.Node = null;

    @property(cc.Node)
    character_HairDefault: cc.Node = null;
    @property(cc.Node)
    character_Hair1: cc.Node = null;
    @property(cc.Node)
    character_Hair2: cc.Node = null;

    // effect
    @property(cc.ParticleSystem)
    effect_Heart: cc.ParticleSystem = null;

    // array

    // state    
    isClickBtn1: boolean = false;
    isCanClick: boolean = true;
    isPlayBg: boolean = false;

    step: number = 1;

    protected onLoad(): void {
        this.hand_2.active = false;
        this.character_Hair1.active = false;
        this.character_Hair2.active = false;
        this.character_Dress1.active = false;
        this.character_Dress2.active = false;
    }

    protected start(): void {
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");

        this.scheduleOnce(() => {
            // cc.audioEngine.play(this.AudioManager.crySound, false, 1);
        }, 0.5);

        this.scheduleOnce(() => {
            this.registerEvent();
            this.hand_2.active = true;
            this.hand_2.getComponent(cc.Animation).play("Hint_HandAnim");
        }, 1)
    }

    private registerEvent(): void {
        this.bg_Vertical_2.on(cc.Node.EventType.TOUCH_START, this.handleBackgroundTouchStart, this);
        this.bg_Horizontal_2.on(cc.Node.EventType.TOUCH_START, this.handleBackgroundTouchStart, this);
        this.bg_Horizontal_Flip_2.on(cc.Node.EventType.TOUCH_START, this.handleBackgroundTouchStart, this);
        this.Button2.on(cc.Node.EventType.TOUCH_START, this.handleButton2TouchStart, this);
        this.Button3.on(cc.Node.EventType.TOUCH_START, this.handleButton3TouchStart, this);
    }

    private handleBackgroundTouchStart(e: cc.Touch): void {
        // mtg & applovin
        // if(this.step == 3) {
        //     this.GameController.installHandle();
        // }

        // ironsource
        if (this.isPlayBg) {
            return;
        }

        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        cc.audioEngine.play(this.AudioManager.crySound, false, 1);
    }

    private handleButton2TouchStart(): void {
        if (!this.isCanClick) {
            return;
        }

        switch (this.step) {
            case 1:
                this.step++;
                this.isCanClick = false;
                this.character_DressDefault.active = false;
                this.character_Dress1.active = true;
                this.hand_2.active = false;
                this.boy.active = false;

                this.getComponent(cc.Animation).play("GamePlay_ShowButton");
                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.effect_Heart.resetSystem();

                this.scheduleOnce(() => {
                    this.isCanClick = true;
                }, 1)
                break;
            case 2:
                this.step++;
                this.isCanClick = false;
                this.character_HairDefault.active = false;
                this.character_Hair1.active = true;

                this.getComponent(cc.Animation).play("GamePlay_ShowButton2");
                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.effect_Heart.resetSystem();

                this.scheduleOnce(() => {
                    this.isCanClick = true;
                }, 1)
                break;
            case 3:
                this.GameController.installHandle();
                break;
            default:
                break;
        }
    }

    private handleButton3TouchStart(): void {
        if (!this.isCanClick) {
            return;
        }

        switch (this.step) {
            case 1:
                this.step++;
                this.isCanClick = false;
                this.character_DressDefault.active = false;
                this.character_Dress2.active = true;
                this.hand_2.active = false;
                this.boy.active = false;

                this.getComponent(cc.Animation).play("GamePlay_ShowButton");
                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.effect_Heart.resetSystem();

                this.scheduleOnce(() => {
                    this.isCanClick = true;
                }, 1)
                break;
            case 2:
                this.step++;
                this.isCanClick = false;
                this.character_HairDefault.active = false;
                this.character_Hair2.active = true;

                this.getComponent(cc.Animation).play("GamePlay_ShowButton2");
                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.effect_Heart.resetSystem();

                this.scheduleOnce(() => {
                    this.isCanClick = true;
                }, 1)
                break;
            case 3:
                this.GameController.installHandle();
                break;
            default:
                break;
        }
    }

    private handleTouchMove(e: cc.Touch): void {

    }

    private handleTouchEnd(e: cc.Touch): void {

    }

    private handleEndGame(): void {

    }

    protected update(dt: number): void {

    }

}
