cc.Class({
    editor: {
        requireComponent: sp.Skeleton
    },

    extends: cc.Component,

    properties: {
        level: cc.Integer,
        skeleton: sp.Skeleton,
    },

    start() {
        this.animationStart = "level" + this.level + "_a";
        this.animationEnd = "level" + this.level + "_c";
        
        this.playAnimationStart();
    },

    playAnimationStart: function() {
        this.skeleton.setAnimation(0, this.animationStart, true);
    },

    playAnimationEnd: function() {
        this.skeleton.setAnimation(0, this.animationEnd, true);
    }
});