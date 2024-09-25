cc.Class({
    extends: cc.Component,

    properties: {
        isWin: cc.Boolean,
        eraserRadius: {
            type: cc.Int,
            default: 60
        },
    },

    start: function () {
        let mask = this.getComponentInChildren(cc.Mask);
        this.graphics = mask._graphics;
        this.graphics.fillColor = cc.color(255, 255, 255, 0);
        this.reset();

        if (!this.percentToWin) {
            this.percentToWin = 0.7;
        }
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
        //console.log("Progress: "+this.polygonPointsList.length);
        this.progress = hitItemCount / this.polygonPointsList.length;
        console.log("Progress: "+hitItemCount+" -- ", this.progress * 100);

        if (this.isWin && this.progress >= this.percentToWin) {
            this.fillInstantly();
            this.completed = true;
            this.isScratchable = false;
            this.node.dispatchEvent( new cc.Event.EventCustom('completed', this) );
        } else {
            //this.resetProgress();
        }
    },

    reset: function () {
        this.graphics.clear();
        this.tempDrawPoints = [];
        this.polygonPointsList = [];
        this.progress = 0;
        this.completed = 0;
        this.isScratchable = true;
        this.initPolygonList();
    },

    initPolygonList: function() {
        //console.log("initPolygonList: "+this.node.width+" - "+this.eraserRadius);
        for (let x = 0; x < this.node.width; x += this.eraserRadius) {
            for (let y = 0; y < this.node.height; y += this.eraserRadius) {
                this.polygonPointsList.push({
                    rect: cc.rect(x - this.node.width / 2, y - this.node.height / 2, this.eraserRadius, this.eraserRadius),
                    isHit: false
                });
            }
        }
    },

    scratchHole: function (pos) {
        pos = this.node.convertToNodeSpaceAR(pos);
        let stencil = this.graphics;
        const len = this.tempDrawPoints.length;
        this.tempDrawPoints.push(pos);

        if (len <= 1) {
            stencil.circle(pos.x, pos.y, this.eraserRadius / 2);
            stencil.fill();

            this.polygonPointsList.forEach((item) => {
                if (item.isHit) return;
                const xFlag = pos.x > item.rect.x && pos.x < item.rect.x + item.rect.width;
                const yFlag = pos.y > item.rect.y && pos.y < item.rect.y + item.rect.height;
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
                item.isHit = item.isHit || cc.Intersection.lineRect(prevPos, curPos, item.rect);
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
        this.graphics.moveTo(0,0);
        this.graphics.rect(0, 0, this.node.width, this.node.height);
        this.graphics.fill();
    }
});