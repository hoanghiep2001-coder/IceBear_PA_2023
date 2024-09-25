import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // component
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(GameController)
    GameController: GameController = null;

    // node
    @property(cc.Node)
    bg_HideMask: cc.Node = null;
    @property(cc.Node)
    bg_Main: cc.Node = null;
    @property(cc.Node)
    bg_Room1: cc.Node = null;
    @property(cc.Node)
    bg_Room2: cc.Node = null;
    
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    doll: cc.Node = null;
    @property(cc.Node)
    option_container: cc.Node = null;
    @property(cc.Node)
    option_1: cc.Node = null;
    @property(cc.Node)
    option_2: cc.Node = null;
    @property(cc.Node)
    hint_hand: cc.Node = null;

    // room
    @property(cc.Node)
    Room1_Bed: cc.Node = null;
    @property(cc.Node)
    Room1_Bed2: cc.Node = null;
    @property(cc.Node)
    Room2_Bed: cc.Node = null;
    @property(cc.Node)
    Room2_Bed2: cc.Node = null;

    // point
    @property(cc.Node)
    point: cc.Node = null;

    // Effect
    @property(cc.ParticleSystem)
    Heart: cc.ParticleSystem = null;

    // state    
    currentPos: cc.Vec2 = null;

    isCanClick: boolean = true;
    isClickBtn1: boolean = false;
    isPlayBg: boolean = false;

    step: number = 0;

    protected onLoad(): void {
        this.bg_Room1.opacity = 0;
        this.bg_Room2.opacity = 0;

        this.Room1_Bed.opacity = 0;
        this.Room1_Bed2.opacity = 0;

        this.Room2_Bed.opacity = 0;
        this.Room2_Bed2.opacity = 0;

        this.hint_hand.opacity = 0;
    }

    protected start(): void {
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");

        this.scheduleOnce(() => {
            this.hint_hand.opacity = 255;
            this.getComponent(cc.Animation).play("GamePlay_HintAnim");

            this.registerEvent();
        }, 1.2)

    }

    private registerEvent(): void {
        // mtg & applovin
        this.bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);

        this.option_1.on(cc.Node.EventType.TOUCH_START, this.handleOptionTouchStart, this);
        this.option_2.on(cc.Node.EventType.TOUCH_START, this.handleOptionTouchStart, this);
    }

    private handleOptionTouchStart(e: any): void {

        
        this.currentPos = e.getLocation();
        this.point.x = this.currentPos.x - cc.winSize.width / 2;
        this.point.y = this.currentPos.y - cc.winSize.height / 2;
        this.Heart.resetSystem();

        if(!this.isCanClick) {
            return;
        }

        console.log("check");
        
        this.step++;
        this.isCanClick = false;
        this.hint_hand.active = false;
        cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        
        // others
        if(this.step >= 3) {
            this.GameController.installHandle();
            return;
        }

        if(e.target._name === "Option_1") {
            this.handleStep(this.step, 1);
        } else {
            this.handleStep(this.step, 2);
        }

        if(this.isPlayBg) {
            return;
        }

        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }

    private handleStep(id: number, option: number) {

        switch (id) {
            case 1:
                this.handleStepOne(option);
                break;
            case 2:
                this.handleStepTwo(option);
                break;
            default:
                break;
        }
    }

    private handleStepOne(option: number): void {
        this.getComponent(cc.Animation).play("GamePlay_SwitchFirstItem");

        if(option === 1) {
            this.bg_Room1.opacity = 255;
        } else {
            this.bg_Room2.opacity = 255;
        }

        this.scheduleOnce(() => {
            this.isCanClick = true;

            this.hint_hand.active = true;
            this.getComponent(cc.Animation).play("GamePlay_HintAnim");
        }, 1)
    }

    private handleStepTwo(option: number): void {
        this.getComponent(cc.Animation).play("GamePlay_SwitchSecondItem");

        if(option === 1) {
            this.Room1_Bed.opacity = 255;
            this.Room2_Bed2.opacity = 255;
        } else {
            this.Room2_Bed.opacity = 255;
            this.Room1_Bed2.opacity = 255;
        }

        this.scheduleOnce(() => {
            this.isCanClick = true;

            this.hint_hand.active = true;
            this.getComponent(cc.Animation).play("GamePlay_HintAnim");
        }, 1)
    }

    private handleInstall(locate: cc.Touch): void {
        // if(this.step >= 2) {
        //     this.GameController.installHandle();
        // } 

        this.currentPos = locate.getLocation();
        this.point.x = this.currentPos.x - cc.winSize.width / 2;
        this.point.y = this.currentPos.y - cc.winSize.height / 2;
        this.Heart.resetSystem();

        if(this.isPlayBg) {
            return;
        }

        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

    }

    protected update(dt: number): void {

    }

}
