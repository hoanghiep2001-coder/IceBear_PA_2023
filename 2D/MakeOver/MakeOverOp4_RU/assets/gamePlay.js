let flag = true;
let rotate = false;
cc.Class({
  extends: cc.Component,

  properties: {
    base: cc.Node,
    startPos: null,
    acne2: cc.Node,
    acne3: cc.Node,
    impactArea: cc.Node,
    background: cc.Node,
    tweezers: cc.Node,
    tweezersSpine: cc.Node,
    tweezersEmptyNode: cc.Node,
    boxchat: cc.Node,
    text: cc.Node,
    emoji: cc.Node,
    textWhy: cc.Node,
    circle: cc.Node,
    hand: cc.Node,
    creamSpine: cc.Node,
    creamEmptyNode: cc.Node,
    faceMask: cc.Node,
    cucumLeft: cc.Node,
    cucumRight: cc.Node,
    sponge: cc.Node,
    spongeEmptyNode: cc.Node,
    combSpine: cc.Node,
    combEmptyNode: cc.Node,
    hairEmptyNode: cc.Node,
    hair: cc.Node,
    hairAngry: cc.Node,
    faceAngry: cc.Node,
    tryAgain: cc.Node,
    overlay: cc.Node,
    logo: cc.Node,
  },

  setImpactObjects(loop, spine, once) {
    let temp = (once += 1);
    if (loop) {
      if (spine === "TweezersSpine" && temp === 1) {
        console.log("check");
        this.circle.active = false;
        this.tweezers.active = false;
        this.tweezersEmptyNode.active = false;
        this.impactArea.width = 200;
        this.impactArea.height = 200;

        // google (policy)
        // this.tweezersSpine
        //   .getComponent("sp.Skeleton")
        //   .setAnimation(0, "action01_squeze02", false);

        // for others
        this.tweezersSpine
          .getComponent("sp.Skeleton")
          .setAnimation(0, "action03_squeze_big", false);

        this.scheduleOnce(() => {
          this.AudioManager.playMaggotSound1();
        }, 1);

        this.scheduleOnce(() => {
          this.AudioManager.playMaggotSound2();
        }, 1.5);

        this.scheduleOnce(() => {
          this.AudioManager.playMaggotSound3();
        }, 3.5);

        this.scheduleOnce(() => {
          this.acne2.active = true;
          this.boxchat.active = true;
          this.boxchat.getComponent(cc.Animation).play("boxChat3");
          this.emoji.active = true;
          this.text.active = false;
          this.textWhy.active = false;
          this.AudioManager.playSupriseSound();
        }, 5.5);

        this.scheduleOnce(() => {
          this.tweezersSpine.getComponent(cc.Animation).play("CucumHide");
        }, 6.5);

        this.scheduleOnce(() => {
          this.boxchat.getComponent(cc.Animation).play("boxChat4");
        }, 7.2);

        this.scheduleOnce(() => {
          this.creamSpine.active = true;
          this.creamEmptyNode.active = true;
        }, 8);

        this.scheduleOnce(() => {
          this.AudioManager.playWaterDropSound();
        }, 9.5);

        this.scheduleOnce(() => {
          this.creamSpine
            .getComponent("sp.Skeleton")
            .setAnimation(0, "Action", true);
        }, 10.5);
      } else if (spine === "CreamSpine" && temp === 1) {
        this.AudioManager.playCreamSound();
        this.scheduleOnce(() => {
          this.faceMask.active = true;
          this.creamSpine.getComponent(cc.Animation).play("CreamSpine");
        }, 1);

        this.scheduleOnce(() => {
          this.cucumLeft.active = true;
          this.cucumRight.active = true;
        }, 1.5);

        this.scheduleOnce(() => {
          this.sponge.active = true;
          this.spongeEmptyNode.active = true;
          this.creamEmptyNode.active = false;
          this.creamSpine.active = false;
        }, 2.5);
      } else if (spine === "SpongeSpine" && temp === 1) {
        this.AudioManager.playWashCottonSound();
        this.scheduleOnce(() => {
          this.hairAngry.active = true;
          this.faceMask.getComponent(cc.Animation).play("FaceMask2");
          this.cucumLeft.getComponent(cc.Animation).play("CucumHide");
          this.cucumRight.getComponent(cc.Animation).play("CucumHide");
          this.sponge.getComponent(cc.Animation).play("CucumHide");
        }, 1);

        this.scheduleOnce(() => {
          this.sponge.active = false;
          this.spongeEmptyNode.active = false;
          this.acne3.active = true;
          this.boxchat.getComponent(cc.Animation).play("boxChat3");
          this.text.active = false;
          this.emoji.active = true;
          this.AudioManager.playSupriseSound();
        }, 1.5);

        this.scheduleOnce(() => {
          this.hairAngry.active = true;
          this.faceAngry.active = true;
        }, 3);

        this.scheduleOnce(() => {
          this.combSpine.active = false;
          this.hair.active = false;
        }, 3.5);

        this.scheduleOnce(() => {
          this.combSpine.active = false;
          this.hair.active = false;
          this.overlay.active = true;
          this.logo.active = true;
        }, 4.5);

        this.scheduleOnce(() => {
          // applovin & mindwork
          // this.background.on("touchend", () => {
          //   cc.audioEngine.stopAll();
          //   const GameController = this.getComponent("GameController");
          //   GameController.installHandle();
          // });
          this.AudioManager.playEndSound();
          this.tryAgain.active = true;
          if (rotate) {
            this.tryAgain.getComponent(cc.Animation).play("TryAgainBtn");
          } else {
            this.tryAgain.getComponent(cc.Animation).play("TryAgainBtn2");
          }
        }, 6.5);
      }
    }
  },

  onLoad() {
    this.AudioManager = this.node.getComponent("AudioManager");
    this.AudioManager.playbgSound();
    this.scheduleOnce(() => {
      this.tweezers.active = true;
      if (rotate) {
        this.tweezers.getComponent(cc.Animation).play("Tweezers2");
        this.base.getComponent(cc.Animation).play("BaseScale2");
      } else {
        this.tweezers.getComponent(cc.Animation).play("Tweeers");
        this.base.getComponent(cc.Animation).play("BaseScale");
      }
      this.tweezersSpine.active = true;
      this.tweezersSpine.getComponent(cc.Animation).play("tweezersSpineShow");
      this.circle.active = true;
    }, 11.5);

    this.scheduleOnce(() => {
      this.hand.active = true;
      if (rotate) {
        this.hand.getComponent(cc.Animation).play("Hand2");
      } else {
        this.hand.getComponent(cc.Animation).play("Hand");
      }
    }, 12.5);

    this.tweezers.on("touchstart", () => {
      this.hand.active = false;
    });

    this.tweezers.on("touchmove", (e) => {
      this.startPos = e.touch.getLocation();

      if (
        this.impactArea
          .getBoundingBox()
          .intersects(this.tweezersEmptyNode.getBoundingBox())
      ) {
        this.setImpactObjects(flag, "TweezersSpine", 0);
        flag = false;
      }

      this.tweezersEmptyNode.setPosition(
        this.startPos.x - cc.winSize.width / 2 - 35,
        this.startPos.y - cc.winSize.height / 2 - 55
      );
      this.tweezers.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );
    });

    this.creamEmptyNode.on("touchstart", () => {
      flag = true;
    });

    this.creamEmptyNode.on("touchmove", (e) => {
      this.startPos = e.touch.getLocation();

      if (
        this.impactArea
          .getBoundingBox()
          .intersects(this.creamEmptyNode.getBoundingBox())
      ) {
        this.setImpactObjects(flag, "CreamSpine", 0);
        flag = false;
      }

      this.creamSpine.setPosition(
        this.startPos.x - cc.winSize.width / 2 - 50,
        this.startPos.y - cc.winSize.height / 2 - 80
      );
      this.creamEmptyNode.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );
    });

    this.sponge.on("touchstart", () => {
      flag = true;
    });

    this.sponge.on("touchmove", (e) => {
      this.startPos = e.touch.getLocation();

      if (
        this.impactArea
          .getBoundingBox()
          .intersects(this.spongeEmptyNode.getBoundingBox())
      ) {
        this.setImpactObjects(flag, "SpongeSpine", 0);
        flag = false;
      }

      this.sponge.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );
      this.spongeEmptyNode.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );
    });

    // ironSource - tiktok - unity
    this.tryAgain.on("touchstart", () => {
      cc.audioEngine.stopAll();
      const GameController = this.getComponent("GameController");
      GameController.installHandle();
    });

    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      if (screen_width < 300) {
        this.logo.scaleX = 0.25;
        this.logo.scaleY = 0.25;
      } else {
        this.logo.scaleX = 0.32;
        this.logo.scaleY = 0.32;
      }
      rotate = false;
      this.base.scaleX = 0.32;
      this.base.scaleY = 0.32;
      this.tweezersEmptyNode.y = 38;
      this.creamSpine.y = -200;
      this.creamSpine.x = 20;
      this.creamEmptyNode.y = -100;
      this.creamEmptyNode.x = 80;
      this.sponge.y = 50;
      this.spongeEmptyNode.y = 51;
      this.impactArea.y = 46;
    } else {
      rotate = true;
      this.logo.scaleX = 0.5;
      this.logo.scaleY = 0.5;
      this.base.scaleX = 0.35;
      this.base.scaleY = 0.35;
      this.tweezersEmptyNode.y = 108;
      this.creamSpine.y = -100;
      this.creamSpine.x = 100;
      this.creamEmptyNode.y = -20;
      this.creamEmptyNode.x = 150;
      this.sponge.y = 100;
      this.impactArea.y = 75;
      this.spongeEmptyNode.y = 101;
    }
  },
});
