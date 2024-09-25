const Scratchable = require("Scratchable");

cc.Class({
  extends: cc.Component,

  properties: {
    pointClear: cc.Node,
    GamePlay: cc.Node,
  },

  onLoad() {
    this.scratchables = this.getComponentsInChildren(Scratchable);
    this.GamePlayComponent = this.GamePlay.getComponent("GamePlay");
  },

  update(dt) {
    if (this.pointClear.active && this.GamePlayComponent.isTouch) {
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
