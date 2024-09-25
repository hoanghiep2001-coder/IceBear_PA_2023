import { _decorator, Component, math, Node, PhysicsSystem, Vec3, Animation, log, RigidBody, AudioSource, SphereCollider, ICollisionEvent, view, UITransform, ParticleSystem, EventTouch, Vec2, Camera, Size, quat, Quat, UI, UIOpacity, ProgressBar, clamp01, Event } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {
    // node Container
    @property(Node)
    game: Node = null;

    // camera
    @property(Camera)
    camera: Camera = null;
 
    // 3D
    @property(Node)
    container: Node = null;
    @property(Node)
    table: Node = null;
    @property(Node)
    cue: Node = null;
    @property(Node)
    goal: Node = null;
    @property(Node)
    hand: Node = null;
    @property(Node)
    pullbackText: Node = null;
    @property(Node)
    niceShotText: Node = null;
    @property(Node)
    ground: Node = null;
    @property(Node)
    sparkle: Node = null;
    @property(Node)
    cornorBg: Node = null;
    @property(Node)
    subCue: Node = null;

    // 2D
    @property(Node)
    canvas2D: Node = null;
    @property(Node)
    progressBar: Node = null;
    @property(Node)
    progressBarBG: Node = null;
    @property(Node)
    cue2D: Node = null;
    @property(Node)
    Google_Overlay: Node = null;

    // array
    @property([Node])
    Balls: Node[] = [];
    @property([Node])
    sparkles: Node[] = [];

    @property(ProgressBar) 
    progressBarHip: ProgressBar = null;

    // state    
    isRotate: boolean = false;
    isPlayGame: boolean = false;
    isInteract: boolean = false;
    ball8Position: Vec3 = null;
    ball0Position: Vec3 = null;
    force: number = 0;
    mobile_BallMainPos: Vec3 = null;
    currentPosition: cc.Vec2 = null;
    setDevice: string = "";
    angleSoundState: number = null;

    // rigidbody
    cueRigidbody: RigidBody = null;
    ballMainRigidbody: RigidBody = null;
    otherBallRigidbody: RigidBody = null;

    // physics
    physics: PhysicsSystem = PhysicsSystem.instance;

    // sound
    @property([AudioSource])
    collideSounds: AudioSource[] = [];
    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    winSound: AudioSource = null;
    @property(AudioSource)
    inHoleSound: AudioSource = null;
    @property(AudioSource)
    fixAngleSound: AudioSource = null;
    @property(AudioSource)
    collideWallSound: AudioSource = null;
    @property(AudioSource)
    hitSound: AudioSource = null;

    protected onLoad(): void {
        this.setRotate();

        this.subCue.active = false;
        this.niceShotText.active = false;
        this.Balls[2].active = false;
        this.ballMainRigidbody = this.Balls[0].getComponent(RigidBody);
        this.otherBallRigidbody = this.Balls[1].getComponent(RigidBody);
    }

    protected start(): void {
        this.initGame();

        this.registerEvent();

        this.handleBallCollide();

        this.scheduleOnce(() => {
            if (!this.isInteract) {
                this.Google_Overlay.active = false;
                this.pullbackText.active = false;
            }
        }, 5);

        this.scheduleOnce(() => {
            if (!this.isInteract) {
                this.isInteract = true;
                this.isPlayGame = true;
                this.handleGamePlay();
            }
        }, 10);
    }

    private initGame(): void {
        this.bgSound.play();

        PhysicsSystem.instance.enable = true;
        this.hand.getComponent(Animation).play(`${this.setDevice}_HandAnim`);

        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.setTablet();
        } else {
            this.setMobile();
        }
    }

    private registerEvent(): void {
        this.canvas2D.on(Node.EventType.TOUCH_START, () => {
            this.Google_Overlay.active = false;

            if (this.isPlayGame) {
                log("intall")
                this.bgSound.pause();
                this.node.getComponent("GameController").installHandle();

                return;
            }
            this.isInteract = true;
            this.pullbackText.active = false;
            this.hand.active = false;
        }, this);

        this.progressBarHip.node.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.Google_Overlay.active = false;
            if (this.isPlayGame) {
                log("install")
                this.bgSound.pause();
                this.node.getComponent("GameController").installHandle();

                return;
            }

            this.fixAngleSound.play();
            this.hand.active = false;
            this.isInteract = true;
            this.pullbackText.active = false;

            let touchPos = event.getUILocation();
            let percentage = (touchPos.y - 115) / this.progressBarHip.getComponent(UITransform).height;
            percentage = Math.max(0, Math.min(1, percentage));

            // Update the progress
            this.progressBarHip.progress = clamp01(percentage);
            let cueScale = this.cue2D.getScale();
            this.cue2D.setScale(cueScale.x, percentage, cueScale.z);
        });

        this.progressBarHip.node.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => {
            let touchPos = event.getUILocation();
            let percentage = (touchPos.y - 115) / this.progressBarHip.getComponent(UITransform).height;
            // Update the progress
            this.progressBarHip.progress = clamp01(percentage);

            percentage = Math.max(0, Math.min(1, percentage));
            let cueScale = this.cue2D.getScale();
            this.cue2D.setScale(cueScale.x, percentage, cueScale.z);
            const opacity = 150 + (1 - percentage) * (255 - 100);
            this.progressBarBG.getComponent(UIOpacity).opacity = Math.round(opacity);
        });

         this.progressBarHip.node.on(Node.EventType.TOUCH_END, (e: EventTouch) => {
            if (this.isPlayGame) {
                return;
            }

            this.cue2D.setScale(1, 1, 1);
            this.progressBarBG.getComponent(UIOpacity).opacity = 150;
            this.handleGamePlay();
            this.isPlayGame = true;
            this.fixAngleSound.stop();
        });

        this.progressBarHip.node.on(Node.EventType.TOUCH_CANCEL, (e: EventTouch) => {
            if (this.isPlayGame) {
                return;
            }
            this.cue2D.setScale(1, 1, 1);
            this.progressBarBG.getComponent(UIOpacity).opacity = 150;
            this.handleGamePlay();
            this.isPlayGame = true;
            this.fixAngleSound.stop();
        });
    }

    private handleGamePlay(): void {
        this.hand.active = false;
        this.pullbackText.active = false;
        this.cue.active = true;

        this.cue.getComponent(Animation).play(`${this.setDevice}_CueAnim`);

        this.scheduleOnce(() => {
            this.hitSound.play();
            this.isRotate 
                ? this.ballMainRigidbody.applyImpulse(new math.Vec3(-230, 4, -180)) 
                : this.ballMainRigidbody.applyImpulse(new math.Vec3(-70, 4, -200));
        }, 0.5);

        this.scheduleOnce(() => {
            this.cue.active = false;
        }, 1);
    }

    private handleBallCollide(): void {
        let ball0Collider = this.Balls[0].getComponent(SphereCollider);
        ball0Collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "Wall_1") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_2") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_3") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_4") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_5") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_6") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Ball_02") {
                this.collideSounds[0].play();
            }
        });

        let ball8Collider = this.Balls[1].getComponent(SphereCollider);
        ball8Collider.on("onCollisionEnter", (e: ICollisionEvent) => {
            if (e.otherCollider.node.name === "Goal") {
                this.Balls[1].active = false;
                this.inHoleSound.play();
                this.sparkles[0].getComponent(ParticleSystem).play();
                this.sparkles[1].getComponent(ParticleSystem).play();
                this.sparkles[2].getComponent(ParticleSystem).play();
                this.sparkles[3].getComponent(ParticleSystem).play();
                this.sparkles[4].getComponent(ParticleSystem).play();
                this.niceShotText.active = true;
                this.niceShotText.getComponent(Animation).play(`${this.setDevice}_NiceShot`);
                this.scheduleOnce(() => {
                    this.winSound.play();
                }, 0.3);

                this.scheduleOnce(() => {
                    this.Balls[2].active = true;
                    this.Balls[0].setPosition(this.mobile_BallMainPos);
                    this.subCue.active = true;
                    this.hand.active = false;
                    this.cue.active = false;
                }, 2);
            }

            if (e.otherCollider.node.name === "Wall_1") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_2") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_3") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_4") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_5") {
                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Wall_6") {

                this.collideWallSound.play()
            }

            if (e.otherCollider.node.name === "Ball_Main") {

                this.collideSounds[0].play();
            }
        });
    }

    private handleStopMainBall(): void {
        if (this.Balls[2].active) {
            this.ballMainRigidbody.setLinearVelocity(math.Vec3.ZERO);
            this.ballMainRigidbody.setAngularVelocity(math.Vec3.ZERO);
        }
    }

    private setRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.setDevice = "Tablet";
        } else {
            this.isRotate = false;
            this.setDevice = "Mobile";
        }
    }

    private setMobile(): void {
        // text
        this.pullbackText.setScale(new math.Vec3(1, 1, 1))

        // container
        this.container.setScale(new math.Vec3(1, 1, 1));
        this.container.setPosition(new math.Vec3(-6.5, 0, 0));

        // table & ball & cue
        this.ground.setRotationFromEuler(new math.Vec3(0, 0, 0));
        this.table.setRotationFromEuler(new math.Vec3(-90, 90, 0));
        this.cornorBg.setScale(new math.Vec3(18.6, 11, 112));
        this.mobile_BallMainPos = new math.Vec3(-23, 4, -147.5);
        this.goal.setPosition(new math.Vec3(8, 4, -7.735));
        this.Balls[0].setPosition(new math.Vec3(18.3, 4, -147.5));
        this.Balls[1].setPosition(new math.Vec3(-25, 4, -260));
        this.Balls[2].setPosition(new math.Vec3(25, 4, -190));

        this.cue.setPosition(new math.Vec3(38, 40, -104.5));
        this.cue.setRotationFromEuler(new math.Vec3(-90, 20, 0));
        this.subCue.setPosition(new math.Vec3(-59, 4, -102));
        this.subCue.setRotationFromEuler(new math.Vec3(-90, -40, 0));
        
        // 2D progress Bar
        this.progressBar.setPosition(new math.Vec3(139, 0, 0));
        this.progressBarHip.node.setPosition(new math.Vec3(139, 0, 0));

        // sprakle
        this.sparkle.setPosition(new math.Vec3(-39.82, 0, -276.613));
    }

    private setTablet(): void {
        // text
        this.pullbackText.setScale(new math.Vec3(1.4, 1.4, 1.4));

        // container
        this.container.setScale(new math.Vec3(1.5, 1.5, 1.5));
        this.container.setPosition(new math.Vec3(-6.5, 0, 100));

        // table & ball & cue
        this.ground.setRotationFromEuler(new math.Vec3(0, 90, 0));
        this.table.setRotationFromEuler(new math.Vec3(-90, 0, 0));
        this.cornorBg.setScale(new math.Vec3(19, 11, 112));
        this.mobile_BallMainPos = new math.Vec3(-1.5, 4, -175);
        this.goal.setPosition(new math.Vec3(-8, 4, -7.735));
        this.Balls[0].setPosition(new math.Vec3(-1.5, 4, -175));
        this.Balls[1].setPosition(new math.Vec3(-63, 4, -228));
        this.Balls[2].setPosition(new math.Vec3(1.5, 4, -228));

        this.cue.setPosition(new math.Vec3(39, 4, -135));
        this.cue.setRotationFromEuler(new math.Vec3(-90, 45, 0));
        this.subCue.setPosition(new math.Vec3(-11.5, 4, -120));
        this.subCue.setRotationFromEuler(new math.Vec3(-90, -10, 0));

        // 2D progress Bar
        this.progressBar.setPosition(new math.Vec3(275, 0, 0));
        this.progressBarHip.node.setPosition(new math.Vec3(275, 0, 0));

        // sprakle
        this.sparkle.setPosition(new math.Vec3(-79, 0, -244));
    }

    protected update(dt: number): void {
        this.handleStopMainBall();
    }
}
