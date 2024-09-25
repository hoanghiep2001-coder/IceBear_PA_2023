cc.Class({
  extends: cc.Component,

  properties: {
    bgSound: cc.AudioClip,
    CreamSound: cc.AudioClip,
    WashCottonSound: cc.AudioClip,
    WaterDrop: cc.AudioClip,
    End: cc.AudioClip,
    buttonClick: cc.AudioClip,
    cry: cc.AudioClip,
  },

  playbgSound() {
    cc.audioEngine.play(this.bgSound, true, 1);
  },

  playButtonClickSound() {
    cc.audioEngine.play(this.buttonClick, false, 1);
  },

  playCrySound() {
    cc.audioEngine.play(this.cry, false, 1);
  },

  playCreamSound() {
    cc.audioEngine.play(this.CreamSound, false, 1);
    this.scheduleOnce(() => {
      cc.audioEngine.play(this.CreamSound, false, 1);
    }, 0.5);
  },

  playWaterDropSound() {
    cc.audioEngine.play(this.WaterDrop, false, 1);
  },

  playWashCottonSound() {
    cc.audioEngine.play(this.WashCottonSound, false, 1);
    this.scheduleOnce(() => {
      cc.audioEngine.play(this.WashCottonSound, false, 1);
    }, 0.5);
  },

  playEndSound() {
    cc.audioEngine.play(this.End, false, 1);
  },
});
