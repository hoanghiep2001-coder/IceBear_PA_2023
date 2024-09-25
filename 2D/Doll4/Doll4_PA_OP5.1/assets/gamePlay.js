cc.Class({
  extends: cc.Component,

  properties: {
    bg0: cc.Node,
    character: cc.Node,
    bgAudio: cc.AudioClip,
    acne1: cc.Node,
    acne2: cc.Node,
    acne3: cc.Node,
    circle: cc.Node,
    circle2: cc.Node,
    tweezers: cc.Node,
    tweezers2: cc.Node,
    tweezers3: cc.Node,
    hand: cc.Node,
    hand2: cc.Node,
    startPos: null,
    emptyNode: cc.Node,
    word: cc.Node,
    eye1: cc.Node,
    eye2: cc.Node,
  },

  onLoad() {
    this.realWidth;
    this.realHeight;
    this.tweezers.on("touchmove", (e) => {
      this.startPos = e.touch.getLocation();
      this.tweezers.setPosition(
        this.startPos.x - cc.winSize.width / 2 - 5,
        this.startPos.y - cc.winSize.height / 2
      );
    });

    this.node.on("touchend", (e) => {
      if (
        this.emptyNode
          .getBoundingBox()
          .intersects(this.tweezers.getBoundingBox())
      ) {
        this.tweezers.active = false;
        this.tweezers2.active = true;
        this.acne1.active = false;
        this.acne2.active = true;
        this.acne3.active = true;
        this.hand.active = false;
        this.circle.active = false;

        this.scheduleOnce(() => {
          this.tweezers3.active = true;
          this.hand2.active = true;
          this.circle2.active = true;
        }, 1.4);
      }
    });

    this.tweezers3.on("touchmove", () => {
      cc.audioEngine.stopAll();
      this.getComponent("GameController").installHandle();
    });

    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.tweezers.x = -150;
      this.tweezers.y = -50;
      this.tweezers.scaleX = -0.3;
      this.tweezers.scaleY = 0.3;
      this.eye1.getComponent(cc.Animation).stop("eye");
      this.eye1.getComponent(cc.Animation).play("eye2_sub");
      this.eye2.getComponent(cc.Animation).stop("eye");
      this.eye2.getComponent(cc.Animation).play("eye2");
    } else {
      this.tweezers.x = -110 ;
      this.tweezers.y = -78;
      this.tweezers.scaleX = -0.2;
      this.tweezers.scaleY = 0.2;
    }
  },

  start() {
    this.playAudio(this.bgAudio);
  },

  playAudio(audio) {
    switch (audio) {
      case this.bgAudio:
        this.playBg = cc.audioEngine.play(this.bgAudio, true, 1);
        break;
    }
  },

  update(dt) {
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.character.scaleX = 0.75;
      this.character.scaleY = 0.75;
      this.emptyNode.x = -60;
      this.emptyNode.y = -70;
      this.word.x = 120;
      this.word.y = 180;
      this.realHeight = 480;
      this.realWidth =
        480 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
    } else {
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this.realWidth = 370;
        this.character.scaleX = 0.65;
        this.character.scaleY = 0.65;
        this.emptyNode.x = -50;
        this.emptyNode.y = -92;
        this.word.x = 70;
        this.word.y = 160;
      } else {
        this.realWidth = 320;
        this.character.scaleX = 0.65;
        this.character.scaleY = 0.65;
        this.emptyNode.x = -50;
        this.emptyNode.y = -92;
        this.word.x = 70;
        this.word.y = 160;
      }
      this.realHeight =
        this.realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);
    }
    this.bg0.width = this.realWidth + 130;
    this.bg0.height = this.realHeight;
  },
});
