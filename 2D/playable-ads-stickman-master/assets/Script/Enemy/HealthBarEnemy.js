cc.Class({
    extends: cc.Component,

    properties: {
        FillSprite: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this._maxHP = 0;
        // this._currentHP = 0;

        this.nodeParent = this.node.parent.parent;
    },

    start () {
        
    },

    update (dt) {
        if(this.nodeParent.scaleX < 0) this.node.scaleX = -1;
        else this.node.scaleX = 1;
    },

    init(hp){
        this._maxHP = hp;
        this._currentHP = hp;

        this.FillSprite.fillStart = 1;
        this.FillSprite.fillRange = -1;
    },

    setHP(hp){
        cc.log("Enemy Set HP ", hp);
        this._currentHP = hp;
        // this.FillSprite.fillStart = this._currentHP / this._maxHP;
        cc.tween(this.FillSprite)
        .to (0.25, {fillStart: this._currentHP / this._maxHP})
        .start();
    },

    decrement(damp){
        cc.log("Health Bar Enemy ", damp);
        let currentHp = this._currentHP - damp;
        if(currentHp < 0) currentHp = 0;
        this.setHP(currentHp);
    },

    isAlive(){
        return this._currentHP > 0;
    }
});
