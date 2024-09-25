const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  // camera
  @property(cc.Camera)
  camera: cc.Camera = null;

  // node
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  eyes: cc.Node = null;
  @property(cc.Node)
  eyesOff: cc.Node = null;
  @property(cc.Node)
  hair: cc.Node = null;
  @property(cc.Node)
  spine_Smoke: cc.Node = null;
  @property(cc.Node)
  bg_Hospital: cc.Node = null;
  @property(cc.Node)
  bikini: cc.Node = null;
  @property(cc.Node)
  mainContent: cc.Node = null;
  @property(cc.Node)
  circle: cc.Node = null;
  @property(cc.Node)
  tweezers: cc.Node = null;
  @property(cc.Node)
  tweezersEmptyNode: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  maggotRemoveArea: cc.Node = null;
  @property(cc.Node)
  spine_RemoveMaggot: cc.Node = null;
  @property(cc.Node)
  breakMaggot: cc.Node = null;
  @property(cc.Node)
  spine_break: cc.Node = null;
  @property(cc.Node)
  moveDirection: cc.Node = null;

  // array
  @property([cc.Node])
  maggots: cc.Node[] = [];

  // state
  isRotate: boolean = false;
  isDone: boolean = false;
  tweezersInitPos: cc.Vec2 = new cc.Vec2(38, 62);
  tweezersEmptyInitPos: cc.Vec2 = new cc.Vec2(109, 131.5);
  currentPos: cc.Vec2 = null;
  isTouched: boolean = false;
  currentTime: number = 0;
  isPlayBreakSound: boolean = false;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  breakSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  itemSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  dirtySound: cc.AudioClip = null;

  // any
  trackEntry = null

  protected onLoad(): void {
      this.setRotate();

      this.eyesOff.active = false;
      this.bg_Hospital.active = false;
      this.mainContent.active = false;
      this.tweezers.active = false;
      this.circle.active = false;
      this.hand.active = false;
      this.spine_RemoveMaggot.active = false;
      this.breakMaggot.active = false;
      this.spine_break.active = false;
      this.moveDirection.active = false;
      this.hand.opacity = 0;
      this.mainContent.opacity = 0;
      this.tweezers.opacity = 0;
      this.circle.opacity = 0;
  }

  protected start(): void {
    cc.audioEngine.play(this.bgSound, true, 1);

    this.handleBlinkEyes();

    this.handleOpenScene();

    this.registerEvent();
  }

  private handleOpenScene(): void {
    this.scheduleOnce(() => {
      cc.audioEngine.play(this.dirtySound, false, 1);
      this.spine_Smoke.getComponent(cc.Animation).play("Show");
    }, 1);

    this.scheduleOnce(() => {
      this.dollBase.getComponent(cc.Animation).play("Mobile_DollBaseAnim");
    }, 2);

    this.scheduleOnce(() => {
      this.bg_Hospital.getComponent(cc.Animation).play("Show");
      this.hair.getComponent(cc.Animation).play("Fade");
      this.bg_Hospital.active = true;
      this.spine_Smoke.getComponent(cc.Animation).play("Fade");
    }, 2.5);

    this.scheduleOnce(() => {
      this.dollBase.getComponent(cc.Animation).play("Mobile_DollBaseAnim2");
    }, 3);

    this.scheduleOnce(() => {
      this.bikini.getComponent(cc.Animation).play("Fade");
      this.mainContent.active = true;
      this.mainContent.getComponent(cc.Animation).play("Show");
    }, 4);

    this.scheduleOnce(() => {
      this.tweezers.active = true;
      this.circle.active = true;
      this.circle.getComponent(cc.Animation).play("Circle");
      this.mainContent.getComponent(cc.Animation).play("Mobile_MainContent");
    }, 5);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.itemSound, false, 1);
    }, 5.8);

    this.scheduleOnce(() => {
      this.hand.active = true;
      this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");
    }, 6.5);
  }

  private registerEvent(): void {
    // others
    this.tweezersEmptyNode.on("touchstart", (e: cc.Touch) => {

      if(this.isDone) {
        console.log("install");
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
        return;
      }

      this.hand.active = false;
      this.currentPos = e.getLocation();
    });

    this.tweezersEmptyNode.on("touchmove", (e: cc.Touch) => {
      this.hand.active = false;
      if(this.isDone) {
        console.log("install");
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
        return;
      }

      this.tweezers.x = this.currentPos.x - cc.winSize.width / 2 - 85;
      this.tweezers.y = this.currentPos.y - cc.winSize.height / 2 - 90;
      this.tweezersEmptyNode.x = this.currentPos.x - cc.winSize.width / 2;
      this.tweezersEmptyNode.y = this.currentPos.y - cc.winSize.height / 2;

      if(this.tweezersEmptyNode.getBoundingBox().intersects(this.maggotRemoveArea.getBoundingBox())) {

        if(this.trackEntry) {
          this.getCurTimeOfRemoveSpine();
        }

        this.handleRemoveMaggot(true);
        if(this.isTouched) return;
        
        this.isTouched = true;
        this.circle.active = false;
        this.tweezers.active = false;
        this.spine_RemoveMaggot.active = true;
        this.maggots[0].getComponent(sp.Skeleton).paused = true;

        this.trackEntry = this.spine_RemoveMaggot.getComponent(sp.Skeleton).setAnimation(0, "Action", false);
        this.getCurTimeOfRemoveSpine();

        this.scheduleOnce(() => {
          this.maggots[0].active = false;
        }, 0.95);

        this.scheduleOnce(() => {
          this.spine_RemoveMaggot.getComponent(sp.Skeleton).paused = true;
          this.moveDirection.active = true;
          this.moveDirection.getComponent(cc.Animation).play("Move_Blink");
        }, 1)
      }

      this.currentPos = e.getLocation();
    });

    this.bg_Hospital.on("touchmove", () => {
      this.moveDirection.active = false;

      if(!this.isTouched) return;
      this.handleRemoveMaggot(true);

      if(this.trackEntry) {
        this.getCurTimeOfRemoveSpine();
      }
    });

    this.bg_Hospital.on("touchend", () => {
      if(!this.isTouched) return;
      this.handleRemoveMaggot(false);
    });

    // mtg && applovin
    // this.bg_Hospital.on("touchstart", () => {
    //   if(this.isDone) {
    //     console.log("install");
    //     cc.audioEngine.stopAll();
    //     this.node.getComponent("GameController").installHandle();
    //     return;
    //   }
    // });

    this.spine_RemoveMaggot.getComponent(sp.Skeleton).setCompleteListener((trackEntry) => {
      if(trackEntry.animation.name === "Action") {
        this.isDone = true;
        this.circle.active = true;
        this.circle.getComponent(cc.Animation).play("Circle");
        this.hand.active = true;
        this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");
        this.tweezers.setPosition(this.tweezersInitPos);
        this.tweezersEmptyNode.setPosition(this.tweezersEmptyInitPos);
        this.tweezers.active = true;
        this.tweezersEmptyNode.active = true;
      }
    });
  }

  private getCurTimeOfRemoveSpine():void {
    if(this.trackEntry) {
      if(this.isPlayBreakSound) {
          return;
      }

      let currentTime = this.trackEntry.trackTime;
      if(currentTime >= 5.3) {
        this.moveDirection.active = false;
        this.bg_Hospital.off("touchend");
        this.spine_break.active = true;
        this.breakMaggot.active = true;
        this.vibration();
        cc.audioEngine.play(this.breakSound, false, 1);
        this.isPlayBreakSound = true;
        this.spine_RemoveMaggot.getComponent(sp.Skeleton).paused = false;
      }      
    }
  }

  private handleRemoveMaggot(isPlay: boolean): void {
    if(isPlay) {
      this.spine_RemoveMaggot.getComponent(sp.Skeleton).paused = false;
    } else {
      this.spine_RemoveMaggot.getComponent(sp.Skeleton).paused = true;
    }
  }

  private handleBlinkEyes(): void {
    this.schedule(() => {
      this.eyes.active = false;
      this.eyesOff.active = true;
      this.scheduleOnce(() => {
      this.eyes.active = true;
      this.eyesOff.active = false;
      }, 0.15);
  }, 2);
  }

  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }

  private setRotate(): void {
    if(cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.isRotate = true;
      this.node.scaleX = 1.3;
      this.node.scaleY = 1.3;
      this.camera.node.y = -30;
    } else {
      this.isRotate = false;
      this.node.scaleX = 1;
      this.node.scaleY = 1;
      this.camera.node.y = 0;
    }
  }

  protected update(dt: number): void {
      this.setRotate();
  }
}
