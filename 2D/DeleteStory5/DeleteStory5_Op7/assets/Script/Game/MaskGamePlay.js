const Scratchable = require("Scratchable");

cc.Class({
  extends: cc.Component,

  properties: {
    pointClear: cc.Node,
    isPlayScreamSound: false,
  },

  onLoad() {
   
    this.scratchables = this.getComponentsInChildren(Scratchable);
  },

  update(dt) {
    this.isPlayingGame = this.getComponent("GamePlay").isPlayingGame;

    if (this.pointClear.active && this.isPlayingGame) {
      var point = cc.v2(
        this.pointClear.x + cc.winSize.width / 2,
        this.pointClear.y + cc.winSize.height / 2
      );
      this.scratchables.forEach((scratchable) => {
        if (scratchable.isScratchable && scratchable.isInBound(point)) {
          scratchable.scratchHole(point);
        } else {
        }
      });
    }
  },
});
