
cc.Class({
    extends: cc.Component,

    properties: {
        // drag
        dragUnit: cc.Node,
        dragTarget1: cc.Node,
        dragTarget2: cc.Node,
        dragTarget3: cc.Node,
        hideMask: cc.Node,

        // character
        mainLevel: cc.Node,
        mainFish: cc.Node,
        animAtk1: sp.Skeleton,
        animAtk2: sp.Skeleton,
        animAtk3: sp.Skeleton,
       
        // UI component
        hand: cc.Node,
        mainCamera: cc.Camera,
        textFight: cc.Node,
        warning: cc.Node,
        installPopup: cc.Node,
        installButton: cc.Button,
       
        // audio
        audioAtk: cc.AudioClip,
        audioUpgrade: cc.AudioClip,
        audioWarning: cc.AudioClip,
        audioClick: cc.AudioClip,
        audioBgMusic: cc.AudioClip,

        bgMove: cc.Node,
        isIronSource: cc.Boolean,
        
    },


    // LIFE-CYCLE CALLBACKS:

    playBgMusic(){
        if(!this.isPlayBgMusic){
            this.playAudio(this.audioBgMusic);
            this.isPlayBgMusic = true;
        }
    },

    onLoad () {
        this.warning.active = false;
        this.isPlayBgMusic = false;
        // this.playBgMusic();
       
        this.step = 1;
        this.touchDown = false;
        this.startX = this.dragUnit.x;
        this.startY = this.dragUnit.y;

        this.initEvent();

        this.installButton.node.on("click", this.installHandle, this);

    },

    initEvent(){


        // to store
        // this.hideMask.on(cc.Node.EventType.TOUCH_START, (event)=>{
        //     this.installHandle();
        // });
        this.dragUnit.on(cc.Node.EventType.TOUCH_START, (event)=>{
            this.installHandle();
        });


        // this.dragUnit.on(cc.Node.EventType.TOUCH_START, (event)=>{
        //     if(this.step <= 3) this.touchDown = true;
        // });

        // this.dragUnit.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
        //     if(!this.touchDown) return;

        //     let delta = event.getDelta();
        //     let moveX = this.dragUnit.x + delta.x;
        //     let moveY = this.dragUnit.y + delta.y;

        //     this.dragUnit.x = moveX;
        //     this.dragUnit.y = moveY;
        // });
        
        // this.dragUnit.on(cc.Node.EventType.TOUCH_END, (event)=>{
        //     if(!this.touchDown) return;

        //     this.touchDown = false;
            
        //     let bb = this.dragUnit.getBoundingBox();

        //     if(bb.intersects(this.dragTarget1.getBoundingBox()) && this.step == 1){
        //         this.checkIntersects(this.dragTarget1);
        //         this.animAtk1.setAnimation(0, "bite", false);
        //     }else if(bb.intersects(this.dragTarget2.getBoundingBox()) && this.step == 2){
        //         this.checkIntersects(this.dragTarget2);
        //         this.animAtk2.setAnimation(0, "bite", false);
        //     }else if(bb.intersects(this.dragTarget3.getBoundingBox()) && this.step == 3){
        //         this.checkIntersects(this.dragTarget3);
        //         this.animAtk3.setAnimation(0, "bite", false);
        //     }else{
        //         this.dragUnit.x = this.startX;
        //         this.dragUnit.y = this.startY;
        //     }
        // });

        // this.dragUnit.on(cc.Node.EventType.TOUCH_CANCEL, (event)=>{
        //     if(!this.touchDown) return;

        //     this.touchDown = false;
        //     this.dragUnit.x = this.startX;
        //     this.dragUnit.y = this.startY;

        // });

    },

    checkIntersects(target){
        this.playAudio(this.audioAtk);
        this.hand.active = false;
        this.hand.rotation = 90;

        this.dragUnit.x = target.x;
        this.dragUnit.y = target.y;
        

        this.startX = target.x;
        this.startY = target.y;

        this.dragUnit.scaleX = -1;

        this.dragUnit.active = false;

        this.scheduleOnce(function(){
            target.active = false;
            this.dragUnit.active = true;
            this.hand.active = true;
            this.mainLevel.scaleX = -1;
            if(this.step == 1){
                this.mainFish.getComponent(sp.Skeleton).setAnimation(0, "fish8", true);
                this.hand.getComponent(cc.Animation).play("Hand2Anim");
                this.mainLevel.getComponent(sp.Skeleton).setAnimation(0, "number8", false);
            }else if(this.step == 2){
                this.mainFish.getComponent(sp.Skeleton).setAnimation(0, "fish15", true);
                this.hand.getComponent(cc.Animation).play("Hand3Anim");
                this.mainLevel.getComponent(sp.Skeleton).setAnimation(0, "number15", false);
            }else if(this.step == 3){
                this.mainFish.getComponent(sp.Skeleton).setAnimation(0, "fish27", true);
                this.hand.active = false;
                this.mainLevel.getComponent(sp.Skeleton).setAnimation(0, "number27", false);

                this.mainCamera.node.getComponent(cc.Animation).play("Camera1Anim");
                this.warningScene();
                this.textFight.active = false;
            }
            this.mainFish.scaleX += 0.05;
            this.mainFish.scaleY += 0.05;
            this.step += 1;
            this.playAudio(this.audioUpgrade);
        }, 0.4);
    },

    warningScene(){
        this.scheduleOnce(function(){
            this.dragUnit.getComponent(cc.Animation).play("MainFishAnim");
            this.mainCamera.node.getComponent(cc.Animation).play("Camera2Anim");

            this.scheduleOnce(function(){
                this.mainCamera.node.getComponent(cc.Animation).play("Camera3Anim");
                this.scheduleOnce(function(){
                    this.playAudio(this.audioWarning);
                    this.warning.active = true;

                    this.scheduleOnce(function(){
                        this.onFinish();
                        this.warning.active = false;
                    }, 3);

                }, 1);
            }, 2)
        }, 1.2);
    },

    start () {
        window.gameReady && window.gameReady();
    },

    onFinish() {
        this.installPopup.active = true;
        this.node.getComponent(cc.Animation).play("ZoomInAllFishAnim");
        window.gameEnd && window.gameEnd();
    },

    installHandle: function () {
        console.log("install");
        
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
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id6445980017?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
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
        }
    },

    stopAudio(){
        cc.audioEngine.stopAll();
    },

    update (dt) {
        if(cc.view.getFrameSize().width > cc.view.getFrameSize().height){
            this.bgMove.y = 0;
        }else{
            this.bgMove.y = -800;
        }
    },

});
