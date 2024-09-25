
cc.Class({
    extends: cc.Component,

    properties: {

        installButton: cc.Button,
        installPopup: cc.Node,
        
       // audio
       audioClick: cc.AudioClip,
       audioMerge: cc.AudioClip,
       audioLose: cc.AudioClip,
       audioAttack1: cc.AudioClip,
       audioAttack2: cc.AudioClip,
       audioPurchase:cc.AudioClip,
       audioBgMusic: cc.AudioClip,

        Id_Android: cc.String,
        Id_IOS: cc.String,
        
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
        console.log("install`");
        // this.playAudio(this.audioClick);
        cc.audioEngine.stopAll();
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
        if (typeof(mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.mergeplants.mergezombie");
                return;
            }                     

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id11641830898?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.mergeplants.mergezombie");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    },

    playAudio(audio){
        if(audio === this.audioClick){
            cc.audioEngine.play(this.audioClick, false, 1)
        }else if(audio === this.audioMerge){
            cc.audioEngine.play(this.audioMerge, false, 1)
        }else if(audio === this.audioLose){
            cc.audioEngine.play(this.audioLose, false, 1)
        }else if(audio === this.audioAttack1){
            cc.audioEngine.play(this.audioAttack1, false, 1)
        }else if(audio === this.audioAttack2){
            cc.audioEngine.play(this.audioAttack2, false, 1)
        }else if(audio === this.audioPurchase){
            cc.audioEngine.play(this.audioPurchase, false, 1)
        }else if(audio === this.audioBgMusic){
            cc.audioEngine.play(this.audioBgMusic, true, 0.5)
        }
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },

    // update(dt){
       
    // }

});
