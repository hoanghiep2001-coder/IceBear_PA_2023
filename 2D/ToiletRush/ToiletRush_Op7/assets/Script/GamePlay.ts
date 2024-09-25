import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {

    // Component
    @property(AudioManager)
    AudioManager: AudioManager;
    @property(GameController)
    GameController: GameController;

    // node
    @property(cc.Node)
    UI: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    itemBar: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;
    @property(cc.Node)
    playBtn: cc.Node = null;
    @property(cc.Node)
    tryAgain: cc.Node = null;

    // Character
    @property(cc.Node)
    character_Default: cc.Node = null;
    @property(cc.Node)
    character_Cry: cc.Node = null;
    @property(cc.Node)
    character_Dream: cc.Node = null;
    @property(cc.Node)
    character_InToilet: cc.Node = null;

    // array
    @property([cc.Node])
    items: cc.Node[] = [];      

    // state 
    isDoneGame: boolean = false;
    isCanClick: boolean = true;
    isPlayBG: boolean = false;

    countClickWrong: number = 0;

    protected onLoad(): void {
        this.character_Cry.active = false;  
        this.playBtn.active = false;
        this.character_InToilet.active = false;     
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        // iron source
        this.background.on("touchstart", () => {
            if(this.isPlayBG) {
                return;
            }

            this.isPlayBG = true;
            cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            cc.audioEngine.play(this.AudioManager.babyCry, false, 1);
        });

        this.UI.getComponent(cc.Animation).play("UI_OpenGame");   
        this.character_Dream.getComponent(cc.Animation).play("UI_ToiletDream");

        // this.scheduleOnce(() => {
        //     cc.audioEngine.play(this.AudioManager.babyCry, false, 1);
        // }, 1);

        this.scheduleOnce(() => {
            this.registerEvent();
            this.itemBar.getComponent(cc.Animation).play("Hand_Anim");
        }, 3);
    }

    private registerEvent(): void {
        this.items.forEach(item => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isCanClick) {
                    return
                }

                this.hand.active = false;
                this.itemBar.getComponent(cc.Animation).stop();
                this.UI.getComponent(cc.Animation).play("UI_ChooseItem");
                if(item.name === "toilet") {
                    cc.audioEngine.play(this.AudioManager.winSound, false, 1);

                    this.isDoneGame = true;
                    this.handleEndGame();
                } else {

                    if(this.countClickWrong >= 1) {
                        console.log("install");
                        cc.audioEngine.stopAll();
                        this.GameController.installHandle();
                        return;
                    }

                    console.log("check");
                    
                    this.isCanClick = false;
                    this.countClickWrong++;

                    this.scheduleOnce(() => {
                        cc.audioEngine.play(this.AudioManager.babyCry, false, 1);
                        this.character_Cry.active = true;
                    }, 0.5)

                    this.scheduleOnce(() => {
                        this.tryAgain.opacity = 0;
                        this.tryAgain.active = true;
                        this.isCanClick = true;
                        this.UI.getComponent(cc.Animation).play("UI_ShowTryAgain");
                    }, 3);
                }
            });
        });

        this.tryAgain.on(cc.Node.EventType.TOUCH_START, () => {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
            this.tryAgain.active = false;
            this.UI.getComponent(cc.Animation).play("UI_ScaleItem");
            this.character_Cry.active = false;
        });
    }

    private handleEndGame(): void {
        this.items.forEach(item => {
            item.off(cc.Node.EventType.TOUCH_START);
            item.active = false;
        });

        this.character_Default.active = false;
        this.character_Dream.active = false;
        this.character_Cry.active = false;

        this.playBtn.active = true;
        this.character_InToilet.active = true;
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.AudioManager.winSound, false, 1);
        this.UI.getComponent(cc.Animation).play("UI_EndGame");

        // applovin & MTG
        // this.background.on(cc.Node.EventType.TOUCH_START, () => {
        //     console.log("install");
        //     cc.audioEngine.stopAll();
        //     this.GameController.installHandle(); 
        // })

        // others
        this.playBtn.on(cc.Node.EventType.TOUCH_START, () => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.GameController.installHandle();
        });
    }

    protected update(dt: number): void {
        
    }
}
