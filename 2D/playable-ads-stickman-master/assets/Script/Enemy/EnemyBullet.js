var Player3D = require("Player3D");
const CONST = require("CONST");

cc.Class({
    extends: cc.Component,

    properties: {
        DampFactor: 1,
    },

    onLoad () {
        this._isLanching = false;
        this._direction = 0;

        this._speed = 15;
    },

    start () {
        this._isLanching = true;
    },

    Launch(baseDamp, direction){
        this._direction = direction;
        this._baseDamp = baseDamp;

        this.node.scaleX = direction;
    },

    update (dt) {
        if(!this._isLanching) return;

        this.node.setPosition(this.node.getPosition().x + this._speed * 10 * this._direction * dt, this.node.getPosition().y);
    },

    hitPlayer(){
        console.log("Bullet Hit Player");
        this.node.destroy();
    },

    hitPlatform(){
        this._isLanching = false;
        this.node.destroy();
    },

    onCollisionEnter: function (other, self) {
        
        if(other.node.group == "Player"){
            other.getComponent(Player3D).hit(CONST.PoisonVineBaseAttack);
            this.hitPlayer();
        } else if(other.node.group == "Solid"){
            this.hitPlatform();
        }
        
    },
});
