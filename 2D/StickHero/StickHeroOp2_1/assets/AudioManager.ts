const { ccclass, property } = cc._decorator;

@ccclass("AudioManager")
export default class AudioManager extends cc.Component {
  playLoopSound(AudioClip: cc.AudioClip, loop: boolean = false): void {
    let sound;
    AudioClip && loop
      ? (sound = cc.audioEngine.play(AudioClip, true, 1))
      : cc.audioEngine.play(AudioClip, false, 1);
    return sound;
  }

  playManyHitsSound(AudioClip: cc.AudioClip) {
    cc.audioEngine.play(AudioClip, false, 1);
    this.scheduleOnce(() => {
      cc.audioEngine.play(AudioClip, false, 1);
      this.scheduleOnce(() => {
        cc.audioEngine.play(AudioClip, false, 1);
        this.scheduleOnce(() => {
          cc.audioEngine.play(AudioClip, false, 1);
          this.scheduleOnce(() => {
            cc.audioEngine.play(AudioClip, false, 1);
            this.scheduleOnce(() => {
              cc.audioEngine.play(AudioClip, false, 1);
            }, 0.2);
          }, 0.2);
        }, 0.2);
      }, 0.2);
    }, 0.2);
  }
}
