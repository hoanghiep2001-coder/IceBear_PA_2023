

cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,
        bgWarning: cc.Node,
        timeShowWarning: 8,
        boss: cc.Node,
        bgMove: cc.Node,
        isIronSource: cc.Boolean,
          
    },

    playBgMusic(){
        if(!this.isPlayBgMusic){
            this.gameController.playAudio(this.gameController.audioBgMusic);
            this.isPlayBgMusic = true;
        }
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        //collisionManager.enabledDebugDraw = true;

        this.gameController = this.gc.getComponent("GameController");
        
        this.isPlayBgMusic = false;
        if(this.isIronSource){
            this.node.parent.on(cc.Node.EventType.TOUCH_START, (event)=>{
                console.log("111111111")
                if(this.isPlayBgMusic) return;
                // this.playBgMusic();
            });
    
        }else{
            // this.playBgMusic();
        }

        
    },

    showBoss(){
        this.scheduleOnce(function(){
            this.gameController.playAudio(this.gameController.audioWarning);
            this.bgWarning.active = true;
            this.scheduleOnce(function(){
                this.bgWarning.active = false;
                this.boss.active = true;
            }, 3);
        }, this.timeShowWarning);
    },


    start () {
    },

    update (dt) {
        
        if(cc.view.getFrameSize().width > cc.view.getFrameSize().height){
            this.bgMove.y = 0;
        }else{
            this.bgMove.y = -800;
        }
    },


});
