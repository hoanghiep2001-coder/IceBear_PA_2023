import { Constants } from "../Data/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioSource)
    bgSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    drawSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    successSound: cc.AudioSource = null;
    @property(cc.AudioSource)
    moveSound: cc.AudioSource = null;


    public playSound(soundName: string): void {
        if (Constants.ironSource.SoundState) {
            switch (soundName) {
                case "bgSound":
                    this.bgSound.play();
                    break;
                case "drawSound":
                    this.drawSound.play();
                    break;
                case "successSound":
                    this.successSound.play();
                    break;
                    case "moveSound":
                        this.moveSound.play();
                        break;
                default:
                    break;
            }
        }
    }

    public stopSound(soundName: string): void {
        switch (soundName) {
            case "bgSound":
                this.bgSound.stop();
                break;
            case "drawSound":
                this.drawSound.stop();
                break;
            case "successSound":
                this.successSound.stop();
                break;
                case "moveSound":
                    this.moveSound.stop();
                    break;
            default:
                break;
        }
    }

    public stopAllSound(): void {
        this.bgSound.stop();
        this.drawSound.stop();
        this.successSound.stop();
        this.moveSound.stop();
    }
}
