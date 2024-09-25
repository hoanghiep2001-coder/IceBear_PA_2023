import EnemiesController from "../Controller/EnemiesController";
import { Constants } from "../Data/Constant";

import { _decorator, Component, Node, Prefab,Animation, instantiate, RigidBody2D, Vec2, Vec3, toRadian, math, Skeleton, sp, tween, toDegree, CircleCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class Enemy extends Component {

    @property(RigidBody2D)
    body: RigidBody2D = null;
    @property(Node)
    Level: Node = null;
    
    EnemiesController: EnemiesController = null;

    GameController: Component = null;
    playerController: Node = null;
    touchArea: Node = null;

    isAte: boolean = false;
    isScaleDownLv2: boolean = false;
    isLive: boolean = false;
    isIdle: boolean = false;

    randomChangeSpeed: number = 3;
    maxSpeed: number = 1;
    randomVecX: number = 0;
    randomVecY: number = 0;
    
    originalPosition: Vec3;
    moveAmount: number = 3;
    moveDirection: number = 1;
    moveTimer: number = 0;
    moveInterval: number = 0.5;


    protected start(): void {
        this.originalPosition = this.node.getPosition();
        this.EnemiesController = this.node.parent.getComponent(EnemiesController);
        this.GameController = this.node.parent.parent.parent.parent.getChildByName("GameController").getComponent("GameController");       
        this.playerController = this.node.parent.parent.getChildByName("Player");
        this.touchArea = this.node.parent.parent.parent.parent.getChildByName("TouchArea");
        this.isLive = true;
        let spine = this.node
            .getChildByName("Body")
            .getChildByName("Spine_Fish")
            .getComponent(sp.Skeleton);
        this.callBack(spine);
        this.schedule(() => {
            this.callBack(spine);
        }, 5);
    }


    private callBack(spine: sp.Skeleton): void {
        spine.animation === "animation" || spine.animation === "idle"
            ? this.isIdle = true
            : this.isIdle = false;
        let random = Math.round(Math.random() * 5) + 1;
        this.isIdle ? spine.timeScale = random : console.log("");
    };


    public die() {
        this.body.linearVelocity = new math.Vec2(0, 0);
        this.getComponent(CircleCollider2D).radius = 0;
        this.node.getComponent(Animation).play("Enemy_DieAnim");
        this.isAte = true;
        
        tween(this.node)
        .to(0.02, {scale: new Vec3(0.6, 0.6, 0.6)})
        .start();

        this.scheduleOnce(() => {
            this.isAte = false;
            this.node.getChildByName("Body").active = false;            
        }, 0.2)

        this.scheduleOnce(() => {
            this.isLive = false;
            this.node.destroy();
        }, 1);
    }


    private handleFishUI(): void {
        this.handleFishAngle();
        this.handleFishMovement();
    }


    private handleFishAngle(): void {
        var angleFish =
            toDegree(Math.atan(
                (this.playerController.getPosition().y - this.node.getPosition().y) 
                / (this.playerController.getPosition().x - this.node.getPosition().x)
            ));
        this.node.getChildByName("Body").angle = angleFish;

        if ((this.node.getPosition().x - this.playerController.getPosition().x) > 0) {
            this.node.getChildByName("Body").setScale(new math.Vec3(1, 1, 0));
        } else {
            this.node.getChildByName("Body").setScale(new math.Vec3(-1, 1, 0));
        }
    }


    private handleFishMovement(): void {
        if (this.isAte) {
             if(this.getComponent(RigidBody2D)) {
                this.body.destroy();
             }
            const lerpRatio = 0.012; 
            const playerPos = this.playerController.getComponent("PlayerController").Player_Mouth.getPosition();
            const currentCameraPos = this.node.position;
    
            const newPosition = new Vec3();
            Vec3.lerp(
                newPosition,
                currentCameraPos,
                new Vec3(playerPos.x, playerPos.y, 0),
                lerpRatio);
            this.node.setPosition(newPosition);
            
            return;
        }

        if (
            !this.playerController.getComponent("PlayerController").isLive) {
                this.body.linearVelocity = new Vec2(0,0);
                return;
        }

        if (!Constants.isPlayGame) {
            return;
        }

        if (this.node.name.startsWith("Enemy3_")) {
            return;
        }

        if (this.node.name === "Enemy2_1" 
        || this.node.name === "Enemy2_28" 
        || this.node.name === "Enemy2_13"
        || this.node.name === "Enemy2_10"
        || this.node.name === "Enemy2_12"
        || this.node.name === "Enemy2_20"
        || this.node.name === "Enemy2_21"
        ) {
            const direction = this.playerController.getPosition().subtract(this.node.getPosition()).normalize();
            let velocity = direction.multiplyScalar(2.3);
            let clearFix = new math.Vec2(velocity.x, velocity.y);
            this.body.linearVelocity = clearFix;
            return;
        }
        
        
        if (this.node.name.startsWith("Enemy2_")) {
            if (!this.playerController.getComponent("PlayerController").isLevelUp) {
                this.body.linearVelocity = new Vec2(0,0);
                return;
            }
        }
        

        if (this.node.name.startsWith("Enemy1_") && this.isScaleDownLv2) {
            this.body.linearVelocity = new Vec2(0,0);
            return;
        }
        

        const direction = this.playerController.getPosition().subtract(this.node.getPosition()).normalize();
        let velocity = direction.multiplyScalar(0.5)
        let clearFix = new math.Vec2(velocity.x, velocity.y);
        this.body.linearVelocity = clearFix;
    }


    protected update(dt: number): void {
        this.handleFishUI();
    }

}
