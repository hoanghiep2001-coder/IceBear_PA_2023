import { Constants } from "../Data/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioSource)
    bgSound_1: cc.AudioSource = null;
    @property(cc.AudioSource)
    bgSound_2: cc.AudioSource = null;
    @property(cc.AudioSource)
    clickSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    GirlSound_1: cc.AudioSource = null;
    @property(cc.AudioSource)
    GirlSound_2: cc.AudioSource = null;
    @property(cc.AudioSource)
    CashSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    BrushSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    ManLaughSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    ManSound_1: cc.AudioSource = null;
    @property(cc.AudioSource)
    ManSound_2: cc.AudioSource = null;
    @property(cc.AudioSource)
    ManSound_3: cc.AudioSource = null;
    @property(cc.AudioSource)
    BlinkSound: cc.AudioSource = null;


    public playSound(soundName: string): void {
        if(Constants.ironSource.SoundState) {
            switch (soundName) {
                case "bgSound_1":
                    this.bgSound_1.play();
                    break;
                case "bgSound_2":
                    this.bgSound_2.play();
                    break;
                case "clickSound":
                    this.clickSound.play();
                    break;
                case "GirlSound_1":
                    this.GirlSound_1.play();
                    break;
                case "GirlSound_2":
                    this.GirlSound_2.play();
                    break;
                case "CashSound":
                    this.CashSound.play();
                    break;
                case "BrushSound":
                    this.BrushSound.play();
                    break;
                case "ManLaughSound":
                    this.ManLaughSound.play();
                    break;
                case "ManSound_1":
                    this.ManSound_1.play();
                    break;
                case "ManSound_2":
                    this.ManSound_2.play();
                    break;
                case "ManSound_3":
                    this.ManSound_3.play();
                    break;
                    case "BlinkSound":
                        this.BlinkSound.play();
                        break;
                default:
                    break;
            }
        }
    }

    public stopSound(soundName: string): void {
            switch (soundName) {
                case "bgSound_1":
                    this.bgSound_1.stop();
                    break;
                case "bgSound_2":
                    this.bgSound_2.stop();
                    break;
                case "clickSound":
                    this.clickSound.stop();
                    break;
                case "GirlSound_1":
                    this.GirlSound_1.stop();
                    break;
                case "GirlSound_2":
                    this.GirlSound_2.stop();
                    break;
                case "CashSound":
                    this.CashSound.stop();
                    break;
                case "BrushSound":
                    this.BrushSound.stop();
                    break;
                case "ManLaughSound":
                    this.ManLaughSound.stop();
                    break;
                case "ManSound_1":
                    this.ManSound_1.stop();
                    break;
                case "ManSound_2":
                    this.ManSound_2.stop();
                    break;
                case "ManSound_3":
                    this.ManSound_3.stop();
                    break;
                    case "BlinkSound":
                        this.BlinkSound.stop();
                        break;
                default:
                    break;
            }
    }

    public stopAllSound(): void {
        this.bgSound_1.stop();
        this.bgSound_2.stop();
        this.clickSound.stop();
        this.GirlSound_1.stop();
        this.GirlSound_2.stop();
        this.CashSound.stop();
        this.BrushSound.stop();
        this.ManLaughSound.stop();
        this.ManSound_1.stop();
        this.ManSound_2.stop();
        this.ManSound_3.stop();
        this.BlinkSound.stop();
    }
}
