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
    bg: cc.Node = null;
    @property(cc.Node)
    Options_Container: cc.Node = null;
    @property(cc.Node)
    Hint_hand: cc.Node = null;
    @property(cc.Node)
    DollBase: cc.Node = null;
    @property(cc.Node)
    Hide_Mask: cc.Node = null;
    @property(cc.Node)
    Hide_Btn: cc.Node = null;


    // Items
    @property([cc.Node])
    Items: cc.Node[] = [];


    // Spine


    // Effect
    @property([cc.ParticleSystem])
    Blinks: cc.ParticleSystem[] = [];

    // Options


    // state    
    isLess: boolean = true;
    currentIndex: number = 0;

    protected onLoad(): void {
        // init game
    }


    protected start(): void {
        this.handleGamePlay();
        this.registerEvent();
    }


    private handleGamePlay(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        this.Options_Container.getComponent(cc.Animation).play("Options_SliderAnim");
        this.Hint_hand.getComponent(cc.Animation).play("Hint_HandAnim");

        this.schedule(() => {

            if(this.currentIndex == 0) {
                this.isLess = true;                
            }

            if(this.currentIndex >= 5) {
                this.isLess = false;
            }

            if(this.isLess) {
                this.currentIndex++;
            } else {
                this.currentIndex--;
            }
            
            this.Blinks.forEach(blink => blink.stopSystem());
            this.Blinks[this.currentIndex].resetSystem();
        }, 0.15);
    }


    private registerEvent(): void {

        // others
        this.Hide_Btn.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // mtg & applovin
        // this.Hide_Mask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    protected update(dt: number): void {

    }

}
