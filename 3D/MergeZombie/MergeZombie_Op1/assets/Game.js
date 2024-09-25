// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        unit: cc.Node,
        dragTarget: cc.Node,
        field: cc.Node,
        hideMask: cc.Node,
        
        idleAll: cc.Node,
        idleMiddle: cc.Node,
        idleMerged: cc.Node,

        fightAnim: cc.Node,

        // UI component
        btnFight: cc.Button,
        hand: cc.Node,
        handAnim: cc.Animation,

        // Popup
        installPopup: cc.Node,
        btnInstall: cc.Button,

        // audio
        audioClick: cc.AudioClip,
        audioMerge: cc.AudioClip,
        audioWin: cc.AudioClip,
        audioAttack: cc.AudioClip,
        audioBg: cc.AudioClip,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hideMask.active = false;
        let touchDown = false;
        let startX = this.unit.x;
        let startY = this.unit.y;

        this.unit.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.installHandle();
            touchDown = true;
        });

        // this.hideMask.on(cc.Node.EventType.TOUCH_START, (() => {
        //     this.installHandle();
        //     touchDown = true;
        // }), this)
    },

    start () {
        // this.playAudio(this.audioBg);
        window.gameReady && window.gameReady();
    },

    onMergeComplete() {

        this.playAudio(this.audioMerge);
        this.unit.active = false;
        this.btnFight.node.active = true;
        this.idleMiddle.active = false;
        this.idleMerged.active = true;

        this.idleAll.active = false;

        this.handAnim.play("HandClick");
    },

    onFight() {
        this.playAudio(this.audioClick);
        this.playAudio(this.audioAttack);

        console.log("On fight!");
        this.field.active = false;
        this.btnFight.node.active = false;
        this.idleAll.active = false;
        this.idleMerged.active = false;
        this.fightAnim.active = true;
        this.hand.active = false;

        this.scheduleOnce(function () {
            // Here `this` is referring to the component
            cc.log("Complete");
            this.onFinish();
        }, 2.6);
    },

    onFinish() {
        this.showInstallPopup();
        window.gameEnd && window.gameEnd();
    },

    showInstallPopup: function () {
        this.playAudio(this.audioWin)
        var self = this
        if (this.installPopup) {
           self.installPopup.active = true;
        }
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
            cc.audioEngine.play(this.audioClick, false, 0.5)
        }else if(audio === this.audioMerge){
            cc.audioEngine.play(this.audioMerge, false, 0.5)
        }else if(audio === this.audioWin){
            cc.audioEngine.play(this.audioWin, false, 0.5)
        }else if(audio === this.audioAttack){
            cc.audioEngine.play(this.audioAttack, false, 0.5)
        }else if(audio === this.audioBg){
            cc.audioEngine.play(this.audioBg, true, 0.5)
        }

    },
    

    // update (dt) {},
});
