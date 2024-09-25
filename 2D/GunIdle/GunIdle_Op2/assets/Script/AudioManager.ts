const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    Zombie_HurtSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    Zombie_Sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    LineOpenSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    MergeSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    DoneMergeSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    Gun_AK47Sound: cc.AudioClip = null;
    @property(cc.AudioClip)
    ChooseRightSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    ChooseWrongSound: cc.AudioClip = null;

    protected start(): void {
        
    }

}
