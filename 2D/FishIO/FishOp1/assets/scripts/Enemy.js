
cc.Class({
    extends: cc.Component,

    properties: {
      isLive: false,
      body: cc.RigidBody,
      maxSpeed: 60,
      nameFish: cc.Sprite,
      arrNameFish: [cc.SpriteFrame],
      flag: cc.Sprite,
      arrFlag: [cc.SpriteFrame],
      
    },
    

    onCollisionEnter (other, self) {
        if(other.tag == 2){
            if(this.isLive){
                this.die();
            }
        }
      },

    start () {
        this.randomName = 0;
        this.randomName = cc.math.randomRangeInt(0, this.arrNameFish.length);
        this.nameFish.spriteFrame = this.arrNameFish[this.randomName];

        this.randomFlag = 0;
        this.randomFlag = cc.math.randomRangeInt(0, this.arrFlag.length);
        this.flag.spriteFrame = this.arrFlag[this.randomFlag];

        this.randomChangeSpeed = 3;
        this.randomVecX = 0;
        this.randomVecY = 0;
        this.isLive = true;
        this.randomVelocity();
        this.schedule(function(){
            this.randomVelocity();
        }, this.randomChangeSpeed, 20, 0);
    },

    randomVelocity(){
        this.randomChangeSpeed = cc.math.randomRangeInt(2, 5);
        this.randomVecX = cc.math.randomRangeInt(-this.maxSpeed, this.maxSpeed);
        this.randomVecY = cc.math.randomRangeInt(-this.maxSpeed, this.maxSpeed);

        this.body.linearVelocity = cc.v2(this.randomVecX, this.randomVecY);
        this.node.getChildByName("Body").angle = cc.misc.radiansToDegrees(Math.atan(this.randomVecY/this.randomVecX));
        if(this.randomVecX < 0){
            this.node.getChildByName("Body").scaleX = -1;
        }else{
            this.node.getChildByName("Body").scaleX = 1;
        }
       
    },

    die(){
        this.body.linearVelocity = cc.v2(0,0);
        this.node.getChildByName("Name").active = false;
        this.node.getChildByName("Flag").active = false;
        this.node.getChildByName("Atk").getComponent(sp.Skeleton).setAnimation(0, "bite", false);
        this.node.getChildByName("Body").active = false;
        this.node.getChildByName("Die").active = true;
        this.isLive = false;
        this.getComponent(cc.Animation).play("EnemyDieAnim");
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 2)
    },

    update (dt) {
        
        
    },
});
