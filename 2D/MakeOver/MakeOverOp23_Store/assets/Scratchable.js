import GamePlay from "./GamePlay";

cc.Class({
  extends: cc.Component,

  properties: {
    isWin: cc.Boolean,
    eraserRadius: {
      type: cc.Int,
      default: 60,
    },
  },

  start: function () {
    // console.log(GamePlay);
    this.audioManager = this.node.parent.getComponent("AudioManager");
    this.percentToWin = 0.6;
    let mask = this.getComponentInChildren(cc.Mask);
    this.graphics = mask._graphics;
    this.graphics.fillColor = cc.color(255, 255, 255, 0);
    this.reset();
  },

  calculateProgress() {
    if (!this.isScratchable) {
      return;
    }
    let hitItemCount = 0;
    this.polygonPointsList.forEach((item) => {
      if (!item.isHit) return;
      hitItemCount += 1;
    });
    this.progress = hitItemCount / this.polygonPointsList.length;
    // cc.log("Progress: ", this.progress * 100);

    if (this.progress >= this.percentToWin) {
      this.isWin = true;
    }

    if (this.isWin) {
      this.fillInstantly();
      this.completed = true;
      this.isScratchable = false;
      this.node.dispatchEvent(new cc.Event.EventCustom("completed", this));
    }
  },

  reset: function () {
    this.callbackFlag = true;
    this.graphics.clear();
    this.tempDrawPoints = [];
    this.polygonPointsList = [];
    this.progress = 0;
    this.completed = false;
    this.isScratchable = true;
    this.initPolygonList();
  },

  initPolygonList: function () {
    for (let x = 0; x < this.node.width; x += this.eraserRadius) {
      for (let y = 0; y < this.node.height; y += this.eraserRadius) {
        this.polygonPointsList.push({
          rect: cc.rect(
            x - this.node.width / 2,
            y - this.node.height / 2,
            this.eraserRadius,
            this.eraserRadius
          ),
          isHit: false,
        });
      }
    }
  },

  scratchHole: function (pos) {
    // this.audioManager.playCreamWash(true);
    pos = this.node.convertToNodeSpaceAR(pos);
    let stencil = this.graphics;
    const len = this.tempDrawPoints.length;
    this.tempDrawPoints.push(pos);

    this.calculateProgress();
    // this.audioManager.playCreamWash();
    // if (!this.completed) {
    //   this.audioManager.playCreamWash(true);
    // } else {
    //   this.audioManager.playCreamWash(false);
    // }

    if (len <= 1) {
      stencil.circle(pos.x, pos.y, this.eraserRadius / 2);
      stencil.fill();

      this.polygonPointsList.forEach((item) => {
        if (item.isHit) return;
        const xFlag =
          pos.x > item.rect.x && pos.x < item.rect.x + item.rect.width;
        const yFlag =
          pos.y > item.rect.y && pos.y < item.rect.y + item.rect.height;
        if (xFlag && yFlag) item.isHit = true;
      });
    } else {
      let prevPos = this.tempDrawPoints[len - 2];
      let curPos = this.tempDrawPoints[len - 1];

      stencil.moveTo(prevPos.x, prevPos.y);
      stencil.lineTo(curPos.x, curPos.y);
      stencil.lineWidth = this.eraserRadius;
      stencil.lineCap = cc.Graphics.LineCap.ROUND;
      stencil.lineJoin = cc.Graphics.LineJoin.ROUND;
      stencil.strokeColor = cc.color(255, 255, 255, 255);
      stencil.stroke();

      this.polygonPointsList.forEach((item) => {
        item.isHit =
          item.isHit || cc.Intersection.lineRect(prevPos, curPos, item.rect);
      });
    }
  },

  resetProgress: function () {
    this.clearInstantly();
    this.polygonPointsList = [];
    this.tempDrawPoints = [];
    this.progress = 0;
    this.initPolygonList();
  },

  isInBound: function (point) {
    return true;
  },

  clearInstantly: function () {
    this.graphics.clear();
  },

  fillInstantly: function () {
    this.graphics.moveTo(0, 0);
    this.graphics.rect(0, 0, this.node.width, this.node.height);
    this.graphics.fill();
  },
});
