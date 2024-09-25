let flag = true;
let rotate = false;
cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Node,
    startPos: null,
    ImpactArea: cc.Node,
    Base: cc.Node,
    FaceNormal: cc.Node,
    FaceAcne: cc.Node,
    Hair: cc.Node,
    CreamBox: cc.Node,
    CreamSpine: cc.Node,
    CreamEmptyNode: cc.Node,
    Hand: cc.Node,
    BoxChat: cc.Node,
    FaceMask: cc.Node,
    CucumberLeft: cc.Node,
    CucumberRight: cc.Node,
    SpongeSpine: cc.Node,
    SpongeEmptyNode: cc.Node,
    TryAgainBtn: cc.Node,
    Emoji: cc.Node,
  },

  setImpactObjects(loop, spine, once) {
    let temp = once += 1;
    if (loop) {
      if (spine === "CreamSpine" && temp === 1) {
        this.AudioManager.playCreamSound();
        this.scheduleOnce(() => {
          this.CreamSpine.getComponent(cc.Animation).play("CreamSpine");
          this.FaceMask.active = true;
          this.CucumberLeft.active = true;
          this.CucumberRight.active = true;
          this.SpongeEmptyNode.active = true;
          this.SpongeSpine.active = true;
        }, 1);
      } else if (
        spine === "SpongeSpine" &&
        this.ImpactArea.getBoundingBox().intersects(
          this.SpongeEmptyNode.getBoundingBox()
        )
      ) {
        this.AudioManager.playWashCottonSound();

        this.scheduleOnce(() => {
          this.SpongeSpine.getComponent(cc.Animation).play("SpongeSpine");
          this.FaceMask.getComponent(cc.Animation).play("FaceMask2");
          this.CucumberLeft.getComponent(cc.Animation).play("CucumHide");
          this.CucumberRight.getComponent(cc.Animation).play("CucumHide");
        }, 1);

        this.scheduleOnce(() => {
          this.FaceAcne.active = true;
        }, 2);

        this.scheduleOnce(() => {
          this.Emoji.active = true;
          this.AudioManager.playCrySound();
        }, 3)

        this.scheduleOnce(() => {
          this.TryAgainBtn.active = true;

          if(rotate) {
            this.TryAgainBtn.getComponent(cc.Animation).play("TryAgainBtn");
          } else {
            this.TryAgainBtn.getComponent(cc.Animation).play("TryAgainBtn2");
          }
          
          this.AudioManager.playEndSound();

          // this.background.on("touchend", () => {
          //   this.AudioManager.playButtonClickSound();
          //   cc.audioEngine.stopAll();
          //   const GameController = this.getComponent("GameController");
          //   GameController.installHandle();
          // });

        }, 4);
      }
    }
  },

  onLoad() {
    this.AudioManager = this.getComponent("AudioManager");
    this.AudioManager.playbgSound()

    this.CreamEmptyNode.on("touchstart", () => {
      this.Hand.active = false;
    });

    this.CreamEmptyNode.on("touchmove", (e) => {
      this.startPos = e.touch.getLocation();
      if (
        this.ImpactArea.getBoundingBox().intersects(
          this.CreamEmptyNode.getBoundingBox()
        )
      ) {
        this.setImpactObjects(flag, "CreamSpine", 0);
        flag = false;
      }
      this.CreamSpine.setPosition(
        this.startPos.x - cc.winSize.width / 2 - 50,
        this.startPos.y - cc.winSize.height / 2 - 50
      );
      this.CreamEmptyNode.setPosition(
        this.startPos.x - cc.winSize.width / 2,
        this.startPos.y - cc.winSize.height / 2
      );
    });

    this.SpongeEmptyNode.on("touchstart", () => {
      cc.audioEngine.stopAll();
      const GameController = this.getComponent("GameController");
      GameController.installHandle();
    });

    this.scheduleOnce(() => {
      this.CreamBox.getComponent(cc.Animation).play("CreamBox2");
    }, 1);

    this.CreamBox.on("touchstart", () => {
      this.AudioManager.playButtonClickSound();
      this.BoxChat.getComponent(cc.Animation).play("boxChat2");
      this.CreamBox.getComponent(cc.Animation).play("CreamBox3");
      this.CreamBox.active = false;

      this.scheduleOnce(() => {
        this.CreamSpine.active = true;
        this.CreamEmptyNode.active = true;
        this.scheduleOnce(() => {
          this.AudioManager.playWaterDropSound();
        }, 1);
      }, 1);

      this.scheduleOnce(() => {
        this.CreamSpine.getComponent("sp.Skeleton").setAnimation(
          0,
          "Action",
          true
        );
        this.Hand.active = true;
        if(rotate) {
          this.Hand.getComponent(cc.Animation).play("Hand2");
        } else {
          this.Hand.getComponent(cc.Animation).play("Hand");
        }
      }, 3);
    });

    this.TryAgainBtn.on("touchstart", () => {
      this.AudioManager.playButtonClickSound();
      cc.audioEngine.stopAll();
      const GameController = this.getComponent("GameController");
      GameController.installHandle();
    });

    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      rotate = false;
      this.CreamEmptyNode.y = -40;
      this.CreamSpine.y = -105;
      this.SpongeEmptyNode.y = -37;
      this.SpongeSpine.y = -37;
      this.BoxChat.x = 50;
      this.BoxChat.y = 160;
      this.Base.scaleX = 0.29;
      this.Base.scaleY = 0.29;
    } else {
      rotate = true;
      this.CreamEmptyNode.y = 25;
      this.CreamSpine.y = -40;
      this.SpongeEmptyNode.y = -30;
      this.SpongeSpine.y = 28;
      this.BoxChat.x = 100;
      this.BoxChat.y = 250;
      this.Base.scaleX = 0.36;
      this.Base.scaleY = 0.36;
    }
  },

  update(dt) {
    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      this.Base.scaleX = 0.29;
      this.Base.scaleY = 0.29;
      this.ImpactArea.y = 0;
    } else {
      this.Base.scaleX = 0.36;
      this.Base.scaleY = 0.36;
      this.ImpactArea.y = 36;
    }
  },
});
