
import { _decorator, Component, Node, ERigidBodyType, BoxCollider, RigidBody, ICollisionEvent, math, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RangerControl')
export class RangerControl extends Component {

    @property(Component)
    Character: Component;

    isRun: boolean = false;
    rigidbody: RigidBody;
    collider: BoxCollider;

    protected start(): void {
        
        this.Character = this.Character.getComponent("CharacterControl");

        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(BoxCollider);

        this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "Ranger07" && e.selfCollider.node.name !== "RangerLittle_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("Comp|Die");

                this.scheduleOnce(() => {
                    this.node.active = false;
                    this.node.getComponent(SkeletalAnimation).stop();
                }, 1);
            }

            if (e.selfCollider.node.name === "CompLittle_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("Comp|Die");

                this.scheduleOnce(() => {
                    this.node.active = false;
                    this.node.getComponent(SkeletalAnimation).stop()
                }, 1);
            }
        });
    }

    private Run(): void {
        this.rigidbody.type = ERigidBodyType.DYNAMIC;

        switch (this.node.name) {
            case "CompLittle_9":
                this.rigidbody.setLinearVelocity(new math.Vec3(-1, 0, -7))
                break;
            case "CompLittle_10":
                this.rigidbody.setLinearVelocity(new math.Vec3(-8, 0, -7))
                break;
            case "CompLittle_11":
                this.rigidbody.setLinearVelocity(new math.Vec3(-6, 0, -6))
                break;
            case "CompLittle_12":
                this.rigidbody.setLinearVelocity(new math.Vec3(-2, 0, -7))
                break;
            case "CompLittle_13":
                this.rigidbody.setLinearVelocity(new math.Vec3(-3, 0, -7))
                break;
            default:
                break;
        }
    }

    protected update(dt: number): void {
        if (this.isRun) this.Run()
    }
}
