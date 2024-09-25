cc.Class({
  extends: cc.Component,

  properties: {
    bgSound: cc.AudioClip,
    CutSound: cc.AudioClip,
    helpSound: cc.AudioClip,
    ScreamSound: cc.AudioClip,
    runSound: cc.AudioClip,
    Rope_1Sound: cc.AudioClip,
    smileSound: cc.AudioClip,
    winSound: cc.AudioClip,
  },

  playbgSound() {
    cc.audioEngine.play(this.bgSound, true, 1);
  },

  playCutSound() {
    cc.audioEngine.play(this.CutSound, false, 1);
  },

  playhelpSound() {
    cc.audioEngine.play(this.helpSound, false, 1);
  },

  playScreamSound() {
    cc.audioEngine.play(this.ScreamSound, false, 1);
  },

  playRunSound(loop, length) {
    if (loop) {
      if (length === 3) {
        cc.audioEngine.play(this.runSound, false, 1);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 0.6);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 1.2);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 1.8);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 2.4);
      } else if (length === 2) {
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 1);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 1.5);
      } else {
        cc.audioEngine.play(this.runSound, false, 1);
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.runSound, false, 1);
        }, 0.5);
      }
    } else {
      cc.audioEngine.stop(this.runSound);
    }
  },

  playRope_1Sound() {
    cc.audioEngine.play(this.Rope_1Sound, false, 1);
  },

  playSmileSound() {
    cc.audioEngine.play(this.smileSound, false, 1);
  },
  playWinSound() {
    cc.audioEngine.play(this.winSound, false, 1);
  },
});
