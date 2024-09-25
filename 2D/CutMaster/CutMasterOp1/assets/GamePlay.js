cc.Class({
  extends: cc.Component,

  properties: {
    currentPos: null,
    background: cc.Node,
    cutImpact: cc.Node,
    HeaderRope1: cc.Node,
    HeaderRope2: cc.Node,
    Rope: cc.Node,
    Character: cc.Node,
    Door: cc.Node,
    Cursor: cc.Node,
    ImpactArea: cc.Node,
    Overlay: cc.Node,
    WinContainer: cc.Node,
    ShowStore: cc.Node,
  },

  update(dt) {
   
  },

  start() {
    cc.director.getPhysicsManager().enabled = true;
    let collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
  },

  onLoad() {
    const AudioManager = this.getComponent("AudioManager");
    // AudioManager.playBackgroundSound();

    // this.scheduleOnce(() => {
    //   AudioManager.playScream();
    // }, 1.5);

    // this.Character.getComponent("sp.Skeleton").setAnimation(
    //   0,
    //   "Casual/rope/Rope_Scare",
    //   true
    // );

    // draw line
    this.handleDrawLine();

    // show store
    this.ShowStore.on("touchend", () => {
      cc.audioEngine.stopAll();
      this.getComponent("GameController").installHandle();
    });
  },

  handleDrawLine() {
    this.Cursor.active = false;
    this.background.on("touchstart", () => {
      this.Cursor.getComponent(cc.Animation).play("Cursor_Show");
    });

    this.background.on("touchmove", (e) => {
      this.Cursor.active = true;
      this.currentPos = e.touch.getLocation();
      this.Cursor.setPosition(
        this.currentPos.x - cc.winSize.width / 2,
        this.currentPos.y - cc.winSize.height / 2
      );

      if (
        this.ImpactArea.getBoundingBox().intersects(
          this.Cursor.getBoundingBox()
        )
      ) {
        this.ImpactArea.active = false;
        this.runGame();
      }
    });

    this.background.on("touchend", () => {
      this.Cursor.getComponent(cc.Animation).play("Cursor_Hide");
    });
  },

  runGame: function () {
    const AudioManager = this.getComponent("AudioManager");
    this.cutImpact.active = true;
    AudioManager.playCutRope(false);

    this.HeaderRope1.active = false;
    this.HeaderRope2.active = false;

    // set character to fall anim
    // this.Character.getComponent("sp.Skeleton").setAnimation(
    //   0,
    //   "Casual/rope/Rope_Fall",
    //   true
    // );
    // this.Character.getComponent(cc.Animation).play("CharacterFall");

    // this.scheduleOnce(() => {
    //   this.Character._components[2].gravityScale = 1;
    //   this.Character.getComponent("sp.Skeleton").setAnimation(
    //     0,
    //     "Casual/rope/Rope_Fall",
    //     true
    //   );
    // }, 0.7);

    // this.scheduleOnce(() => {
    //   this.Character.getComponent("sp.Skeleton").setAnimation(
    //     0,
    //     "Casual/rope/Rope_Break",
    //     false
    //   );
    // }, 0.9);

    // this.scheduleOnce(() => {
    //   this.Rope.getComponent("sp.Skeleton").setAnimation(0, "break", false);
    //   AudioManager.playRope2(false);
    //   AudioManager.playRope1(false);
    // }, 1.1);

    // this.scheduleOnce(() => {
    //   // set run spine for character
    //   this.Character.getComponent("sp.Skeleton").setAnimation(
    //     0,
    //     "Casual/Move/Run01",
    //     true
    //   );

    //   // set character run to end of brick 1
    //   this.Character.getComponent(cc.Animation).play("CharacterRun1");

    //   // set fall spine for character after 0.3s
    //   this.scheduleOnce(() => {
    //     this.Character.getComponent("sp.Skeleton").setAnimation(
    //       0,
    //       "Event/Fall",
    //       true
    //     );
    //   }, 0.3);

    //   // set run spine for character after 0.5s
    //   this.scheduleOnce(() => {
    //     this.Character.getComponent("sp.Skeleton").setAnimation(
    //       0,
    //       "Casual/Move/Run01",
    //       true
    //     );
    //   }, 0.8);

    //   // set fall spine for character after 0.5s
    //   this.scheduleOnce(() => {
    //     this.Character.getComponent("sp.Skeleton").setAnimation(
    //       0,
    //       "Event/Fall",
    //       true
    //     );
    //   }, 1.1);

    //   // set run spine for character after 0.5s
    //   this.scheduleOnce(() => {
    //     this.Character.getComponent("sp.Skeleton").setAnimation(
    //       0,
    //       "Casual/Move/Run01",
    //       true
    //     );
    //   }, 1.5);

    //   // end mission
    //   this.scheduleOnce(() => {
    //     this.Character.getComponent("sp.Skeleton").setAnimation(
    //       0,
    //       "Casual/win/end_win1",
    //       true
    //     );
    //     AudioManager.playSmile(false);

    //     // open the door
    //     this.Door.getComponent("sp.Skeleton").setAnimation(0, "open", false);
    //   }, 2.5);

    //   // show end game
    //   this.scheduleOnce(() => {
    //     this.WinContainer.active = true;
    //     this.Overlay.active = true;
    //   }, 3);
    // }, 2);
  },
});
