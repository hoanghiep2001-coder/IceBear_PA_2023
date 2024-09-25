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

    doneHitPoints: boolean[] = [false, false, false, false, false, false, false, false, false];

    protected onLoad(): void {
        this.girl_2.opacity = 0;
        this.Scissors_Origin.opacity = 0;
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
        this.startDrawPos = e.getLocation();
        this.currentPos = e.getLocation();

        this.hand.active = false;
        this.hand.getComponent(cc.Animation).stop("Hint_HandAnim");
        this.drawSoundState = cc.audioEngine.play(this.AudioManager.drawSound, true, 1);

        // ironsource
        // if(this.isPlayBgSound) {
        //     return;
        // }

        // this.isPlayBgSound = true;
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

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

        this.point.x = e.getLocation().x - cc.winSize.width / 2;
        this.point.y = e.getLocation().y - cc.winSize.height / 2 + 38;

        this.currentPos = e.getLocation();
        this.pencil.stroke();
        this.handleIntersectHitPoint();
    }

    private handleTouchEnd(): void {

        this.isDrawNext = false;
        this.isDrawPrev = false;
        this.mustDraw = false;

        cc.audioEngine.stop(this.drawSoundState);
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
        this.girl_1.opacity = 0;
        this.girl_2.opacity = 255;
        this.Scissors_Origin.opacity = 255;
        this.Scissors_Draw.opacity = 0;
        this.FireWorks_3.resetSystem();
        cc.audioEngine.play(this.AudioManager.winSound, false, 1);

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
        if(this.startHitPoint) {

            if(this.currentPos.x > this.startDrawPos.x && !this.mustDraw) {
                this.mustDraw = true;
                this.isDrawNext = true;
            } else if (this.currentPos.x < this.startDrawPos.x && !this.mustDraw) {
                this.mustDraw = true;
                this.isDrawPrev = true;
            }

            this.handleFilterNextPoint(this.startHitPoint);
            this.handleFilterPrevPoint(this.startHitPoint);
        } else {
            this.hitPoints.forEach((point, index) => {
                if (this.point.getBoundingBox().intersects(point.getBoundingBox())) {  

                    this.startHitPoint = index + 1;
                    console.log(this.startHitPoint);
                }
            });
        }
    }

    private handleFilterNextPoint(id: number): void {
        if(this.isDrawPrev) return;        

        switch (id) {
            case 1:
                this.currentHitPoint = 1;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 2:
                this.currentHitPoint = 2;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 3:
                this.currentHitPoint = 3;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 4:
                this.currentHitPoint = 4;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 5:
                this.currentHitPoint = 5;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 6:
                this.currentHitPoint = 6;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 7:
                this.currentHitPoint = 7;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 8:
                this.currentHitPoint = 8;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 9:
                this.currentHitPoint = 0;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            default:
                console.log("drawing");
                break;
        }
    }

    private handleFilterPrevPoint(id: number): void {
        if(this.isDrawNext) return;
        switch (id) {
            case 1:
                this.currentHitPoint = 8;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 2:
                this.currentHitPoint = 7;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 3:
                this.currentHitPoint = 6;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 4:
                this.currentHitPoint = 5;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 5:
                this.currentHitPoint = 4;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 6:
                this.currentHitPoint = 3;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 7:
                this.currentHitPoint = 2;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 8:
                this.currentHitPoint = 1;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 
                break;
            case 9:
                this.currentHitPoint = 0;
                this.nextPointToHit 
                ? this.handleHitNextPoint(this.nextPointToHit) 
                : this.handleHitNextPoint(this.currentHitPoint) 

                console.log("check");
                
                break;
            default:
                console.log("drawing");
                break;
        }
    }

    private handleHitNextPoint(id: number): void {  
        
        if(this.isDrawNext) {

            if(id == 9) {
                id = 0;
            }

            if (this.point.getBoundingBox().intersects(this.hitPoints[id].getBoundingBox())) {
                this.doneHitPoints[id] = true;
                this.nextPointToHit = id + 1;
            }

        } else {

            if(id == -1) {
                id = 0;
            }

            // console.log(id);
            
            if (this.point.getBoundingBox().intersects(this.hitPoints[id].getBoundingBox())) {
                this.doneHitPoints[id] = true;
                this.nextPointToHit = id - 1;
            }

        }

       

        console.log(this.doneHitPoints);
        
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

    }
}
