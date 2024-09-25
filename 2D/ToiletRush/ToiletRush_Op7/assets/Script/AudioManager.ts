const {ccclass, property} = cc._decorator;

@ccclass("AudioManager")
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    winSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    wrongSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    babyCry: cc.AudioClip = null;

    protected start(): void {
        
    }

}
