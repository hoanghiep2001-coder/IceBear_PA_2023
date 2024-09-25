var Player3D = require("Player3D");
const CONST = require("CONST");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

    },

    start () {
        
    },

    update (dt) {

    },

    onEnable() {
        this.scheduleOnce(function() {
            this.disableCollision();
        }, 0.15);
    },

    disableCollision(){
        this.node.active = false;
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player"){
            other.getComponent(Player3D).hit(CONST.ZombieBaseAttack);
        }
    },
});
