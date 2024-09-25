
import { _decorator, Component, Node, ERigidBodyType, BoxCollider, RigidBody, ICollisionEvent, math, SkeletalAnimation } from 'cc';
import { CharacterControl } from './CharacterControl';
const { ccclass, property } = _decorator;

@ccclass('RangerControl')
export class RangerControl extends Component {

    @property(CharacterControl)
    Character: CharacterControl;

    isRun: boolean = false;
    rigidbody: RigidBody;
    collider: BoxCollider;

    protected start(): void {
        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(BoxCollider);

        this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "Robot_melee02_base" && e.selfCollider.node.name !== "Robot_melee07_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("die");

                this.scheduleOnce(() => {
                    this.node.active = false;
                    this.node.getComponent(SkeletalAnimation).stop();
                }, 1);
            }

            if (e.selfCollider.node.name === "Robot_melee07_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("die");

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
            case "Robot_melee07_9":
                this.rigidbody.setLinearVelocity(new math.Vec3(-1, 0, -7))
                break;
            case "Robot_melee07_10":
                this.rigidbody.setLinearVelocity(new math.Vec3(-3, 0, -7))
                break;
            case "Robot_melee07_11":
                this.rigidbody.setLinearVelocity(new math.Vec3(-3, 0, -6))
                break;
            case "Robot_melee07_12":
                this.rigidbody.setLinearVelocity(new math.Vec3(-2, 0, -7))
                break;
            case "Robot_melee07_13":
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
