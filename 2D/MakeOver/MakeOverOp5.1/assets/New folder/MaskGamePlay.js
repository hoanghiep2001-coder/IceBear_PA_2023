const Scratchable = require("Scratchable");

cc.Class({
  extends: cc.Component,

  properties: {
    pointClear: cc.Node,
  },

  onLoad() {
    this.scratchables = this.getComponentsInChildren(Scratchable);
    // console.log(this.scratchables);
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
          //   console.log(this.scratchables.isWin);
        }
      });
      // console.log(point.x+" - "+point.y);
    }
  },
});
