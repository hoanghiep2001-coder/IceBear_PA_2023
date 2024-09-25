const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   @property(cc.AudioClip)
   bg: cc.AudioClip;

   @property(cc.AudioClip)
   end: cc.AudioClip;

   @property(cc.AudioClip)
   scream: cc.AudioClip;

    protected playBgSound():void {
        cc.audioEngine.play(this.bg, true, 1)
    }

    protected playEndStepSound():void {
        cc.audioEngine.play(this.end, false, 1)
    }

    protected playScreamSound():void {
        // cc.audioEngine.play(this.scream, false, 1)
    }

}
