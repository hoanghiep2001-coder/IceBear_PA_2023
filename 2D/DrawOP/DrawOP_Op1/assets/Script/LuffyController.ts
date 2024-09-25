import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LuffyController extends cc.Component {
    
    @property(sp.Skeleton)
    spine_Luffy: sp.Skeleton = null;
    @property(sp.Skeleton)
    spine_Luffy_lose: sp.Skeleton = null;

    @property(cc.Label)
    level: cc.Label = null;
    @property(sp.Skeleton)
    spine_LevelUp: sp.Skeleton = null;

    @property(cc.Node)
    GamePlay: cc.Node = null;
    @property(cc.Node)
    Line: cc.Node = null;
    @property(cc.ParticleSystem)
    Effect: cc.ParticleSystem = null;

    GamePlayComponent: GamePlay = null;
    flag: boolean = false;

    protected onLoad(): void {
        this.spine_LevelUp.node.active = false;
    }

    protected start(): void {
        this.GamePlayComponent = this.GamePlay.getComponent("GamePlay");
        this.getComponent(cc.Animation).play("Luffy_OpenSceneAnim");
    }


    public Run(): void {
        if (this.GamePlayComponent.LuffyRoadIndex >= this.GamePlayComponent.LuffyTargetPoints.length) {
            cc.audioEngine.stop(this.GamePlayComponent.runSoundState)
            this.GamePlayComponent.LuffyFightLose(this.spine_Luffy, true)
            return;
        }

        if (this.GamePlayComponent.isDrawing) {
            return;
        }

        let targetPosition = this.GamePlayComponent.LuffyTargetPoints[this.GamePlayComponent.LuffyRoadIndex];
        let CharPosition = new cc.Vec2(this.node.x, this.node.y);
        let direction = new cc.Vec3(targetPosition.x, targetPosition.y, 0);
        let scaleX: number = (direction.x > CharPosition.x) ? 1 : -1;

        cc.tween(this.node)
        .to(targetPosition.sub(CharPosition).mag() / this.GamePlayComponent.speed, { position: direction })
        .call(() => {
            if(this.GamePlayComponent.isCollideTrap) {
                console.log("Check");
                
                return;
            }

            if(this.GamePlayComponent.isFight) {
                this.node.active = false;
                cc.audioEngine.stop(this.GamePlayComponent.runSoundState);
            } else {
                this.level.string = String(this.GamePlayComponent.level);
                this.node.active = true;
                this.spine_Luffy.node.scaleX = scaleX;
                this.GamePlayComponent.LuffyRoadIndex++;
                this.Run();
            }
        })
        .start();
        this.GamePlayComponent.Luffy_Point.setPosition(this.node.x, this.node.y + 28);
        this.GamePlayComponent.Luffy_Collide.setPosition(this.node.x, this.node.y - 10);
    }


    protected update(dt: number): void {
        // Run luffy and check the flag to stop call the method
        if(this.GamePlayComponent.isRunGame && !this.flag) {
            this.Run();
            this.flag = true;
        }
    }
}
