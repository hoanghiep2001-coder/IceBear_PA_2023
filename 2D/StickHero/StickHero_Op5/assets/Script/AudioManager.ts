const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    correctSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    katanaSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    swordSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    meleeSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    bg_Fight: cc.AudioClip = null;
    protected start(): void {
        
    }

}
