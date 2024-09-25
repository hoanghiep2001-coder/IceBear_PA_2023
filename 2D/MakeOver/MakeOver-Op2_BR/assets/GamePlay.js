const Scratchable = require("Scratchable");

cc.Class({
  extends: cc.Component,

  properties: {
    gc: cc.Node,
    characterContainer: cc.Node,
    itemContainer: cc.Node,
    actionContainer: cc.Node,
    handTut: cc.Node,
    installFull: cc.Node,

    pointClear: cc.Node,
    hair: cc.Node,
    isRotate: false,

    hairSratchable: cc.Node,
  },

  onLoad() {

    if(cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
    } else {
      this.isRotate = false;
    }

    this.gameController = this.gc.getComponent("GameController");
    this.scheduleOnce(function () {
      this.gameController.playAudio(this.gameController.audioBgMusic);
    }, 1);

    this.itemSelected = 0;
    this.isCanClick = false;
    this.step = 1;
    this.scheduleOnce(function () {
      this.isCanClick = true;
      if(this.isRotate) {
        this.hairSratchable.getComponent(cc.Animation).play("ScaleHairWithRotate")
        this.characterContainer.getComponent(cc.Animation).play("CharacterZoomWithRotate");
      } else {
        this.hairSratchable.getComponent(cc.Animation).play("ScaleHairNoRotate")
        this.characterContainer.getComponent(cc.Animation).play("CharacterZoomNoRotate");
      }
    }, 2);

    this.scratchables = this.getComponentsInChildren(Scratchable);
  },

  clickItem1() {
    this.itemSelected = 1;
    this.setupCharacter();
  },

  clickItem2() {
    this.itemSelected = 2;
    this.setupCharacter();
  },

  setupCharacter() {
    if (this.isCanClick) {
      if (this.step == 1) {
        this.handTut.active = false;

        this.gameController.playAudio(this.gameController.audioClick);
        if (this.itemSelected == 1) {
          this.actionContainer.getComponent(cc.Animation).play("ActionAnim1");
          this.gameController.playAudio(this.gameController.audioScissor);
          this.scheduleOnce(function () {
            this.pointClear.active = true;
          }, 0.3);
        } else {
          this.actionContainer.getComponent(cc.Animation).play("ActionAnim2");
          this.characterContainer
            .getComponent(cc.Animation)
            .play("CharacterAnim2");
          this.gameController.playAudio(this.gameController.audioShave);
          this.scheduleOnce(function () {
            this.pointClear.active = true;
          }, 0.5);
        }

        this.scheduleOnce(function () {
          this.gameController.stopAudioScissor();
          this.hair.active = false;
          this.scheduleOnce(function () {
            this.gameController.playAudio(this.gameController.audioLose);
          }, 0.5);
        }, 3);

        this.itemContainer.getComponent(cc.Animation).play("ItemAnim2");

        this.step = 2;
        this.isCanClick = false;
        this.scheduleOnce(function () {
          this.isCanClick = true;
        }, 4);

        // CLICK FULL SCREEN FOR MINDWORK AND APPLOVIN
        this.installFull.active = true;
      } else {
        this.gameController.installHandle();
      }
    }
  },

  update(dt) {
    if (this.pointClear.active) {
      var point = cc.v2(
        this.pointClear.x + cc.winSize.width / 2,
        this.pointClear.y + cc.winSize.height / 2
      );

      this.scratchables.forEach((scratchable) => {
        if (scratchable.isScratchable && scratchable.isInBound(point)) {
          scratchable.scratchHole(point);
          scratchable.calculateProgress();
        }
      });

      //console.log(point.x+" - "+point.y);
    }
  },
});
