const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {
  // node
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  background: cc.Node = null;
  @property(cc.Node)
  missedSnap: cc.Node = null;

  // array
  @property([cc.Node])
  maggots: cc.Node[] = [];
  @property([cc.Node])
  circles: cc.Node[] = [];

  // state
  maggot: cc.Node = null;
  step: number = 0;
  isClicked: boolean = false;
  currentPosition: cc.Vec2;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  endStepSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  maggotDieSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  snapSound: cc.AudioClip = null;

  protected onLoad(): void {
    cc.audioEngine.play(this.bgSound, true, 1);
    this.scheduleOnce(() => {
      if (cc.winSize.width < 225) {
        this.dollBase.getComponent(cc.Animation).play("IphoneX_DollBaseAnim")
      } else if (cc.winSize.width > cc.winSize.height) {
        this.dollBase.getComponent(cc.Animation).play("Tablet_DollBaseAnim");
      } else {
        this.dollBase.getComponent(cc.Animation).play("DollBaseAnim");
      }
    }, 1);

    this.scheduleOnce(() => {
      this.schedule(() => {
        this.handleToggleMaggots();
      }, 2);
    }, 3);

    this.scheduleOnce(() => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
    }, 12)

    this.registerEvent()
  }

  private handleToggleMaggots(): void {

    this.isClicked = false;
    let randomMaggot = Math.ceil(Math.random() * this.maggots.length);

    // if(maggot != null) {
    //   if(maggot.name == this.maggots[randomMaggot - 1]) {
    //     randomMaggot + 1
    //   }
    // }

    this.maggot = this.maggots[randomMaggot - 1];
    this.circles[randomMaggot - 1].active = true;

    this.circles[randomMaggot - 1].on("touchstart", () => {
      if (this.isClicked) return

      cc.audioEngine.play(this.snapSound, false, 1)

      if (this.step >= 2) {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      }

      this.step++;
      this.vibration();
      console.log(this.step);
      this.isClicked = true;
    });

    this.maggots[randomMaggot - 1].getComponent(sp.Skeleton).setAnimation(0, "appear01", false);

    this.scheduleOnce(() => {
      this.circles[randomMaggot - 1].active = false;
      this.circles[randomMaggot - 1].off("touchstart");

      this.maggots[randomMaggot - 1].getComponent(sp.Skeleton).setAnimation(0, "back", false);
    }, 0.3);
  }

  private registerEvent(): void {
    this.background.on("touchend", (e: cc.Touch) => {
      this.currentPosition = e.getLocation();

      this.missedSnap.x = this.currentPosition.x - cc.winSize.width / 2;
      this.missedSnap.y = this.currentPosition.y - cc.winSize.height / 2;
      this.missedSnap.active = true;
      this.missedSnap.getComponent(cc.Animation).play("ZoomOut");
      this.vibration();
      cc.audioEngine.play(this.snapSound, false, 1)
    })
  }

  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }
}
