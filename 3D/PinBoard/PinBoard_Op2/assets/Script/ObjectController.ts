
import { _decorator, Component, Node, ICollisionEvent, RigidBody, BoxCollider, CapsuleCollider, MeshCollider } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('ObjectController')
export class ObjectController extends Component {

    rigidbody: RigidBody = null;
    collider: BoxCollider = null;
    isTouch: boolean = false;


    protected onLoad(): void {
        
    }


    protected start(): void {

        // this.rigidbody = this.node.getComponent(RigidBody);
        // this.collider = this.node.getComponent(BoxCollider);

        // this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
        //     if (e.otherCollider.node.name === "Plane") {
        //        console.log("Check");
        //     //    this.isTouch = true;
        //     }
        //    });
    }


    protected update(dt: number): void {
        
    }
}
