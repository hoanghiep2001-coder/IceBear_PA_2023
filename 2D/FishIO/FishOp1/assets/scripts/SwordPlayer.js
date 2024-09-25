
cc.Class({
    extends: cc.Component,

    properties: {
      gc: cc.Node,
      headFish1: cc.Node,
      headFish2: cc.Node,
      headFish3: cc.Node,
      headFish4: cc.Node,
    },

    // onLoad () {},


    onCollisionEnter (other, self) {
        if(other.tag == 1){
            if(other.getComponent("Enemy").isLive){
                this.gameController.playAudio(this.gameController.audioEat);
                other.getComponent("Enemy").die();
                self.node.getParent().getParent().getComponent("PlayerController").addScore();
                
                this.countHead ++;
                if(this.countHead == 1) this.headFish1.active = true;
                if(this.countHead == 2) this.headFish2.active = true;
                if(this.countHead == 3) this.headFish3.active = true;
                if(this.countHead == 4) this.headFish4.active = true;
            }
        }
      },

    start () {
        this.countHead = 0;
        this.gameController = this.gc.getComponent("GameController");
        
    },

    // update (dt) {},
});
