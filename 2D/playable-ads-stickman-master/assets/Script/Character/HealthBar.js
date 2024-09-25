cc.Class({
    extends: cc.Component,

    properties: {
        FillSprite: cc.Sprite,
        HealthText: {
            default: null,
            type: cc.Label,
            serializable: true,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this._maxHP = 0;
        // this._currentHP = 0;
    },

    start () {
        
    },

    update (dt) {
        // this.updateHealthText();
    },

    init(hp){
        this._maxHP = hp;
        this._currentHP = hp;

        this.FillSprite.fillStart = 1;
        this.FillSprite.fillRange = -1;

        this.updateHealthText();
    },

    setHP(hp){
        this._currentHP = hp;

        // this.FillSprite.fillStart = this._currentHP / this._maxHP;
        cc.tween(this.FillSprite)
        .to (0.25, {fillStart: this._currentHP / this._maxHP})
        .start();

        this.updateHealthText();
    },

    decrement(damp){
        let currentHp = this._currentHP - damp;
        if(currentHp < 0) currentHp = 0;
        this.setHP(currentHp);
    },

    updateHealthText(){
        if(this.HealthText == null) return;
        this.HealthText.string = (this._currentHP) + "/" + (this._maxHP);
    },

    isAlive(){
        return this._currentHP > 0;
    }
    
});
