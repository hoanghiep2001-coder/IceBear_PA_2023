import { Constants } from "../Data/constants";
import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;


    // Container
    @property(cc.Node)
    ItemsContainer: cc.Node = null;
    @property(cc.Node)
    CharacterContainer: cc.Node = null;

    // node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    Hand: cc.Node = null;
    @property(cc.Node)
    Hand_2: cc.Node = null;
    @property(cc.Node)
    Text_TryAgain: cc.Node = null;


    // array


    // Box
    @property(cc.Node)
    Box1: cc.Node = null;
    @property(cc.Node)
    Box2: cc.Node = null;


    // Character
    @property(cc.Node)
    Character_Old: cc.Node = null;
    @property(cc.Node)
    Character_New: cc.Node = null;
    @property(cc.Node)
    Character_Dress1: cc.Node = null;
    @property(cc.Node)
    Character_Dress2: cc.Node = null;
    @property(cc.Node)
    Character_Mouth: cc.Node = null;
    @property(cc.Node)
    Character_Hat: cc.Node = null;
    @property(cc.Node)
    Character_Cry: cc.Node = null;


    // Spine
    @property(sp.Skeleton)
    SpineBoy: sp.Skeleton = null;
    @property(sp.Skeleton)
    SpineBoy_2: sp.Skeleton = null;

    // effect
    @property(cc.ParticleSystem)
    Effect_Heart: cc.ParticleSystem = null;


    protected onLoad(): void {
        this.Character_Cry.active = false;
        this.Character_Mouth.active = false;
        this.Character_New.active = false;
        this.SpineBoy_2.node.active = false;
        this.Text_TryAgain.active = false;
        this.Hand_2.opacity = 0;
    }


    protected start(): void {
        this.handleGamePlay();
        this.registerEvent();
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }


    private handleGamePlay(): void {
        this.getComponent(cc.Animation).play("GamePlay_OpenAnim");

        this.scheduleOnce(() => {
            Constants.isCanClick = true;
            this.SpineBoy.node.active = false;
            this.Hand.getComponent(cc.Animation).play("Hand_Anim");
        }, 3);
    }


    private registerEvent(): void {
        this.Box1.on(Constants.Event.touchStart, this.handleBoxClick, this);
        this.Box2.on(Constants.Event.touchStart, this.handleBoxClick, this);

        // mtg & applovin || ironsource (Check)
        this.background.on(Constants.Event.touchStart, this.handleBackGroundTouchStart, this);
    }


    private handleBackGroundTouchStart(): void {
        // if(Constants.isLastStep) {
        //     this.GameController.installHandle();
        //     return;
        // }

        this.handleIronSourcePlaySound();
    }


    private handleBoxClick(e: any): void {
        if (!Constants.isCanClick) {
            return;
        }

        if(Constants.isLastStep) {
            this.GameController.installHandle();
            return;
        }

        // ironsource
        this.handleIronSourcePlaySound();

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
            cc.audioEngine.play(this.AudioManager.wowSound, false, 1);
        }

        this.ItemsContainer.active = false;
        this.Effect_Heart.resetSystem();
        this.Character_Old.active = false;
        this.Character_New.active = true;
        Constants.isCanClick = false;

        switch (e.target._name) {
            case "Box_1":
                this.Character_Dress1.active = true;
                this.Hand.active = false;
                break;
            case "Box_2":
                this.Character_Dress2.active = true;
                this.Character_Hat.active = true;
                this.Hand_2.active = false;
                break;
            default:
                break;
        }

        this.scheduleOnce(() => {
            this.handleShowSpineBoy2();
        }, 1.5);
    }


    private handleShowSpineBoy2(): void {
        Constants.Responsive.isDissapointed = true;
        if(Constants.isRotate) {
            cc.tween(this.CharacterContainer)
            .to(0.5, {x: -160, scale: 0.52, y: -80})
            .start();
        } else {
            cc.tween(this.CharacterContainer)
            .to(0.5, {x: -80, scale: 0.4, y: -80})
            .start();
        }

        this.scheduleOnce(() => {
            this.Text_TryAgain.active = true;
            this.SpineBoy_2.node.active = true;
            this.getComponent(cc.Animation).play("GamePlay_DisappointedAnim");
        }, 1);

        this.scheduleOnce(() => {
            if(Constants.ironSource.SoundState) {
                cc.audioEngine.play(this.AudioManager.crySound, false, 1);
            }

            this.Character_Cry.active = true;
            this.Character_Mouth.active = true;
        }, 2);

        this.scheduleOnce(() => {
            Constants.Responsive.isDissapointed = false;
            if(Constants.isRotate) {
                cc.tween(this.CharacterContainer)
                .to(0.5, {x: -160, scale: 0.55, y: -50})
                .start();
            } else {
                cc.tween(this.CharacterContainer)
                .to(0.5, {x: -0, scale: 0.45, y: -50})
                .start();
            }
        }, 3.5);

        this.scheduleOnce(() => {
            this.Hand_2.opacity = 255;
            Constants.isCanClick = true;
            Constants.isLastStep = true;
            this.ItemsContainer.active = true;
            this.Hand.getComponent(cc.Animation).play("Hand_Anim");
            this.Hand_2.getComponent(cc.Animation).play("Hand_Anim");
        }, 4)
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


    protected update(dt: number): void {

        // ironsource
        this.handleMuteSoundIronSource();

    }


}
