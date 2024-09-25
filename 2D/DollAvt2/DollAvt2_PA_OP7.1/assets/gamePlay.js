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
      this.tweezers.x = 150;
      this.tweezers.y = -70;
      this.tweezers.scaleX = 0.3;
      this.tweezers.scaleY = 0.3;
    } else {
      this.tweezers.x = 100;
      this.tweezers.y = -100;
      this.tweezers.scaleX = 0.2;
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
      this.character.scaleX = 0.4;
      this.character.scaleY = 0.4;
      this.emptyNode.x = 35;
      this.emptyNode.y = -70;
      this.word.x = -200;
      this.word.y = 160;
      this.word.scaleX = 0.3;
      this.word.scaleY = 0.3;
      this.realHeight = 480;
      this.realWidth =
        480 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
    } else {
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this.realWidth = 370;
        this.character.scaleX = 0.3;
        this.character.scaleY = 0.3;
        this.emptyNode.x = 26;
        this.emptyNode.y = -114;
        this.word.x = -50;
        this.word.y = 155;
        this.word.scaleX = 0.25;
        this.word.scaleY = 0.25;
      } else {
        this.realWidth = 320;
        this.character.scaleX = 0.3;
        this.character.scaleY = 0.3;
        this.emptyNode.x = 26;
        this.emptyNode.y = -114;
        this.word.x = -50;
        this.word.y = 155;
        this.word.scaleX = 0.25;
        this.word.scaleY = 0.25;
      }
      this.realHeight =
        this.realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);
    }
    this.bg0.width = this.realWidth + 130;
    this.bg0.height = this.realHeight;
  },
});
