const { Constants } = require("./Script/Data/constants");

cc.Class({
  extends: cc.Component,

  properties: {
    startPos: null,
    bg: cc.Node,
    modelBefore: cc.Node,

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

    hideMask: cc.Node,
  },

  onLoad() {
    this.hideMask.active = true;
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

    // applovin & mtg
    this.hideMask.on(cc.Node.EventType.TOUCH_START, (event) => {
      if (!this.isCanTouch) return;
      this.startPosition = event.getLocation();
      this.touchDown = true;

      console.log("check");
      this.getComponent("GameController").installHandle();
    })

    // this.node.on(cc.Node.EventType.TOUCH_START, (event) => {

    //   if (!this.isCanTouch) return;
    //   this.startPosition = event.getLocation();
    //   this.touchDown = true;

    //   this.getComponent("GameController").installHandle();
    // });

  },

  initSoap() {
    this.step = 2;
    this.scheduleOnce(function () {
      this.itemContainer.getComponent(cc.Animation).play("ItemContainer2");
      this.characterContainer.getComponent(cc.Animation).play("CharacterAnim2");
      this.faceTut.active = true;
    }, 1);
  },


  handleIronSourcePlaySound() {
    if (Constants.ironSource.isPlayBgSound) {
      return;
    }

    if (Constants.ironSource.SoundState) {
      this.gameController.playAudio(this.gameController.audioBgMusic);
    }

    Constants.ironSource.isPlayBgSound = true;
  },


  handleMuteSoundIronSource() {
    Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

    if (Constants.ironSource.State) {
      if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
        Constants.ironSource.SoundState = true;
        this.gameController.playAudio(this.gameController.audioBgMusic);
      }

      if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
        Constants.ironSource.SoundState = false;
        cc.audioEngine.stopAll();
      }
    }
  },


  update(dt) {

    // this.handleMuteSoundIronSource();

    if (cc.winSize.width > cc.winSize.height) {
      this.acneTut2.x = 40;
      this.acneTut2.y = -80;
      this.textDrag.scale = 0.35;
      this.textDrag.y = 202;
    } else {
      this.acneTut2.x = 38;
      this.acneTut2.y = -85;
      this.textDrag.scale = 0.25;
      this.textDrag.y = 180;
    }
  }
});
