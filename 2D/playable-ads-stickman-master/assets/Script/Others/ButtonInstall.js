
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.tween(this.node)
        .repeatForever(
            cc.tween(this.node)
            .to(0.5, {scale : 0.9})
            .to(0.5, {scale : 1}, { easing: 'elasticOut'})
        ).start();

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function(event){
            cc.tween(this.node).to(0.2, {scale : 0.9}, this).start();
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_UP, function(event){
            cc.tween(this.node).to(0.2, {scale : 1}, this).start();
        }, this);
    },

    // update (dt) {},

    installHandle() {
        // Handle for google playable ads
        cc.log("Click Install Handle");
        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            cc.log("Call exit api")
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            cc.log("Call dapi");
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof(mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.stickman.craftman");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                // mraid.open("https://itunes.apple.com/us/com.stickman.craftman?mt=8");
                mraid.open("https://itunes.apple.com/us/app/id1629824246?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.stickman.craftman");
            return;
        }
        // If ad network is mindword. window alway avaiable so skip undefined check
        window.install && window.install();
    },

});
