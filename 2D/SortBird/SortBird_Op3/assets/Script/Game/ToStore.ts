
const {ccclass, property} = cc._decorator;
import { Constants } from "../Data/constants";
import GamePlay from "./GamePlay";
@ccclass
export default class ToStore extends cc.Component {

    @property(cc.Node)
    GamePlay: cc.Node = null;
    @property(cc.Node)
    HideMask: cc.Node = null;
    @property(cc.Node)
    Bird: cc.Node = null;
    @property(cc.Node)
    btn_CTA: cc.Node = null;

    protected start(): void {
       
        this.HideMask.on(cc.Node.EventType.TOUCH_START, () => {

            // ironsource
            // this.handleIronSourcePlaySound();

             // mtg & applovin
            this.GamePlay.getComponent("GameController").installHandle();
        }, this);

        // others
        this.Bird.on(cc.Node.EventType.TOUCH_START, () => {
            this.GamePlay.getComponent("GameController").installHandle();
        }, this);
        this.btn_CTA.on(cc.Node.EventType.TOUCH_START, () => {
            this.GamePlay.getComponent("GameController").installHandle();
        }, this);
        
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }
        
        if (Constants.ironSource.SoundState) {
            Constants.bgSoundState = cc.audioEngine.play(this.GamePlay.getComponent(GamePlay).bgSound, true, 1);
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                cc.audioEngine.play(this.GamePlay.getComponent(GamePlay).bgSound, true, 1);
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
