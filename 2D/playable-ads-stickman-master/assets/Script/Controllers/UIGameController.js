const CONST = require("CONST");
const GameInfo = require("GameInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        FollowCamera: cc.Node,

        // Btn Move
        ButtonMoveLeft: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonMoveRight: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        // Btn Attack
        ButtonAttack: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonJump: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonDash: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        
        // Button Weapon
        ButtonWeaponSword: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonWeaponArcher: {
            default: null,
            type: cc.Button,
            serializable: true,
        },

        // Info
        EnemyLiveText: {
            default: null,
            type: cc.Label,
            serializable: true,
        },
        StickLifeText: {
            default: null,
            type: cc.Label,
            serializable: true,
        },

        HandTutorialSword: cc.Node,
        HandTutorialArcher: cc.Node,

        MessageText: cc.Label,

        TempWall: cc.Node,

        InstallPopup: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameInfo.TotalEnemy = CONST.TotalEnemyInGame;
        GameInfo.TotalEnemyAlive = GameInfo.TotalEnemy;

        this._tutorialDoneStage1Called = false;
        this._tutorialStartStage2Called = false;
        this._tutorialDoneStage2Called = false;

        this._isShowedPopupInstall = false;

        GameInfo.GamePause = true;

        this.scheduleOnce(function() {
            if(cc.view.getFrameSize().width > cc.view.getFrameSize().height){
                GameInfo.GamePause = false;
            } else {
                GameInfo.GamePause = true;
            }
        }, 3);
    },

    start () {
        this.InstallPopup.active = false;
    },

    update (dt) {
        this.node.setPosition(this.FollowCamera.getPosition());

        this.EnemyLiveText.string = (GameInfo.TotalEnemy - GameInfo.TotalEnemyAlive) + "/" + GameInfo.TotalEnemy;

        if(!GameInfo.TutorialStartStage2){
            if(GameInfo.TotalEnemy - GameInfo.TotalEnemyAlive >= CONST.NumEnemyForStartStage2){
                GameInfo.TutorialStartStage2 = true;
            }
        }

        if(!this._tutorialDoneStage1Called && GameInfo.TutorialDoneStage1){
            this._tutorialDoneStage1Called = true;
            this.callWhenStage1Done();
        }

        if(!this._tutorialStartStage2Called && GameInfo.TutorialStartStage2){
            this._tutorialStartStage2Called = true;
            this.callWhenStage2Start();
        }

        // cc.log(GameInfo.TutorialDoneStage2);
        if(!this._tutorialDoneStage2Called && GameInfo.TutorialDoneStage2){
            this._tutorialDoneStage2Called = true;
            this.callWhenStage2Done();
        }

        if(!this._isShowedPopupInstall && GameInfo.IsShowPopupInstall){
            this._isShowedPopupInstall = true;
            this.showPopupInstall();
        }
    },

    callWhenStage1Done(){
        cc.log("Stage 1 Done");
        this.MessageText.node.active = false;
    },

    callWhenStage2Start(){
        cc.log("Stage 2 Start");
        this.TempWall.active = false;

        this.MessageText.node.active = true;
        this.MessageText.string = "CHANGE YOUR WEAPON!";

        // GameInfo.GamePause = true;

        // this.scheduleOnce(function() {
        //     GameInfo.GamePause = false;
        // }, 3);
    },

    callWhenStage2Done(){
        cc.log("Stage 2 Done");
        this.MessageText.node.active = false;
    },

    showPopupInstall(){
        this.InstallPopup.active = true;
        this.InstallPopup.setPosition(0, 0);
    }
});
