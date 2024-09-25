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
    hide_Mask: cc.Node = null;
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    options_Container: cc.Node = null;
    @property(cc.Node)
    Hint_Hand_1: cc.Node = null;
    @property(cc.Node)
    Hint_Hand_2: cc.Node = null;
    @property(cc.Node)
    Hint_Hand_3: cc.Node = null;


    // Character
    @property(cc.Node)
    default_Lip: cc.Node = null;
    @property(cc.Node)
    getDress_Lip: cc.Node = null;

    @property(cc.Node)
    default_Shirt: cc.Node = null;
    @property(cc.Node)
    getDress_Shirt: cc.Node = null;

    @property(cc.Node)
    default_Pant: cc.Node = null;
    @property(cc.Node)
    getDress_Pant: cc.Node = null;

    @property(cc.Node)
    default_Shoes: cc.Node = null;
    @property(cc.Node)
    getDress_Shoes: cc.Node = null;


    // icon
    @property(cc.Node)
    icon_Shirt: cc.Node = null;
    @property(cc.Node)
    icon_Pant: cc.Node = null;
    @property([cc.Node])
    icon_Ticks: cc.Node[] = [];


    // Spine
    @property([sp.Skeleton])
    Spine_Tears: sp.Skeleton[] = [];
    @property([sp.Skeleton])
    Spine_Smokes: sp.Skeleton[] = [];


    // Effect
    @property([cc.ParticleSystem])
    Effect_Blinks: cc.ParticleSystem[] = [];


    // Options
    @property(cc.Node)
    Option_1: cc.Node = null;
    @property(cc.Node)
    Option_2: cc.Node = null;
    @property(cc.Node)
    Option_3: cc.Node = null;


    // state    
    isCanClick: boolean = true;
    isPlayBg: boolean = false;

    step: number = 1;
    crySoundState1: number = null;
    crySoundState2: number = null;


    protected onLoad(): void {
        // init game
        this.Spine_Tears.forEach(tears => tears.node.active = false);
        this.Spine_Smokes.forEach(smoke => smoke.node.active = false);
        this.icon_Ticks.forEach(tick => tick.active = false);
        this.getDress_Lip.active = false;
        this.getDress_Pant.active = false;
        this.getDress_Shirt.active = false;
        this.getDress_Shoes.active = false;
        this.Hint_Hand_2.active = false;
        this.Hint_Hand_3.active = false;
    }


    protected start(): void {
        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");

        this.scheduleOnce(() => {
            this.Hint_Hand_1.getComponent(cc.Animation).play("Hint_HandAnim");
        }, 1)
    }


    private registerEvent(): void {
        this.Option_1.on(cc.Node.EventType.TOUCH_START, this.handleOptionTouchStart, this);
        this.Option_2.on(cc.Node.EventType.TOUCH_START, this.handleOptionTouchStart, this);
        this.Option_3.on(cc.Node.EventType.TOUCH_START, this.handleOptionTouchStart, this);

        this.hide_Mask.on(cc.Node.EventType.TOUCH_START, this.handleHideMaskTouchStart, this);
    }


    private handleHideMaskTouchStart(): void {

        // mtg && applovin
        // if(this.step === 3) this.GameController.installHandle();


        // ironsource
        if(this.isPlayBg) return;

        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }


    private handleOptionTouchStart(e: any): void {
        cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        switch (e.currentTarget._name) {
            case "Option_1":
                this.handleStepOne();
                break;
            case "Option_2":
                this.handleStepTwo();
                break;
            case "Option_3":
                if (this.step === 3) this.GameController.installHandle();
                break;
            default:
                break;
        }

          // ironsource
          if(this.isPlayBg) return;

          this.isPlayBg = true;
          cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }


    private handleStepOne() {
        if (this.step !== 1) return;

        this.step = 2;
        this.crySoundState1 = cc.audioEngine.play(this.AudioManager.crySound, false, 1);

        this.dollBase.getComponent(cc.Animation).play("DollBase_DressUpAnim");

        this.Hint_Hand_1.active = false;
        this.Hint_Hand_2.active = true;
        this.Hint_Hand_2.getComponent(cc.Animation).play("Hint_HandAnim");

        this.default_Shirt.active = false;
        this.default_Lip.active = false;
        this.getDress_Shirt.active = true;
        this.getDress_Lip.active = true;

        this.Spine_Tears.forEach(tears => tears.node.active = true);
        this.Spine_Smokes[0].node.active = true;
        this.Spine_Smokes[1].node.active = true;

        this.icon_Shirt.active = false;
        this.icon_Ticks[0].active = true;
        this.icon_Ticks[0].getComponent(cc.Animation).play("Tick_Anim");
        this.Effect_Blinks[0].resetSystem();

    }

    private handleStepTwo() {
        if (this.step !== 2) return;

        this.step = 3;
        cc.audioEngine.stop(this.crySoundState1);

        this.crySoundState2 = cc.audioEngine.play(this.AudioManager.crySound_2, false, 1);

        this.dollBase.getComponent(cc.Animation).play("DollBase_DressUpAnim");

        this.Hint_Hand_2.active = false;
        this.Hint_Hand_3.active = true;
        this.Hint_Hand_3.getComponent(cc.Animation).play("Hint_HandAnim");

        this.default_Pant.active = false;
        this.default_Shoes.active = false;
        this.default_Lip.active = false;
        this.getDress_Lip.active = true;
        this.getDress_Pant.active = true;
        this.getDress_Shoes.active = true;

        this.Spine_Tears.forEach(tears => tears.node.active = true);
        this.Spine_Smokes[2].node.active = true;

        this.icon_Pant.active = false;
        this.icon_Ticks[1].active = true;
        this.icon_Ticks[1].getComponent(cc.Animation).play("Tick_Anim");
        this.Effect_Blinks[1].resetSystem();
    }


    protected update(dt: number): void {

    }

}
