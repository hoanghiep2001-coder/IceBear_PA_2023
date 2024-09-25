
cc.Class({
    extends: cc.Component,

    properties: {
        Icon: cc.Sprite,
        SwordSprite: cc.SpriteFrame,
        ArcherSprite: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    // update (dt) {},

    setSword(){
        this.Icon.spriteFrame = this.SwordSprite;
    },

    setArcher(){
        this.Icon.spriteFrame = this.ArcherSprite;
    }
});
