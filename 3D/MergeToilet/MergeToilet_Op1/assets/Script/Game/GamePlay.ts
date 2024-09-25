import { _decorator, Animation, AudioSource, Camera, Component, log, math, Node, PhysicsSystem, quat, RigidBody, SkeletalAnimation, Skeleton } from 'cc';
import { Constants } from '../Data/constants';
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
    rangerAdult: Node = null;
    @property(Component)
    Character: Component;
    @property(Node)
    text: Node = null;
    @property(Node)
    tryAgain: Node = null;
    @property(Node)
    hand: Node = null;

    // array
    @property([Node])
    rangersBaby: Node[] = [];
    @property([Node])
    rangersBabyMerge: Node[] = [];
    @property([Component])          
    rangersComponent: Component[] = [];
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
        x: -0.011,
        y: 0.038,
        z: -0.096   
    },
    {
        x: -0.022,
        y: 0.038,
        z:-0.112
    },
    {
        x: -0.022,           
        y: 0.038,
        z: -0.096   
    },
    {
        x: -0.011,
        y: 0.038,
        z: -0.128
    },
    {
        x: -0.022,
        y: 0.038,
        z: -0.128
    },
    ]

    // sound
    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    attackSound: AudioSource = null;
    @property(AudioSource)
    blastSound: AudioSource = null;

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;
        this.text.active = false;
        this.tryAgain.active = false;
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
            this.rangersBabyMerge.forEach((baby, index) => {
                baby.active = false;
            });
        }, 2.5);

        this.scheduleOnce(() => {
            if(this.isMerged) return;

            this.rangersBabyMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.node.getComponent(Animation).play("UIAnim"); 
        }, 3.4);

        this.scheduleOnce(() => {
            if(this.isMerged) return;
            this.rangersBabyMerge.forEach((baby, index) => {
                baby.active = false;
            });
        }, 5.4);

        this.scheduleOnce(() => {
            if(this.isMerged) return;
            this.rangersBabyMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.rangerAdult.active = false;
            this.text.active = true;
            this.text.getComponent(Animation).play("Blink");

            this.node.getComponent(Animation).play("UI_HintLoopAnim");
        }, 6.4);

        this.skibidi.getComponent(SkeletalAnimation).play("skibidi_07_idle");
        this.rangerAdult.getComponent(SkeletalAnimation).play("skidibi_02_idle");
        this.rangersBaby.forEach(ranger => {
            ranger.getComponent(Animation).play("skidibi_02_idle");     
        });
    }


    private handleFight(): void {
        if (this.isFighting) return;

        if(Constants.ironSource.SoundState) {
            this.attackSound.play();
            this.attackSound.loop = true;   
        }

        this.isFighting = true;
        this.skibidi.getComponent(SkeletalAnimation).play("skibidi_07_atk");
        this.rangerAdult.getComponent(SkeletalAnimation).play("skidibi_02_atk");

        this.scheduleOnce(() => {
            this.Spine_Blast2.getComponent("sp.Skeleton").setAnimation(0, "2", false);

            if(Constants.ironSource.SoundState) {
                this.blastSound.play();
            }

        }, 0.7)

        this.scheduleOnce(() => {
            this.Spine_Blast.getComponent("sp.Skeleton").setAnimation(0, "2", false);

            if(Constants.ironSource.SoundState) {
                this.blastSound.play();
            }

        }, 0.5);

        this.scheduleOnce(() => {
            this.Spine_Blast3.getComponent("sp.Skeleton").setAnimation(0, "2", false);

            if(Constants.ironSource.SoundState) {
                this.blastSound.play();
            }

        }, 0.9)

        this.scheduleOnce(() => {
            this.skibidi.getComponent(SkeletalAnimation).play("skibidi_07_dance");
            this.rangerAdult.getComponent(SkeletalAnimation).play("skidibi_02_dead");
        }, 2);

        this.scheduleOnce(() => {
            if(Constants.ironSource.SoundState) {
                this.attackSound.stop();
            }
            this.rangerAdult.getComponent(SkeletalAnimation).stop();
            this.rangerAdult.active = false;
            this.skibidi.getComponent(SkeletalAnimation).play("skibidi_07_idle");
            this.handleEndGame();
        }, 3);
    }


    private registerEvent(): void {
            this.canvas2D.on(Node.EventType.TOUCH_END, () => {
                if(this.isMerged) {
                    this.text.active = false;
                    this.line_white.active = false;
                    this.Character.isRun = true;
                    this.rangersComponent.forEach(component => {
                        component.isRun = true;
                    });
                    
                    this.canvas2D.off(Node.EventType.TOUCH_END);
                    return;
                }   

                // ironsource 
                this.handleIronSourcePlaySound();

                this.isMerged = true;
                this.node.getComponent(Animation).stop();
                this.rangerAdult.active = true;     
                this.redLines.forEach(line => {
                    line.active = false;
                });
                this.hand.active = false;
                this.node.getComponent(Animation).play("UI_MergeAnim");
                this.scheduleOnce(() => {
                    this.rangersBabyMerge.forEach(ranger => {
                        ranger.active = false;  
                    });     
                }, 0.2);

                this.scheduleOnce(() => {
                    this.text.active = true;
                    this.text.getComponent(Animation).play("Blink");
                   
                }, 1);
                // this.canvas2D.off(Node.EventType.TOUCH_END);
            });
    }


    private handleEndGame(): void {
        this.rangersBaby.forEach((baby, index) => {
            baby.active = true;
            baby.getComponent(SkeletalAnimation).play("skidibi_02_idle");

            this.tryAgain.active = true;
            this.tryAgain.getComponent(Animation).play("Blink");

            if(index >= 8) {
                baby.setPosition(new math.Vec3(this.babiesPos[index - 8].x, this.babiesPos[index - 8].y, this.babiesPos[index - 8].z));
            }
        });

        this.line_white.active = true;
        this.node.getComponent(Animation).play("EndAnim");
        this.canvas2D.on(Node.EventType.TOUCH_START, () => {
            console.log("install");

            if(Constants.ironSource.SoundState) {
                this.bgSound.stop();
            }

            Constants.ironSource.isEndGame = true;
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

        this.tryAgain.setPosition(new math.Vec3(0, -10.505, 12.8));
        this.tryAgain.setScale(new math.Vec3(3.5, 0.8, 0.33));

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

        this.tryAgain.setPosition(new math.Vec3(0, -11.605, 13.392));
        this.tryAgain.setScale(new math.Vec3(2.5, 0.4, 0.33));

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


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            this.bgSound.play();
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                this.bgSound.play();
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                this.bgSound.stop();
                this.blastSound.stop();
                this.attackSound.stop();
            }
        }
    }


    protected update(dt: number): void {
        this.handleRotate();

        if (this.Character.isFight && !this.isFighting) this.handleFight();

        // ironsource
        this.handleMuteSoundIronSource();
    }
}
