import { _decorator, Animation, Camera, Component, EventTouch, Node, PhysicsSystem, SkeletalAnimation, Vec2, Vec3, ParticleSystem, log, sp, view } from 'cc';
const { ccclass, property } = _decorator;
import { geometry } from 'cc';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { BulletController } from './BulletController';

@ccclass('GamePlay')
export class GamePlay extends Component {
    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;

    @property([BulletController])
    BulletControllers: BulletController[] = [];


    // Camera
    @property(Camera)
    Camera: Camera = null;


    // Node 3D  
    @property(Node)
    Banban_Boss: Node = null;
    @property(Node)
    Banban_Merged: Node = null;
    @property(Node)
    Position_Field: Node = null;


    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    hint_Hand: Node = null;
    @property(Node)
    firstHint: Node = null;
    @property(Node)
    hint_Hand_Fake: Node = null;
    @property(Node)
    cta_Fight: Node = null;
    @property(Node)
    CTA: Node = null;
    @property(Node)
    CTA_Hand: Node = null;
    @property(Node)
    CTA_Button: Node = null;
    @property(Node)
    Overlay: Node = null;
    

    // array 2D
    @property([Node])
    Buttons_Card: Node[] = [];
    @property([sp.Skeleton])
    Spine_Blasts: sp.Skeleton[] = [];


    // array 3D
    @property([Node])
    Skibidi_BanBans: Node[] = [];
    @property([Node])
    Skibidi_Snakes: Node[] = [];


    // state
    touchPos: Vec2 = null;

    isCanClick: boolean = false;
    isRotate: boolean = false;
    isMerged: boolean = false;
    isFailMerged: boolean = false;
    isFighting: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneGame: boolean = false;
    isPlaySpineBlast: boolean = false;

    case: number = 0;
    step: number = 0;
    currentIndex: number = 1;
    countingBoomBullet: number = 0;
    currentDevice: string = "";


    // Effect
    @property(ParticleSystem)
    Effect_Smoke: ParticleSystem = null;


    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;
    private lastPos: Vec3;
    private selectNode: Node;
    touchDown = false;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;
        this.BulletControllers.forEach(bullet => bullet.node.active = false);
        this.CTA.active = false;

