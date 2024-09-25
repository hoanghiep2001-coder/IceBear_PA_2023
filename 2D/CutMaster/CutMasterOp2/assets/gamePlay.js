let isPlay = false;
cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Node,
    Character: cc.Node,
    Wall1: cc.Node,
    Wall2: cc.Node,
    Wall3: cc.Node,
    Door: cc.Node,
    Point: cc.Node,
    Rope: [cc.Node],
    StartPos: null,
    CutSpine: cc.Node,
    Overlay: cc.Node,
    hand: cc.Node,
    
    isPlayBG: false,
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    let collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;

    this.ParticleSystem = this.Point.getComponent(cc.ParticleSystem);
    this.handleDrawCursorLine();
  },

  handleDrawCursorLine() {
    // ironsource
    this.background.on("touchstart", (e) => {
      this.StartPos = e.touch.getLocation();
      
      this.ParticleSystem.resetSystem();
      this.hand.active = false;

      if(this.isPlayBG) {
        return;
      }

      this.node.getComponent("AudioManager").playbgSound();
      this.isPlayBG = true;
    });

    this.background.on("touchmove", (e) => {
      this.Point.setPosition(
        this.StartPos.x - cc.winSize.width / 2,
        this.StartPos.y - cc.winSize.height / 2
      );
      this.StartPos = e.touch.getLocation();
    });

    this.background.on("touchend", (e) => {
      this.ParticleSystem.stopSystem();
      this.stopSystem = true;
    });
  },
});
