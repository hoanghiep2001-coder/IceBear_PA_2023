const { Constants } = require("../Data/Constant");

cc.Class({
  extends: cc.Component,

  properties: {
    positionTouch: cc.Vec2,
    flag: false,
    isGameIntro: false,
    isEndGame: false,
    isPlayerDie: false,

    player: cc.Node,
    camera: cc.Node,
    rigidBody: cc.RigidBody,
    GameController: cc.Node,
    tut: cc.Node,
    gamePlay: cc.Node,

    // Hiep Be
    JoyStick: cc.Node,
    Tut_Hand: cc.Node,
    hideMask: cc.Node,
    IRS_hideMask: cc.Node,
    PowerController: cc.Node,
    Btn_CTA: cc.Node,
    Btn_TryAgain: cc.Node,
    Btn_TryAgain_Hand: cc.Node,
  },

  start() {
    this.bodyPlayer = this.player.getChildByName("Body");
    this.levelPlayer = this.player
      .getChildByName("Body")
      .getChildByName("Level");
    this.playerFishSpine = this.bodyPlayer
      .getChildByName("Spine_Fish")
      .getComponent(sp.Skeleton);
    this.isTouched = false;
    this.isPlayGame = false;

    if (this.isGameIntro) {
      this.registerEvent();
      this.tut.getComponent(cc.Animation).play("Tut_ShowAnim");
    } else {
      // ironsource
        this.IRS_hideMask.on(
          cc.Node.EventType.TOUCH_START,
          () => {
            this.GameController.getComponent(
              "GameController"
            ).handleIronSourcePlaySound();
          },
          this
        );

      this.scheduleOnce(() => {
        this.registerEvent();
        // this.onToStore();
        this.tut.getComponent(cc.Animation).play("Tut_ShowAnim");
      }, 3);
    }
  },

  onToStore() {
    this.hideMask.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.GameController.getComponent("GameController").installHandle();
      },
      this
    );
  },

  registerEvent() {
    this.hideMask.on(
      cc.Node.EventType.TOUCH_START,
      this.onHideMaskTouchStart,
      this
    );
    this.hideMask.on(cc.Node.EventType.TOUCH_MOVE, this.moveWithTouch, this);
    this.hideMask.on(
      cc.Node.EventType.TOUCH_CANCEL,
      this.onHideMaskTouchEnd,
      this
    );
    this.hideMask.on(
      cc.Node.EventType.TOUCH_END,
      this.onHideMaskTouchEnd,
      this
    );
  },

  onHideMaskTouchStart(event) {
    this.tut.getComponent(cc.Animation).stop("Tut_ShowAnim");
    if (this.tut.active) {
      this.tut.opacity = 0;
      this.player.getComponent("PlayerController").isMove = true;
    }

    this.playerFishSpine.setAnimation(0, "eat", true);
    this.isPlayGame = true;
    this.isTouched = true;
    this.JoyStick.opacity = 100;
    this.JoyStick.getComponent("JoyStick").stickStart(event);
    this.JoyStick.getComponent("JoyStick").handleFixCircleCldFishes();
    this.GameController.getComponent("GameController").isStartGame = false;
  },

  onHideMaskTouchEnd(event) {
    this.playerFishSpine.setAnimation(0, "idle", true);
    this.isTouched = false;
    this.JoyStick.opacity = 0;
    this.JoyStick.getComponent("JoyStick").stickEnd(event);

    this.scheduleOnce(() => {
      if (this.isTouched) {
        return;
      }
      this.tut.getComponent(cc.Animation).play("Tut_ShowAnim");
    }, 3);
  },

  offEvent() {
    this.hideMask.off(cc.Node.EventType.TOUCH_START);
    this.hideMask.off(cc.Node.EventType.TOUCH_MOVE);
    this.hideMask.off(cc.Node.EventType.TOUCH_END);
    this.hideMask.off(cc.Node.EventType.TOUCH_CANCEL);
  },

  handleTransforming() {
    if (
      this.PowerController.getComponent("PowerController").isTransforming &&
      !this.flag
    ) {
      this.flag = true;
      this.offEvent();
      console.log("off");
      return;
    }

    if (
      !this.PowerController.getComponent("PowerController").isTransforming &&
      this.flag &&
      !this.PowerController.getComponent("PowerController").isLevel3
    ) {
      this.flag = false;
      this.registerEvent();
      console.log("register");
      return;
    }
  },

  moveWithTouch(event) {
    this.JoyStick.getComponent("JoyStick").stickStart(event);
    this.positionTouch = event.getLocation();
    let localTouchPos = this.node.convertToNodeSpaceAR(this.positionTouch);
    this.positionTouch = localTouchPos;

    this.positionTouch.x += this.camera.x;
    this.positionTouch.y += this.camera.y;

    var anglePlayer = cc.misc.radiansToDegrees(
      Math.atan(
        (this.player.y - localTouchPos.y) / (this.player.x - localTouchPos.x)
      )
    );

    this.bodyPlayer.angle = anglePlayer;
    this.player.getComponent("PlayerController").move();

    if (this.player.x - localTouchPos.x > 0) {
      this.bodyPlayer.scaleX = 1;
      this.levelPlayer.scaleX = 0.5;
    } else {
      this.bodyPlayer.scaleX = -1;
      this.levelPlayer.scaleX = -0.5;
    }
  },

  handleCheckPlayerIsLv3() {
    if (this.player.getComponent("PlayerController").isLevel3) {
      this.tut.active = false;
    }
  },

  handleInstall() {
    if (
      this.PowerController.getComponent("PowerController").isLevel3 &&
      !this.isEndGame
    ) {
      this.isEndGame = true;

      // others
      this.Btn_CTA.on(
        cc.Node.EventType.TOUCH_START,
        () => {
          this.GameController.getComponent("GameController").installHandle();
        },
        this
      );

      // mtg & applovin
      // this.hideMask.on(
      //   cc.Node.EventType.TOUCH_START,
      //   () => {
      //     this.GameController.getComponent("GameController").installHandle();
      //   },
      //   this
      // );
    }
  },

  handleShowTryAgain() {
    if (!this.isEndGame && this.isPlayerDie) {
      this.isEndGame = true;

      this.Btn_TryAgain.getComponent(cc.Animation).play("Btn_CTAAnim");
      this.Btn_TryAgain_Hand.getComponent(cc.Animation).play("Btn_HandAnim");

      // others
      this.Btn_TryAgain.on(
        cc.Node.EventType.TOUCH_START,
        () => {
          this.GameController.getComponent("GameController").installHandle();
        },
        this
      );

      // mtg & applovin
      // this.hideMask.on(
      //   cc.Node.EventType.TOUCH_START,
      //   () => {
      //     this.GameController.getComponent("GameController").installHandle();
      //   },
      //   this
      // );
    }
  },

  update(dt) {
    this.handleTransforming();
    this.handleCheckPlayerIsLv3();
    this.handleInstall();
    this.handleShowTryAgain();

    // if (!this.player.getComponent("PlayerController").isLive) {
    //     this.hideMask.off(cc.Node.EventType.TOUCH_START);
    //     this.hideMask.off(cc.Node.EventType.TOUCH_MOVE);
    // }
  },
});
