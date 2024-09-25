import { _decorator, Animation, AudioSource, Camera, Component, log, math, Node, SkeletalAnimation, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {

    // camera 3D
    @property(Camera)
    camera: Camera = null;

    // 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    text_Choose: Node = null;
    @property(Node)
    text_Tap: Node = null;
    @property(Node)
    hand: Node = null;

    // array
    @property([Node])
    cats3D: Node[] = [];

    // state
    currentCat: number = null;
    isRotate: boolean = false;

    protected onLoad(): void {
        this.cats3D.forEach(cat => {
            cat.active = false;
        });
        this.cats3D[0].active = true;
    }

    // sounds
    @property(AudioSource)
    bgSound: AudioSource = null;

    protected start(): void {
        this.cats3D[0].getComponent(SkeletalAnimation).play("Cats_Runcycle");
        this.hand.getComponent(Animation).play("HandAnim");
        this.registerEvent();

        this.schedule(() => {
            this.randomCat();
        }, 1);
    }

    private randomCat(): void {
        this.cats3D.forEach(cat => {
            cat.active = false;
        });

        let random = Math.floor(Math.random() * this.cats3D.length);
        if (this.currentCat == random) {
            random - 1;
        }

        if (random <= 0) {
            random = 1;
        }

        this.currentCat = random;
        let activeCat = this.cats3D[random];
        activeCat.active = true;
        activeCat.getComponent(SkeletalAnimation).stop();
        activeCat.getComponent(SkeletalAnimation).play("Cats_Runcycle");
    }

    private setupCamera(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.camera.fov = 30;
            this.camera.node.setPosition(new math.Vec3(1, 8.5, -29));
        } else {
            this.isRotate = false;
            this.camera.fov = 40;
            this.camera.node.setPosition(new math.Vec3(1, 8.3, -42.5));
        }
    }

    private setRotate(): void {
        if (this.isRotate) {
            this.setHorizontal();
        } else {
            this.setVertical();
        }
    }

    // vertical
    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.text_Choose.setScale(0.2, 0.2, 1);
        this.text_Tap.setScale(0.2, 0.2, 1);
    }

    private setMobile(): void {
        this.text_Choose.setScale(0.3, 0.3, 1);
        this.text_Tap.setScale(0.3, 0.3, 1);
    }

    // horizontal
    private setHorizontal(): void {
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        this.text_Choose.setScale(0.35, 0.35, 1);
        this.text_Tap.setScale(0.35, 0.35, 1);
    }

    private setHorizontalForTablet(): void {
        this.text_Choose.setScale(0.4, 0.4, 1);
        this.text_Tap.setScale(0.4, 0.4, 1);
    }

    private registerEvent(): void {
        this.canvas2D.on(Node.EventType.TOUCH_START, () => {
            log("install");
            this.bgSound.stop();
            this.node.getComponent("GameController").installHandle();
        })
    }

    protected update(dt: number): void {
        this.setupCamera();
        this.setRotate();
    }

}
