import { _decorator, Animation, Camera, Component, EventTouch, Node, PhysicsSystem, SkeletalAnimation, Vec2, Vec3, ParticleSystem, log, sp, view, logID, RigidBody } from 'cc';
const { ccclass, property } = _decorator;
import { geometry } from 'cc';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';

@ccclass('GamePlay')
export class GamePlay extends Component {

    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;


    // ironsource
    ironSourceState: number = 1;
    ironSourceSoundState: boolean = true;
    isEndGame: boolean = false;


    // Camera
    @property(Camera)
    Camera: Camera = null;


    // Node 3D  
    @property([Node])
    Holes: Node[] = [];
    @property([Node])
    Objects: Node[] = [];
    @property([Node])
    Screws: Node[] = [];

    @property(Node)
    Line_1: Node = null;
    @property(Node)
    Line_2: Node = null;
    @property(Node)
    Line_3: Node = null;
    @property(Node)
    Line_4: Node = null;
    @property(Node)
    Line_5: Node = null;
    @property(Node)
    Screw_Right: Node = null;
    @property(Node)
    Screw_Left: Node = null;

    // pumkin
    @property(Node)
    pumkin_Base: Node = null;
    @property(Node)
    Left_Cheek: Node = null;
    @property(Node)
    Right_Cheek: Node = null;
    @property(Node)
    Left_Eye: Node = null;
    @property(Node)
    Right_Eye: Node = null;
    @property(Node)
    Lips: Node = null;
    @property(Node)
    Nose: Node = null;
    @property(Node)
    Hat: Node = null;

    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    hideMask: Node = null;
    @property(Node)
    background: Node = null;
    @property(Node)
    hand_1: Node = null;
    @property(Node)
    hand_2: Node = null;
    @property(Node)
    hand_3: Node = null;
    @property(Node)
    hand_4: Node = null;
    @property(Node)
    logo: Node = null;

    // array 2D


    // array 3D


    // state
    selectNode: Node = null;
    touchPos: Vec2 = null;
    lastPos: Vec3 = null;

    isCanClick: boolean = false;
    isRotate: boolean = false;
    isFighting: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneGame: boolean = false;
    isClickedCrew: boolean = false;
    touchDown: boolean = false;
    canOpenStore: boolean = false;

    case: number = 0;
    step: number = 0;
    currentDevice: string = "";

    // Effect
    @property(ParticleSystem)
    Effect_FireBall: ParticleSystem = null;
    @property(ParticleSystem)
    Effect_Flash: ParticleSystem = null;

    @property(ParticleSystem)
    Effect_FireBall_2: ParticleSystem = null;
    @property(ParticleSystem)
    Effect_Flash_2: ParticleSystem = null;

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;

