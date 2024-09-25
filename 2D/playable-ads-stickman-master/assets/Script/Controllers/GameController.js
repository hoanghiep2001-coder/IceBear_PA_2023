const GameInfo = require("GameInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        InstallPopup: cc.Node,
        ChangeYourOrientation: cc.Node
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2 (0, -2000);

        this._changeOrientation = false;
        this._lastOrientationIsLandscape = true;
    },

    start () {
        // this.InstallPopup.active = false;
        window.gameReady && window.gameReady();

        this.handleYourOrientation();

        cc.view.setResizeCallback (()=>{
            this.handleYourOrientation();
        });
    },

    // update (dt) {

    // },

    showPopupInstall(){
        this.InstallPopup.active = true;
        this.InstallPopup.setPosition(0, 0);
    },

    handleYourOrientation(){
        if(cc.view.getFrameSize().width > cc.view.getFrameSize().height){
            this.ChangeYourOrientation.active = false;
            GameInfo.GamePause = false;
        } else {
            this.ChangeYourOrientation.active = true;
            GameInfo.GamePause = true;
        }
    }
});
