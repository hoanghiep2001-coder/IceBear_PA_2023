
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
        idleEnemy: cc.Node,
        idleRightStart: cc.Node,
        idleLeftStart: cc.Node,
        idleMiddleStart: cc.Node,
        textFailed: cc.Node,

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
        audioLose: cc.AudioClip,
        audioAttack1: cc.AudioClip,
        audioAttack2: cc.AudioClip,
        audioPurchase:cc.AudioClip,
        audioBgMusic: cc.AudioClip,

        uiSelectCard: cc.Node,

        idleMergedAnim: sp.Skeleton,
        
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cardSelectedIndex = 0;

        this.playAudio(this.audioBgMusic);
        
        let touchDown = false;
        let startX = this.unit.x;
        let startY = this.unit.y;

        this.hideMask.on(cc.Node.EventType.TOUCH_START, (event) => {
            touchDown = true;
            this.installHandle();
        });

        // this.unit.on(cc.Node.EventType.TOUCH_START, (event) => {
        //     touchDown = true;
        //     this.installHandle();
        // });

        // this.unit.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
        //     if(!touchDown) return;
        //     //Get the information of the last point of the touch distance
        //     let delta = event.getDelta();
        //     //Adding qualifications
        //     let minX = -this.unit.parent.width / 2 + this.unit.width / 2;
        //     let maxX = this.unit.parent.width / 2 - this.unit.width / 2;
        //     let minY = -this.unit.parent.height / 2 + this.unit.height / 2;
        //     let maxY = this.unit.parent.height / 2 - this.unit.height / 2;
        //     let moveX = this.unit.x + delta.x;
        //     let moveY = this.unit.y + delta.y;
        //     //Controlling the range of movement
        //     if(moveX < minX){
        //         moveX = minX;
        //     }else if(moveX > maxX){
        //         moveX = maxX;
        //     }
        //     if(moveY < minY){
        //         moveY = minY;
        //     }else if(moveY > maxY){
        //         moveY = maxY;
        //     }
        
        //     this.unit.x = moveX;
        //     this.unit.y = moveY;
        // });

        // this.unit.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     touchDown = false;

        //     let bb = this.unit.getBoundingBox();
        //     console.log("Bounding box: ", bb);
        //     console.log("Target bounding box: ", this.dragTarget.getBoundingBox());

        //     if (bb.intersects(this.dragTarget.getBoundingBox())) {
        //         this.unit.x = this.dragTarget.x;
        //         this.unit.y = this.dragTarget.y;
                
        //         this.onMergeComplete();
        //     } else {
        //         this.unit.x = startX;
        //         this.unit.y = startY;
        //     }
        // });

        // this.unit.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
        //     touchDown = false;
        //     this.unit.x = startX;
        //     this.unit.y = startY;
        // });

        // this.btnFight.node.on('click', this.onFight, this);
        // this.btnInstall.node.on('click', this.installHandle, this);
    },

    start () {
        window.gameReady && window.gameReady();
    },

    onMergeComplete() {
        this.playAudio(this.audioMerge);

        this.idleAll.active = false;
        this.unit.active = false;
        this.btnFight.node.active = true;

        this.idleMerged.active = true;
      
        if(this.cardSelectedIndex == 0){
            this.idleMergedAnim.setAnimation(0,"Idle_Steg", true);
        }else{
            this.idleMergedAnim.setAnimation(0, "Idle_Tank", true);
        }

        this.handAnim.play("HandClick");
    },

    onFight() {
        console.log("On fight!");

        this.playAudio(this.audioClick);
        
        this.idleEnemy.active = false;
        this.field.active = false;
        this.btnFight.node.active = false;
        this.idleAll.active = false;
        this.idleMerged.active = false;
        this.fightAnim.active = true;
        this.hand.active = false;

        if(this.cardSelectedIndex == 0){
            this.fightAnim.getComponent(sp.Skeleton).setAnimation(0,"Dino_Atk", false);
            this.playAudio(this.audioAttack1);
        }else{
            this.fightAnim.getComponent(sp.Skeleton).setAnimation(0, "Tank_Atk", false);
            this.playAudio(this.audioAttack2);
        }

        this.scheduleOnce(function () {
            // Here `this` is referring to the component
            cc.log("Complete");
            this.textFailed.active = true
            this.playAudio(this.audioLose);
            this.scheduleOnce(function(){
                this.onFinish();
            }, 1.3);
        }, 2.5);
    },

    onFinish() {
        this.showInstallPopup();
        window.gameEnd && window.gameEnd();
    },

    showInstallPopup: function () {
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
        }else if(audio === this.audioLose){
            cc.audioEngine.play(this.audioLose, false, 0.5)
        }else if(audio === this.audioAttack1){
            cc.audioEngine.play(this.audioAttack1, false, 0.5)
        }else if(audio === this.audioAttack2){
            cc.audioEngine.play(this.audioAttack2, false, 0.5)
        }else if(audio === this.audioPurchase){
            cc.audioEngine.play(this.audioPurchase, false, 0.5)
        }else if(audio === this.audioBgMusic){
            cc.audioEngine.play(this.audioBgMusic, true, 0.5)
        }
    },

    // update (dt) {},

    ClickCardDino(){
        this.cardSelectedIndex = 0;
        this.AddCharacter();
        
    },
    ClickCardTank(){
        this.cardSelectedIndex = 1;
        this.AddCharacter();
    },

    AddCharacter(){
        this.playAudio(this.audioPurchase);
        this.uiSelectCard.active = false;
        this.idleAll.active = true;
        this.unit.active = true;
        this.hand.active = true

        if(this.cardSelectedIndex == 0){
            this.idleLeftStart.getComponent(sp.Skeleton).setAnimation(0,"Idle_Ovi_L", true);
            this.idleMiddleStart.getComponent(sp.Skeleton).setAnimation(0,"Idle_Ovi_M", true);
            this.idleRightStart.getComponent(sp.Skeleton).setAnimation(0,"Idle_Ovi_R", true);
        }else{
            this.idleLeftStart.getComponent(sp.Skeleton).setAnimation(0, "Idle_Y_L", true);
            this.idleMiddleStart.getComponent(sp.Skeleton).setAnimation(0,"Idle_Y_M", true);
            this.idleRightStart.getComponent(sp.Skeleton).setAnimation(0,"Idle_Y_R", true);
        }
    }
});
