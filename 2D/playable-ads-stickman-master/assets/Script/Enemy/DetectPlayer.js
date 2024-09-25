cc.Class({
    extends: cc.Component,

    properties: {
        IsDetectPlayer: false
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        this.IsDetectPlayer = true;
    },

    onCollisionExit: function (other, self) {
        this.IsDetectPlayer = false;
    }
});
