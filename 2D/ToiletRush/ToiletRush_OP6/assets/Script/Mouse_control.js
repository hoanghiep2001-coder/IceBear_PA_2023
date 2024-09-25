
cc.Class({
    extends: cc.Component,

    properties: {

        Main_Control: require('Main_game'),

        ToStore: require('ToStore'),

    },

    onLoad() {

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        if (this.Main_Control.CountDrawDone == 1) {
            this.ToStore.installHandle();
        }

        this.Main_Control.FlagRemoveDraw = otherCollider.node.name;

        if (otherCollider.node.name == 'Boy2') {
            this.Main_Control.ToiletBlackBoyActive();
            this.Main_Control.Hint1.active = false;
            this.Main_Control.Hand1.active = false;
        } else if (otherCollider.node.name == 'Girl') {
            this.Main_Control.ToiletBlackGirlActive();
            this.Main_Control.Hint2.active = false;
            this.Main_Control.Hand2.active = false;
        }


    },

    onEndContact(contact, selfCollider, otherCollider) {

        this.Main_Control.FlagRemoveDraw = null;

    }

    // update (dt) {},
});
