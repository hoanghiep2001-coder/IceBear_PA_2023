
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    correctSound: cc.AudioClip = null;
}
