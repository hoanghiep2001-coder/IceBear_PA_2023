
import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    clickSound: AudioSource = null;
    @property(AudioSource)
    hahaSound: AudioSource = null;
    @property(AudioSource)
    fireWorkSound: AudioSource = null;
    @property(AudioSource)
    hmmSound: AudioSource = null;
    @property(AudioSource)
    crySound: AudioSource = null;
    @property(AudioSource)
    manSmileSound: AudioSource = null;

    start () {
        
    }

}

