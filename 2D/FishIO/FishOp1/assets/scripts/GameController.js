
cc.Class({
    extends: cc.Component,

    properties: {

        installPopup: cc.Node,
        installButton: cc.Button,
        
        //audio
        audioClick: cc.AudioClip,
        audioAtk: cc.AudioClip,
        audioUpgrade: cc.AudioClip,
        audioWarning: cc.AudioClip,
        audioBgMusic: cc.AudioClip,
        audioEat: cc.AudioClip,
        audioBossAtk: cc.AudioClip,

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

    playAudio(audio){
        if(audio === this.audioClick){
            cc.audioEngine.play(this.audioClick, false, 0.5)
        }else if(audio === this.audioAtk){
            cc.audioEngine.play(this.audioAtk, false, 0.5)
        }else if(audio === this.audioUpgrade){
            cc.audioEngine.play(this.audioUpgrade, false, 0.5)
        }else if(audio === this.audioWarning){
            cc.audioEngine.play(this.audioWarning, false, 0.5)
        }else if(audio === this.audioBgMusic){
            cc.audioEngine.play(this.audioBgMusic, true, 0.5)
        }else if(audio === this.audioEat){
            cc.audioEngine.play(this.audioEat, false, 0.5)
        }else if(audio === this.audioBossAtk){
            cc.audioEngine.play(this.audioBossAtk, false, 0.5)
        }
    },

    showPopupInstall(){
        this.installPopup.active = true;
        this.onFinish();
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },


    installHandle (){
        this.playAudio(this.audioClick);
        this.stopAudio();

        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }
        
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
                mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/com.fishio.hungryfish?mt=8");
                //mraid.open("https://itunes.apple.com/us/app/id1627374569?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
            return;
        }
        // If ad network is mindword. window alway avaiable so skip undefined check
        window.install && window.install();
    },

});
