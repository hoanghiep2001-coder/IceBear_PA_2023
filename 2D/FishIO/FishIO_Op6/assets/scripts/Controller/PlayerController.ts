import { _decorator, BoxCollider2D, Component, Node, Collider2D, IPhysics2DContact, RigidBody2D, Vec2, Vec3, Contact2DType, CircleCollider2D, Animation, Label, log, sp } from 'cc';
import { TouchAreaController } from './TouchAreaController';
import { Constants } from '../Data/Constant';
import { AudioManager } from './AudioManager';
import Enemy from '../TypeScript/Enemy';
import EnemiesController from './EnemiesController';
const { ccclass, property } = _decorator;


@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(EnemiesController)
    EnemiesController: EnemiesController = null;
    @property(TouchAreaController)
    TouchAreaController: TouchAreaController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;

    @property(RigidBody2D)
    rigidBody: RigidBody2D = null;
    @property(Node)
    Player_Mouth: Node = null;
    @property(Node)
    Player_fakeMount: Node = null;

    PlayerBody: Node = null;
    Player_Level: Label = null;
    Player_SpineDie: sp.Skeleton = null;
    Player_CircleCollider: CircleCollider2D = null;
    Player_MouthRigidBody: RigidBody2D = null;
    Player_MouthCollider: BoxCollider2D = null;
    Player_fakeMountCollide: BoxCollider2D = null;

    isLive: Boolean = true;
    isMove: Boolean = false;
    isLevelUp: boolean = false;
    targetPosition: Vec3 = null;
    speed: number = 150;
    distance: number = 40;


    protected start(): void {
        this.PlayerBody = this.node.getChildByName("Body");
        this.Player_SpineDie = this.node.getChildByName("Spine_Die").getComponent(sp.Skeleton);
        this.Player_CircleCollider = this.getComponent(CircleCollider2D);
        this.Player_fakeMountCollide = this.Player_fakeMount.getComponent(BoxCollider2D);
        this.Player_Level = this.node.getChildByName("Body").getChildByName("Level").getComponent(Label);

        this.Player_fakeMountCollide.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.Player_CircleCollider.on(Contact2DType.BEGIN_CONTACT, this.onCircleBeginContact, this);
    }


    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.tag == 1 && Constants.isTouching && !otherCollider.getComponent(Enemy).isAte) {
            if (Constants.ironSource.SoundState) {
                this.AudioManager.playSound(Constants.SoundTrack.eatSound);
            }
            this.handleEatFishLv1(otherCollider);
        }
    }


    private onCircleBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.tag == 2) {
            if (this.isLive && !this.isLevelUp) {
                this.isLive = false;
                this.handleEatAnimOfEnemy(otherCollider);
                this.die();
            }
        }
    }
    

    private handleEatAnimOfEnemy(otherCollider: Collider2D): void {
        let spine = otherCollider.node.getChildByName("Body").getChildByName("Spine_Fish").getComponent(sp.Skeleton);
        spine.setAnimation(0, "eat", false);
        spine.timeScale = 2;
        
        this.scheduleOnce(() => {
            spine.setAnimation(0, "idle", true);
        }, 0.5)
    }

    
    private die(): void {
        if (this.isLive && !Constants.isReplay) {
            return;
        }
        
        this.stop();
        this.TouchAreaController.stickPointUIOpacity.opacity = 0;
        this.scheduleOnce(() => {
            this.PlayerBody.active = false;
            this.Player_SpineDie.node.active = true;
        }, 0.01)
        Constants.isReplay = true;
        
        if (Constants.ironSource.SoundState) {
            this.AudioManager.playSound(Constants.SoundTrack.dieSound);
        }
        
        this.scheduleOnce(() => {
            this.getComponent(Animation).play("Player_DieAnim");
        }, 1);
    }


    private handleEatFishLv1(other: Collider2D): void {
        Constants.score += 5;
        if (other.getComponent(Enemy).isLive) {
            other.getComponent(Enemy).die();
        }
    }


    public move(): void {
        if (this.isMove && this.isLive) {
            this.targetPosition = this.TouchAreaController.positionTouch;
            const direction = this.targetPosition.subtract(this.node.position).normalize();

            let velocity: any;
            this.isLevelUp ? velocity = direction.multiplyScalar(this.speed) : velocity = direction.multiplyScalar(2.5)
            this.rigidBody.linearVelocity = velocity;
        }
    }


    public stop(): void {
        this.rigidBody.linearVelocity = new Vec2(0, 0)
    }


    private handleOffsetBoxCollide(): void {
        this.Player_fakeMount.setPosition(this.Player_Mouth.getPosition())
    }


    protected update(dt: number): void {
        if (Constants.isTouching) {
            this.Player_Level.string = String(Constants.score);
            this.TouchAreaController.HandleAnglePlayer(this.PlayerBody);
        }
        this.handleOffsetBoxCollide();
    }

}

