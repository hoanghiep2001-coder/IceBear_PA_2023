cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable (){
        this.scheduleOnce(function() {
            this.disableCollision();
        }, 0.15);
    },

    // update (dt) {},

    disableCollision(){
        this.node.active = false;
    },

    onCollisionEnter: function (other, self) {
        cc.log("Attack Box Stick: " , other.node.group);
        if(other.node.group == "Enemy"){
            console.log("Hit Enemy");
        }
    },
});
