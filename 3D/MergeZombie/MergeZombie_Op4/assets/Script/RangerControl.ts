
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
        
        // this.Character = this.Character.getComponent("CharacterControl");

        this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(BoxCollider);

        this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "skidibi_anim" && e.selfCollider.node.name !== "Zominion_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("Death");

                this.scheduleOnce(() => {
                    this.node.active = false;
                    this.node.getComponent(SkeletalAnimation).stop();
                }, 1);
            }

            if (e.selfCollider.node.name === "Zominion_9") {
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.isRun = false;
                this.node.getComponent(SkeletalAnimation).play("Death");

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
            case "Zominion_9":
                this.rigidbody.setLinearVelocity(new math.Vec3(-1, 0, -7))
                break;
            case "Zominion_10":
                this.rigidbody.setLinearVelocity(new math.Vec3(-8, 0, -7))
                break;
            case "Zominion_11":
                this.rigidbody.setLinearVelocity(new math.Vec3(-6, 0, -6))
                break;
            case "Zominion_12":
                this.rigidbody.setLinearVelocity(new math.Vec3(-2, 0, -7))
                break;
            case "Zominion_13":
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
