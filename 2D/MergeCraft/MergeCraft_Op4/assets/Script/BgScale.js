cc.Class({
  extends: cc.Component,

  properties: {},

  // onLoad () {},

  start() {},

  update(dt) {
    this.setFitSize();
  },

  setFitSize() {
    let bgWidth = this.node.width;
    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width != bgWidth) {
      this.node.width = screen_width;
      this.node.height = screen_height;
      // console.log("check");
    }

    if (screen_width < screen_height) {
      this.node.width = screen_width + 100;
      // console.log("check2");
    }
  },
});
