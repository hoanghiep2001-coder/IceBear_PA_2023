
import { _decorator, AudioSource, Component } from 'cc';
import { Constants } from '../Data/Constant';
const { ccclass, property } = _decorator;


@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    videoSound: AudioSource = null;
    @property(AudioSource)
    eatSound: AudioSource = null;
    @property(AudioSource)
    dieSound: AudioSource = null;
    @property(AudioSource)
    whooseSound: AudioSource = null;


    public playSound(sound: string): void {

        if(Constants.ironSource.SoundState) {
            switch (sound) {
                case "bgSound":
                    this.bgSound.play();
                    break;
                case "videoSound":
                    this.videoSound.play();
                    break;
                case "eatSound":
                    this.eatSound.play();
                    break;
                case "dieSound":
                    this.dieSound.play();
                    break;
                case "whooseSound":
                    this.whooseSound.play();
                    break;
                default:
                    break;
            }
        }
    }


    public stopAllSound(): void {
        console.log("stopAll");

        this.bgSound.stop();
        this.videoSound.stop();
        this.eatSound.stop();
        this.dieSound.stop();
        this.whooseSound.stop();
    }
}

