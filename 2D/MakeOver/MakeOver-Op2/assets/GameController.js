
cc.Class({
    extends: cc.Component,

    properties: {

        installButton: cc.Button,
        installPopup: cc.Node,
        
       // audio
       audioWin: cc.AudioClip,
       audioClick: cc.AudioClip,
       audioBgMusic: cc.AudioClip,
       audioSave: cc.AudioClip,
       audioLose: cc.AudioClip,
       audioScissor: cc.AudioClip,
       audioShave: cc.AudioClip,
    },

    playAudio(audio){
        if(audio === this.audioClick){
            cc.audioEngine.play(this.audioClick, false, 1)
        }else if(audio === this.audioWin){
            cc.audioEngine.play(this.audioWin, false, 1)
        }else if(audio === this.audioBgMusic){
            cc.audioEngine.play(this.audioBgMusic, true, 1)
        }else if(audio === this.audioSave){
            cc.audioEngine.play(this.audioSave, false, 1)
        }else if(audio === this.audioLose){
            cc.audioEngine.play(this.audioLose, false, 1)
        }else if(audio === this.audioScissor){
            this.audioScissorID = cc.audioEngine.play(this.audioScissor, true, 1)
        }else if(audio === this.audioShave){
            this.audioShave = cc.audioEngine.play(this.audioShave, true, 1)
        }
    },

    stopAudioScissor(){
        cc.audioEngine.stop(this.audioScissorID);
        cc.audioEngine.stop(this.audioShave);
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

    installHandle: function () {
        this.onFinish();
        this.playAudio(this.audioClick);
        this.stopAudio();

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
                mraid.open("https://play.google.com/store/apps/details?id=com.an.beauty.makeoverasmr");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/com.an.beauty.makeoverasmr?mt=8");
                //mraid.open("https://itunes.apple.com/us/app/id1627374569?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.an.beauty.makeoverasmr");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
        
        
    },

    

    stopAudio(){
        cc.audioEngine.stopAll();
    },

});
