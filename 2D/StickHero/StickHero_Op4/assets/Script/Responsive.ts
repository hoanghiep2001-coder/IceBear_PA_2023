
import { _decorator, Camera, Component, math, Node, Vec3, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Responsive')
export class Responsive extends Component {
    @property(Camera)
    camera: Camera = null;

    @property(Node)
    bg2D: Node = null;
    @property(Node)
    logo: Node = null;
    @property(Node)
    tryAgain: Node = null;
    @property(Node)
    playNow: Node = null;
    @property(Node)
    hint: Node = null;

    @property([sp.Skeleton])
    spineBlasts: sp.Skeleton[] = [];

    protected start(): void {

    }

    protected onLoad(): void {

    }

    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.camera.fov = 32;
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.camera.fov = 45;
            this.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {
        this.bg2D.setScale(new math.Vec3(0.2, 0.25, 1));
        this.logo.setScale(new math.Vec3(0.28, 0.28, 1));
        this.tryAgain.setScale(new math.Vec3(0.2 ,0.2, 1));
        this.playNow.setScale(new math.Vec3(0.2 ,0.2, 1));
        this.hint.setScale(new math.Vec3(0.2, 0.2, 1));

        this.spineBlasts.forEach(spine => {
            spine.node.setScale(new math.Vec3(0.1, 0.1, 1))
        });

        this.logo.setPosition(new math.Vec3(0 , 40, 0))
        this.tryAgain.setPosition(new math.Vec3(0, -50, 0))
        this.playNow.setPosition(new math.Vec3(0, -50, 0))
        this.hint.setPosition(new math.Vec3(0, -50, 0))

        this.spineBlasts[0].node.setPosition(new math.Vec3(-42, 15, 0));
        this.spineBlasts[1].node.setPosition(new math.Vec3(-42, -15, 0));
        this.spineBlasts[2].node.setPosition(new math.Vec3(-42, -55, 0));

        this.spineBlasts[3].node.setPosition(new math.Vec3(42, 15, 0));
        this.spineBlasts[4].node.setPosition(new math.Vec3(42, -15, 0));
        this.spineBlasts[5].node.setPosition(new math.Vec3(42, -55, 0));

        this.spineBlasts[6].node.setPosition(new math.Vec3(0, 15, 0));
        this.spineBlasts[7].node.setPosition(new math.Vec3(0, -15, 0));
        this.spineBlasts[8].node.setPosition(new math.Vec3(0, -55, 0));
    }

    private setVertical(): void {

        this.spineBlasts[0].node.setPosition(new math.Vec3(-72, 15, 0));
        this.spineBlasts[1].node.setPosition(new math.Vec3(-72, -25, 0));
        this.spineBlasts[2].node.setPosition(new math.Vec3(-72, -65, 0));

        this.spineBlasts[3].node.setPosition(new math.Vec3(72, 15, 0));
        this.spineBlasts[4].node.setPosition(new math.Vec3(72, -25, 0));
        this.spineBlasts[5].node.setPosition(new math.Vec3(72, -65, 0));

        this.spineBlasts[6].node.setPosition(new math.Vec3(0, 15, 0));
        this.spineBlasts[7].node.setPosition(new math.Vec3(0, -25, 0));
        this.spineBlasts[8].node.setPosition(new math.Vec3(0, -65, 0));

        this.hint.setPosition(new math.Vec3(0, -196, 0))

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            // Iphone X
            this.bg2D.setScale(new math.Vec3(0.35, 0.4, 1))
            this.hint.setScale(new math.Vec3(0.4, 0.4, 1))

            this.logo.setScale(new math.Vec3(0.6, 0.6, 1))
            this.tryAgain.setScale(new math.Vec3(0.5, 0.5, 1))
            this.playNow.setScale(new math.Vec3(0.5, 0.5, 1))

            this.spineBlasts.forEach(spine => {
                spine.node.setScale(new math.Vec3(0.3, 0.3, 1))
            });

            this.logo.setPosition(new math.Vec3(0 ,123, 0))
            this.tryAgain.setPosition(new math.Vec3(0, -190, 0))
            this.playNow.setPosition(new math.Vec3(0, -190, 0))
        } else {
            // Other Mobile
            this.bg2D.setScale(new math.Vec3(0.25, 0.3, 1))
            this.hint.setScale(new math.Vec3(0.5, 0.5, 1))

            this.logo.setScale(new math.Vec3(0.6, 0.6, 1))
            this.tryAgain.setScale(new math.Vec3(0.5, 0.5, 1))
            this.playNow.setScale(new math.Vec3(0.5, 0.5, 1))

            this.spineBlasts.forEach(spine => {
                spine.node.setScale(new math.Vec3(0.35, 0.35, 1))
            })

            this.logo.setPosition(new math.Vec3(0 ,123, 0))
            this.tryAgain.setPosition(new math.Vec3(0, -168, 0))
            this.playNow.setPosition(new math.Vec3(0, -168, 0))
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}