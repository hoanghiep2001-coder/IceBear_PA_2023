
import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    clickSound: AudioSource = null;
    @property(AudioSource)
    removeScrewSound: AudioSource = null;
    @property(AudioSource)
    winSound: AudioSource = null;
}

