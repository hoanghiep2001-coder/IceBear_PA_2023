const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    crySound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    completeSound: cc.AudioClip = null;

    protected start(): void {
        
    }

}