        this.cta_Fight.active = false;
        this.hint_Hand.active = false;
        this.Skibidi_Snakes.forEach(snake => {
            snake.active = false;
        });
        this.Skibidi_BanBans.forEach(node => {
            node.active = false;
        });
        this.Banban_Merged.active = false;
    }


    protected start(): void {
        // this.AudioManager.bgSound.play();

        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.firstHint.getComponent(Animation).play("FirstHint_ChooseCard_Anim");

        this.scheduleOnce(() => {
            this.isCanClick = true;
        }, 1);
    }


    private registerEvent(): void {
        this.Buttons_Card.forEach(card => {
            card.on(Node.EventType.TOUCH_START, this.handleTouchCard, this);
        });

        // register touch canvas event
        this.canvas2D.on(Node.EventType.TOUCH_START, this.handleTouchStart, this);
        this.canvas2D.on(Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.canvas2D.on(Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        this.canvas2D.on(Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);
    }


    private handleTouchCard(e: EventTouch): void {
        if (!this.isCanClick) {
            return;
        }

        this.step++;
        this.isCanClick = false;
        if (e.currentTarget._name === "card1") {
            this.handleFirstCase();
        } else {
            this.handleSecondCase();
        }


        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        this.AudioManager.bgSound.play();
    }


    private handleFirstCase(): void {
        this.case = 1;
        this.handlePlayHintHandAnim();

        if (this.step === 1) {
            this.handleHideFirstHint();
            this.Skibidi_BanBans.forEach(banban => {
                banban.active = true;
                banban.getComponent(SkeletalAnimation).play("banban_06_Idle");
            });
        }
    }


    private handleSecondCase(): void {
        this.case = 2;
        this.handlePlayHintHandAnim();

        if (this.step === 1) {
            this.handleHideFirstHint();
            this.Skibidi_Snakes.forEach(snake => {
                snake.active = true;
                snake.getComponent(SkeletalAnimation).play("banban_06_Idle");
            });
        }
    }


    private handleHideFirstHint(): void {
        this.firstHint.active = false;
    }


    private handleTouchStart(event: EventTouch): void {


        this.hint_Hand.active = false;
        this.touchDown = true;
        this.touchPos = event.touch.getLocation();

        let ray = new geometry.Ray();
        // Get a ray from the screen that is directed to the screen based on the point clicked
        this.Camera.screenPointToRay(this.touchPos.x, this.touchPos.y, ray);

        const mask = 0xffffffff;
        const maxDistance = 1000;
        const queryTrigger = true;

        if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
            const rayResult = PhysicsSystem.instance.raycastClosestResult;
            const hitNode = rayResult.collider.node;

            if
                (hitNode.name == "Banban_Snake_1"
                || hitNode.name == "Banban_Snake_2"
                || hitNode.name == "Banban_Snake_3"
                || hitNode.name == "Banban_Yellow_1"
                || hitNode.name == "Banban_Yellow_2"
                || hitNode.name == "Banban_Yellow_3"
            ) {
                this.selectNode = hitNode;
                this.lastPos = this.selectNode.getPosition();
            }
        }

        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        this.AudioManager.bgSound.play();
    }


    private handleTouchMove(event: EventTouch): void {
        if (!this.touchDown) return;
        if (this.selectNode == null) return;

        this.touchPos = event.touch.getLocation();

        let ray = new geometry.Ray();
        // Get a ray from the screen that is directed to the screen based on the point clicked
        this.Camera.screenPointToRay(this.touchPos.x, this.touchPos.y, ray);

        const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = true;

        if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
            const rayResult = PhysicsSystem.instance.raycastClosestResult;
            const hitPoint = rayResult.hitPoint;
            const hitNode = rayResult.collider.node;

            hitPoint.y = 0.04;
            hitPoint.x = -hitPoint.x / 100;
            hitPoint.z = -hitPoint.z / 100;

            console.log(hitPoint);
            
            // this.selectNode.setPosition(hitPoint);

            // this.handleCheckMergeMonster(hitNode);

        }
    }


    private handleTouchEnd(): void {
        if (this.isFailMerged) {
            this.isFailMerged = false;
            this.selectNode.setPosition(this.lastPos);
        };

        if (this.isMerged && this.currentIndex == 1) {
            this.currentIndex++;
            this.AudioManager.mergeSound.play();

            this.handlePlayFightButtonAnim();

            this.Skibidi_BanBans.forEach(banban => banban.active = false);
            this.Skibidi_Snakes.forEach(snake => snake.active = false);
            this.Banban_Merged.active = true;
            this.Banban_Merged.getComponent(SkeletalAnimation).play("skibidi10_idle");

            this.Effect_Smoke.play();
            this.cta_Fight.on(Node.EventType.TOUCH_START, this.handleFight, this);

        }

        this.touchDown = false;
        this.selectNode = null;
    }


    private handleCheckMergeMonster(hitNode: Node): void {
        switch (this.case) {
            case 1:
                this.handleCheckMergeBanban(hitNode);
                break;
            case 2:
                this.handleCheckMergeSnake(hitNode);
                break;
            default:
                break;
        }
    }


    private handleCheckMergeBanban(hitNode: Node): void {
        switch (hitNode.name) {
            case "Banban_Yellow_1":
                if (this.selectNode.name == "Banban_Yellow_2" || this.selectNode.name == "Banban_Yellow_3") {
                    this.isMerged = true;

                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;

                }
                break;

            case "Banban_Yellow_2":
                if (this.selectNode.name == "Banban_Yellow_1" || this.selectNode.name == "Banban_Yellow_3") {
                    this.isMerged = true;

                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;
                }
                break;

            case "Banban_Yellow_3":
                if (this.selectNode.name == "Banban_Yellow_1" || this.selectNode.name == "Banban_Yellow_2") {
                    this.isMerged = true;

                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;
                }
                break;
            default:
                this.isMerged = false;
                this.isFailMerged = true;
                break;
        }
    }


    private handleCheckMergeSnake(hitNode: Node): void {
        switch (hitNode.name) {
            case "Banban_Snake_1":
                if (this.selectNode.name == "Banban_Snake_2" || this.selectNode.name == "Banban_Snake_3") {
                    this.isMerged = true;


                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;

                }
                break;

            case "Banban_Snake_2":
                if (this.selectNode.name == "Banban_Snake_1" || this.selectNode.name == "Banban_Snake_3") {
                    this.isMerged = true;

                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;

                }
                break;

            case "Banban_Snake_3":
                if (this.selectNode.name == "Banban_Snake_1" || this.selectNode.name == "Banban_Snake_2") {
                    this.isMerged = true;

                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;

                }
                break;
            default:
                this.isMerged = false;
                this.isFailMerged = true;
                break;
        }
    }


    private handlePlayFightButtonAnim(): void {
        this.cta_Fight.active = true;
        switch (this.currentDevice) {
            case "horizontal_IPX":
                this.cta_Fight.getComponent(Animation).play("Blink_Tablet_Anim");
                break;
            case "horizontal_Tablet":
                this.cta_Fight.getComponent(Animation).play("Blink_Tablet_Anim");
                break;
            case "vertical_IPX":
                this.cta_Fight.getComponent(Animation).play("Blink_Mobile_Anim");
                break;
            case "vertical_Mobile":
                this.cta_Fight.getComponent(Animation).play("Blink_Mobile_Anim");
                break;
            default:
                break;
        }
    }


    private handlePlayHintHandAnim(): void {
        this.hint_Hand.active = true;
        switch (this.currentDevice) {
            case "horizontal_IPX":
                this.hint_Hand.getComponent(Animation).play("Hand_Tablet_Anim");
                break;
            case "horizontal_Tablet":
                this.hint_Hand.getComponent(Animation).play("Hand_Tablet_Anim");
                break;
            case "vertical_IPX":
                this.hint_Hand.getComponent(Animation).play("Hand_IPX_Anim");
                break;
            case "vertical_Mobile":
                if(view.getFrameSize().height / view.getFrameSize().width > 1.5) {
                    this.hint_Hand.getComponent(Animation).play("Hand_IP6S_Anim");
                } else {
                    this.hint_Hand.getComponent(Animation).play("Hand_OtherMobile_Anim");
                }
                break;
            default:
                break;
        }
    }


    private handleFight(): void {
        this.Position_Field.active = false;
        this.cta_Fight.active = false;
        this.isFighting = true;

        // active bullet
        this.BulletControllers.forEach(bullet => {
            bullet.node.active = true;
            bullet.isRun = true;
        });

        // set anim for boss & merged banban
        this.Banban_Boss.getComponent(SkeletalAnimation).play("Skibidi10_atk");
        this.Banban_Merged.getComponent(SkeletalAnimation).play("Skibidi10_atk");
        this.AudioManager.attackSound.play();
    }


    public handleRunSpineBlast(): void {
        if(this.isPlaySpineBlast) return;

        this.isPlaySpineBlast = true;
        this.Spine_Blasts[0].node.active = true;

        this.scheduleOnce(() => {
            this.Spine_Blasts[1].node.active = true;
        }, 0.1)

        this.scheduleOnce(() => {
            this.Spine_Blasts[2].node.active = true;
        }, 0.2)
    }


    private handleSwitchAnimAfterFight():void {

        if(this.isDoneGame) return;

        this.isDoneGame = true;
        this.BulletControllers.forEach(bullet => bullet.isDoneFight = false);

        // reset anim for boss & merged banban
        this.Banban_Boss.getComponent(SkeletalAnimation).play("Skibidi10_idle");
        this.Banban_Merged.getComponent(SkeletalAnimation).play("Skibidi10_dead");

        this.scheduleOnce(() => {
            this.handleShowCTA();
            this.AudioManager.loseSound.play();
        }, 1.5)
    }


    private handleShowCTA(): void {
        this.CTA.active = true;
        this.CTA.getComponent(Animation).play("CTA_Anim");

        this.scheduleOnce(() => {
            this.CTA_Hand.getComponent(Animation).play("CTA_HandAnim");
        }, 1)

        // register install event
        this.CTA_Button.on(Node.EventType.TOUCH_START, this.handleInstall, this);

        // mtg & applovin
        // this.Overlay.on(Node.EventType.TOUCH_START, this.handleInstall, this);

        // off event of canvas
        this.canvas2D.off(Node.EventType.TOUCH_START);
        this.canvas2D.off(Node.EventType.TOUCH_MOVE);
        this.canvas2D.off(Node.EventType.TOUCH_END);
        this.canvas2D.off(Node.EventType.TOUCH_CANCEL);
    }


    private handleInstall(): void {
        this.AudioManager.bgSound.stop();
        this.GameController.installHandle();
    }


    protected update(dt: number): void {
        if(this.countingBoomBullet === 3) {
            this.handleSwitchAnimAfterFight();
        }
    }
}
