
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip;
    @property(cc.AudioClip)
    drawEyeBrow: cc.AudioClip;
    @property(cc.AudioClip)
    clickBtn: cc.AudioClip;
    @property(cc.AudioClip)
    doneStep: cc.AudioClip;
}
