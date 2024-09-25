
import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    Rope_1: AudioSource = null;
    @property(AudioSource)
    Rope_2: AudioSource = null;

    start () {
        
    }

}

