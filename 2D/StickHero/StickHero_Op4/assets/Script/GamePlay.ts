import { GameController } from './GameController';
import { JoyStick } from './JoyStick';

import { _decorator, Animation, AudioSource, Vec3, Camera, Component, log, math, Node, ParticleSystem, Tween, PhysicsSystem, quat, RigidBody, SkeletalAnimation, Skeleton, Vec2, sp } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('GamePlay')
export class GamePlay extends Component {
    // Camera
    @property(Camera)
    Camera: Camera = null;

    // Node 3D
    @property(Node)
    arrow: Node = null;
    @property(Node)
    boss: Node = null;

    // Node 2D
    @property(Node)
    overlay: Node = null;
    @property(Node)
    tryAgain: Node = null;
    @property(Node)
    playNow: Node = null;
    @property(Node)
    UIContainer: Node = null;
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    text: Node = null;
    @property(Node)
    hint: Node = null;

    // Component
    @property(JoyStick)
    joystick: JoyStick;
    @property(GameController)
    gameController: GameController;
    @property(Node)
    character: Node = null;

    // array
    @property([ParticleSystem])
    confelttis: ParticleSystem[] = [];
    @property([sp.Skeleton])
    spineBlasts: sp.Skeleton[] = [];

    // state
    isRotate: boolean = false;
    isWin: boolean = false;
    fixLoopWin: boolean = false;
    countingComplete: number = 0;
    countingBossRotate: number = 0;
    gameStatus: string = "idle";
    isPlayBg: boolean = false;

    characterPos: Vec3;
    handleCountingVelocity: boolean;

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;

    // sound
    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    completeSound: AudioSource = null;
    @property(AudioSource)
    squidGameSound: AudioSource = null;
    @property(AudioSource)
    blastSound: AudioSource = null;

    protected onLoad(): void {
        this.spineBlasts.forEach(spine => {
            spine.node.active = false;
        });

        PhysicsSystem.instance.enable = true;
    }

    protected start(): void {
        this.text.getComponent(Animation).play("UI_HintAnim");
        this.arrow.getComponent(Animation).play("ArrowAnim");
        this.handleGamePlay();

        this.canvas2D.on(Node.EventType.TOUCH_START, () => {
            this.gameStatus = "run";
            this.text.active = false;

            // ironsource
            // if(this.isPlayBg) {
            //     return;
            // }
            // this.bgSound.play();
            // this.isPlayBg = true;
        });

        this.canvas2D.on(Node.EventType.TOUCH_END, () => {
            this.gameStatus = "idle";
        });
    }

    private handleGamePlay(): void {
        this.boss.setRotationFromEuler(new math.Vec3(0, -180, 0));
        this.boss.getComponent(SkeletalAnimation).play("Skibidi_idle");

        this.scheduleOnce(() => {
            this.boss.getComponent(SkeletalAnimation).play("Skibidi_catcheB");
        }, 3.5);

        this.scheduleOnce(() => {
            this.boss.setRotationFromEuler(new math.Vec3(0, 0, 0));
        }, 4.3);

        this.scheduleOnce(() => {

            if (!this.isWin) {

                this.countingBossRotate++;

                let result = this.character.getComponent("CharacterControls").handleCountingVelocity();

                if (this.countingBossRotate >= 3) {
                    this.joystick.isFinish = true;
                    this.playNow.active = false;
                    this.bgSound.stop();
                    this.gameStatus = "dead";
                    this.registerEvent();

                    this.character.getComponent(SkeletalAnimation).play("stick_dead01");
                    this.text.active = false;

                    this.spineBlasts[0].node.active = true;
                    this.blastSound.play();

                    this.scheduleOnce(() => {
                        this.spineBlasts[1].node.active = true;
                        this.blastSound.play();
                    }, 0.3)

                    this.scheduleOnce(() => {
                        this.spineBlasts[2].node.active = true;
                        this.blastSound.play();
                    }, 0.6)

                    this.scheduleOnce(() => {
                        this.UIContainer.getComponent(Animation).play("UI_EndAnim");
                    }, 1)

                    return;
                }

                if (result) {
                    this.countingComplete++;

                    if (!this.isWin) {
                        this.completeSound.play();
                        this.handleGamePlay();
                    }

                } else {
                    this.joystick.isFinish = true;
                    this.playNow.active = false;
                    this.bgSound.stop();
                    this.gameStatus = "dead";
                    this.registerEvent();

                    this.character.getComponent(SkeletalAnimation).play("stick_dead01");
                    this.text.active = false;

                    this.spineBlasts[0].node.active = true;
                    this.blastSound.play();

                    this.scheduleOnce(() => {
                        this.spineBlasts[1].node.active = true;
                        this.blastSound.play();
                    }, 0.3)

                    this.scheduleOnce(() => {
                        this.spineBlasts[2].node.active = true;
                        this.blastSound.play();
                    }, 0.6)

                    this.scheduleOnce(() => {
                        this.UIContainer.getComponent(Animation).play("UI_EndAnim");
                    }, 1)
                }

            }
        }, 5.5)
    }

    private registerEvent(): void {
        this.canvas2D.off(Node.EventType.TOUCH_START);
        this.canvas2D.off(Node.EventType.TOUCH_END);

        this.tryAgain.on(Node.EventType.TOUCH_START, () => {
            console.log("install");

            this.bgSound.stop();
            this.gameController.installHandle();
        })

        this.playNow.on(Node.EventType.TOUCH_START, () => {
            console.log("install");
            this.bgSound.stop();
            this.gameController.installHandle();
        })
    }

    private handleWinGame(): void {
        this.joystick.isFinish = true;
        this.fixLoopWin = true;
        this.bgSound.stop();
        this.registerEvent();

        this.confelttis.forEach(system => {
            system.play();
        });

        this.scheduleOnce(() => {
            this.tryAgain.active = false;
            this.gameStatus = "dance";
            this.character.getComponent(SkeletalAnimation).play("stick_win01");
            this.text.active = false;

            this.scheduleOnce(() => {
                this.UIContainer.getComponent(Animation).play("UI_EndAnim");
            }, 1)
        }, 1)
    }

    protected update(dt: number): void {
        if (this.characterPos) {
            this.arrow.setPosition(this.characterPos.x, this.characterPos.y + 2.5, this.characterPos.z);
        }

        if (this.isWin && !this.fixLoopWin) {
            this.handleWinGame();
        }
    }
}
