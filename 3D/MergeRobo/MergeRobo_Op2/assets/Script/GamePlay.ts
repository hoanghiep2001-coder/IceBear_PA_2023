import { _decorator, Animation, AudioSource, Camera, view, Vec2, Component, EventTouch, Graphics, log, math, Node, PhysicsSystem, quat, RigidBody, SkeletalAnimation, Skeleton, Vec3, UITransform, ParticleSystem } from 'cc';
import { CharacterControl } from './CharacterControl';
import { RangerControl } from './RangerControl';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { JoyStick } from './JoyStick';
const { ccclass, property } = _decorator;
@ccclass('GamePlay')
export class GamePlay extends Component {
    // Camera
    @property(Camera)
    Camera: Camera = null;

    // component
    @property(GameController)
    GameController: GameController;
    @property(AudioManager)
    AudioManager: AudioManager;
    @property(CharacterControl)
    CharacterControl: CharacterControl;
    @property(JoyStick)
    JoyStick: JoyStick = null;
    @property(Graphics)
    Graphics: Graphics = null;
    @property(Node)
    Point: Node = null;
    @property(Node)
    HideMask: Node = null;


    // FX
    @property(ParticleSystem)
    FX_FireBall: ParticleSystem = null;
    @property(ParticleSystem)
    FX_Explosion: ParticleSystem = null;
    @property(ParticleSystem)
    FX_Merge: ParticleSystem = null;

    // Node 3D
    @property(Node)
    Boss: Node = null;
    @property(Node)
    line_white: Node = null;
    @property(Node)
    MergeUnit: Node = null;
    @property(Node)
    text: Node = null;
    @property(Node)
    text_90Per: Node = null;
    @property(Node)
    hand: Node = null;


    // array
    @property([Node])
    ParentSmallUnit: Node[] = [];
    @property([Node])
    SmallUnit: Node[] = [];
    @property([Node])
    SmallUnitMerge: Node[] = [];
    @property([RangerControl])
    RangerControls: RangerControl[] = [];
    @property([Node])
    redLines: Node[] = [];
    @property([Node])
    PointRobos: Node[] = [];
    @property([Node])
    Lines: Node[] = [];

    // Node 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    Spine_Blast: Node = null;
    @property(Node)
    Spine_Blast2: Node = null;
    @property(Node)
    Spine_Blast3: Node = null;
    @property(Node)
    TryAgain: Node = null;


    // state
    currentPos: Vec3 = null;
    initPos: Vec3 = null;

    currentIndex: number = 0;

    isTouch: boolean = false;
    isRotate: boolean = false;
    isMerged: boolean = false;
    isPlayed: boolean = false;
    isFighting: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneMerge: boolean[] = [false, false, false, false, false, false, false, false];

    RoboStates: object[] = [
        {
            x: -2.2,
            y: -15.5,
            z: 9.2,
        },
        {
            x: -2.2,
            y: -15.5,
            z: 10.8,
        },
        {
            x: -1.1,
            y: -15.5,
            z: 10.8,
        },
        {
            x: 0,
            y: -15.5,
            z: 9.2,
        },
        {
            x: 0,
            y: -15.5,
            z: 10.8,
        },
        {
            x: 0,
            y: -15.5,
            z:7.6,
        },
        {
            x: -1.1,
            y: -15.5,
            z: 7.6,
        },
        {
            x: -2.2,
            y: -15.5,
            z: 7.6,
        },
    ]

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;


    protected onLoad(): void {
        PhysicsSystem.instance.enable = true;
        this.text.active = false;
        this.Lines.forEach(line => line.active = false);
        this.TryAgain.active = false;
    }


