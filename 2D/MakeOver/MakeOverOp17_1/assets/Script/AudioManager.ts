const { ccclass, property } = cc._decorator;
@ccclass
export default class AudioManger extends cc.Component {
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    breakSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    itemSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    hmmSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    smileSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    completeSound: cc.AudioClip = null;

    @property(cc.AudioClip)
    removeMgSound_1: cc.AudioClip = null;

    @property(cc.AudioClip)
    removeMgSound_2: cc.AudioClip = null;
}
