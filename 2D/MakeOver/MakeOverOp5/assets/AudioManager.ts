const { ccclass, property } = cc._decorator;
@ccclass("AudioManager")
export default class AudioManger extends cc.Component {
  @property(cc.AudioClip)
  maggotSound: cc.AudioClip;

  @property(cc.AudioClip)
  creamWaterDrop: cc.AudioClip;

  @property(cc.AudioClip)
  creamWash: cc.AudioClip;

  @property(cc.AudioClip)
  endSound: cc.AudioClip;

  @property(cc.AudioClip)
  showItem: cc.AudioClip;

  @property(cc.AudioClip)
  killMaggot: cc.AudioClip;

  @property(cc.AudioClip)
  killMaggot1: cc.AudioClip;

  @property(cc.AudioClip)
  killMaggot2: cc.AudioClip;

  playMaggotSound(): void {
    cc.audioEngine.play(this.maggotSound, true, 1);
  }

  playCreamWaterDrop(): void {
    cc.audioEngine.play(this.creamWaterDrop, false, 1);
  }

  playCreamWash(): void {
    cc.audioEngine.play(this.creamWash, false, 1);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.creamWash, false, 1);
    }, 0.5);
  }

  playEndSound(): void {
    cc.audioEngine.play(this.endSound, false, 1);
  }

  playShowItem(): void {
    cc.audioEngine.play(this.showItem, false, 1);
  }

  playKillMaggot(): void {
    cc.audioEngine.play(this.killMaggot, false, 1);
  }

  playKillMaggot1(): void {
    cc.audioEngine.play(this.killMaggot1, false, 1);
  }

  playKillMaggot2(): void {
    cc.audioEngine.play(this.killMaggot2, false, 1);
    this.scheduleOnce(() => {
      cc.audioEngine.play(this.killMaggot2, false, 1);
    }, 0.5)
  }
}
