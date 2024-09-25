import { _decorator, Animation, AudioSource, Camera, Component, EventTouch, view, log, math, Node, PhysicsSystem, Quat, toRadian, quat, RigidBody, SkeletalAnimation, Skeleton, Mat4, Vec2, Vec3, Vec4, Intersection2D, PhysicsRayResult, ParticleSystem } from 'cc';
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

    // Camera
    @property(Camera)
    Camera: Camera = null;

    // Node 3D  
    @property(Node)
    Banban_Merged: Node = null;
    @property(Node)
    Banban_Merged_2: Node = null;

    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    hint_Text: Node = null;
    @property(Node)
    hint_Hand: Node = null;
    @property(Node)
    hint_Hand_Fake: Node = null;
    @property(Node)
    cta_Fight: Node = null;

    // array 2D

    
    // array 3D
    @property([Node])
    Skibidi_Toilets: Node[] = [];
    @property([Node])
    Skibidi_BanBans: Node[] = [];

    // state
    touchPos: Vec2 = null;

    isRotate: boolean = false;
    isMerged: boolean = false;
    isFailMerged: boolean = false;
    isFighting: boolean = false;
    isPlayBgSound: boolean = false;

    currentIndex: number = 1;
    currentDevice: string = "";

    // Effect
    @property(ParticleSystem)
    Effect_Smoke: ParticleSystem = null;
    @property(ParticleSystem)
    Effect_Smoke_2: ParticleSystem = null;

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;
    private lastPos: Vec3;
    private selectNode: Node;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;

        this.cta_Fight.active = false;
        this.Banban_Merged.active = false;
        this.Banban_Merged_2.active = false;
    }


    protected start(): void {
        // this.AudioManager.bgSound.play();

        this.handleGamePlay();

        this.registerEvent();
    }


    private handleGamePlay(): void {

        // active anim for banbans
        this.Skibidi_BanBans.forEach(node => {
            node.getComponent(SkeletalAnimation).play("banban_06_Idle");
        });

        // active anim for skibidi toilets
        this.Skibidi_Toilets.forEach(node => {
            node.getComponent(SkeletalAnimation).play("skidibi_02_idle");
        });

    }


    private registerEvent(): void {
        this.canvas2D.on(Node.EventType.TOUCH_START, this.handleTouchStart, this);
        this.canvas2D.on(Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.canvas2D.on(Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        this.canvas2D.on(Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);
    }


    private handleTouchEnd(): void {
        if (this.isFailMerged) {
            this.isFailMerged = false;
            this.selectNode.setPosition(this.lastPos);
        };

        if (this.isMerged && this.currentIndex == 1) {

            if(this.selectNode.name == "banban_1") {
                this.currentIndex++;
                this.AudioManager.mergeSound.play();
                this.handlePlayCTAAnim();
    
                this.Banban_Merged.active = true;
                this.Effect_Smoke.play();
                this.Skibidi_BanBans[0].active = false;
                this.Skibidi_BanBans[1].active = false;
    
                this.cta_Fight.on(Node.EventType.TOUCH_START, this.handleInstall, this);
            } else {
                this.currentIndex++;
                this.AudioManager.mergeSound.play();
                this.handlePlayCTAAnim();
    
                this.Banban_Merged_2.active = true;
                this.Effect_Smoke_2.play();
                this.Skibidi_BanBans[0].active = false;
                this.Skibidi_BanBans[1].active = false;
    
                this.cta_Fight.on(Node.EventType.TOUCH_START, this.handleInstall, this);
            }
        }

        this.touchDown = false;
        this.selectNode = null;
    }


    private handleTouchStart(event: EventTouch): void {
        if(this.isMerged) {
            this.handleInstall();
            return;
        }

        this.hint_Hand.active = false;
        this.hint_Text.active = false;
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
            const hitPoint = rayResult.hitPoint;
            const hitNode = rayResult.collider.node;

            if (hitNode.name == "banban_1" || hitNode.name ==  "banban_2" || hitNode.name ==  "banban_3" || hitNode.name ==  "banban_4") {
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

            // console.log(hitPoint);
            

            this.selectNode.setPosition(hitPoint);

            // this.handleCheckMergeMonster(hitNode);
            
        }
    }

    private handleCheckMergeMonster(hitNode: Node): void {
        switch (hitNode.name) {
            case "banban_1":
                if(this.selectNode.name == "banban_2") {
                    this.isMerged = true;
                } else {
                    this.isMerged = false;
                    this.isFailMerged = true;
                }


            break;
            case "banban_2":
                if(this.selectNode.name == "banban_1") {
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

    private handlePlayCTAAnim(): void {
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

    private handleInstall(): void {
        this.AudioManager.bgSound.stop();
        this.GameController.installHandle();
    }

    protected update(dt: number): void {

    }
}
