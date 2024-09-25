
import { _decorator, Component, Node, RigidBody, BoxCollider, ICollisionEvent, ERigidBodyType, math } from 'cc';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {

    @property(AudioManager)
    AudioManager: AudioManager = null;

    @property(Node)
    GamePlay: Node = null;

    isRun: boolean = false;
    isDoneFight: boolean = false;
    rigidbody: RigidBody;
    collider: BoxCollider;

    protected start(): void {
        // this.node.active = false;

        this.rigidbody = this.getComponent(RigidBody);
        this.collider = this.getComponent(BoxCollider)

        this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "Merged_BanBan") {
                this.isRun = false;
                this.isDoneFight = true;
                this.rigidbody.type = ERigidBodyType.STATIC;
                this.node.active = false;
                this.GamePlay.getComponent("GamePlay").countingBoomBullet++;
                this.GamePlay.getComponent("GamePlay").handleRunSpineBlast();
                this.AudioManager.blastSound.play();
            }
        });
    }

    private Run(): void {
        this.rigidbody.setLinearVelocity(new math.Vec3(0, 0, 5));
    }

    protected update(dt: number): void {
        if (this.isRun) this.Run()
    }
}
