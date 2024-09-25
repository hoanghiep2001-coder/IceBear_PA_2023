const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   @property(cc.AudioClip)
   bg: cc.AudioClip;

   @property(cc.AudioClip)
   btnTap: cc.AudioClip;

   @property(cc.AudioClip)
   cream: cc.AudioClip;

   @property(cc.AudioClip)
   cleanFace: cc.AudioClip;

   @property(cc.AudioClip)
   camera: cc.AudioClip;

   @property(cc.AudioClip)
   end: cc.AudioClip;

    protected playBgSound():void {
        cc.audioEngine.play(this.bg, true, 1)
    }

    protected playBtnTap():void {
        cc.audioEngine.play(this.btnTap, false, 1)
    }

    protected playCreamSound():void {
        cc.audioEngine.play(this.cream, false, 1)
    }

    protected playCleanFaceSound():void {
        cc.audioEngine.play(this.cleanFace, false, 1)
    }

    protected playCameraSound():void {
        cc.audioEngine.play(this.camera, false, 1)
    }

    protected playEndSound():void {
        cc.audioEngine.play(this.end, false, 1)
    }

}
