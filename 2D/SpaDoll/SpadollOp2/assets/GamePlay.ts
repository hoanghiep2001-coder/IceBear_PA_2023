import Responsive from "./Responsive";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // game intro
  @property(cc.Camera)
  camera: cc.Camera = null;
  @property(cc.Node)
  introCharacter: cc.Node = null;
  @property([cc.Node])
  otherCharacters: cc.Node[] = [];
  @property(cc.Node)
  angryEmoji: cc.Node = null;
  @property(cc.Node)
  cryEmoji: cc.Node = null;
  @property(cc.Node)
  background1: cc.Node = null;
  @property(cc.Node)
  scene1: cc.Node = null;

  // Component
  @property(Responsive)
  Responsive: Responsive = null;

  protected onLoad(): void {
    this.getComponent("AudioManager").playBgSound();
    cc.director.preloadScene("Scene2");
    this.scheduleOnce(() => {
      this.otherCharacters[0].getComponent(cc.Animation).play("TrapGirl");
      this.otherCharacters[1].getComponent(cc.Animation).play("TrapBoy");

      if(this.Responsive.isIPX) {
        cc.tween(this.background1)
        .to(0.85, {
          scale: 0.3
        })
        .start();
      } else {
        cc.tween(this.background1)
        .to(0.85, {
          scale: 0.25
        })
        .start();
      }

      // this.background1.getComponent(cc.Animation).play("fixBackground");
      this.getComponent("AudioManager").playCameraSound();
      this.camera.getComponent(cc.Animation).play("MoveCameraRight");
    }, 1);

    this.scheduleOnce(() => {
      this.introCharacter.active = true;
          this.angryEmoji.active = true;
    }, 1.3)

    this.scheduleOnce(() => {
      this.cryEmoji.active = true;
    }, 2.5);

    this.scheduleOnce(() => {
      this.angryEmoji.getComponent(cc.Animation).play("FadeIn1Sec")
    }, 3)

    this.scheduleOnce(() => {
      this.scene1.getComponent(cc.Animation).play("FadeIn1Sec");
    }, 4)

    this.scheduleOnce(() => {
      cc.director.loadScene("Scene2")
    }, 5)
  }

  protected update(dt: number): void {
    
  }
}
