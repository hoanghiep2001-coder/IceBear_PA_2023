import { _decorator, Animation, AudioSource, Camera, Component, log, math, Node, PhysicsSystem, quat, RigidBody, SkeletalAnimation, Skeleton } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('GamePlay')
export class GamePlay extends Component {
    // Camera
    @property(Camera)
    Camera: Camera = null;


    // Node 3D
    @property(Node)
    skibidi: Node = null;
    @property(Node)
    line_white: Node = null;   
    @property(Node)
    dino_Rap: Node = null; 
    @property(Component)
    Character: Component;
    @property(Node)
    text: Node = null;
    @property(Node)
    hand: Node = null;


    // array
    @property([Node])
    rangersBaby: Node[] = [];
    @property([Node])
    dinoBabyMerge: Node[] = [];
    @property([Component])          
    dinoComponent: Component[] = [];
    @property([Node])
    redLines: Node[] = [];


    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    Spine_Blast: Node = null;
    @property(Node)
    Spine_Blast2: Node = null;
    @property(Node)
    Spine_Blast3: Node = null;


    // state
    isRotate: boolean = false;
    currentIndex: number = 0;
    isMerged: boolean = false;
    isFighting: boolean = false;
    babiesPos: object[] = [
        {
        x: 0,
        y: 0,
        z: 0   
    },
    {
        x: 0,
        y: 0,
        z: 0
    },
    {
        x: 0,           
        y: 0,
        z: 0   
    },
    {
        x: 0,
        y: 0,
        z: 0
    },
    {
        x: 0,
        y: 0,
        z: 0
    },
    ];


    // sound
    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    attackSound: AudioSource = null;
    @property(AudioSource)
    blastSound: AudioSource = null;
    @property(AudioSource)
    mergeSound: AudioSource = null;
    @property(AudioSource)
    loseSound: AudioSource = null;


    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;
        this.text.active = false;
    }


    protected start(): void {
        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.node.getComponent(Animation).play("UIAnim");
        }, 0.5);

        this.scheduleOnce(() => {
            this.dinoBabyMerge.forEach((baby, index) => {
                baby.active = false;
            });
        }, 2.7);

        this.scheduleOnce(() => {
            if(this.isMerged) return;

            this.dinoBabyMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.node.getComponent(Animation).play("UIAnim");
        }, 3.6);

        this.scheduleOnce(() => {
            if(this.isMerged) return;
            this.dinoBabyMerge.forEach((baby, index) => {
                baby.active = false;
            });
        }, 5.6);

        this.scheduleOnce(() => {
            if(this.isMerged) return;
            this.dinoBabyMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.dino_Rap.active = false;
            this.text.active = true;
            this.text.getComponent(Animation).play("Blink");

            this.node.getComponent(Animation).play("UI_HintLoopAnim");
        }, 6.6);

        this.skibidi.getComponent(SkeletalAnimation).play("idle");
        this.dino_Rap.getComponent(SkeletalAnimation).play("idle");
        this.rangersBaby.forEach(ranger => {
            ranger.getComponent(Animation).play("Idle");     
        });
    }


    private handleFight(): void {
        if (this.isFighting) return;

        this.attackSound.play();
        this.attackSound.loop = true;   

        this.isFighting = true;
        this.skibidi.getComponent(SkeletalAnimation).play("atk");
        this.dino_Rap.getComponent(SkeletalAnimation).play("atk");

        this.scheduleOnce(() => {
            this.Spine_Blast2.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.blastSound.play();
        }, 0.7)

        this.scheduleOnce(() => {
            this.Spine_Blast.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.blastSound.play();
        }, 0.5);

        this.scheduleOnce(() => {
            this.Spine_Blast3.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.blastSound.play();
        }, 0.9)

        this.scheduleOnce(() => {
            this.skibidi.getComponent(SkeletalAnimation).play("idle");
            this.dino_Rap.getComponent(SkeletalAnimation).play("die");
            this.attackSound.stop();
        }, 2);

        this.scheduleOnce(() => {
            this.dino_Rap.getComponent(SkeletalAnimation).stop();
            this.dino_Rap.active = false;
            this.skibidi.getComponent(SkeletalAnimation).play("idle");
            this.handleEndGame();
            this.loseSound.play();
        }, 3);
    }


    private registerEvent(): void {
            this.canvas2D.on(Node.EventType.TOUCH_END, () => {
                console.log("install");
                this.bgSound.stop();
                this.node.getComponent("GameController").installHandle();
            });
    }


    private handleEndGame(): void {
        this.rangersBaby.forEach((baby, index) => {
            baby.active = true;
            baby.getComponent(SkeletalAnimation).play("Idle");

            if(index >= 8) {
                baby.setPosition(new math.Vec3(this.babiesPos[index - 8].x, this.babiesPos[index - 8].y, this.babiesPos[index - 8].z));
                baby.setRotationFromEuler(new math.Vec3(0,0,0))
            }
        });

        this.line_white.active = true;
        this.node.getComponent(Animation).play("EndAnim");
        this.canvas2D.on(Node.EventType.TOUCH_START, () => {
            console.log("install");
            this.bgSound.stop();
            this.node.getComponent("GameController").installHandle();
        });
    }


    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }


    private setHorizontal(): void {
        this.text.setPosition(new math.Vec3(0, -10.505, 12.8));
        this.text.setScale(new math.Vec3(3.5, 0.8, 0.33));

        this.Spine_Blast.setScale(new math.Vec3(0.25, 0.25, 0.25));
        this.Spine_Blast.setPosition(new math.Vec3(0, 25, 0));

        this.Spine_Blast2.setPosition(new math.Vec3(-10, 15, 0));
        this.Spine_Blast2.setScale(new math.Vec3(0.15, 0.15, 0.15));

        this.Spine_Blast3.setPosition(new math.Vec3(10, 15, 0));
        this.Spine_Blast3.setScale(new math.Vec3(0.15, 0.15, 0.15));
        this.Camera.fov = 50;   
    }

    
    private setVertical(): void {
        this.text.setPosition(new math.Vec3(0, -11.605, 13.392));
        this.text.setScale(new math.Vec3(2.5, 0.4, 0.33));

        this.Spine_Blast.setPosition(new math.Vec3(0, 75, 0));
        this.Spine_Blast.setScale(new math.Vec3(0.6, 0.6, 0.6));

        this.Spine_Blast2.setPosition(new math.Vec3(-30, 65, 0));
        this.Spine_Blast2.setScale(new math.Vec3(0.45, 0.45, 0.45));

        this.Spine_Blast3.setPosition(new math.Vec3(20, 65, 0));
        this.Spine_Blast3.setScale(new math.Vec3(0.45, 0.45, 0.45));

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            // Iphone X
            this.Camera.fov = 64;
        } else {
            // Other Mobile
            this.Camera.fov = 58;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();

        if (this.Character.isFight && !this.isFighting) this.handleFight();
    }
}
