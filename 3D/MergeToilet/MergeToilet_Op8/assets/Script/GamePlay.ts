import { _decorator, Animation, Camera, Graphics, Component, EventTouch, Node, PhysicsSystem, SkeletalAnimation, Vec2, Vec3, ParticleSystem, log, sp, view, UITransform, Label, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { JoyStick } from './JoyStick';

@ccclass('GamePlay')
export class GamePlay extends Component {
    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(JoyStick)
    JoyStick: JoyStick = null;

    @property(Graphics)
    Graphics: Graphics = null;

    // Camera
    @property(Camera)
    Camera: Camera = null;


    // Node 3D  
    @property(Node)
    huggy: Node = null;
    @property(Node)
    cameraMan: Node = null;
    @property(Node)
    skibidi: Node = null;
    @property(Node)
    Field: Node = null;
    @property(Node)
    platform: Node = null;

    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    Coin_Container: Node = null;
    @property(Label)
    Coin_Label: Label = null;
    @property(Node)
    Coin_icon_fake: Node = null;
    @property(Node)
    Coin_icon_fake_2: Node = null;

    @property(Node)
    hand_Container: Node = null;
    @property(Node)
    hand_1: Node = null;
    @property(Node)
    hand_2: Node = null;
    @property(Node)
    hand_3: Node = null;
    
    @property(Node)
    Btn_Fight: Node = null;
    @property(Node)
    hand_Fight: Node = null;
    @property(Node)
    Content: Node = null;

    // array 2D


    // array 3D
    @property([Node])
    cards: Node[] = [];

    // state
    card_01: UITransform = null;
    card_02: UITransform = null;

    touchPos: Vec2 = null;
    card_01_InitPos: Vec3 = null;
    card_02_InitPos: Vec3 = null;

    isRotate: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneCard_1: boolean = false; 
    isDoneCard_2: boolean = false; 
    isDoneCard_3: boolean = false; 
    isMergeDone: boolean = false;

    case: number = 0;
    step: number = 0;
    currentIndex: number = 0;
    currentCoin: number = 0;
    currentDevice: string = "";


    // Effect
    @property(ParticleSystem)
    Effect_Smoke_1: ParticleSystem = null;
    @property(ParticleSystem)
    Effect_Smoke_2: ParticleSystem = null;
    @property(ParticleSystem)
    Effect_Smoke_3: ParticleSystem = null;

    touchDown = false;


    protected onLoad(): void {
        this.huggy.active = false;
        this.skibidi.active = false;
        this.cameraMan.active = false;

        this.Coin_icon_fake_2.active = false;
        this.Coin_icon_fake.active = false;
        this.Btn_Fight.active = false;
        this.hand_2.active = false;
        this.hand_3.active = false;
        this.Btn_Fight.getComponent(Sprite).color.set(255, 255, 255, 0);
    }


    protected start(): void {
        this.AudioManager.bgSound.play();

        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.hand_Container.getComponent(Animation).play("Hint_HandAnim");
    }


    private registerEvent(): void {
        this.cards.forEach((card, index) => {
            card.on(Node.EventType.TOUCH_START, (e: EventTouch) => {
                // ironsource
                // this.handleIronSource();
                // ----

                this.hand_Container.active = false;
                this.handleFilterCard(index);
                this.card_01_InitPos = this.card_01.node.getPosition();
                this.card_02_InitPos = this.card_02.node.getPosition();
            }, this);

            card.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => {
                this.handleTouchMoveForCard(card, e);
            }, this);


            card.on(Node.EventType.TOUCH_END, this.handleCardTouchEnd, this);
            card.on(Node.EventType.TOUCH_CANCEL, this.handleCardTouchEnd, this);
        });

        this.Btn_Fight.on(Node.EventType.TOUCH_START, this.handleInstall, this);

        // ironsource
        // this.canvas2D.on(Node.EventType.TOUCH_START, this.handleIronSource, this);
    }


    private handleIronSource(): void {
        if(this.isPlayBgSound) return;

        this.AudioManager.bgSound.play();
        this.isPlayBgSound = true;
    }


    private handleTouchMoveForCard(card: Node, e: EventTouch): void {
        if (this.card_01.getBoundingBox().intersects(this.card_02.getBoundingBox())) {
            this.handleCheckIntersectsCard(card.name);
            this.handleCheckDoneAllMerge();
        }


        // this.JoyStick.stick = card;
        this.JoyStick.stickMove(e, card)
    }


    private handleFilterCard(index: number): void {
        switch (index) {
            case 0:
                this.card_01 = this.cards[0].getComponent(UITransform);
                this.card_02 = this.cards[1].getComponent(UITransform);
                break;
            case 1:
                this.card_01 = this.cards[1].getComponent(UITransform);
                this.card_02 = this.cards[0].getComponent(UITransform);
                break;
            case 2:
                this.card_01 = this.cards[2].getComponent(UITransform);
                this.card_02 = this.cards[3].getComponent(UITransform);
                break;
            case 3:
                this.card_01 = this.cards[3].getComponent(UITransform);
                this.card_02 = this.cards[2].getComponent(UITransform);
                break;
            case 4:
                this.card_01 = this.cards[4].getComponent(UITransform);
                this.card_02 = this.cards[5].getComponent(UITransform);
                break;
            case 5:
                this.card_01 = this.cards[5].getComponent(UITransform);
                this.card_02 = this.cards[4].getComponent(UITransform);
                break;
            default:
                break;
        }
    }


    private handleCheckIntersectsCard(card: string): void {
        switch (card) {
            case "try_Again_1":
                this.currentIndex++;
                this.huggy.active = true;
                this.Effect_Smoke_1.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_1 = true;
                this.hand_1.active = false;
                this.handlePlusCoin(1);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_2 || !this.isDoneCard_3) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_2 ? this.hand_2.active = true : this.hand_3.active = true;
                }
                break;
            case "try_Again_2":
                this.currentIndex++;
                this.cameraMan.active = true;
                this.Effect_Smoke_2.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_2 = true;
                this.hand_2.active = false;
                this.handlePlusCoin(1);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_1 || !this.isDoneCard_3) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_1 ? this.hand_1.active = true : this.hand_3.active = true;
                }
                break;
            case "try_Again_3":
                this.currentIndex++;
                this.skibidi.active = true;
                this.Effect_Smoke_3.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_3 = true;
                this.hand_3.active = false;
                this.handlePlusCoin(1);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_1 || !this.isDoneCard_2) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_1 ? this.hand_1.active = true : this.hand_2.active = true;
                }
                break;
            case "icon_1":
                this.currentIndex++;
                this.huggy.active = true;
                this.Effect_Smoke_1.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_1 = true;
                this.hand_1.active = false;
                this.handlePlusCoin(2);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_2 || !this.isDoneCard_3) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_2 ? this.hand_2.active = true : this.hand_3.active = true;
                }
                break;
            case "icon_2":
                this.currentIndex++;
                this.cameraMan.active = true;
                this.Effect_Smoke_2.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_2 = true;
                this.hand_2.active = false;
                this.handlePlusCoin(2);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_1 || !this.isDoneCard_3) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_1 ? this.hand_1.active = true : this.hand_3.active = true;
                }
                break;
            case "icon_3":
                this.currentIndex++;
                this.skibidi.active = true;
                this.Effect_Smoke_3.play();
                this.card_01.node.active = false;
                this.card_02.node.active = false;

                this.isDoneCard_3 = true;
                this.hand_3.active = false;
                this.handlePlusCoin(2);
                this.AudioManager.mergeSound.play();

                if(!this.isDoneCard_1 || !this.isDoneCard_2) {
                    this.hand_Container.active = true;
                    !this.isDoneCard_1 ? this.hand_1.active = true : this.hand_2.active = true;
                }


                break;
            default:
                break;
        }
    }


    private handlePlusCoin(status: number): void {
        this.currentCoin += 10;
        this.Coin_icon_fake.active = true;
        this.Coin_Container.getComponent(Animation).play("PlusMoney");
        this.Coin_Label.string = String(this.currentCoin);

        this.scheduleOnce(() => {
            this.Coin_icon_fake_2.active = false;
            this.Coin_icon_fake.active = false;
            this.Coin_Container.getComponent(Animation).stop();
        }, 1);
    }

 
    private handleCheckDoneAllMerge(): void {
        if(this.currentIndex === 3) {
            this.isMergeDone = true;
            this.Btn_Fight.active = true;
            this.platform.getComponent(Animation).play("PlatForm_Anim");
            this.Btn_Fight.getComponent(Animation).play("BtnFight_Anim");
            this.hand_Fight.getComponent(Animation).play("CTA_HandAnim");
            this.Field.active = false;

            // mtg & applovin
            // this.canvas2D.on(Node.EventType.TOUCH_START, this.handleInstall, this);
        }
    }


    private handleCardTouchEnd(): void {
        if (!this.card_01.getBoundingBox().intersects(this.card_02.getBoundingBox())) {
            this.card_01.node.setPosition(this.card_01_InitPos);
            this.card_02.node.setPosition(this.card_02_InitPos);
        }
    }


    private handleInstall(): void {
        this.AudioManager.bgSound.stop();
        this.GameController.installHandle();
    }


    protected update(dt: number): void {
       
    }
}