        this.Screw_Left.active = false;
        this.Screw_Right.active = false;
        this.Line_1.active = false;
        this.Line_2.active = false;
        this.Line_3.active = false;
        this.Line_4.active = false;
        this.Line_5.active = false;
        this.hand_2.active = false;
        this.hand_3.active = false;
        this.hand_4.active = false;
    }


    protected start(): void {
        // this.AudioManager.bgSound.play();

        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.Line_1.active = true;
        this.Line_1.getComponent(Animation).play("Line_Fade");
    }


    private registerEvent(): void {
        // register touch canvas event
        this.hideMask.on(Node.EventType.TOUCH_START, this.handleTouchStart, this);
    }


    private handleTouchStart(e: EventTouch): void {
        this.touchDown = true;
        this.touchPos = e.touch.getLocation();

        if (this.canOpenStore && !this.isClickedCrew) {
            this.GameController.installHandle();
            this.AudioManager.bgSound.stop();
            this.isEndGame = true;
            return;
        }

        let ray = new geometry.Ray();
        // Get a ray from the screen that is directed to the screen based on the point clicked
        this.Camera.screenPointToRay(this.touchPos.x, this.touchPos.y, ray);

        const mask = 0xffffffff;
        const maxDistance = 10000000;
        const queryTrigger = true;

        if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
            const rayResult = PhysicsSystem.instance.raycastClosestResult;
            const hitNode = rayResult.collider.node;

            console.log(hitNode.name);


            if (hitNode.name == "hole_empty" && this.isClickedCrew) {
                this.step++;
                this.hand_2.active = false;
                this.Effect_FireBall.play();
                this.Effect_Flash.play();
                this.AudioManager.removeScrewSound.play();
                this.Screw_Right.active = true;
                this.Screw_Right.getComponent(Animation).play("Screw_DownAnim");
                this.isClickedCrew = false;
                this.selectNode.active = false;
                this.Line_2.active = false;
                this.Holes[0].active = false;
                this.Left_Cheek.getComponent(RigidBody).type = RigidBody.Type.DYNAMIC;


                this.scheduleOnce(() => {
                    this.AudioManager.winSound.play();

                    this.hand_3.active = true;
                    this.isRotate
                        ? this.hand_3.getComponent(Animation).play("HandHorizontal_Anim")
                        : this.hand_3.getComponent(Animation).play("Hand_Anim");

                    this.Line_4.active = true;
                    this.Line_4.getComponent(Animation).play("Line_Fade");
                }, 0.5)

                return;
            }


            if (hitNode.name == "hole_blue" && this.isClickedCrew && this.canOpenStore) {

                this.Line_3.active = false
                this.Screw_Left.active = true;
                this.isClickedCrew = false;
                this.AudioManager.removeScrewSound.play();
                this.Effect_FireBall_2.play();
                this.Effect_Flash_2.play();
                this.Screw_Left.getComponent(Animation).play("Screw_DownAnim");
                this.handleCheckScrew(this.selectNode);

                this.scheduleOnce(() => {
                    this.AudioManager.winSound.play();
                }, 0.5)

                return;
            }


            if
                (hitNode.name == "ghost_screw_1"
            ) {
                this.hand_1.active = false;
                this.hand_2.active = true;

                this.isRotate
                    ? this.hand_2.getComponent(Animation).play("HandHorizontal_Anim")
                    : this.hand_2.getComponent(Animation).play("Hand_Anim");

                this.AudioManager.clickSound.play();
                this.Line_1.active = false;
                this.selectNode = hitNode;
                this.selectNode.getComponent(Animation).play("Screw_UpAnim");

                this.isClickedCrew = true;
                this.Line_2.active = true;
                this.Line_2.getComponent(Animation).play("Line_Fade");
                return;
            }


            if ((
                hitNode.name == "ghost_screw_6"
                || hitNode.name == "ghost_screw_7")
                && this.step >= 1
            ) {
                this.hand_3.active = false;
                this.Line_4.active = false;
                this.AudioManager.clickSound.play();
                this.canOpenStore = true;
                this.Line_3.active = true;
                this.Line_3.getComponent(Animation).play("Line_Fade");
                this.isClickedCrew = true;
                this.selectNode = hitNode;
                this.selectNode.getComponent(Animation).play("Screw_UpAnim");

            }
        }

        this.handleIronSourceSound();
    }


    private handleCheckScrew(hitNode: Node): void {
        switch (hitNode.name) {
            case "ghost_screw_6":
                this.Screws[5].active = false;
                this.Lips.getComponent(Animation).play("Lips_DownRightAnim");

                this.scheduleOnce(() => {
                    this.Line_4.active = true;
                    this.Line_4.getComponent(Animation).play("Line_Fade");

                    this.hand_3.active = true;

                    this.isRotate
                        ? this.hand_3.getComponent(Animation).play("HandHorizontal_Anim")
                        : this.hand_3.getComponent(Animation).play("Hand_Anim");
                }, 0.5);
                break;
            case "ghost_screw_7":
                this.Screws[6].active = false;
                this.Lips.getComponent(Animation).play("Lips_DownLeftAnim");

                this.scheduleOnce(() => {
                    this.Line_5.active = true;
                    this.Line_5.getComponent(Animation).play("Line_Fade");

                    this.hand_4.active = true;

                    this.isRotate
                        ? this.hand_4.getComponent(Animation).play("HandHorizontal_Anim")
                        : this.hand_4.getComponent(Animation).play("Hand_Anim");
                }, 0.5);
                break;
            default:
                break;
        }
    }


    private handleIronSourceSound(): void {
        if (this.isPlayBgSound) {
            return;
        }

        if (this.ironSourceSoundState) {
            this.AudioManager.bgSound.play();
        }

        this.isPlayBgSound = true;
    }


    private handleInstall(): void {
        this.AudioManager.bgSound.stop();
        this.GameController.installHandle();
    }


    protected update(dt: number): void {
        this.ironSourceState = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (this.ironSourceState) {
            if (this.ironSourceState === 1 && !this.ironSourceSoundState && !this.isEndGame) {
                this.ironSourceSoundState = true;
                this.AudioManager.bgSound.play();
            }

            if (this.ironSourceState === 2 && this.ironSourceSoundState) {
                this.ironSourceSoundState = false;
                this.AudioManager.bgSound.stop();
                this.AudioManager.clickSound.stop();
                this.AudioManager.winSound.stop();
                this.AudioManager.removeScrewSound.stop();
            }
        }
    }
}
