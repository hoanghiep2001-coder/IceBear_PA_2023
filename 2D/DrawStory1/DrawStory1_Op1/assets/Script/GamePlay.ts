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
    background: cc.Node = null;
    @property(cc.Node)
    shower: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Graphics)
    pencil: cc.Graphics = null;
    @property(cc.Node)
    hand: cc.Node = null;

    // Array


    // Effects


    // State
    drawing: cc.Graphics = null;

    currentPos: cc.Vec2 = null;

    isPlayBgSound: boolean = false;
    isDoneEraser: boolean = false;
    isEndGame: boolean = false;

    eraserSoundState: number = null;

    protected onLoad(): void {
        
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.hand.getComponent(cc.Animation).play("Hint_HandAnim");

        this.registerEvent();
    }

    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);
        // this.background.on(cc.Node.EventType.TOUCH_MOVE, this.handleDraw, this);
    } 

    private handleTouchStart(e: cc.Touch): void {
        // this.currentPos = e.getLocation();
        this.GameController.installHandle();
    }

    private handleDraw(e: cc.Touch): void {
        this.pencil.moveTo(
            this.currentPos.x - cc.winSize.width / 2,
            this.currentPos.y - cc.winSize.height / 2
        );
        this.pencil.lineTo(
            e.getLocation().x - cc.winSize.width / 2,
            e.getLocation().y - cc.winSize.height / 2
        );

        this.point.x = e.getLocation().x - cc.winSize.width / 2;
        this.point.y = e.getLocation().y - cc.winSize.height / 2;

        this.currentPos = e.getLocation();
        this.pencil.stroke();
    }

    protected update(dt: number): void {
   
    }
}
