
cc.Class({
    extends: cc.Component,

    properties: {

        installPopup: cc.Node,
        installButton: cc.Button,
        
       // audio
       audioFlapSort: cc.AudioClip,
       audioFlap: cc.AudioClip,
       audioTweet: cc.AudioClip,
       audioWin: cc.AudioClip,
       audioClick: cc.AudioClip,
       audioBgMusic: cc.AudioClip,

       progressSprite: cc.Sprite,
       eggProgres: cc.Node,
       tapToSort: cc.Node,
       handTut: cc.Node,

       branchButtonLeft2: cc.Button,
       branchButtonLeft3: cc.Button,
       branchButtonRight1: cc.Button,
       branchButtonRight2: cc.Button,
       branchButtonRight3: cc.Button,
    },

    deActiveBranchButton(){
        this.branchButtonLeft2.interactable = false;
        this.branchButtonLeft3.interactable = false;
        this.branchButtonRight1.interactable = false;
        this.branchButtonRight2.interactable = false;
        this.branchButtonRight3.interactable = false;
    },

    activeBranchRight1Button(){
        this.branchButtonRight1.interactable = true;
    },

    activeBranchButton(){
        this.branchButtonLeft2.interactable = true;
        this.branchButtonLeft3.interactable = true;
        this.branchButtonRight1.interactable = true;
        this.branchButtonRight2.interactable = true;
        this.branchButtonRight3.interactable = true;
    },

    updateProgress(){
        this.schedule(function(){
            this.progressSprite.fillRange += 0.01;
            this.eggProgres.x += 1.7;
        }, 0.02, 34, 0)
        
    },

    onLoad () {
        this.installButton.node.on("click", this.installHandle, this);
        this.deActiveBranchButton();
        this.handTut.active = false;
        this.scheduleOnce(function(){
            this.handTut.active = true;
        }, 2.5);
    },

    showPopupInstall(){
        this.tapToSort.active = false;
        this.installPopup.active = true;
        this.playAudio(this.audioWin);
        this.onFinish();
    },

    start () {
        window.gameReady && window.gameReady();
        
    },

    onFinish() {
        window.gameEnd && window.gameEnd();
    },

    installHandle: function () {
        console.log(("install"));
        // this.playAudio(this.audioClick);
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
                mraid.open("https://play.google.com/store/apps/details?id=com.birdsort.colorpuzzle");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                //mraid.open("https://itunes.apple.com/us/com.birdsort.colorpuzzle?mt=8");
                mraid.open("https://itunes.apple.com/us/app/id1629383984?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.birdsort.colorpuzzle");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    },

    playAudio(audio){
        if(audio === this.audioClick){
            cc.audioEngine.play(this.audioClick, false, 1)
        }if(audio === this.audioTweet){
            cc.audioEngine.play(this.audioTweet, false, 1)
        }else if(audio === this.audioFlapSort){
            cc.audioEngine.play(this.audioFlapSort, false, 1)
        }else if(audio === this.audioFlap){
            cc.audioEngine.play(this.audioFlap, false, 1)
        }else if(audio === this.audioWin){
            cc.audioEngine.play(this.audioWin, false, 1)
        }else if(audio === this.audioBgMusic){
            cc.audioEngine.play(this.audioBgMusic, true, 1)
        }
        
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },

});
