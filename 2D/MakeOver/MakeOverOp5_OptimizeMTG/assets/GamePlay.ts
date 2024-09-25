import AudioManager from "./AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {
  @property(cc.Node)
  baseGame: cc.Node = null;

  @property(cc.Component)
  AudioManager: cc.Component = null;

  @property(cc.Boolean)
  isPlay: boolean = false;

  @property(cc.Boolean)
  isRotate: boolean = false;

  @property(cc.Vec2)
  startPos: cc.Vec2 = null;

  @property(cc.Node)
  background: cc.Node = null;

  @property(cc.Node)
  hand: cc.Node = null;

  @property(cc.Node)
  dirty: cc.Node = null;

  @property(cc.Node)
  creamSpine: cc.Node = null;

  @property(cc.Node)
  creamEmptyNode: cc.Node = null;

  @property(cc.Node)
  instruct: cc.Node = null;

  @property(cc.Node)
  tweezers: cc.Node = null;

  @property(cc.Node)
  tweezersEmptyNode: cc.Node = null;

  // khi nào bất lực mới dùng đến (thay cho Sratchable) :)
  @property([cc.Node])
  public handImpacts: cc.Node[] = [];

  @property(Number)
  countPointImpact: number = 0;

  @property(Array)
  statusArr: boolean[] = [
    false,
    false,
    false,
    false,
  ];

  @property(cc.Boolean)
  isClean: boolean = false;

  @property(cc.Node)
  overlay: cc.Node = null;

  @property(cc.Node)
  tryAgian: cc.Node = null;

  @property(cc.Node)
  logo: cc.Node = null;

  @property(cc.Node)
  sratchAble: cc.Node = null;

  @property(cc.Node)
  worm1: cc.Node = null;

  @property(cc.Node)
  worm2: cc.Node = null;

  @property(cc.Node)
  impactArea: cc.Node = null;

  @property(cc.Node)
  subTweezers: cc.Node = null;

  @property(cc.Node)
  subTweezers2: cc.Node = null;

  @property(cc.Node)
  subTweezers3: cc.Node = null;

  @property(cc.Boolean)
  isImpact: boolean = false;

  @property(cc.Boolean)
  isEnd: boolean = false;

  @property(cc.Boolean)
  isStopAll: boolean = false;

  @property(cc.Node)
  circle: cc.Node = null;

  update(dt): void {

    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      this.isRotate = false;
      this.handImpacts[0].x = -70;
      this.handImpacts[0].y = 164;
      this.handImpacts[1].x = 0;
      this.handImpacts[1].y = -80;
      this.handImpacts[2].x = 70;
      this.handImpacts[2].y = -230;
      this.handImpacts[3].x = 110;
      this.handImpacts[3].y = 94;
      this.baseGame.scaleX = 1;
      this.baseGame.scaleY = 1;
      this.sratchAble.scaleX = 1;
      this.sratchAble.scaleY = 1;
      this.logo.scaleX = 0.35;
      this.logo.scaleY = 0.35;
      this.baseGame.y = 0;
      this.sratchAble.y = 0;
      this.impactArea.y = 55;
      if (screen_width < 300) {
        this.logo.scaleX = 0.28;
        this.logo.scaleY = 0.28;
        this.baseGame.scaleX = 0.8;
        this.baseGame.scaleY = 0.8;
        this.baseGame.y = -48;
        this.sratchAble.y = -48;
        this.sratchAble.scaleX = 0.8;
        this.sratchAble.scaleY = 0.8;
        this.handImpacts[0].x = -70;
        this.handImpacts[0].y = 100;
        this.handImpacts[1].x = -10;
        this.handImpacts[1].y = -105;
        this.handImpacts[2].x = 71;
        this.handImpacts[2].y = -231;
        this.handImpacts[3].x = 90;
        this.handImpacts[3].y = 30;
        this.impactArea.y = 10;
      }
    } else {
      this.isRotate = true;
      this.logo.scaleX = 0.55;
      this.logo.scaleY = 0.55;
    }
  }

  onLoad(): void {
    this.AudioManager = this.getComponent(AudioManager);
    this.AudioManager.playMaggotSound();

    this.scheduleOnce(() => {
      this.creamSpine.active = true;
    }, 0.5);

    this.scheduleOnce(() => {
      this.AudioManager.playShowItem();
    }, 0.8)

    // show cream spine action
    this.scheduleOnce(() => {
      this.creamSpine.getComponent(sp.Skeleton).setAnimation(0, "Intro", false);
      this.scheduleOnce(() => {
        this.AudioManager.playCreamWaterDrop();
      }, 1.5);

      this.scheduleOnce(() => {
        this.instruct.active = true;
        this.creamEmptyNode.active = true;
        this.isPlay = true;
        if (this.isPlay) {
          this.registerEvent();
        }
      }, 3);
    }, 2);
  }

  showTweezers() {
    this.scheduleOnce(() => {
      this.creamSpine.active = false;
      this.creamEmptyNode.active = false;
      this.tweezers.active = true;
      this.tweezersEmptyNode.active = true;
      this.circle.active = true;
      this.AudioManager.playShowItem();
      this.scheduleOnce(() => {
        this.instruct.active = true;
        if (cc.winSize.width < 300) {
          this.instruct.getComponent(cc.Animation).play("Hand3");
        } else {
          this.instruct.getComponent(cc.Animation).play("Hand2");
        }
      }, 1);
    }, 1);
  }

  registerEvent(): void {
    this.creamEmptyNode.on("touchstart", (e: cc.Touch) => {
      this.startPos = e.getLocation();
      this.instruct.active = false;
    });

    this.creamEmptyNode.on("touchmove", (e: cc.Touch) => {
      this.handImpacts.forEach((item: cc.Node) => {
        if (
          this.creamEmptyNode.getBoundingBox().intersects(item.getBoundingBox())
        ) {
          this.caculatePointImpact(item.name);
        }
      });

      this.creamSpine.setPosition(
        this.startPos.x - cc.winSize.width / 2 - 50,
        this.startPos.y - cc.winSize.height / 2 - 70
      );
      this.creamEmptyNode.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );

      this.startPos = e.getLocation();
    });

    this.tweezers.on("touchstart", (e: cc.Touch) => {
      this.startPos = e.getLocation();
      this.instruct.active = false;
      this.endScene(this.isEnd);
    });

    this.tweezers.on("touchmove", (e: cc.Touch) => {
      if (!this.isStopAll) {
        if (
          this.impactArea
            .getBoundingBox()
            .intersects(this.tweezersEmptyNode.getBoundingBox())
        ) {
          this.killMaggot(this.isImpact);
          this.isImpact = true;
        }
        this.tweezers.setPosition(
          this.startPos.x - cc.winSize.width / 2,
          this.startPos.y - cc.winSize.height / 2
        );
        this.tweezersEmptyNode.setPosition(
          this.startPos.x - cc.winSize.width / 2 - 25,
          this.startPos.y - cc.winSize.height / 2 - 85
        );

        this.startPos = e.getLocation();
      }
    });
  }

  killMaggot(param: boolean): void {
    if (!param) {
      this.circle.active = false;
      this.isEnd = true;
      this.tweezers.active = false;
      this.tweezers.opacity = 0;
      this.tweezersEmptyNode.active = false;
      this.subTweezers2.active = true;
      this.subTweezers3.active = true;
      this.subTweezers2.getComponent(cc.Animation).play("TweezersDrag");
      this.subTweezers3.getComponent(cc.Animation).play("TweezersDrag");
      this.worm1.getComponent(cc.Animation).play("MaggotDrag");
      this.AudioManager.playKillMaggot1();
      this.isStopAll = true;
      this.scheduleOnce(() => {
        this.AudioManager.playKillMaggot2();
      }, 0.7);
      // drag maggot from hand
       this.scheduleOnce(() => {
        this.subTweezers.getComponent(cc.Animation).play("KillMaggot");
        this.AudioManager.playKillMaggot();  
      }, 2.2);

      // after kill maggot
      this.scheduleOnce(() => {
        this.subTweezers2.getComponent(cc.Animation).play("FadeAnim");
        this.subTweezers3.getComponent(cc.Animation).play("FadeAnim");
        this.worm1.getComponent(cc.Animation).play("MaggotFall");
      }, 3.2);

      this.scheduleOnce(() => {
        this.tweezers.active = true;
        this.tweezers.getComponent(cc.Animation).play("Tweezers");
        this.AudioManager.playShowItem();
      }, 4.2);
    }
  }

  endScene(param: boolean): void {
    if (param) {
      // google
      // this.instruct.active = false;
      // this.overlay.active = true;
      // this.tryAgian.on("touchend", () => {
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // });
      // this.scheduleOnce(() => {
      //   this.logo.active = true;
      // }, 2.5);
      // this.scheduleOnce(() => {
      //   this.tryAgian.active = true;
      //   this.AudioManager.playEndSound();
      //   if (this.isRotate) {
      //     this.tryAgian.getComponent(cc.Animation).play("TryAgain_Rotate");
      //   } else {
      //     this.tryAgian.getComponent(cc.Animation).play("TryAgain_Default");
      //   }
      // }, 3.5);

      // others
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    }
  }

  caculatePointImpact(nodeName: String): void {
    if (this.isClean) {
      return;
    }

    switch (nodeName) {
      case "Finger1":
        if (!this.statusArr[0]) {
          this.AudioManager.playCreamWash();
          this.countPointImpact++;
        }
        this.statusArr[0] = true;
        break;
      case "Finger2":
        if (!this.statusArr[1]) {
          this.AudioManager.playCreamWash();
          this.countPointImpact++;
        }
        this.statusArr[1] = true;
        break;
      case "Finger3":
        if (!this.statusArr[2]) {
          this.AudioManager.playCreamWash();
          this.countPointImpact++;
        }
        this.statusArr[2] = true;
        break;
      case "Finger4":
        if (!this.statusArr[3]) {
          this.AudioManager.playCreamWash();
          this.countPointImpact++;
        }
        this.statusArr[3] = true;
        break;
      default:
        break;
    }

    if (this.countPointImpact === 4) {
      this.isClean = true;
      if (this.isClean) {
        this.dirty.getComponent(cc.Animation).play("FadeAnim");
        this.scheduleOnce(() => {
          this.creamEmptyNode.active = false;
          this.creamSpine.getComponent(cc.Animation).play("FadeAnim");
        }, 0.5);

        this.scheduleOnce(() => {
          this.showTweezers();
        }, 1.5);
      }
    }
  }
}
