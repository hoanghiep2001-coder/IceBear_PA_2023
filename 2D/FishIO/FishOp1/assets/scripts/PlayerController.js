
cc.Class({
    extends: cc.Component,

    properties: {
      speed: 5,
      isMove: false,
      touchArea: cc.Node,
      targetPosition: cc.Vec2,
      score:0,
      isLive: true,
      gc: cc.Node,
      headPlayer: cc.Node,
      crownGold: cc.Node,
      crownSilver: cc.Node,
      crownCopper: cc.Node,
      rigidBody: cc.RigidBody,
      
      scoreLabel1: cc.Label,
      scoreLabel2: cc.Label,
      scoreLabel3: cc.Label,

      rankName1: cc.Sprite,
      rankName2: cc.Sprite,
      rankName3: cc.Sprite,

      sfName1: cc.SpriteFrame,
      sfName2: cc.SpriteFrame,
      sfName3: cc.SpriteFrame,
      sfNamePlayer: cc.SpriteFrame,

    },
  
    // onLoad () {},

    start () {
      this.gameController = this.gc.getComponent("GameController");

    },

    onCollisionEnter (other, self) {
      if(other.tag == 2){
          if(this.isLive){
            this.die();
            this.headPlayer.active = true;
            this.gameController.playAudio(this.gameController.audioBossAtk);
            this.node.getChildByName("Atk").getComponent(sp.Skeleton).setAnimation(0, "bite", false);
          }
      }
    },

    die(){
      this.gameController.playAudio(this.gameController.audioEat);
      this.node.getChildByName("Body").active = false;
      this.node.getChildByName("Die").active = true;
      this.getComponent(cc.Animation).play("EnemyDieAnim");
      this.isLive = false;

      // FINISH
      this.scheduleOnce(function(){
        this.gameController.showPopupInstall();
      },1)
    },

    addScore(){
      this.score += cc.math.randomRangeInt(5, 15);
      this.crownGold.active = false;
      this.crownSilver.active = false;
      this.crownCopper.active = false;
      if(this.score >= 60){
        this.crownGold.active = true;
        this.node.setScale(1.7);
        this.scoreLabel1.string = ""+this.score;
        this.scoreLabel2.string = "40";
        this.scoreLabel3.string = "25";
        
        this.rankName1.spriteFrame = this.sfNamePlayer;
        this.rankName2.spriteFrame = this.sfName1;
        this.rankName3.spriteFrame = this.sfName2;
      }
      if(this.score >= 40 && this.score < 60) {
        this.crownGold.active = true;
        this.node.setScale(1.5);
        this.scoreLabel1.string = ""+this.score;
        this.scoreLabel2.string = "40";
        this.scoreLabel3.string = "25";

        this.rankName1.spriteFrame = this.sfNamePlayer;
        this.rankName2.spriteFrame = this.sfName1;
        this.rankName3.spriteFrame = this.sfName2;
      }
      else if(this.score >= 25 && this.score < 40) {
        this.crownSilver.active = true;
        this.node.setScale(1.3);
        this.scoreLabel2.string = ""+this.score;
        this.scoreLabel3.string = "25";

        this.rankName2.spriteFrame = this.sfNamePlayer;
        this.rankName3.spriteFrame = this.sfName2;
      }
      else if(this.score >= 10 && this.score < 25) {
        this.crownCopper.active = true;
        this.node.setScale(1.1);
        this.scoreLabel3.string = ""+this.score;

        this.rankName3.spriteFrame = this.sfNamePlayer;
      }
    },

    update (dt) {
      if(this.isMove && this.isLive){
        this.targetPosition = this.touchArea.getComponent("TouchArea").positionTouch;

        //console.log(this.targetPosition.x+" --- "+this.targetPosition.y);
        
        let currentPosition = this.node.getPosition();
        currentPosition.lerp(this.targetPosition, 0.02, currentPosition);
        this.node.setPosition(currentPosition);

       
      }
    },
});
