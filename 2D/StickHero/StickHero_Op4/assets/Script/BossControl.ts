
import { _decorator, Component, Node, ERigidBodyType, sp, BoxCollider, RigidBody, ICollisionEvent, math, SkeletalAnimation } from 'cc';
import { CharacterControls } from './CharacterControl';
import { GamePlay } from './GamePlay';
const { ccclass, property } = _decorator;
 
@ccclass('BossControl')
export class BossControl extends Component {

    @property([sp.Skeleton])
    spineBlasts: sp.Skeleton[] = [];
    @property(GamePlay)
    GamePlay: GamePlay;

    isRun: boolean = false;     
    rigidbody: RigidBody;
    collider: BoxCollider;
    isWatchFirstTime: boolean = false;


    protected onLoad(): void {
        this.spineBlasts.forEach(spine => {
            spine.node.active = false;
        })
    }

    protected start(): void {
        
        this.getComponent(SkeletalAnimation).play("Skibidi_idle");

        this.scheduleOnce(() => {
            this.isWatchFirstTime = true;

            this.spineBlasts[0].node.active = true;
            this.spineBlasts[3].node.active = true;
            this.GamePlay.blastSound.play();

            this.scheduleOnce(() => {
                this.spineBlasts[1].node.active = true;
                this.spineBlasts[4].node.active = true;
            
                this.GamePlay.blastSound.play();
            }, 0.3)

            this.scheduleOnce(() => {                
                this.spineBlasts[2].node.active = true;
                this.spineBlasts[5].node.active = true;
                this.GamePlay.blastSound.play();
            }, 0.6)
        }, 5.5);
    }

    protected update(dt: number): void {
        // if (this.isRun) this.Run()
    }
}

