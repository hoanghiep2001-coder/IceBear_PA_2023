import { Constants } from "../Data/constants";
import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // Component
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(GameController)
    GameController: GameController = null;

    @property(cc.Graphics)
    pencil: cc.Graphics = null;
    @property(cc.Mask)
    mask: cc.Mask = null;

    @property(sp.Skeleton)
    Spine_Scissor: sp.Skeleton = null;
    @property([sp.Skeleton])
    Spine_DropCut: sp.Skeleton[] = [];

    // Node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    girl_1: cc.Node = null;
    @property(cc.Node)
    girl_2: cc.Node = null;
    @property(cc.Node)
    Scissors_Draw: cc.Node = null;
    @property(cc.Node)
    Scissors_Origin: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    CTA: cc.Node = null;
    @property(cc.Node)
    CTA_btn: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;

    // Array
    @property([cc.Node])
    hitPoints: cc.Node[] = [];

    // Effects
    @property(cc.ParticleSystem)
    FireWorks_1: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    FireWorks_2: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    FireWorks_3: cc.ParticleSystem = null;

    // State
    drawing: cc.Graphics = null;
    currentPos: cc.Vec2 = null;
    startDrawPos: cc.Vec2 = null;

    mustDraw: boolean = false;
    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;
    isDrawNext: boolean = false;
    isDrawPrev: boolean = false;

    currentHitPoint: number = null;
    nextPointToHit: number = null;
    startHitPoint: number = null;
    drawSoundState: number = null;
    cutDressSoundState: number = null;

    doneHitPoints: boolean[] = [false, false, false, false, false, false, false, false, false];

    // ironsource
    ironSourceState: number = 1;
    ironSourceSoundState: boolean = true;

    protected onLoad(): void {
        this.girl_2.opacity = 0;
        this.CTA.opacity = 0;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        this.hand.getComponent(cc.Animation).play("Hint_HandAnim");

        this.registerEvent();
    }

    private registerEvent(): void {

        // to store
        this.onToStore();


        // this.background.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);
        // this.background.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        // this.background.on(cc.Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        // this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);
    }


    private onToStore(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    private handleTouchStart(e: cc.Touch): void {
        this.startDrawPos = e.getLocation();
        this.currentPos = e.getLocation();

        this.hand.active = false;
        this.hand.getComponent(cc.Animation).stop("Hint_HandAnim");

        if (Constants.ironSource.SoundState) {
            this.drawSoundState = cc.audioEngine.play(this.AudioManager.drawSound, true, 1);
        }

        // ironsource
        // this.handleIronSourcePlaySound();
    }

    private handleTouchMove(e: cc.Touch): void {
        this.pencil.moveTo(
            this.currentPos.x - cc.winSize.width / 2,
            this.currentPos.y - cc.winSize.height / 2
        );
        this.pencil.lineTo(
            e.getLocation().x - cc.winSize.width / 2,
            e.getLocation().y - cc.winSize.height / 2
        );

        this.point.x = e.getLocation().x - cc.winSize.width / 2 + 33.5;
        this.point.y = e.getLocation().y - cc.winSize.height / 2 + 14.5 + 33;

        this.currentPos = e.getLocation();
        this.pencil.stroke();
        this.handleIntersectHitPoint();
    }

    private handleTouchEnd(): void {

        this.isDrawNext = false;
        this.isDrawPrev = false;
        this.mustDraw = false;

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.stop(this.drawSoundState);
        }

        let result = this.doneHitPoints.find(point => {
            return point === false;
        });
        let newResult = String(result);

        if (newResult === "false") {
            this.drawAgain();
        } else if (newResult === "undefined") {
            this.drawSuccess();
        }

    }

    private drawSuccess(): void {
        cc.audioEngine.play(this.AudioManager.drawDone, false, 1);
        this.mask.destroy();
        this.pencil.clear();

        this.hitPoints.forEach(point => {
            point.active = false;
        });

        this.Scissors_Draw.opacity = 0;
        this.Scissors_Origin.opacity = 0;
        this.mask.node.opacity = 0;
        this.handleCutDress();

        // off event
        this.background.off(cc.Node.EventType.TOUCH_START);
        this.background.off(cc.Node.EventType.TOUCH_MOVE);
        this.background.off(cc.Node.EventType.TOUCH_END);
        this.background.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    private drawAgain(): void {
        this.pencil.clear();
        this.startHitPoint = null;
        this.doneHitPoints[0] = false;
        this.doneHitPoints[1] = false;
        this.doneHitPoints[2] = false;
        this.doneHitPoints[3] = false;
        this.doneHitPoints[4] = false;
        this.doneHitPoints[5] = false;
        this.doneHitPoints[6] = false;
        this.doneHitPoints[7] = false;
        this.doneHitPoints[8] = false;
    }

    private handleIntersectHitPoint(): void {
        this.hitPoints.forEach((point, index) => {
            if (point.getBoundingBox().intersects(this.point.getBoundingBox())) {
                this.handleFilterPoint(index);
            }
        })
    }

    private handleFilterPoint(id: number): void {
        if (this.doneHitPoints[id]) {
            return;
        }

        switch (id) {
            case 0:
                this.doneHitPoints[0] = true;
                break;
            case 1:
                this.doneHitPoints[1] = true;
                break;
            case 2:
                this.doneHitPoints[2] = true;
                break;
            case 3:
                this.doneHitPoints[3] = true;
                break;
            case 4:
                this.doneHitPoints[4] = true;
                break;
            case 5:
                this.doneHitPoints[5] = true;
                break;
            case 6:
                this.doneHitPoints[6] = true;
                break;
            case 7:
                this.doneHitPoints[7] = true;
                break;
            case 8:
                this.doneHitPoints[8] = true;
                break;
            default:
                console.log("drawing");
                break;
        }
    }

    private handleCutDress(): void {
        this.Spine_Scissor.node.active = true;
        this.Spine_Scissor.getComponent(cc.Animation).play("Scissor_Anim");

        this.scheduleOnce(() => {

            if (Constants.ironSource.SoundState) {
                this.cutDressSoundState = cc.audioEngine.play(this.AudioManager.scissorSound, true, 1);
            }

            this.Spine_DropCut[1].node.active = true;
        }, 0.5);

        this.scheduleOnce(() => {
            this.Spine_DropCut[2].node.active = true;

            if (Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.cutDressSoundState);
                this.cutDressSoundState = cc.audioEngine.play(this.AudioManager.scissorSound, true, 1);
            }

        }, 1);

        this.scheduleOnce(() => {
            this.Spine_DropCut[0].node.active = true;

            if (Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.cutDressSoundState);
                this.cutDressSoundState = cc.audioEngine.play(this.AudioManager.scissorSound, true, 1);
            }

        }, 1.5);

        this.scheduleOnce(() => {
            this.Spine_DropCut[3].node.active = true;

            if (Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.cutDressSoundState);
                this.cutDressSoundState = cc.audioEngine.play(this.AudioManager.scissorSound, true, 1);
            }
        }, 2);

        this.scheduleOnce(() => {
            if (Constants.ironSource.SoundState) {
                cc.audioEngine.stop(this.cutDressSoundState);
                cc.audioEngine.play(this.AudioManager.winSound, false, 1);
            }

            this.FireWorks_3.resetSystem();
        }, 3)

        this.scheduleOnce(() => {
            this.Spine_Scissor.node.active = false;
            this.Spine_DropCut.forEach(spine => {
                spine.node.active = false;
            });

            this.girl_1.opacity = 0;
            this.girl_2.opacity = 255;
            this.FireWorks_2.resetSystem();
        }, 3.2)

        this.scheduleOnce(() => {
            this.FireWorks_1.resetSystem();
            this.handleShowCTA();
        }, 3.7);
    }

    private handleShowCTA(): void {
        this.CTA.getComponent(cc.Animation).play("Anim_Show");

        // mtg & applovin
        this.background.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // others
        this.CTA_btn.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        this.scheduleOnce(() => {
            this.CTA.getComponent(cc.Animation).play("CTA_Anim");
            this.isEndGame = true;
        }, 0.5)
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.bgSound, true , 1);
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                cc.audioEngine.play(this.AudioManager.bgSound, true , 1);
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                cc.audioEngine.stopAll();
            }
        }
    }



    protected update(dt: number): void {
        // this.handleMuteSoundIronSource();
    }
}
