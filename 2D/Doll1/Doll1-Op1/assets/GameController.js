const { Constants } = require("./Data/Constant");

cc.Class({
    extends: cc.Component,

    properties: {

        installButton: cc.Button,
        installPopup: cc.Node,
        
       // audio
       audioWin: cc.AudioClip,
       audioClick: cc.AudioClip,
       audioBgMusic: cc.AudioClip,

    },


    onLoad () {
        this.installButton.node.on("click", this.installHandle, this);

    },

    start () {
        window.gameReady && window.gameReady();
    },

    onFinish() {
        window.gameEnd && window.gameEnd();
    },

    showPopupInstall(){
        this.installPopup.active = true;
        this.onFinish();
    },

    start () {
        window.gameReady && window.gameReady();
    },

    onFinish() {
        window.gameEnd && window.gameEnd();
    },

    installHandle: function () {
        
        this.stopAudio();
        console.log("install");
        Constants.ironSource.isEndGame = true;
        window.gameEnd && window.gameEnd();
        

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
                mraid.open("https://play.google.com/store/apps/details?id=com.chibidoll.donnastar");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id1586572421?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.chibidoll.donnastar");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    },

    playAudio(audio){
        if(Constants.ironSource.SoundState) {
            if(audio === this.audioClick){
                cc.audioEngine.play(this.audioClick, false, 1)
            }else if(audio === this.audioWin){
                cc.audioEngine.play(this.audioWin, false, 1)
            }else if(audio === this.audioBgMusic){
                cc.audioEngine.play(this.audioBgMusic, true, 1)
            }
        }
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },

});
