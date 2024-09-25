const { Constants } = require("./Data/Constant");

cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,
        characterContainer: cc.Node,
        itemContainer: cc.Node,
        itemButton1: cc.Button,
        itemButton2: cc.Button,
        itemButton3: cc.Button,
        itemButton4: cc.Button,

        dress1: cc.Node,
        dress2: cc.Node,
        dress3: cc.Node,
        dress4: cc.Node,
        hair1: cc.Node,
        hair2: cc.Node,
        hairBack2: cc.Node,
        hair3: cc.Node,
        hairBack3: cc.Node,
        hair4: cc.Node,
        hairBack4: cc.Node,
        handCharacter: cc.Node,
        hairCharacter: cc.Node,
        nextButton: cc.Button,

        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
        bg4: cc.Node,

        handTut: cc.Node,
        hideMask: cc.Node,
    },

    onLoad() {
        this.gameController = this.gc.getComponent("GameController");
        // this.gameController.playAudio(this.gameController.audioBgMusic);

        this.step = 1;
        this.itemSelected = 0;
        this.itemSelectedDress = 0;
        this.isShowButtonNext = false;

        this.itemButton1.node.on("click", this.clickItem1, this);
        this.itemButton2.node.on("click", this.clickItem2, this);
        this.itemButton3.node.on("click", this.clickItem3, this);
        this.itemButton4.node.on("click", this.clickItem4, this);
        this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleIronSourcePlaySound, this);
        this.nextButton.node.on("click", this.nextAction, this)

        this.scheduleOnce(function () {
            this.handTut.active = true;
        }, 1);
    },

    clickItem1() {
        this.itemSelected = 1;
        this.setupCharacter();
        this.handleIronSourcePlaySound();
    },

    clickItem2() {
        this.itemSelected = 2;
        this.setupCharacter();
        this.handleIronSourcePlaySound();
    },

    clickItem3() {
        this.itemSelected = 3;
        this.setupCharacter();
        this.handleIronSourcePlaySound();
    },

    clickItem4() {
        this.itemSelected = 4;
        this.setupCharacter();
        this.handleIronSourcePlaySound();
    },

    nextAction() {
        this.gameController.playAudio(this.gameController.audioClick)
        this.step++;
        this.nextButton.node.active = false;
        if (this.step <= 2) {
            this.isShowButtonNext = false;
            this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim3");
            return;
        }

        this.characterContainer.getComponent(cc.Animation).play("CharacterContainerAnim1");
        this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim4");
        if (this.itemSelectedDress == 1) this.bg1.active = true;
        else if (this.itemSelectedDress == 2) this.bg2.active = true;
        else if (this.itemSelectedDress == 3) this.bg3.active = true;
        else if (this.itemSelectedDress == 4) this.bg4.active = true;

        this.gameController.playAudio(this.gameController.audioWin);

        this.scheduleOnce(function () {
            this.gameController.showPopupInstall();
        }, 2.5);
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


    setupCharacter() {
        this.handTut.active = false;
        this.gameController.playAudio(this.gameController.audioClick)
        if (this.step == 1) {
            this.itemSelectedDress = this.itemSelected;
            if (this.itemSelected != 1) this.handCharacter.active = false;
            else this.handCharacter.active = true;
            this.dress1.active = false;
            this.dress2.active = false;
            this.dress3.active = false;
            this.dress4.active = false;
            if (this.itemSelected == 1) this.dress1.active = true;
            else if (this.itemSelected == 2) this.dress2.active = true;
            else if (this.itemSelected == 3) this.dress3.active = true;
            else if (this.itemSelected == 4) this.dress4.active = true;

            if (!this.isShowButtonNext) this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim2");
            this.isShowButtonNext = true;

        } else if (this.step == 2) {
            this.hairCharacter.active = false;
            this.hair1.active = false;
            this.hair2.active = false;
            this.hairBack2.active = false;
            this.hair3.active = false;
            this.hairBack3.active = false;
            this.hair4.active = false;
            this.hairBack4.active = false;
            if (this.itemSelected == 1) this.hair1.active = true;
            else if (this.itemSelected == 2) {
                this.hair2.active = true;
                this.hairBack2.active = true;
            } else if (this.itemSelected == 3) {
                this.hair3.active = true;
                this.hairBack3.active = true;
            } else if (this.itemSelected == 4) {
                this.hair4.active = true;
                this.hairBack4.active = true;
            }

            if (!this.isShowButtonNext) {
                this.itemContainer.getComponent(cc.Animation).play("ItemContainerAnim2");
                this.nextButton.node.active = true;
            }
            this.isShowButtonNext = true;
        }
    },


    update (dt) {
        this.handleMuteSoundIronSource();
    },

});
