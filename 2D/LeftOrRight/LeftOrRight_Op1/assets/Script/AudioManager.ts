const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;


    protected start(): void {
        
    }

}
