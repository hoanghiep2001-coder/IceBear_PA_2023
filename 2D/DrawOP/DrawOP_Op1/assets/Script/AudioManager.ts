
const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    winSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    loseSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    runSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    drawSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    fightSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    angrySound: cc.AudioClip = null;

    @property(cc.AudioClip)
    loseGame: cc.AudioClip = null;
    @property(cc.AudioClip)
    winGame: cc.AudioClip = null;
    protected onLoad(): void {

    }

    protected start(): void {

    }
}
