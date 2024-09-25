
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    eraserSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    winSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    drawSound: cc.AudioClip = null;
}
