import { _decorator, Animation, AudioSource, Camera, Component, log, math, Node, ParticleSystem, ParticleSystem2D, screen, UITransformComponent } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('GamePlay')
export class GamePlay extends Component {
    // Camera
    @property(Camera)
    Camera: Camera = null;

    // Node 2D
    @property(Node)
    background: Node = null;
    @property(Node)
    Text: Node = null;
    @property(Node)
    TabContainer: Node = null;
    @property(Node)
    ItemContainer: Node = null;
    @property(ParticleSystem)
    particle: ParticleSystem = null;

    // Array Doll
    @property([Node])
    Dolls: Node[] = [];
    @property([Node])
    FrameItemPicks: Node[] = [];
    @property([Node])
    Items: Node[] = [];

    // state
    isRotate: boolean = false;
    currentIndex: number = 0;

    // sound
    @property(AudioSource)
    bgSound: AudioSource = null;

    protected onLoad(): void {

    }

    protected start(): void {
        this.handleGamePlay();

        this.registerEvent();
    }

    private handleGamePlay(): void {
        this.ItemContainer.getComponent(Animation).play("ChooseClotheAnim");
        this.currentIndex++;

        this.schedule(() => {
            if(this.currentIndex >= 3) {
                this.currentIndex = 0;
            }
            // this.Dolls[this.currentIndex].getComponent(Animation).play("Fs_female_change_clothes");
            // this.Dolls[this.currentIndex].getComponent(Animation).play("Pose_B");

            this.Dolls.forEach(doll => {
                doll.active = false;
            });
            this.FrameItemPicks.forEach(frame => {
                frame.active = false;
            });
            this.Dolls[this.currentIndex].active = true;
            this.FrameItemPicks[this.currentIndex].active = true;
           this.particle.play();
            this.currentIndex++;
        }, 1);
    }

    private registerEvent(): void {
        // mtg & applovin
        this.background.on(Node.EventType.TOUCH_END, () => {
            console.log("install ");
            this.node.getComponent("GameController").installHandle();
            this.bgSound.stop();
        }, this);

        // this.Items.forEach(item => {
        //     console.log(item);
            
            // item.on(Node.EventType.TOUCH_END, () => {
            //     console.log("install ");
            //     this.node.getComponent("GameController").installHandle();
            //     this.bgSound.stop();
            // }, this);
        // })
    }

    private handleRotate(): void {
        if (screen.windowSize.width > screen.windowSize.height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }       

    private setHorizontal(): void {
        if(screen.windowSize.height / screen.windowSize.width < 0.65) {
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }               

    private setVertical(): void {
        if(screen.windowSize.width / screen.windowSize.height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.Text.setScale(new math.Vec3(0.3, 0.3, 0.3));
        this.ItemContainer.setScale(new math.Vec3(0.65, 0.65, 0.65));
        this.TabContainer.setScale(new math.Vec3(0.65, 0.65, 0.65));

        this.Text.setPosition(new math.Vec3(0, 200, 0));
        this.TabContainer.setPosition(new math.Vec3(0, -65, 0));
        this.ItemContainer.setPosition(new math.Vec3(0, -70, 0));
    }

    private setMobile(): void {
        if(screen.windowSize.height / screen.windowSize.width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.Text.setScale(new math.Vec3(0.3, 0.3, 0.3));
            this.ItemContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
            this.TabContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
    
            this.Text.setPosition(new math.Vec3(0, 200, 0));
            this.TabContainer.setPosition(new math.Vec3(0, -40, 0));
            this.ItemContainer.setPosition(new math.Vec3(0, -45, 0));
        } else {
            this.Text.setScale(new math.Vec3(0.3, 0.3, 0.3));
            this.ItemContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
            this.TabContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
    
            this.Text.setPosition(new math.Vec3(0, 200, 0));
            this.TabContainer.setPosition(new math.Vec3(0, -40, 0));
            this.ItemContainer.setPosition(new math.Vec3(0, -45, 0));
        }
    }

    private setHorizontalForIpX(): void {
        if(screen.windowSize.height / screen.windowSize.width >= 0.6 
        && screen.windowSize.height / screen.windowSize.width < 6.5) {
            this.Text.setPosition(new math.Vec3(0, 200, 0));
            this.TabContainer.setPosition(new math.Vec3(0, -40, 0));
            this.ItemContainer.setPosition(new math.Vec3(0, -45, 0));

            this.Text.setScale(new math.Vec3(0.45, 0.45, 0.45));
            this.TabContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
            this.ItemContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
        } else {
            this.Text.setPosition(new math.Vec3(0, 200, 0));
            this.TabContainer.setPosition(new math.Vec3(0, -40, 0));
            this.ItemContainer.setPosition(new math.Vec3(0, -45, 0));

            this.Text.setScale(new math.Vec3(0.45, 0.45, 0.45));
            this.TabContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
            this.ItemContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
        }
    }

    private setHorizontalForTablet(): void {
        this.Text.setScale(new math.Vec3(0.45, 0.45, 0.45));
        this.TabContainer.setScale(new math.Vec3(0.8, 0.8, 0.8));
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
