cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Node,
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

    if (cc.winSize.width > cc.winSize.height) {
      this.tweezers.y = -120;
      this.tweezers.x = 120;
      this.word.x = -120;
      this.word.y = 179;
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
    this.handleFixSizeOfCharacterWhenRotate();
  },

  handleFixSizeOfCharacterWhenRotate() {
    if (cc.winSize.width > cc.winSize.height) {
      this.character.scaleX = 0.4;
      this.character.scaleY = 0.4;
      this.character.x = 0;
      this.character.y = -80;
      this.emptyNode.x = 48;
      this.emptyNode.y = -124;
    } else {
      this.character.scaleX = 0.32;
      this.character.scaleY = 0.32;
      this.character.position.x = 0;
      this.character.position.y = -49;
    }
  },
});
