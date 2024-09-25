
cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,
        hand: cc.Node,
        characterContainer: cc.Node,
        startButton: cc.Node,
        characterAttack: cc.Node,
        failPopup: cc.Node,
        mergeButton: cc.Node,
        line: cc.Node,
    },

    onLoad () {
        this.gameController = this.gc.getComponent("GameController");
        this.gameController.playAudio(this.gameController.audioBgMusic);
    },

    mergeNow(){
        this.characterContainer.getComponent(cc.Animation).play("CharacterAnim1");
        this.line.active = false;
        
        this.scheduleOnce(function(){
            this.gameController.playAudio(this.gameController.audioMerge);
        }, 0.5);

        this.scheduleOnce(function(){
            this.startButton.active = true;
        }, 1.5);
        this.mergeButton.active = false;
        this.hand.active = false;

    },

    clickButtonStart(){
        this.gameController.playAudio(this.gameController.audioClick);
        this.startButton.active = false;
        
        this.scheduleOnce(function(){
            this.characterAttack.active = true;
            this.characterContainer.active = false;
        }, 0.5);

        this.schedule(function(){
            this.gameController.playAudio(this.gameController.audioAttack1);
        }, 2, 2, 1);

        this.schedule(function(){
            this.gameController.playAudio(this.gameController.audioAttack2);
        }, 3, 1, 1)


        this.scheduleOnce(function(){
            this.failPopup.active = true;
            this.gameController.playAudio(this.gameController.audioLose);

            this.scheduleOnce(function(){
                this.gameController.showPopupInstall();
            }, 1.5);
        }, 6);
    },
   
});
