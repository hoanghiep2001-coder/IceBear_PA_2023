
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    wowSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    crySound: cc.AudioClip = null;
    @property(cc.AudioClip)
    angrySound: cc.AudioClip = null;
    @property(cc.AudioClip)
    yeahSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    loseGame: cc.AudioClip = null;
    @property(cc.AudioClip)
    winGame: cc.AudioClip = null;

    protected start(): void {
        
    }
}
