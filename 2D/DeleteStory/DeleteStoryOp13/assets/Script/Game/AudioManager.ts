
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    chirstmasSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    eraserSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    babyCry: cc.AudioClip = null;
    @property(cc.AudioClip)
    screamSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    babyCryLouder: cc.AudioClip = null;
}
