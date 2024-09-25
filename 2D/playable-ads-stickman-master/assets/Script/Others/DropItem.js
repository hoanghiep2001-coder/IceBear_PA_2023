var Player3D = require("Player3D");
const GameInfo = require("GameInfo");
var EnWeapon = require("GameEnum").EnWeapon;

cc.Class({
    extends: cc.Component,

    properties: {
        weaponType: {
            default: EnWeapon.None,
            type: EnWeapon,
        },
        weaponIcon: {
            default: null,       
            type: cc.Sprite,
            serializable: true, 
        },
    },

    onLoad () {},

    start () {
        cc.tween(this.weaponIcon.node)
        .repeatForever(
            cc.tween().to(1, {position : cc.v2(0, 7)})
            .to(1, {position : cc.v2(0, 0)}))
        .start();
    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player"){
            this.collectWeapon(other.node.getComponent(Player3D)); 
        }
    },

    collectWeapon(player){
        console.log("Player collect weapon: " + this.weaponType);
        player.changeWeapon(this.weaponType);

        if(this.weaponType == EnWeapon.Sword){
            GameInfo.TutorialDoneStage1 = true;       
        }
        
        if(this.weaponType == EnWeapon.Archer){
            GameInfo.TutorialDoneStage2 = true;
        }

        this.node.destroy();
    }
});
