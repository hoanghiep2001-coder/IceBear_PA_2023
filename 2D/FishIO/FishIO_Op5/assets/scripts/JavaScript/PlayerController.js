const { Constants } = require("../Data/Constant");

cc.Class({
  extends: cc.Component,

  properties: {
    speed: 150,
    score: 0,
    isLive: true,
    isMove: false,
    isLevelUp: false,
    isLevel3: false,
    isReplay: false,
    forceReplay: false,

    trackEnTry: sp.spine.trackEnTry,

    eater: cc.Node,
    dieBg: cc.Node,
    JoyStick: cc.Node,
    powerController: cc.Node,
    touchArea: cc.Node,
    Mouth: cc.Node,
    spineFish: sp.Skeleton,
    targetPosition: cc.Vec2,
    gc: cc.Node,
    rigidBody: cc.RigidBody,
    collide: cc.CircleCollider,

    transformSound: cc.AudioClip
  },


  start() {
    this.JoyStickComponent = this.JoyStick.getComponent("JoyStick");
    this.gameController = this.gc.getComponent("GameController");

    this.rigidBody.onBeginContact = (contact, selfCollider, otherCollider) => {
      if (otherCollider.tag == 4 && this.isLive) {
        this.scheduleOnce(() => {Constants.ironSource.SoundState && cc.audioEngine.play(this.transformSound, false, 1)}, 0.7)
        this.powerController.getComponent("PowerController").handlePowerUp(this.node, otherCollider.node);
        this.rigidBody.linearVelocity = new cc.Vec2(0, 0);
        this.node.getChildByName("Body").angle = 0;
        this.isLevelUp = true
      }

      if (otherCollider.tag == 8 && this.isLive) {
        this.scheduleOnce(() => {Constants.ironSource.SoundState && cc.audioEngine.play(this.transformSound, false, 1)}, 0.7)
        this.rigidBody.linearVelocity = new cc.Vec2(0, 0);
        this.isLevel3 = true;
        this.node.getChildByName("Body").angle = 0;
        this.powerController.getComponent("PowerController").handlePowerUpLv2(this.node,  otherCollider.node);
      };
    };
  },


  onCollisionEnter(other, self) {
    if (other.tag == 3) {
      if (this.isLive && !this.isLevelUp && !this.powerController.getComponent("PowerController").isTransforming) {
        this.isLive = false;
        this.eater = other.node;

        this.handleUpTime();
        this.handleDie();
        this.dieBg.getComponent(cc.Animation).play("Die_Anim");
        this.collide.destroy();
        this.rigidBody.destroy();
      }
    }

    if(other.tag == 10) {
      if (this.isLive && !this.isLevel3) {
        this.isLive = false;
        this.eater = other.node;

        this.handleUpTime();
        this.handleDie();
        this.dieBg.getComponent(cc.Animation).play("Die_Anim");
        this.collide.destroy();
        this.rigidBody.destroy();
      }
    }
  },


  handleUpTime() {
    let spine = this.eater.getChildByName("Body")
      .getChildByName("Spine_Fish").getComponent(sp.Skeleton);
    this.trackEnTry = spine.setAnimation(0, "eat", false);
    spine.timeScale = 1.5;
  },


  die() {
    this.node.getChildByName("Body").active = false;
    this.node.getChildByName("Die").active = true;
    this.getComponent(cc.Animation).play("EnemyDieAnim");
    this.isLive = false;

    // FINISH
    // this.scheduleOnce(function(){
    //   this.gameController.showPopupInstall();
    // },1)
  },


  handleDie() {
    if (this.isLive && !this.isReplay) {
      return;
    }

    this.node.getChildByName("Body").active = false;
    this.isReplay = true;

    if(Constants.ironSource.SoundState) {
      this.gameController.playAudio(this.gameController.audioBossAtk);
    }
    
    this.scheduleOnce(() => {
      this.forceReplay = true;
      this.isReplay = false;
      this.die();
      this.node.getChildByName("Atk").getComponent(sp.Skeleton).setAnimation(0, "bite", false);
    }, 1)
  },


  handleMoveToEater() {
    if (this.isReplay) {
      const currentPosition = this.node.getPosition();
      const targetPos = this.eater.getPosition();
      currentPosition.lerp(targetPos, 0.09, currentPosition);
      this.node.setPosition(currentPosition);
    }
  },


  move() {
    if (this.isMove && this.isLive) {
      // const currentPosition = this.node.getPosition();
      this.targetPosition = this.touchArea.getComponent("TouchArea").positionTouch;
      const direction = this.targetPosition.sub(this.node.position).normalize();
      let velocity;
      this.isLevelUp ? velocity = direction.mul(this.speed + 100) : velocity = direction.mul(this.speed + 20)
 
      this.rigidBody.linearVelocity = velocity;
    }
  },


  update(dt) {
    this.handleMoveToEater();
  },
});
