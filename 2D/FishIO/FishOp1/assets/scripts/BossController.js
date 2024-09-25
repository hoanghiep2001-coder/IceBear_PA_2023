
cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
    },

    start () {
        this.playerControll = this.player.getComponent("PlayerController");
    },

     update (dt) {
        let playerPosition = this.player.getPosition();
        let currentPosition = this.node.getPosition();
        currentPosition.lerp(playerPosition, 0.009, currentPosition);
        this.node.setPosition(currentPosition);

        var angleBoss = cc.misc.radiansToDegrees(Math.atan((this.player.y - this.node.y)/(this.player.x - this.node.x)));

        console.log("Angle BOSSS: "+angleBoss)
      
        this.node.getChildByName("Body").angle = angleBoss;


        if((this.node.x - this.player.x) > 0){
            this.node.getChildByName("Body").scaleX = -1;
        }else{
            this.node.getChildByName("Body").scaleX = 1;
        }
            
     },
});
