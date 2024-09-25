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


    // Node
    @property(cc.Node)
    spine: cc.Node = null;
    @property(cc.Node)
    Bg_HideMask: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;


    // Effects
    @property([cc.Node])
    effect_Nodes: cc.Node[] = [];
    @property([cc.ParticleSystem])
    effect_FireWorks: cc.ParticleSystem[] = [];


    // Lv1
    @property(cc.Graphics)
    pencil_Lv1: cc.Graphics = null;
    @property(cc.Node)
    drawSpace_Lv1: cc.Node = null;
    @property(cc.Node)
    default_Level1: cc.Node = null;
    @property([cc.Node])
    Points_Lv1: cc.Node[] = [];
    @property(cc.Node)
    pencil_point_Lv1: cc.Node = null;
    @property(cc.Node)
    hand_Lv1: cc.Node = null;


    // Lv2
    @property(cc.Graphics)
    pencil_Lv2: cc.Graphics = null;
    @property(cc.Node)
    drawSpace_Lv2: cc.Node = null;
    @property(cc.Node)
    text_lv2: cc.Node = null;
    @property(cc.Node)
    spine_level2: cc.Node = null;
    @property([cc.Node])
    Points_Lv2: cc.Node[] = [];
    @property(cc.Node)
    pencil_point_Lv2: cc.Node = null;
    @property(cc.Node)
    hand_Lv2: cc.Node = null;


    // Lv3
    @property(cc.Node)
    spine_level3: cc.Node = null;
    @property(cc.Node)
    text_lv3: cc.Node = null;
    


    // State
    curentPosition: cc.Vec2 = null;
    currentHint: cc.Node = null;
    currentPencil: cc.Graphics = null;
    curerntPoint: cc.Node = null;
    currentHitPoints: cc.Node[] = [];
    doneHitPoints: boolean[] = [false, false, false];


    protected onLoad(): void {

    }


    protected start(): void {
        this.AudioManager.playSound(Constants.SoundTrack.bgSound)
        this.setupLevel();
        this.handleGamePlay();
        Constants.isCanTouch = true;
    }


    private handleGamePlay(): void {
        this.registerEvent();
    }


    private registerEvent(): void {
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleBgTouchStart, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.handleBgTouchMove, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_END, this.handleBgTouchEnd, this);
        this.Bg_HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.handleBgTouchEnd, this);
    }


    private handleBgTouchStart(e: cc.Touch): void {
        if (!Constants.isCanTouch) {
            return;
        }


        if(Constants.currentLv === 3) {
            this.GameController.installHandle();
            return;
        }


        this.curentPosition = e.getLocation();
        this.setupLevel();
        this.currentHint.getComponent(cc.Animation).stop();
        this.currentHint.active = false;
        // this.currentHint.getComponent(cc.Animation).play(`Hand_AnimLv${Constants.currentLv}`)
        this.curerntPoint.setPosition(this.setCurrentPointPos());
        this.AudioManager.playSound(Constants.SoundTrack.drawSound);
        this.AudioManager.drawSound.loop = true;
    }


    private handleBgTouchMove(e: cc.Touch): void {
        if (!Constants.isCanTouch) {
            return;
        }

        this.currentPencil.moveTo(
            this.curentPosition.x - cc.winSize.width / 2,
            this.curentPosition.y - cc.winSize.height / 2 - Constants.Responsive.calculated
        );
        this.currentPencil.lineTo(
            e.getLocation().x - cc.winSize.width / 2,
            e.getLocation().y - cc.winSize.height / 2 - Constants.Responsive.calculated
        );

        this.curentPosition = e.getLocation();
        this.currentPencil.stroke();
        this.curerntPoint.setPosition(this.setCurrentPointPos());
        this.handleIntersectPoints();
    }


    private handleBgTouchEnd(): void {
        if (!Constants.isCanTouch) {
            return;
        }

        this.currentPencil.clear();
        this.AudioManager.stopSound(Constants.SoundTrack.drawSound);
        let result = this.doneHitPoints.find(point => point === false);
        let newResult = String(result);        
        newResult === "false" ? this.drawAgain() : this.drawSuccess();
    }


    private setupLevel(): void {
        if (Constants.isDoneLevel1 && Constants.isDoneLevel2) {
            Constants.currentLv = 3;
            return;
        }

        if (Constants.isDoneLevel1) {
            Constants.currentLv = 2;
            this.currentHint = this.hand_Lv2;
            this.pencil_Lv2.node.active = true;
            this.currentPencil = this.pencil_Lv2;
            this.curerntPoint = this.pencil_point_Lv2;
            this.currentHitPoints = this.Points_Lv2;
            return;
        }

        Constants.currentLv = 1;
        this.currentHint = this.hand_Lv1;
        this.pencil_Lv1.node.active = true;
        this.currentPencil = this.pencil_Lv1;
        this.curerntPoint = this.pencil_point_Lv1;
        this.currentHitPoints = this.Points_Lv1;

    }


    private setCurrentPointPos(): cc.Vec2 {
        let result = new cc.Vec2(0, 0);
        result.x = this.curentPosition.x - cc.winSize.width / 2;
        result.y = (this.curentPosition.y - cc.winSize.height / 2) - Constants.Responsive.calculated;

        return result;
    }


    private handleIntersectPoints(): void {
        this.currentHitPoints.forEach((point, index) => {
            if (point.getBoundingBox().intersects(this.curerntPoint.getBoundingBox())) {
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
            default:
                console.log("drawing");
                break;
        }
    }


    private drawSuccess(): void {
        console.log("draw success");
        Constants.isCanTouch = false;
        this.doneHitPoints[0] = false;
        this.doneHitPoints[1] = false;
        this.doneHitPoints[2] = false;
        this.effect_FireWorks[0].resetSystem();
        this.AudioManager.playSound(Constants.SoundTrack.successSound);

        this.scheduleOnce(() => {
            this.effect_FireWorks[1].resetSystem();
        }, 0.5);
        this.scheduleOnce(() => {
            this.effect_FireWorks[2].resetSystem();
        }, 1);

        this.handleDoneLevel();
    }


    private drawAgain(): void {
        console.log("draw again");

        // this.line.active = true;
        // this.line.getComponent(cc.Animation).play("Line_FadeAnim");

        // this.pencil.clear();
        this.doneHitPoints[0] = false;
        this.doneHitPoints[1] = false;
        this.doneHitPoints[2] = false;
    }


    private handleDoneLevel(): void {
        if (Constants.currentLv === 1) {
            Constants.isDoneLevel1 = true;
            this.hand_Lv1.active = false;
            this.default_Level1.active = false;
            this.spine.getComponent(sp.Skeleton).setAnimation(0, "Level 42_c", true);
            this.scheduleOnce(() => {
                Constants.isCanTouch = true;
                this.AudioManager.playSound(Constants.SoundTrack.moveSound);
                this.getComponent(cc.Animation).play("GamePlay_SwitchLevel");
            }, 4);
        }


        if(Constants.currentLv === 2) {
            Constants.isDoneLevel2 = true;
            this.hand_Lv2.active = false;
            this.spine_level2.getComponent(sp.Skeleton).setAnimation(0, "action", true);
            this.scheduleOnce(() => {
                Constants.isCanTouch = true;
                this.AudioManager.playSound(Constants.SoundTrack.moveSound);
                this.getComponent(cc.Animation).play("GamePlay_SwitchLevel3");
            }, 4);
        } 

        this.setupLevel();
    }

    protected update(dt: number): void {
        if(Constants.Responsive.currentDevice === "vertical_mobile") {
            if(!Constants.isDoneLevel1) {
                Constants.Responsive.calculated = 0;
            } else {
                Constants.Responsive.calculated = 20;
            }
        } else if(Constants.Responsive.currentDevice === "horizon_Tablet") {
            Constants.Responsive.calculated = 30;
        }
    }
}
