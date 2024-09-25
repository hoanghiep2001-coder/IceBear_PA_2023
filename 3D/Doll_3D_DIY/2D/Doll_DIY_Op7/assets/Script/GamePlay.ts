import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gameplay extends cc.Component {

    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;

    // node
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    brushEyeBrow: cc.Node = null;
    @property(cc.Node)
    eyeBrow: cc.Node = null;
    @property(cc.Node)
    hint_line: cc.Node = null;
    @property(cc.Node)
    head_Brush: cc.Node = null;
    @property(cc.Node)
    Brush_Fake_Area: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    handSelectOp: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    scratchAble: cc.Node = null;
    @property(cc.Node)
    BrushEye_Real: cc.Node = null;
    @property(cc.Node)
    waitingButton: cc.Node = null;

    // array
    @property([cc.Node])
    toiletOptions: cc.Node[] = [];
    @property([cc.Node])
    chooseButtons: cc.Node[] = [];
    @property([cc.Node])
    doneIcons: cc.Node[] = [];
    @property([cc.Node])
    doneButtons: cc.Node[] = [];
    @property([cc.Node])
    Icons: cc.Node[] = [];
    @property([cc.Node])
    Buttons: cc.Node[] = [];

    // state
    currentPosition: cc.Vec2;

    isTouched: boolean = false;
    isDraw: boolean = false;
    isDoneDraw: boolean = false;
    isPlayBgSound: boolean = false;

    eyeBrowSound: number = null;


    public onLoad() {
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1)
        this.registerEvent();
        this.hint_line.getComponent(cc.Animation).play("Hint_LineAnim");
        this.scheduleOnce(() => {
            this.dollBase.getComponent(cc.Animation).play("DollBaseAnim1")
        }, 0.5)

        this.scheduleOnce(() => {
            this.hand.active = true;
        }, 1.8)

    };

    private registerEvent = (): void => {
        this.brushEyeBrow.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);
        this.brushEyeBrow.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.brushEyeBrow.on(cc.Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        this.brushEyeBrow.on(cc.Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);

        // open store of others
        this.toiletOptions.forEach(option => {
            option.on(cc.Node.EventType.TOUCH_START, this.handleOpenStore, this);
        });

        // this.background.on(cc.Node.EventType.TOUCH_START, this.handleBackgroundTouch, this)
    }

    private handleBackgroundTouch(): void {
        // mtg & applovin
        if(this.isDoneDraw) {
            cc.audioEngine.play(this.AudioManager.clickBtn, false, 1);
            this.GameController.installHandle();
        }

        // ironsource
        // if(this.isPlayBgSound) {
        //     return
        // }

        // this.isPlayBgSound = true;
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1)
    }

    private handleTouchStart(e: cc.Touch): void {
        this.currentPosition = e.getLocation();
        this.hand.active = false;
        this.hint_line.active = false;
        // ironsource
        // if(this.isPlayBgSound) {
        //     return
        // }

        // this.isPlayBgSound = true;
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1)
    }

    private handleTouchEnd(e: cc.Touch): void {
        this.isDraw = false;  
        cc.audioEngine.stop(this.eyeBrowSound);
        this.brushEyeBrow.getComponent(cc.Animation).stop("BrushAnim");
    }

    private handleTouchMove(e: cc.Touch): void {

        if(this.Brush_Fake_Area.getBoundingBox().intersects(this.scratchAble.getBoundingBox()) && !this.isDraw) {     
            this.isDraw = true;       
            this.eyeBrowSound = cc.audioEngine.play(this.AudioManager.drawEyeBrow, true, 1);
            this.brushEyeBrow.getComponent(cc.Animation).play("BrushAnim");
        }

        this.Brush_Fake_Area.x = this.currentPosition.x - cc.winSize.width / 2 - 50;
        this.Brush_Fake_Area.y = this.currentPosition.y - cc.winSize.height / 2 - 30;
        this.head_Brush.x = this.currentPosition.x - cc.winSize.width / 2 - 50;
        this.head_Brush.y = this.currentPosition.y - cc.winSize.height / 2 - 30;
        this.brushEyeBrow.x = this.currentPosition.x - cc.winSize.width / 2;
        this.brushEyeBrow.y = this.currentPosition.y - cc.winSize.height / 2;

        this.currentPosition = e.getLocation();
    }

    private handleOpenStore(): void {
        cc.audioEngine.play(this.AudioManager.clickBtn, false, 1);
        this.GameController.installHandle();
    }

    private handleCheckDrawProgress(): void {
        if(this.scratchAble.getComponent("Scratchable").isWin && !this.isDoneDraw) {
            this.isDoneDraw = true;
            cc.audioEngine.stop(this.eyeBrowSound);
            cc.audioEngine.play(this.AudioManager.doneStep, false, 1);

            this.BrushEye_Real.active = true;
            this.scratchAble.active = false;
            this.brushEyeBrow.active = false;   

            this.scheduleOnce(() => {
                this.Buttons[0].scale = 0.8;
                this.chooseButtons[0].active = false;
                this.doneButtons[0].active = true;
                this.doneIcons[0].active = true;
                this.doneButtons[0].active = true;
                this.Icons[0].active = false;

                this.Buttons[1].scale = 1;
                this.waitingButton.active = false;
                this.chooseButtons[1].active = true;
                this.doneButtons[1].active = false;
                this.doneIcons[1].active = false;
                this.doneButtons[1].active = false;
            }, 0.5)

            this.scheduleOnce(() => {
                this.dollBase.getComponent(cc.Animation).play("DollBaseAnim2");
            }, 1)

            this.scheduleOnce(() => {
                this.handSelectOp.active = true;
                this.handSelectOp.getComponent(cc.Animation).play("hand_SelectOption");
            }, 2.2)
        }
    }

    protected update(dt: number): void {
        this.handleCheckDrawProgress();
    }
}
