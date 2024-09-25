import { Constants } from "../Data/Constant";
import EnemiesController from "./EnemiesController";
import PowerController from "./PowerController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.RigidBody)
    body: cc.RigidBody = null;
    @property(cc.Node)
    Level: cc.Node = null;

    EnemiesController: EnemiesController = null;

    PowerController: PowerController = null;
    GameController: cc.Node = null;
    playerController: cc.Node = null;
    touchArea: cc.Node = null;

    isAte: boolean = false;
    isScaleDownLv2: boolean = false;
    isLive: boolean = false;
    isIdle: boolean = false;

    randomChangeSpeed: number = 3;
    maxSpeed: number = 60;
    randomVecX: number = 0;
    randomVecY: number = 0;
    
    originalPosition: cc.Vec2;
    moveAmount: number = 3;
    moveDirection: number = 1;
    moveTimer: number = 0;
    moveInterval: number = 0.5;


    protected start(): void {
        this.PowerController = this.node.parent.parent.parent.getChildByName("PowerController").getComponent(PowerController);
        this.originalPosition = this.node.getPosition();
        this.EnemiesController = this.node.parent.getComponent(EnemiesController);
        this.GameController = this.node.parent.parent.parent.getChildByName("UIGameController").getChildByName("GameController")
        this.playerController = this.node.parent.parent.getChildByName("Player");
        this.touchArea = this.node.parent.parent.parent.getChildByName("TouchArea");
        this.isLive = true;
        let spine = this.node
            .getChildByName("Body")
            .getChildByName("Spine_Fish")
            .getComponent(sp.Skeleton)

        this.callBack(spine);
        this.schedule(() => {
            this.callBack(spine)
        }, 5);
    }


    private callBack(spine: sp.Skeleton): void {
        spine.animation === "animation" || spine.animation === "idle"
            ? this.isIdle = true
            : this.isIdle = false;

        let random = Math.round(Math.random() * 5) + 1;
        this.isIdle && this.scaleSpine(spine, random);
    }


    private scaleSpine(spine, scale): void {
        spine.timeScale = scale;
    }


    public die() {
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.destroy();
        this.node.getChildByName("Body").active = false;
        // this.node.getChildByName("Die").active = true;
        this.node.getComponent(cc.Animation).play("EnemyDieAnim");
        this.isAte = true;

        // cc.tween(this.node)
        // .to(0.02, {scale: 0.3})
        // .start();

        this.scheduleOnce(() => {
            this.isAte = false;
            this.node.getChildByName("Body").active = false;            
        }, 0.2)

        this.scheduleOnce(() => {
            this.isLive = false;
            this.node.destroy();
        }, 1)
    }


    // private handleSpliceFish(): void {
    //     if(this.node.name.startsWith("Enemy1_")) {
    //         let idFish = this.node.name.split("_");
    //         let number = parseInt(idFish[idFish.length - 1]);
    //         this.EnemiesController.Fishes_Lv1.splice(number, 1)
    //         // console.log("Enemy1_", number);
    //     }

    //     if(this.node.name.startsWith("Enemy2_")) {
    //         let idFish = this.node.name.split("_");
    //         let number = parseInt(idFish[idFish.length - 1]);
    //         this.EnemiesController.Fishes_Lv2.splice(number, 1)
    //         // console.log("Enemy2_", number);
    //     }
    // }


    private handleFishUI(): void {
        this.handleFishAngle();
        this.handleFishMovement();
    }


    private handleFishAngle(): void {
        var angleFish =
            cc.misc.radiansToDegrees(Math.atan(
                (this.playerController.y - this.node.y) / (this.playerController.x - this.node.x)
            ));

        this.node.getChildByName("Body").angle = angleFish;

        if ((this.node.x - this.playerController.x) > 0) {
            this.node.getChildByName("Body").scaleX = 1;
        } else {
            this.node.getChildByName("Body").scaleX = -1;
        }
    }


    private SwithAnimToIdleWithFishLv2(): void {
        if (this.playerController.getComponent("PlayerController").isLevelUp && !this.isScaleDownLv2) {
            this.isScaleDownLv2 = true;

            if (this.Level && this.Level.active) {
                if (this.node.name.startsWith("Enemy2_")) {
                    let spine = this.node.getChildByName("Body")
                        .getChildByName("Spine_Fish")
                        .getComponent(sp.Skeleton);

                    spine.setAnimation(0, "idle", true);
                    spine.timeScale = 3;

                    this.scheduleOnce(() => {
                        cc.tween(this.Level)
                        .to(0.15, {opacity: 0})
                        .start();
                    }, 0.5)
                }
            }
        }
    }


    private handleFishMovement(): void {
    //     if (this.isAte) {
    //         if(this.getComponent(cc.RigidBody)) {
    //            this.body.destroy();
    //         }
    //     //    const lerpRatio = 0.012; 
    //     //    const playerPos = this.playerController.getComponent("PlayerController").Player_Mouth.getPosition();
    //     //    const currentCameraPos = this.node.position;
    //     //    const newPosition = currentCameraPos.lerp(playerPos, lerpRatio, currentCameraPos);

    //     //    this.node.setPosition(newPosition);
           
    //        return;
    //    }


        if (
            !this.playerController.getComponent("PlayerController").isLive) {
            return;
        }


        if (this.GameController.getComponent("GameController").isStartGame) {
            return;
        }


        if (!this.touchArea.getComponent("TouchArea").isPlayGame) {
            return;
        }


        if (this.PowerController.isTransforming) {
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
            const direction = this.playerController.getPosition().sub(this.node.getPosition()).normalize();
            let velocity = direction.mul(this.maxSpeed - 20)
            this.body.linearVelocity = velocity;
            return;
        }
        
        
        if (this.node.name.startsWith("Enemy2_")) {
            if (!this.playerController.getComponent("PlayerController").isLevelUp) {
                return;
            }
        }
        

        if (this.node.name.startsWith("Enemy1_") && this.isScaleDownLv2) {
            this.body.linearVelocity = cc.v2(0, 0);
            return;
        }

        if (this.isAte) {
            const direction = this.playerController.getPosition().sub(this.node.getPosition()).normalize();
            let velocity = direction.mul(this.maxSpeed)
            this.body.linearVelocity = velocity;
            return;
        }
        
        const direction = this.playerController.getPosition().sub(this.node.getPosition()).normalize();
        let velocity = direction.mul(this.maxSpeed)
        this.body.linearVelocity = velocity;
    }


    protected update(dt: number): void {
        this.handleFishUI();
        this.SwithAnimToIdleWithFishLv2();
    }

}
