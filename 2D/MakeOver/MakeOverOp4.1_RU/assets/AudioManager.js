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
    maggotSound1: cc.AudioClip,
    maggotSound2: cc.AudioClip,
    maggotSound3: cc.AudioClip,
    supriseSound: cc.AudioClip,
    whySound: cc.AudioClip,
  },
  playWhySound() {
    // cc.audioEngine.play(this.whySound, false, 1);
  },
  playSupriseSound() {
    cc.audioEngine.play(this.supriseSound, false, 1);
  },

  playMaggotSound1() {
    cc.audioEngine.play(this.maggotSound1, false, 1);
  },

  playMaggotSound2() {
    cc.audioEngine.play(this.maggotSound2, false, 1);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.maggotSound2, false, 1);
    }, 0.5);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.maggotSound2, false, 1);
    }, 1);
  },

  playMaggotSound3() {
    // cc.audioEngine.play(this.maggotSound3, false, 1);
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
