const CONST = require("CONST");

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._isLanching = false;
        this._speed = CONST.StickArrowSpeed;
        this._normalize = cc.v2(0,0);
    },

    start () {
        
    },

    Launch(normalize){
        this._isLanching = true;
        this._normalize = normalize;

        this.node.angle = 1 * this.convertRad2Deg(Math.atan2(this._normalize.y, this._normalize.x));

        cc.log(this._speed, this.node.angle);
    },

    update (dt) {
        if(!this._isLanching) return;

        this.node.setPosition(this.node.x + this._normalize.x * this._speed * 10 * dt, this.node.y + this._normalize.y * this._speed * 10 * dt);
    },

    hitEnemy(){
        console.log("Arrow Hit Enemy");
        // enemy.hit();
        this.node.destroy();
    },

    hitPlatform(){
        console.log("Arrow Hit Platform");
        this._isLanching = false;
        this.node.destroy();
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "Enemy"){
            this.hitEnemy();
        } else if(other.node.group == "Solid"){
            this.hitPlatform();
        }
    },

    convertRad2Deg(radians){
        var pi = Math.PI;
        return radians * (180/pi);
    },
});
