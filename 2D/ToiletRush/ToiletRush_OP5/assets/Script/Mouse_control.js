
cc.Class({
    extends: cc.Component,

    properties: {
        
        Main_Control: require('Main_game')

    },

    onLoad () {

    },

    onBeginContact(contact, selfCollider , otherCollider ) {

        this.Main_Control.FlagRemoveDraw = otherCollider.node.name;

        if(otherCollider.node.name == 'Boy2') {
            this.Main_Control.ToiletBlackBoyActive();
        }else if(otherCollider.node.name == 'Girl') {
            this.Main_Control.ToiletBlackGirlActive();
        }
            
    },

    onEndContact(contact, selfCollider , otherCollider) {

        this.Main_Control.FlagRemoveDraw = null;

    }

    // update (dt) {},
});
