const { Constants } = require("./Data/Constant");

cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,
        handTut: cc.Node,
        itemContainer: cc.Node,
        characterContainer: cc.Node,
        messageContainer: cc.Node,
        itemButton1: cc.Button,
        itemButton2: cc.Button,

        decorItem1: cc.Node,
        decorItem2: cc.Node,
        decorItem3: cc.Node,
        decorItem4: cc.Node,
        decorItem5: cc.Node,
        decorItem6: cc.Node,

        mouthNormal: cc.Node,
        mouthSad: cc.Node,
        mouthSmile: cc.Node,

        hideMask: cc.Node,

    },

    onLoad () {
        this.gameController = this.gc.getComponent("GameController");
        // this.scheduleOnce(function(){
        //     this.gameController.playAudio(this.gameController.audioBgMusic);
        // }, 1.5);
        

        this.step = 1;
        this.itemSelected = 1;

        this.itemButton1.node.on("click", this.clickItem1, this);
        this.itemButton2.node.on("click", this.clickItem2, this);
        this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleIronSourcePlaySound, this);

        this.itemButton1.interactable = false;
        this.itemButton2.interactable = false;
        this.scheduleOnce(function(){
            this.itemButton1.interactable = true;
            this.itemButton2.interactable = true;
        }, 1.5);
        this.scheduleOnce(function(){
            this.handTut.active = true;
            this.scheduleOnce(function(){
                this.handTut.active = false;
            }, 1.5);
        }, 1);

        
        
    },



    clickItem1(){
        this.itemSelected = 1;
        this.setupRoom();
        this.handleIronSourcePlaySound();
    },

    clickItem2(){
        this.itemSelected = 2;
        this.setupRoom();
        this.handleIronSourcePlaySound();
    },


    handleIronSourcePlaySound() {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            this.gameController.playAudio(this.gameController.audioBgMusic);
        }

        Constants.ironSource.isPlayBgSound = true;
    },


     handleMuteSoundIronSource() {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                this.gameController.playAudio(this.gameController.audioBgMusic);
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                cc.audioEngine.stopAll();
            }
        }
    },


    setupRoom(){
        this.itemButton1.interactable = false;
        this.itemButton2.interactable = false;

        this.gameController.playAudio(this.gameController.audioClick);
        
        this.handTut.active = false;
        if(this.step == 1){
            if(this.itemSelected == 1){
                this.decorItem1.active = true;
                this.setMouthSmile();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim2");
                this.gameController.playAudio(this.gameController.audioSave)
            }else{
                this.decorItem2.active = true;
                this.setMouthSad();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim3");
                this.gameController.playAudio(this.gameController.audioLose)
            }
            this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim2");
        }else if(this.step == 2){
            if(this.itemSelected == 1){
                this.decorItem4.active = true;
                this.setMouthSad();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim5");
                this.gameController.playAudio(this.gameController.audioLose)
            }else{
                this.decorItem3.active = true;
                this.setMouthSmile();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim6");
                this.gameController.playAudio(this.gameController.audioSave)
            }
            this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim3");
        }
        else if(this.step == 3){
            if(this.itemSelected == 1){
                this.decorItem5.active = true;
                this.setMouthSmile();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim8");
                this.gameController.playAudio(this.gameController.audioSave)
            }else{
                this.decorItem6.active = true;
                this.setMouthSad();
                this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim9");
                this.gameController.playAudio(this.gameController.audioLose)
            }
            this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim4");
            this.characterContainer.getComponent(cc.Animation).play("CharacterContainerAnim2");
        }

        this.step ++;

        this.scheduleOnce(function(){
            
            if(this.step == 2) this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim4");
            else if(this.step == 3) this.messageContainer.getComponent(cc.Animation).play("MessageContainerAnim7");
            else {
                this.gameController.showPopupInstall();
                return;
            }
            
            this.setMouthNormal();
        }, 2.5);
        
        this.scheduleOnce(function(){
            this.itemButton1.interactable = true;
            this.itemButton2.interactable = true;
        }, 2);
    },

    setMouthNormal(){
        this.mouthNormal.active = true;
        this.mouthSad.active = false;
        this.mouthSmile.active = false;
    },

    setMouthSad(){
        this.mouthNormal.active = false;
        this.mouthSad.active = true;
        this.mouthSmile.active = false;
    },

    setMouthSmile(){
        this.mouthNormal.active = false;
        this.mouthSad.active = false;
        this.mouthSmile.active = true;
    },

    update (dt) {
        this.handleMuteSoundIronSource();
    },

});
