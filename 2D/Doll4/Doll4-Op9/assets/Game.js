
cc.Class({
    extends: cc.Component,

    properties: {
        //audio
        audioClick: cc.AudioClip,
        audioBgMusic: cc.AudioClip,
        audioCry: cc.AudioClip,
        audioWin: cc.AudioClip,

        character: cc.Node,
        characterStart: cc.Node,
        dollFinish1: cc.Node,
        dollFinish2: cc.Node,

        itemButton1: cc.Button,
        itemButton2: cc.Button,

        

    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.itemSelected = 1;
        this.step = 1;
        this.isCanClick = true;

        this.scheduleOnce(function () {
            this.characterStart.active = true;
            this.playAudio(this.audioCry);

            this.scheduleOnce(function(){
                this.itemButton1.node.parent.active = true;
            }, 4)
            
        }, 3.5);


    },

    clickItem1() {
        this.itemSelected = 1;
        this.setupCharacter();
    },

    clickItem2() {
        this.itemSelected = 2;
        this.setupCharacter();
    },

    setupCharacter(){
        if(this.isCanClick){
            if(this.step == 1){
                
                this.playAudio(this.audioClick);
                this.playAudio(this.audioWin);
                if(this.itemSelected == 1){
                    this.dollFinish1.active = true;
                }else{
                    this.dollFinish2.active = true;
                }
                this.itemButton1.node.parent.getComponent(cc.Animation).play("ItemAnim2");
            }else {
                this.installHandle();
            }
        }
        
        this.isCanClick = false;
        this.scheduleOnce(function(){
            this.isCanClick = true;
        }, 1.5)
        this.step = 2;
    },


    start() {
        // this.playAudio(this.audioBgMusic);
        window.gameReady && window.gameReady();
    },


    onFinish() {
        window.gameEnd && window.gameEnd();
    },

    installHandle: function () {
        this.onFinish()
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
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.makeupbattle.dressup");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id1627374569?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.makeupbattle.dressup");
            return;
        }
        // If ad network is mindword. window alway avaiable so skip undefined check
        window.install && window.install();
    },

    playAudio(audio) {
        if (audio === this.audioClick) {
            cc.audioEngine.play(this.audioClick, false, 1)
        } else if (audio === this.audioCry) {
            cc.audioEngine.play(this.audioCry, false, 1)
        } else if (audio === this.audioWin) {
            cc.audioEngine.play(this.audioWin, false, 1)
        } else if (audio === this.audioBgMusic) {
            cc.audioEngine.play(this.audioBgMusic, true, 1)
        }
    },

    stopAudio() {
        cc.audioEngine.stopAll();
    },

    // update (dt) {},

});
