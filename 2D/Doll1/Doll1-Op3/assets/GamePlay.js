const { Constants } = require("./Data/Constant");

cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,
        findButton: cc.Button,
        annaContainer: cc.Node,
        characterContainer: cc.Node,
        itemContainer: cc.Node,
        itemButton1: cc.Button,
        itemButton2: cc.Button,
        itemButton3: cc.Button,
        itemButton4: cc.Button,
        nextButton: cc.Button,
        handTut: cc.Node,

        // hair
        hairNormal: cc.Node,
        backHair1: cc.Node,
        frontHair1: cc.Node,
        backHair2: cc.Node,
        frontHair2: cc.Node,
        backHair3: cc.Node,
        frontHair3: cc.Node,
        backHair4: cc.Node,
        frontHair4: cc.Node,

        // dress
        hand: cc.Node,
        dress1: cc.Node,
        dress2: cc.Node,
        dress3: cc.Node,
        dress4: cc.Node,

        // face
        faceNormal: cc.Node,
        face1: cc.Node,
        face2: cc.Node,
        face3: cc.Node,
        face4: cc.Node,

        messageContainer: cc.Node,
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
        bg4: cc.Node,

        shoeElsa: cc.Node,
        shirt: cc.Node,
        hideMask: cc.Node,

    },

    onLoad () {
        this.gameController = this.gc.getComponent("GameController");
        // this.scheduleOnce(function(){
        //     this.gameController.playAudio(this.gameController.audioBgMusic);
        // }, 1.5);

        this.step = 1;
        this.itemSelected = 1;
        this.isElsa = true;
        this.isElsa2 = true;

        this.findButton.node.on("click", this.findButtonClick, this);
        this.itemButton1.node.on("click", this.item1Click, this);
        this.itemButton2.node.on("click", this.item2Click, this);
        this.itemButton3.node.on("click", this.item3Click, this);
        this.itemButton4.node.on("click", this.item4Click, this);
        this.nextButton.node.on("click", this.nextClick, this);
        this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleIronSourcePlaySound, this);

        
    },

    setupCharacter(){
        this.gameController.playAudio(this.gameController.audioClick);
        if(this.nextButton.node.active == false) this.nextButton.node.active = true;
        this.handTut.active = false;

        if(this.step == 1){
            this.hairNormal.active = false;
            this.backHair1.active = false;
            this.frontHair1.active = false;
            this.backHair2.active = false;
            this.frontHair2.active = false;
            this.backHair3.active = false;
            this.frontHair3.active = false;
            this.backHair4.active = false;
            this.frontHair4.active = false;
            if(this.itemSelected == 1){
                this.backHair1.active = true;
                this.frontHair1.active = true;
            }else if(this.itemSelected == 2){
                this.backHair2.active = true;
                this.frontHair2.active = true;
            }else if(this.itemSelected == 3){
                this.backHair3.active = true;
                this.frontHair3.active = true;
            }else if(this.itemSelected == 4){
                this.backHair4.active = true;
                this.frontHair4.active = true;
            }
        }else if(this.step == 2){
            if(this.itemSelected != 4) this.hand.active = false;
            else this.hand.active = true;
            this.dress1.active = false;
            this.dress2.active = false;
            this.dress3.active = false;
            this.dress4.active = false;
            this.faceNormal.active = false;
            this.face1.active = false;
            this.face2.active = false;
            this.face3.active = false;
            this.face4.active = false;
            this.shoeElsa.active = false;
            this.shirt.active = false;
            if(this.itemSelected == 1) {
                this.face1.active = true;
                this.dress1.active = true;
            }else if(this.itemSelected == 2){
                this.face2.active = true;
                this.dress2.active = true;
                this.shoeElsa.active = true;
            }else if(this.itemSelected == 3){
                this.face3.active = true;
                this.dress3.active = true;
            }else if(this.itemSelected == 4){
                this.face4.active = true;
                this.dress4.active = true;
            }
        }
    },

    item1Click(){
        if(this.step == 1) this.isElsa = false;
        if(this.step == 2) this.isElsa2 = false;
        this.itemSelected = 1;
        this.setupCharacter();
    },

    item2Click(){
        if(this.step == 1) this.isElsa = true;
        if(this.step == 2) this.isElsa2 = true;
        this.itemSelected = 2;
        this.setupCharacter();
    },

    item3Click(){
        if(this.step == 1) this.isElsa = false;
        if(this.step == 2) this.isElsa2 = false;
        this.itemSelected = 3;
        this.setupCharacter();
    },

    item4Click(){
        if(this.step == 1) this.isElsa = false;
        if(this.step == 2) this.isElsa2 = false;
        this.itemSelected = 4;
        this.setupCharacter();
    },

    nextClick(){
        
        this.gameController.playAudio(this.gameController.audioClick);
        this.step ++;
        this.nextButton.node.active = false;
        if(this.step <= 2){
            this.itemContainer.getComponent(cc.Animation).play("ItemAnim2");
            this.itemButton1.interactable = false;
            this.itemButton2.interactable = false;
            this.itemButton3.interactable = false;
            this.itemButton4.interactable = false;

            this.scheduleOnce(function(){
                this.itemButton1.interactable = true;
                this.itemButton2.interactable = true;
                this.itemButton3.interactable = true;
                this.itemButton4.interactable = true;
            }, 2);
        }

        if(this.step == 3){
            this.gameController.playAudio(this.gameController.audioSave);
            this.characterContainer.getComponent(cc.Animation).play("CharacterAnim")
            this.itemContainer.getComponent(cc.Animation).play("ItemAnim3")
            if(this.itemSelected == 1) this.bg1.active = true;
            else if(this.itemSelected == 2 && this.isElsa && this.isElsa2) this.bg2.active = true;
            else if(this.itemSelected == 3) this.bg3.active = true;
            else this.bg4.active = true;
        

            if(this.isElsa && this.isElsa2){
                this.messageContainer.getComponent(cc.Animation).play("MessageAnim1")
                this.scheduleOnce(function(){
                    this.gameController.playAudio(this.gameController.audioWin);
                }, 1);
            }else{
                this.messageContainer.getComponent(cc.Animation).play("MessageAnim2")
                this.scheduleOnce(function(){
                    this.gameController.playAudio(this.gameController.audioLose);
                }, 1);
            }

            this.scheduleOnce(function(){
                this.gameController.showPopupInstall();
            }, 3.5);
        }

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


    findButtonClick(){
        this.gameController.playAudio(this.gameController.audioClick);
        this.annaContainer.getComponent(cc.Animation).play("AnnaAnim2");
        this.itemContainer.getComponent(cc.Animation).play("ItemAnim1");
        this.handTut.getComponent(cc.Animation).play("HandAnim");

        this.itemButton1.interactable = false;
        this.itemButton2.interactable = false;
        this.itemButton3.interactable = false;
        this.itemButton4.interactable = false;

        this.scheduleOnce(function(){
            this.itemButton1.interactable = true;
            this.itemButton2.interactable = true;
            this.itemButton3.interactable = true;
            this.itemButton4.interactable = true;
        }, 2);

        this.scheduleOnce(function(){
            this.annaContainer.active = false;
        }, 1);
        this.handleIronSourcePlaySound();
    },


    update (dt) {
        this.handleMuteSoundIronSource();
    },

});
