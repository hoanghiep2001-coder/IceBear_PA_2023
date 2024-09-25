
cc.Class({
    extends: cc.Component,

    properties: {
        positionTouch: cc.Vec2,
        player: cc.Node,
        camera: cc.Node,
        rigidBody: cc.RigidBody,
        tut: cc.Node,
        enemyController: cc.Node,
        gamePlay: cc.Node,
    },

    start () {
        this.bodyPlayer = this.player.getChildByName("Body");
        this.isTouched = false;

        this.node.parent.on(cc.Node.EventType.TOUCH_START, (event)=>{
            if(this.tut.active){
                this.tut.active = false;
                this.player.getComponent("PlayerController").isMove = true;
                this.enemyController.getComponent("EnemyController").startCreateEnemy();
                this.gamePlay.getComponent("GamePlay").showBoss();
            }
            this.isTouched = true;
            this.moveWithTouch(event);

            
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveWithTouch(event);
            
        });

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (event)=>{
            this.isTouched = false;
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            this.isTouched = false;
        });
    },

    moveWithTouch(event){
        this.positionTouch = event.getLocation();
        let localTouchPos = this.node.convertToNodeSpaceAR(this.positionTouch);
        this.positionTouch = localTouchPos;

        this.positionTouch.x += this.camera.x;
        this.positionTouch.y += this.camera.y;

        var anglePlayer = cc.misc.radiansToDegrees(Math.atan((this.player.y - localTouchPos.y)/(this.player.x - localTouchPos.x)));

        this.bodyPlayer.angle = anglePlayer;


        if((this.player.x - localTouchPos.x) > 0){
            this.bodyPlayer.scaleX = -1;
        }else{
            this.bodyPlayer.scaleX = 1;
        }


    },

    // update (dt) {},
});
