const MainController = require("MainController");

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Canvas,
        checkedSprite: cc.Sprite,
        eraserSprite: cc.Sprite,
        helpText: cc.Node,
        popup: cc.Node,
        tutorialHand: cc.Node,
        installBottom: cc.Node,
    },

    _onload: function () {
        cc.fadeIn();
    },

    start() {
        // this.mainController = cc.director.getScene()
        //     .getChildByName('MainController')
        //     .getComponent(MainController);

            console.log(this.mainController);


        // this.enableTutorial = (this.mainController.currentLevel == 0);

        if (this.enableTutorial && this.tutorialHand) {
            this.tutorialHand.active = true;
        } else {
            this.tutorialHand.active = false;
        }

        var button = this.popup.getComponentInChildren(cc.Button);
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
        clickEventHandler.component = "UIController"; // This is the code file name
        clickEventHandler.handler = "installHandle";

        button.clickEvents.push(clickEventHandler);
    },

    setUIOnStart: function () {
        this.checkedSprite.node.active = false;
        this.helpText.active = true;
        if (this.popup) {
            this.popup.active = false;
        }
        this.eraserSprite.node.active = false;

        if (this.enableTutorial && this.tutorialHand) {
            this.tutorialHand.active = true;
        }
    },

    setUIOnWin: function () {
        this.checkedSprite.node.active = true;
        this.helpText.active = false;
        if (this.enableTutorial && this.tutorialHand) {
            this.tutorialHand.active = false;
        }
    },

    setUIOnTouchStart: function (point) {
        this.eraserSprite.node.active = true;
        this.eraserSprite.node.setPosition(this.node.convertToNodeSpaceAR(point));
        if (this.enableTutorial && this.tutorialHand) {
            this.tutorialHand.active = false;
        }
    },

    setUIOnTouchMove: function (point) {
        this.eraserSprite.node.setPosition(this.node.convertToNodeSpaceAR(point));
    },

    setUIOnTouchEnd: function (point) {
        this.eraserSprite.node.active = false;
        if (this.enableTutorial && this.tutorialHand) {
            this.tutorialHand.active = true;
        }
    },

    loadNextLevel: function () {
        // if (this.mainController.hasNext()) {
        //     const level = this.mainController.nextLevel();
        //     cc.log("Load level " + level);
        //     this.scheduleOnce(function () {
        //         cc.director.loadScene("Level" + level, () => {
        //             cc.log("New scene loaded");
        //         });
        //     }, 2);
        // } else {
        //     this.showInstallPopup();
        // }
    },

    showInstallPopup: function () {
        if (this.popup) {
            var self = this;
            if (this.installBottom) {
                this.installBottom.active = false;
            }
            this.scheduleOnce(function () {
                // Here `this` is referring to the component
                cc.log("Complete");
                self.popup.active = true;
                window.gameEnd && window.gameEnd();
            }, 2);
        }
    },

    installHandle: function () {
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
        if (typeof(mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.mergemaster.dinosaurs");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/com.mergemaster.dinosaurs?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.mergemaster.dinosaurs");
            return;
        }
        // If ad network is mindword. window alway avaiable so skip undefined check
        window.install && window.install();
    }
});
