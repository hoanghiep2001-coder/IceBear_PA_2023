cc.Class({
  extends: cc.Component,

  properties: {
    startPos: null,
    bg: cc.Node,
    gc: cc.Node,
    acneTut: cc.Node,
    acneTut2: cc.Node,
    acneAnim: cc.Node,
    poke: cc.Node,
    gioi: cc.Node,
    faceTut: cc.Node,
    faceTut2: cc.Node,
    soapAnim: cc.Node,
    itemContainer: cc.Node,
    characterContainer: cc.Node,
    soapFaceAnim: cc.Node,
    textDrag: cc.Node,
    textIntro: cc.Node,
    installFull: cc.Node,
    voinuoc: cc.Node,

    hand: cc.Node,
    needle: cc.Node,
    shower: cc.Node,
  },

  onLoad() {
    this.acneTut2.active = false;
    this.gameController = this.getComponent("GameController");
    this.scheduleOnce(function () {
      this.gameController.playAudio(this.gameController.audioBgMusic);
    }, 1);

    this.isCanTouch = false;
    this.touchDown = false;
    this.step = 1;
    this.flag = false;

    this.scheduleOnce(function () {
      this.isCanTouch = true;
    }, 0.5);

    this.scheduleOnce(function () {
      this.textIntro.active = false;
      this.acneTut.active = true;
      this.acneTut2.active = true;
      this.flag = true;
    }, 3);

    this.initEvent();
  },

  initEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
      if (!this.isCanTouch) return;
      this.startPosition = event.getLocation();
      this.touchDown = true;

      // test rung 
      // if (window.navigator.vibrate) {
      //   window.navigator.vibrate(300);
      // }

      if (this.flag) {
        this.itemContainer.getComponent(cc.Animation).stop("ItemContainer1");
        this.flag = false;
      }
    });

    this.node.on("touchmove", (event) => {
      if (!this.touchDown) return;
      this.hand.active = false;
      if (this.step === 1) {
        this.poke.x = this.startPosition.x - cc.winSize.width / 2;
        this.poke.y = this.startPosition.y - cc.winSize.height / 2 + 30;
        this.textDrag.active = false;
        this.poke.getChildByName("frame_item").active = false;

        if (
          this.poke
            .getBoundingBox()
            .intersects(this.acneTut2.getBoundingBox()) &&
          !this.flag
        ) {
          this.flag = true;
          this.gameController.playAudio(this.gameController.audioClick);
          this.poke.active = false;
          this.acneAnim
            .getComponent(sp.Skeleton)
            .setAnimation(0, "action03_squeze_big", false);
          this.acneTut.active = false;
          this.scheduleOnce(function () {
            this.gameController.playAudio(this.gameController.audioAcne1);
          }, 1);

          this.scheduleOnce(function () {
            this.gioi.active = false;
            this.gameController.playAudio(this.gameController.audioAcne2);
            this.scheduleOnce(function () {
              this.acneAnim.active = false;

              this.initSoap();
            }, 1.3);
            this.flag = false;
          }, 3.2);
        }
      } else if (this.step === 2) {
        this.soapAnim.parent.getChildByName("frame_item").active = false;
        this.soapAnim.parent.x = this.startPosition.x - cc.winSize.width / 2;
        this.soapAnim.parent.y = this.startPosition.y - cc.winSize.height / 2;

        if (
          this.soapAnim.parent
            .getBoundingBox()
            .intersects(this.faceTut2.getBoundingBox()) &&
          !this.flag
        ) {
          this.flag = true;
          this.gameController.playAudio(this.gameController.audioClick);
          this.faceTut.active = false;
          this.soapAnim
            .getComponent(sp.Skeleton)
            .setAnimation(0, "action", true);
          this.itemContainer.getComponent(cc.Animation).play("ItemContainer3");
          this.gameController.playAudio(this.gameController.audioSoap);

          if (cc.winSize.width > cc.winSize.height) {
            this.soapFaceAnim.scaleX = 1.6;
            this.soapFaceAnim.scaleY = 1.6;
            this.soapFaceAnim.active = true;
          } else {
            this.soapFaceAnim.active = true;
          }
          this.scheduleOnce(function () {
            this.gameController.stopAudioSoap();
            this.soapAnim.parent.active = false;
            this.itemContainer
              .getComponent(cc.Animation)
              .play("ItemContainer5");
            this.installFull.active = true;
          }, 3.2);
        }
      }
      this.startPosition = event.getLocation();
    });

    this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
      if (!this.touchDown) return;
      this.touchDown = false;
    });

    this.node.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
      if (!this.touchDown) return;
      this.touchDown = false;
    });

    this.voinuoc.on("touchmove", (event) => {
      this.step = 3;
      this.node.getComponent("GameController").installHandle();
    });
  },

  initSoap() {
    this.step = 2;
    this.scheduleOnce(function () {
      this.itemContainer.getComponent(cc.Animation).play("ItemContainer2");
      this.characterContainer.getComponent(cc.Animation).play("CharacterAnim2");
      this.faceTut.active = true;
    }, 1);
  },

  update(dt) {
    if (cc.winSize.width > cc.winSize.height) {
      this.textDrag.scaleX = 0.4;
      this.textDrag.scaleY = 0.4;
      this.acneTut2.x = 40;
      this.acneTut2.y = -80;
    } else {
      this.textDrag.scaleX = 0.3;
      this.textDrag.scaleY = 0.3;
      this.acneTut2.x = 34;
      this.acneTut2.y = -61;
    }
  },
});
