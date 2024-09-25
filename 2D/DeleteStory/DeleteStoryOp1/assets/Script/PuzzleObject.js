
const UIController = require("UIController");
const Scratchable = require("Scratchable");
const SpineSprite = require("SpineSprite");
const GroupPuzzle = require("GroupPuzzle");
const GroupResult = require("GroupResult");

cc.Class({
    extends: cc.Component,

    properties: {
        uiController: UIController,
        percentToWin: {
            type: cc.Float,
            default: 0.7
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    onDestroy: function () {
        this._offEvent();
    },

    start() {
        this.isWin = false;
        // Get all scratchable
        this.scratchables = this.getComponentsInChildren(Scratchable);
        this.scratchables.forEach(scratchable => {
            if (scratchable.isWin) {
                scratchable.percentToWin = this.percentToWin;
            }
        });

        var self = this;
        // Listerning to win event
        this.node.on('completed', function (scratchable) {
            self.win();
        });

        // Get all spine animation
        this.spineSprites = this.getComponentsInChildren(SpineSprite);

        this.groupPuzzle = this.getComponentInChildren(GroupPuzzle);
        this.groupResult = this.getComponentInChildren(GroupResult);

        this.groupPuzzle.node.active = true;
        this.groupResult.node.active = false;
        
        this.uiController.setUIOnStart();
    },

    _onTouchBegin: function (event) {
        var point = event.touch.getLocation();

        this.scratchables.forEach(scratchable => {
            if (scratchable.isScratchable && scratchable.isInBound(point)) {
                scratchable.scratchHole(point);
            }
        });

        this.uiController.setUIOnTouchStart(point);
    },

    _onTouchMoved: function (event) {
        var point = event.touch.getLocation();
        
        this.scratchables.forEach(scratchable => {
            if (scratchable.isScratchable && scratchable.isInBound(point)) {
                scratchable.scratchHole(point);
            }
        });
        
        this.uiController.setUIOnTouchMove(point);
    },

    _onTouchEnd: function (event) {
        var point = event.touch.getLocation();
        this.uiController.setUIOnTouchEnd(point);

        this.scratchables.forEach(scratchable => {
            if (scratchable.isScratchable && scratchable.isInBound(point)) {
                scratchable.scratchHole(point);
                scratchable.calculateProgress();
            }
        });
    },

    _onTouchCancel: function (event) {
        cc.log('touchCancel');
    },

    win: function() {
        cc.log("=== Win");
        this._offEvent();

        this.uiController.setUIOnWin();
        
        this.groupPuzzle.node.active = false;
        this.groupResult.node.active = true;

        this.spineSprites.forEach(spineSprite => {
            spineSprite.playAnimationEnd();
        });

        this.uiController.loadNextLevel();
    },

    _offEvent: function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
});
