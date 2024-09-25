cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.AudioClip,
    cutRope: cc.AudioClip,
    characterRun: cc.AudioClip,
    scream: cc.AudioClip,
    win: cc.AudioClip,
    smile: cc.AudioClip,
    rope1: cc.AudioClip,
    rope2: cc.AudioClip,
  },

  onLoad() {

  },

  playBackgroundSound() {
    // sound, loop, volume 
    cc.audioEngine.play(this.background, true, 1);
  },

  playCutRope(loop) {
    cc.audioEngine.play(this.cutRope, loop, 1);
  },

  playCharacterRun(loop) {
    cc.audioEngine.play(this.cutRope, loop, 1);
  },

  playScream(loop) {
    cc.audioEngine.play(this.scream, loop, 1);
  },

  playWin(loop) {
    cc.audioEngine.play(this.win, loop, 1);
  },

  playSmile(loop) {
    cc.audioEngine.play(this.smile, loop, 1);
  },

  playRope1(loop) {
    cc.audioEngine.play(this.rope1, loop, 1);
  },

  playRope2(loop) {
    cc.audioEngine.play(this.rope2, loop, 1);
  },
});
