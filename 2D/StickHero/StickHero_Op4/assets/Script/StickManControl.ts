
import { _decorator, Component, Node, ERigidBodyType, BoxCollider, RigidBody, ICollisionEvent, math, SkeletalAnimation, Vec3 } from 'cc';
import { BossControl } from './BossControl';
const { ccclass, property } = _decorator;

@ccclass('StickManControl')
export class StickManControl extends Component {

    @property(Component)
    Character: Component;
    @property(BossControl)
    Boss: BossControl;

    isRun: boolean = false;
    rigidbody: RigidBody;
    collider: BoxCollider;
    speed: number = 0.5;
    canRun: boolean = false;

    isDie: boolean = false;

    @property(RigidBody)
    _body: RigidBody = null;

    protected start(): void {
        this._body = this.node.getComponent(RigidBody);
        this.getComponent(SkeletalAnimation).play("stick_idle_01");

        this.scheduleOnce(() => {
            this.canRun = true;
            this.getComponent(SkeletalAnimation).play("stick_archer_run");
        }, 1);          

    }

    private handleDieAnim(): void {
        if(this.isDie) {
            return;
        }

        this.isDie = true;
        this.getComponent(SkeletalAnimation).play("stick_dead01");
    }

    protected update(dt: number): void {
        if(this.Boss.isWatchFirstTime) {
            this.canRun = false;
            this.handleDieAnim();
            return this._body.setLinearVelocity(new Vec3(0, 0, 0));
        }

        if(this.canRun) {
            return this._body.setLinearVelocity(new Vec3(this.speed, 0, -this.speed));
        }
    }
}