    protected start(): void {
        // this.AudioManager.bgSound.play();
        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.node.getComponent(Animation).play("UIAnim");
        }, 0.5);

        this.scheduleOnce(() => {
            if (this.isPlayed) return;

            this.SmallUnitMerge.forEach((baby, index) => {
                baby.active = false;
            });

        }, 2.5);

        this.scheduleOnce(() => {
            if (this.isPlayed) return;

            this.SmallUnitMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.node.getComponent(Animation).play("UIAnim");
        }, 3.6);

        this.scheduleOnce(() => {
            if (this.isPlayed) return;
            this.SmallUnitMerge.forEach((baby, index) => {
                baby.active = false;
            });
        }, 5.6);

        this.scheduleOnce(() => {
            if (this.isPlayed) return;
            this.SmallUnitMerge.forEach((baby, index) => {
                baby.active = true;
            });
            this.MergeUnit.active = false;
            // this.text.active = true;
            // this.text.getComponent(Animation).play("Blink");

            this.node.getComponent(Animation).play("UI_HintLoopAnim");
        }, 6.6);

        this.Boss.getComponent(SkeletalAnimation).play("dancing");
        this.MergeUnit.getComponent(SkeletalAnimation).play("dancing");
        this.SmallUnit.forEach(ranger => {
            ranger.getComponent(Animation).play("idle");
        });
    }


    private handleFight(): void {
        if (this.isFighting) return;

        this.HideMask.off(Node.EventType.TOUCH_START);
        this.AudioManager.attackSound.play();
        this.AudioManager.attackSound.loop = true;

        this.isFighting = true;
        this.Boss.getComponent(SkeletalAnimation).play("atk");
        this.MergeUnit.getComponent(SkeletalAnimation).play("atk");

        this.scheduleOnce(() => {
            this.Spine_Blast2.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.AudioManager.blastSound.play();
        }, 0.7)

        this.scheduleOnce(() => {
            this.Spine_Blast.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.AudioManager.blastSound.play();
        }, 0.5);

        this.scheduleOnce(() => {
            this.Spine_Blast3.getComponent("sp.Skeleton").setAnimation(0, "2", false);
            this.AudioManager.blastSound.play();
        }, 0.9)

        this.scheduleOnce(() => {
            this.Boss.getComponent(SkeletalAnimation).play("dancing");
            this.MergeUnit.getComponent(SkeletalAnimation).play("die");
            this.AudioManager.attackSound.stop();
        }, 2);

        this.scheduleOnce(() => {
            this.MergeUnit.getComponent(SkeletalAnimation).stop();
            // this.MergeUnit.active = false;
            this.Boss.getComponent(SkeletalAnimation).play("dancing");
            this.handleEndGame();
            this.AudioManager.loseSound.play();
        }, 3);
    }


    private registerEvent(): void {
        this.HideMask.on(Node.EventType.TOUCH_START, this.onHideMaskTouchStart, this);
        this.HideMask.on(Node.EventType.TOUCH_MOVE, this.onHideMaskTouchMove, this);
        this.HideMask.on(Node.EventType.TOUCH_END, this.onHideMaskTouchEnd, this);
        this.HideMask.on(Node.EventType.TOUCH_CANCEL, this.onHideMaskTouchEnd, this);
    }


    private handleIronSource():void {
        if(this.isPlayBgSound) {
                return
        }

        this.isPlayBgSound = true;
        this.AudioManager.bgSound.play();
    }


    private onHideMaskTouchStart(): void {
        this.isPlayed = true;
        this.isTouch = true;

        if (!this.isMerged) {
            this.node.getComponent(Animation).play("UIAnim");
            this.node.getComponent(Animation).stop();
            this.ParentSmallUnit.forEach((unit,index) => {
                unit.setPosition(new math.Vec3(this.RoboStates[index].x, this.RoboStates[index].y, this.RoboStates[index].z));
                unit.setScale(new math.Vec3(8, 8, 8));
            })
            this.redLines.forEach(line => line.active = false);
            this.hand.active = false;
            this.SmallUnitMerge.forEach(unit => {
                unit.active = true;
                unit.setScale(new math.Vec3(5, 5, 5));
                unit.setPosition(new math.Vec3(0, 0, 0));
                this.MergeUnit.active = false;
            });
        }

        this.handleIronSource();
    }


    private onHideMaskTouchMove(e: EventTouch): void {
        this.JoyStick.stickMove(e, this.Point)
        // this.currentPos = this.JoyStick.pos;
        this.initPos = new Vec3(this.currentPos.x - 1, this.currentPos.y, 0);
        // this.Point.setPosition(this.currentPos);
        this.handleCheckCollideRoboPoint();
    }


    private onHideMaskTouchEnd(): void {
        this.isTouch = false;

        let result = this.isDoneMerge.find((status) => {
            return status === false;
        });

        if (String(result) === "false") {
            this.mergeFail();
        } else {
            this.mergeSuccess();
        }

    }

    // private handleDrawLine(): void {
    //     this.Graphics.moveTo(this.initPos.x, this.initPos.y);
    //     this.Graphics.lineTo(this.currentPos.x, this.currentPos.y);

    //     this.Graphics.close();
    //     this.Graphics.stroke();
    //     this.Graphics.fill();
    // }


    private handleCheckCollideRoboPoint(): void {
        this.PointRobos.forEach((point, index) => {
            if (point.getComponent(UITransform).getBoundingBox().intersects(this.Point.getComponent(UITransform).getBoundingBox())) {
                this.handleCancelCallBack(index);
            }
        })
    }


    private handleCancelCallBack(index: number): void {
        if (this.isDoneMerge[index]) {
            return;
        }

        this.isDoneMerge[index] = true;
        this.Lines[index].active = true;
        this.SmallUnitMerge[index].getComponent(SkeletalAnimation).play("dancing");
    }


    private mergeSuccess(): void {
        if (this.isMerged) {
            this.text.active = false;
            this.line_white.active = false;
            this.CharacterControl.isRun = true;
            this.RangerControls.forEach(component => {
                component.isRun = true;
            });

            // this.HideMask.off(Node.EventType.TOUCH_START);
            this.HideMask.off(Node.EventType.TOUCH_MOVE);
            return;
        }

        this.Camera.getComponent(Animation).play("CameraAnim");
        this.Lines.forEach(line => line.active = false);
        this.text_90Per.active = false;

        this.scheduleOnce(() => {
            this.FX_Merge.play();
            this.FX_Merge.loop = true;
        }, 1);

        this.scheduleOnce(() => {
            this.isMerged = true;
            this.node.getComponent(Animation).stop();
            this.MergeUnit.active = true;
            this.hand.active = false;
            this.node.getComponent(Animation).play("UI_MergeAnim");
            this.scheduleOnce(() => {
                this.FX_Merge.loop = false;
                this.SmallUnitMerge.forEach(ranger => {
                    ranger.active = false;
                });
                this.AudioManager.mergeSound.play();
            }, 0.2);

            this.scheduleOnce(() => {
                this.text.active = true;
                this.text.getComponent(Animation).play("Blink");
            }, 1);
        }, 2)
    }


    private mergeFail(): void {
        this.isDoneMerge[0] = false;
        this.isDoneMerge[1] = false;
        this.isDoneMerge[2] = false;
        this.isDoneMerge[3] = false;
        this.isDoneMerge[4] = false;
        this.isDoneMerge[5] = false;
        this.isDoneMerge[6] = false;
        this.isDoneMerge[7] = false;

        this.Lines.forEach(line => line.active = false);
        this.SmallUnitMerge.forEach(unit => unit.getComponent(SkeletalAnimation).play("idle"))
    }


    private handleEndGame(): void {
        // this.SmallUnit.forEach((baby, index) => {
        //     baby.active = true;
        //     baby.getComponent(SkeletalAnimation).play("idle");

        //     if (index >= 8) {
        //         baby.setPosition(new math.Vec3(0, 0, 0));
        //         baby.setRotationFromEuler(new math.Vec3(0, 0, 0))
        //         baby.active = true;
        //     }
        // });

        // this.line_white.active = true;
        // this.node.getComponent(Animation).play("EndAnim");
        this.TryAgain.active = true;
        this.TryAgain.getComponent(Animation).play("TryAgain_Anim");

        // others
        this.TryAgain.on(Node.EventType.TOUCH_START, () => {
            console.log("install");
            this.AudioManager.bgSound.stop();
            this.GameController.installHandle();
        })

        // mtg && applovin
        // this.HideMask.on(Node.EventType.TOUCH_START, () => {
        //     console.log("install");
        //     this.AudioManager.bgSound.stop();
        //     this.GameController.installHandle();
        // });
    }


    protected update(dt: number): void {
        // if(this.isTouch && this.initPos) {
        //     this.handleDrawLine();
        // }

        if (this.CharacterControl.isFight && !this.isFighting) this.handleFight();
    }
}
