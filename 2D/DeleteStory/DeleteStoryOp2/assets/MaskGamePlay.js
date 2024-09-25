const Scratchable = require("Scratchable");

cc.Class({
  extends: cc.Component,

  properties: {
    pointClear: cc.Node,
    scartchAble: require("Scratchable"),
    sratchNode: cc.Node,
    isDone: false,
    girl1: cc.Node,
    girl2: cc.Node,
    money1: cc.Node,
    money2: cc.Node,
    money3: cc.Node,
    text: cc.Node,
    background: cc.Node,
  },

  onLoad() {
    this.scratchables = this.getComponentsInChildren(Scratchable);
    this.girl2.active = false;
    this.money1.active = false;
    this.money2.active = false;
    this.money3.active = false;
  },

  handleEndGame() {
    if(this.isDone) return;

    this.sratchNode.active = false;
    this.pointClear.active = false;
    this.girl1.active = false;
    this.girl2.active = true;
    this.money1.active = true;
    this.money2.active = true;
    this.money3.active = true;
    this.text.active = false;
    this.node.getComponent(cc.Animation).play("GameAnim");

    this.background.on("touchstart", () => {
      console.log("install");
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
    })
  },

  update(dt) {
    if(this.scartchAble.isWin) {
      this.handleEndGame();
      this.isDone = true;
    }

    if (this.pointClear.active) {
      var point = cc.v2(
        this.pointClear.x + cc.winSize.width / 2,
        this.pointClear.y + cc.winSize.height / 2
      );
      this.scratchables.forEach((scratchable) => {
        if (scratchable.isScratchable && scratchable.isInBound(point)) {
          scratchable.scratchHole(point);
        }
      });
    }
  },
});
