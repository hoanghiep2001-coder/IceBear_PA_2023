
import { _decorator, BoxCollider, Component, ERigidBodyType, ICollisionEvent, math, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterControl')
export class CharacterControl extends Component {
    isRun: boolean = false;
    isFight: boolean = false;
    rigidbody: RigidBody;
    collider: BoxCollider;
    
   protected start(): void {
       this.rigidbody = this.node.getComponent(RigidBody);
        this.collider = this.node.getComponent(BoxCollider)

       this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
        if (e.otherCollider.node.name === "Ranger07") {
            this.isRun = false;     
            this.isFight = true;
        }
       });
   }

   private Run(): void {
        this.rigidbody.type = ERigidBodyType.DYNAMIC;
        this.rigidbody.setLinearVelocity(new math.Vec3(-0.011, 0, -10))
   }

  protected update(dt: number): void {
      if(this.isRun) this.Run() 
  }
}

