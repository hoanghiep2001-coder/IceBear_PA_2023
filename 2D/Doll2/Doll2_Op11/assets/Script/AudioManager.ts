const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    crySound: cc.AudioClip = null;
    @property(cc.AudioClip)
    crySound_2: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    Female_hmmSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    MaleSmileSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    completeSound: cc.AudioClip = null;

    protected start(): void {
        
    }

}
