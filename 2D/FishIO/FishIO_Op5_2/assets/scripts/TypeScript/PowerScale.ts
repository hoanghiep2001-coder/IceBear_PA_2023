import Enemy from "./Enemy";
import PowerController from "./PowerController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(PowerController)
    PowerController: PowerController = null;

    protected start(): void {

    }

    protected onCollisionEnter(other: cc.PhysicsCollider, self: cc.PhysicsCollider) {
        if (other.tag == 1) {
            if(this.PowerController.isTransforming && this.PowerController.isLevel2) {
                other.node.getComponent(Enemy).die();
            }
        }

        if (other.tag == 3) {
            if(this.PowerController.isTransforming && this.PowerController.isLevel3) {
                other.node.getComponent(Enemy).die();
            }
        }
    }
}
