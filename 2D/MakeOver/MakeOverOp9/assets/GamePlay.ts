const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  // node
  @property(cc.Node)
  background: cc.Node = null;
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  redLine: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  tweezers: cc.Node = null;
  @property(cc.Node)
  impact: cc.Node = null;
  @property(cc.Node)
  impactFly: cc.Node = null;
  @property(cc.Node)
  fly: cc.Node = null;

  // array
  @property([cc.Node])
  tears: cc.Node[] = [];
  @property([cc.Node])
  afterIntro: cc.Node[] = [];
  @property([cc.Node])
  spines: cc.Node[] = [];

  // state
  isRotate: boolean = false;
  currentPosition: cc.Vec2;
  step: number = 1;
  isCanTouch: boolean = true;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  cry: cc.AudioClip = null;
  @property(cc.AudioClip)
  showItemSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  removeFly: cc.AudioClip = null;
  @property(cc.AudioClip)
  screamSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  endStepSound: cc.AudioClip = null;

  protected onLoad(): void {

    // lock rotation
    if (this.isRotate) {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      });
    } else {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      });
    }

    cc.audioEngine.play(this.bgSound, true, 1);
    cc.audioEngine.play(this.cry, false, 1);

    this.scheduleOnce(() => {
      this.tears.forEach(tear => {
        tear.getComponent(cc.Animation).play("Fade");
      })
    }, 1.5);

    this.scheduleOnce(() => {
      this.afterIntro.forEach(node => {
        node.getComponent(cc.Animation).play("Show");
      })
    }, 2)

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.screamSound, false, 1)
    }, 2.5)

    this.scheduleOnce(() => {
      this.isRotate
        ? this.dollBase.getComponent(cc.Animation).play("Tablet_DollBaseAnim")
        : this.dollBase.getComponent(cc.Animation).play("Mobile_DollBaseAnim");
    }, 3.5);

    this.scheduleOnce(() => {
      this.redLine.active = true;
      this.tweezers.active = true;
      if (this.isRotate) {
        this.tweezers.getComponent(cc.Animation).play("Tablet_TwizzersAnim");
        this.redLine.getComponent(cc.Animation).play("Tablet_RedLine")
      } else {
        this.tweezers.getComponent(cc.Animation).play("Mobile_TwizzersAnim");
        this.redLine.getComponent(cc.Animation).play("Mobile_RedLine")
      }
    }, 5);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.showItemSound, false, 1);
    }, 5.5)

    this.scheduleOnce(() => {

      this.hand.active = true;
      this.isRotate
        ? this.hand.getComponent(cc.Animation).play("Tablet_HandAnim")
        : this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");

      this.registerEvent();
    }, 6);
  }

  private registerEvent(): void {
    this.tweezers.on("touchstart", (e: cc.Touch) => {
      this.currentPosition = e.getLocation();

      this.hand.active = false;
    });

    this.tweezers.on("touchmove", (e: cc.Touch) => {
      this.tweezers.x = this.currentPosition.x - cc.winSize.width / 2;
      this.tweezers.y = this.currentPosition.y - cc.winSize.height / 2;

      if (this.tweezers.getBoundingBox().intersects(this.impactFly.getBoundingBox())) {
        if (!this.isCanTouch) return;

        this.isCanTouch = false;
        if (this.step == 1) {
          this.handleRemoveFly(1);
        }
      }

      this.currentPosition = e.getLocation();
    });
  }

  private handleRemoveFly(index: number): void {
    if (index == 1) {
      this.step = 2;
      this.spines[0].active = true;
      this.tweezers.active = false;
      this.tweezers.opacity = 0;
      this.impact.active = false;
      this.hand.opacity = 0;

      this.scheduleOnce(() => {
        this.fly.active = false;
        
      }, 1.3);

      this.scheduleOnce(() => {
        cc.audioEngine.play(this.removeFly, false, 1)
      }, 2.2)

      this.scheduleOnce(() => {
        cc.audioEngine.play(this.endStepSound, false, 1)
      }, 3)

      this.scheduleOnce(() => {
        this.tweezers.active = true;
        this.isRotate
          ? this.tweezers.getComponent(cc.Animation).play("Tablet_TwizzersAnim")
          : this.tweezers.getComponent(cc.Animation).play("Mobile_TwizzersAnim");
      }, 3.5);

      this.scheduleOnce(() => {
        cc.audioEngine.play(this.showItemSound, false, 1);
      }, 4)

      this.scheduleOnce(() => {
        this.hand.active = true;
        this.isRotate
          ? this.hand.getComponent(cc.Animation).play("Tablet_HandAnim")
          : this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");
        this.isCanTouch = true;
        this.impact.active = true;

        // mtg & applovin
        // this.background.on("touchstart", () => {
        //   cc.audioEngine.stopAll();
        //   this.node.getComponent("GameController").installHandle();
        // });
      }, 4.5);

      // others
      this.tweezers.off("touchmove");
      this.tweezers.on("touchmove", () => {
        if (!this.isCanTouch) return;

        this.isCanTouch = false;
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      })
    }
  }

  protected update(dt: number): void {
    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.impactFly.x = 83;
      this.impactFly.y = -16;
    } else {
      this.isRotate = false;
      this.impactFly.x = 18;
      this.impactFly.y = 51;
    }
  }
}
