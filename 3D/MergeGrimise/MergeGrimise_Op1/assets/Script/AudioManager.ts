
import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioSource)
    bgSound: AudioSource = null;
    @property(AudioSource)
    attackSound: AudioSource = null;
    @property(AudioSource)
    blastSound: AudioSource = null;
    @property(AudioSource)
    mergeSound: AudioSource = null;
    @property(AudioSource)
    loseSound: AudioSource = null;

    start () {
        
    }

}

