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
    StepOne: cc.Node = null;
    @property(cc.Node)
    StepTwo: cc.Node = null;
    @property(cc.Node)
    Card_Fake: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    Bg1: cc.Node = null;
    @property(cc.Node)
    Bg2: cc.Node = null;
    @property(cc.Node)
    Card_Fake_2: cc.Node = null;
    @property(cc.Node)
    hint_Hand: cc.Node = null;
    @property(cc.Node)
    backGround_Side_Left: cc.Node = null;
    @property(cc.Node)
    backGround_Side_Right: cc.Node = null;
    @property(cc.Node)
    Spine_Thunder: cc.Node = null;
    @property(cc.Node)
    hint_Line: cc.Node = null;

    // Array
    @property([cc.Node])
    Hint_Arrows: cc.Node[] = [];
    @property([cc.Node])
    Cards: cc.Node[] = [];
    @property([cc.Node])
    Cards_Opend: cc.Node[] = [];
    @property([cc.Node])
    Cards_StepTwo: cc.Node[] = [];

    // Effects
    @property([cc.ParticleSystem])
    BlinkEffects: cc.ParticleSystem[] = [];
    @property(cc.ParticleSystem)
    BombEffect: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    HealEffect: cc.ParticleSystem = null;

    // State
    isRotate: boolean = false;
    IsFirstCardOpen: boolean = false;
    IsSecondCardOpen: boolean = false;
    isPlayBgSound: boolean = false;

    CardFakePosition: cc.Vec2 = null;
    CardFakeSecondPosition: cc.Vec2 = null;

    OverLord: cc.Node = null;

    protected onLoad(): void {
        this.Cards_Opend.forEach(card => {
            card.opacity = 0;
        });
        this.StepTwo.opacity = 0;
        this.Cards_StepTwo[2].opacity = 0;
        this.Bg2.opacity = 0;
        this.hint_Line.opacity = 0;

        this.hint_Hand.active = false;
        this.Card_Fake.active = false;
        this.Spine_Thunder.active = false;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        this.Hint_Arrows.forEach(hint => {
            hint.getComponent(cc.Animation).play("Hint_ArrowAnim");
        });

        this.registerEvent();
    }

    private registerEvent(): void {
        // ironSource
        this.Bg1.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this)

        this.Cards.forEach(card => {
            card.on(cc.Node.EventType.TOUCH_START, this.handleCardTouchStart, this);
        });
    }

    private handleBgTouchStart(): void {
        if (this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }

    private handleCardTouchStart(e: cc.Node): void {
        switch (e.currentTarget._name) {
            case "card_1":
                if (this.IsFirstCardOpen) {
                    return;
                }

                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.IsFirstCardOpen = true;
                this.BlinkEffects[0].resetSystem();
                this.Hint_Arrows[0].active = false;
                this.Cards_Opend[0].getComponent(cc.Animation).play("Card_OpenAnim");

                this.handleShowStepTwo();
                break;
            case "card_4":
                if (this.IsSecondCardOpen) {
                    return;
                }

                cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
                this.IsSecondCardOpen = true;
                this.BlinkEffects[1].resetSystem();
                this.Hint_Arrows[1].active = false;
                this.Cards_Opend[1].getComponent(cc.Animation).play("Card_OpenAnim");

                this.handleShowStepTwo();
                break;

            default:
                break;
        }

        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

    }

    private handleShowStepTwo(): void {
        if (this.IsFirstCardOpen && this.IsSecondCardOpen) {

            this.scheduleOnce(() => {
                this.StepOne.getComponent(cc.Animation).play("Anim_Fade");

                this.scheduleOnce(() => {
                    this.StepTwo.getComponent(cc.Animation).play("Anim_Show");
                }, 0.5);

                this.scheduleOnce(() => {
                    this.handleLogicStepTwo();
                }, 1)
            }, 1)

        }
    }

    private handleLogicStepTwo(): void {
        this.CardFakePosition = this.Card_Fake.getPosition();
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.AudioManager.mergeSound, false, 1);

        cc.tween(this.Cards_StepTwo[0])
            .to(0.5, { x: this.Cards_StepTwo[0].x - 20 })
            .start();

        cc.tween(this.Cards_StepTwo[1])
            .to(0.5, { x: this.Cards_StepTwo[1].x + 20 })
            .start();

        this.scheduleOnce(() => {

            cc.tween(this.Cards_StepTwo[0])
                .to(0.5, { x: this.Cards_StepTwo[0].x + 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.5, { x: this.Cards_StepTwo[1].x - 20 })
                .start();
        }, 0.5)

        this.scheduleOnce(() => {
            cc.tween(this.Cards_StepTwo[0])
                .to(0.5, { x: this.Cards_StepTwo[0].x - 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.5, { x: this.Cards_StepTwo[1].x + 20 })
                .start();
        }, 0.8)

        this.scheduleOnce(() => {
            cc.tween(this.Cards_StepTwo[0])
                .to(0.4, { x: this.Cards_StepTwo[0].x + 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.4, { x: this.Cards_StepTwo[1].x - 20 })
                .start();
        }, 1.3);

        this.scheduleOnce(() => {
            cc.tween(this.Cards_StepTwo[0])
                .to(0.25, { x: this.Cards_StepTwo[0].x - 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.25, { x: this.Cards_StepTwo[1].x + 20 })
                .start();
        }, 1.7)

        this.scheduleOnce(() => {
            cc.tween(this.Cards_StepTwo[0])
                .to(0.25, { x: this.Cards_StepTwo[0].x + 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.25, { x: this.Cards_StepTwo[1].x - 20 })
                .start();
        }, 1.95)

        this.scheduleOnce(() => {
            cc.tween(this.Cards_StepTwo[0])
                .to(0.3, { x: this.Cards_StepTwo[0].x - 20 })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.3, { x: this.Cards_StepTwo[1].x + 20 })
                .start();
        }, 2.2)

        this.scheduleOnce(() => {
            // call tween 
            // check if this card go to goal yet. If true, do next logic
            // just check once because just know 1 is enough
            cc.tween(this.Cards_StepTwo[0])
                .to(0.3, { x: this.CardFakePosition.x })
                .start();

            cc.tween(this.Cards_StepTwo[1])
                .to(0.3, { x: this.CardFakePosition.x })
                .call(() => {
                    if (this.Cards_StepTwo[1].position.equals(new cc.Vec3(this.CardFakePosition.x, this.CardFakePosition.y))) {
                        this.handleShowOverLord();
                        this.Cards_StepTwo[0].active = false;
                        this.Cards_StepTwo[1].active = false;
                    }
                })
                .start();
        }, 2.5)
    }

    private handleShowOverLord(): void {

        this.Spine_Thunder.active = true;
        this.Spine_Thunder.getComponent(sp.Skeleton).setAnimation(0, "lightning_hit", true);


        this.Card_Fake.active = true;
        this.Card_Fake.getComponent(cc.Animation).play("Anim_RengReng");

        this.scheduleOnce(() => {
            this.Spine_Thunder.active = false;
            this.Card_Fake.active = false;
            this.OverLord = this.Cards_StepTwo[2];
            // this.HealEffect.resetSystem();
            this.text.active = false;
            this.Cards_StepTwo[0].active = false;
            this.Cards_StepTwo[1].active = false;

            this.BombEffect.resetSystem();

            // increase opacity of OverLord
            cc.tween(this.OverLord)
                .to(0.5, {
                    opacity: 255,
                })
                .start();

            this.scheduleOnce(() => {
                this.handleStepThree();
            }, 1.5)
        }, 2.5)
    }

    private handleStepThree(): void {

        this.CardFakeSecondPosition = this.Card_Fake_2.getPosition();

        if (this.isRotate) {
            this.backGround_Side_Left.active = true;
            this.backGround_Side_Right.active = true;
        } else {
            this.backGround_Side_Left.active = false;
            this.backGround_Side_Right.active = false;
        }

        // show bg2
        cc.tween(this.Bg2)
            .to(1, { opacity: 255 })
            .start();

        this.scheduleOnce(() => {
            // move overlord to bottom
            this.BombEffect.node.opacity = 0;
            cc.tween(this.OverLord)
                .to(1, {
                    position: this.CardFakeSecondPosition,
                    scale: 0.4
                })
                .start();

        }, 1);

        this.scheduleOnce(() => {
            this.hint_Line.getComponent(cc.Animation).play("Anim_Blink");
            this.hint_Hand.getComponent(cc.Animation).play("Hint_HandAnim");
            this.hint_Hand.active = true;

            // mtg & applovin
            // this.Bg2.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
            // this.Bg1.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
            // this.backGround_Side_Left.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
            // this.backGround_Side_Right.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

            // others
            this.OverLord.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        }, 2)

        this.scheduleOnce(() => {
            this.OverLord.getComponent(cc.Animation).play("Anim_ScaleOverLord");
        }, 3)

        this.scheduleOnce(() => {
            cc.audioEngine.play(this.AudioManager.bgSound, true, 1)
        }, 4)
    }

    protected update(dt: number): void {

    }
}
