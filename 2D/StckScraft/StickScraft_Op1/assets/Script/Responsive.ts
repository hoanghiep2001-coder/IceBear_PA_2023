
import { _decorator, Camera, Component, math, Node, Vec3, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Responsive')
export class Responsive extends Component {


    protected start(): void {

    }

    protected onLoad(): void {

    }

    private handleRotate(): void {
        // if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
        //     // this.camera.fov = 32;
        //     this.isRotate = true;
        //     this.setHorizontal();
        // } else {
        //     // this.camera.fov = 45;
        //     this.isRotate = false;
        //     this.setVertical();
        // }
    }

    private setHorizontal(): void {
    }

    private setVertical(): void {

        // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
        //     // Iphone X

        // } else {
        //     // Other Mobile

        // }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}