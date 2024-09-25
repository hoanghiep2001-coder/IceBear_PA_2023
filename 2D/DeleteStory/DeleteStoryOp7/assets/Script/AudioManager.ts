
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
    screamSound1: cc.AudioClip = null;
    @property(cc.AudioClip)
    screamSound2: cc.AudioClip = null;
    @property(cc.AudioClip)
    screamSound3: cc.AudioClip = null;
    @property(cc.AudioClip)
    breathSound: cc.AudioClip = null;
}
