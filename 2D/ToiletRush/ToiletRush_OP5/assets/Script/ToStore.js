
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    start() {
        window.gameReady && window.gameReady();
        console.log('start');
    },

    onFinish() {
        window.gameEnd && window.gameEnd();
    },

    installHandle: function () {

        console.log('ToStore');
        cc.audioEngine.stopAll();
        this.onFinish();

        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }

        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.an.toiletrun.mazerun");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/6447290461?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.an.toiletrun.mazerun");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();

        cc.director.end();

    },

});
