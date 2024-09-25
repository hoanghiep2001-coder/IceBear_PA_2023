
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    mergeSound: cc.AudioClip = null;
}
