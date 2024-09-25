const { ccclass, property } = cc._decorator;

@ccclass("AudioManager")
export default class AudioManager extends cc.Component {
  @property(cc.AudioClip)
  background: cc.AudioClip;

  @property(cc.AudioClip)
  clickBtn: cc.AudioClip;

  @property(cc.AudioClip)
  save: cc.AudioClip;

  @property(cc.AudioClip)
  win: cc.AudioClip;

  @property(cc.AudioClip)
  wrong: cc.AudioClip

  playBackgroundSound(): void {
    cc.audioEngine.play(this.background, true, 1);
  }

  playClickBtnSound(): void {
    cc.audioEngine.play(this.clickBtn, false, 1);
  }

  playSaveSound(): void {
    cc.audioEngine.play(this.save, false, 1);
  }

  playWinSound(): void {
    cc.audioEngine.play(this.win, false, 1);
  }

  playWrongSound(): void {
    cc.audioEngine.play(this.wrong, false, 1);
  }
}
