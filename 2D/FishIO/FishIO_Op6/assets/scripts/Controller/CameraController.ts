import { _decorator, clamp, Component, log, Node, Quat, UITransform, Vec2, Vec3 } from 'cc';
import { TouchAreaController } from './TouchAreaController';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property(Node)
    TouchArea: Node;
    @property(Node)
    player: Node;
    @property(Node)
    hideMask: Node;

    protected update(dt: number): void {
        const lerpRatio = 0.1; 
        const playerPos = this.player.getPosition();
        const currentCameraPos = this.node.position;

        const newPosition = new Vec3();
        Vec3.lerp(
            newPosition,
            currentCameraPos,
            new Vec3(playerPos.x, playerPos.y, 1000),
            lerpRatio);
        this.node.setPosition(newPosition);
    }

}

