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

    @property(sp.Skeleton)
    spine_Boy: sp.Skeleton = null;
    @property(cc.Graphics)
    pencil: cc.Graphics = null;

    // Node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    CTA: cc.Node = null;
    @property(cc.Node)
    CTA_btn: cc.Node = null;

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

    // ironsource
    ironSourceState: number = 1;
    ironSourceSoundState: boolean = true;
    isEndGame: boolean = false;

    currentPos: cc.Vec2 = null;

    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isClickMuteBtnOnStartGame: boolean = false;

    bgSoundState: number = null;
    drawSoundState: number = null;
    doneHitPoints: boolean[] = [false, false, false, false, false, false, false];

    protected onLoad(): void {
        this.CTA.opacity = 0;
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.hand.getComponent(cc.Animation).play("Hint_HandAnim");

        this.registerEvent();
    }


    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);
        this.background.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.background.on(cc.Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);
    }

    private handleTouchStart(e: cc.Touch): void {
        this.currentPos = e.getLocation();

        this.hand.active = false;
        if (this.ironSourceSoundState) {
            this.drawSoundState = cc.audioEngine.play(this.AudioManager.drawSound, true, 1);
        }


        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        if (this.ironSourceSoundState) {
            this.bgSoundState = cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        }

        this.isPlayBgSound = true;
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

        this.point.x = e.getLocation().x - cc.winSize.width / 2 + 44;
        this.point.y = e.getLocation().y - cc.winSize.height / 2 + 206 + 38 - 20;

        this.currentPos = e.getLocation();
        this.pencil.stroke();
        this.handleIntersectHitPoint();
    }

    private handleTouchEnd(): void {

        if(this.drawSoundState) {
            cc.audioEngine.stop(this.drawSoundState);
        }
       
        let result = this.doneHitPoints.find(point => {
            return point === false;
        });
        let newResult = String(result);

        if(newResult === "false") {
            this.drawAgain();
        } else if (newResult === "undefined") {
            this.drawSuccess();
        }
    }

    private drawSuccess(): void {
        this.hitPoints.forEach(point => {
            point.active = false;
        })
        this.pencil.clear();
        this.spine_Boy.setAnimation(0, "level274_b", false);
        this.FireWorks_3.resetSystem();

        if (this.ironSourceSoundState) {
            cc.audioEngine.play(this.AudioManager.winSound, false, 1);
        }

        // off event
        this.background.off(cc.Node.EventType.TOUCH_START);
        this.background.off(cc.Node.EventType.TOUCH_MOVE);
        this.background.off(cc.Node.EventType.TOUCH_END);
        this.background.off(cc.Node.EventType.TOUCH_CANCEL);

        this.scheduleOnce(() => {
            this.FireWorks_2.resetSystem();
        }, 0.5);

        this.scheduleOnce(() => {
            this.FireWorks_1.resetSystem();
            this.handleShowCTA();
        }, 1);
    }

    private drawAgain(): void {
        this.pencil.clear();
        this.doneHitPoints[0] = false;
        this.doneHitPoints[1] = false;
        this.doneHitPoints[2] = false;
        this.doneHitPoints[3] = false;
        this.doneHitPoints[4] = false;
        this.doneHitPoints[5] = false;
        this.doneHitPoints[6] = false;       
    }

    private handleIntersectHitPoint(): void {
        this.hitPoints.forEach((point, index) => {
            if (point.getBoundingBox().intersects(this.point.getBoundingBox())) {
                this.handleFilterPoint(index);
            }
        })
    }

    private handleFilterPoint(id: number): void {
        if(this.doneHitPoints[id]) {
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
            default:
                console.log("drawing");
                break;
        }
    }

    private handleShowCTA(): void {
        this.CTA.getComponent(cc.Animation).play("Anim_Show");

        // mtg & applovin
        // this.background.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // others
        this.CTA_btn.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        
        this.scheduleOnce(() => {
            this.CTA.getComponent(cc.Animation).play("CTA_Anim");
        }, 0.5)
    }

    protected update(dt: number): void {
        this.ironSourceState = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if(this.ironSourceState) {
            if(this.ironSourceState === 1 && !this.ironSourceSoundState) {
                this.ironSourceSoundState = true;
                cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            } 
            
            if (this.ironSourceState === 2 && this.ironSourceSoundState) {
                this.ironSourceSoundState = false;
                cc.audioEngine.stopAll();
            }
        }
        
    }
}
