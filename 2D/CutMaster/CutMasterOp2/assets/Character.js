let isGround = false;
let isRope = true;
let characterIsRotate = false;
let checkWallTwice = true;
let checkWallThird = true;
cc.Class({
  extends: cc.Component,

  properties: {
    ropeSpine: cc.Node,
    Overlay: cc.Node,
    WinScene: cc.Node,
    nextBtn: cc.Node,
  },

  onLoad() {
    this.AudioManager = this.node.getComponent("AudioManager");
    this.Character = this.node;
    this.RigidBody = this.node.getComponent(cc.RigidBody);
    this.GamePlay = this.node.parent.parent.getComponent("gamePlay");

    this.nextBtn.on("touchend", () => {
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    });

    // this.AudioManager.playbgSound();

    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      this.Overlay.width = screen_width;
      this.Overlay.height = screen_height;
    } else {
      this.Overlay.width = screen_width;
      this.Overlay.height = screen_height;
    }
  },

  cutRope() {
    this.AudioManager.playScreamSound();
    this.AudioManager.playCutSound();
    this.scheduleOnce(() => {
      this.Character.removeComponent(cc.RevoluteJoint);
    }, 0.1);
  },

  characterRun() {
    if (characterIsRotate) {
      this.RigidBody.linearVelocity = cc.v2(
        -50,
        this.RigidBody.linearVelocity.y
      );
    } else {
      this.RigidBody.linearVelocity = cc.v2(
        50,
        this.RigidBody.linearVelocity.y
      );
    }
  },

  characterFall() {
    this.RigidBody.linearVelocity = cc.v2(0, this.RigidBody.linearVelocity.y);
  },

  characterBreakRope() {
    this.Character.getComponent("sp.Skeleton").setAnimation(
      0,
      "Casual/rope/Rope_Break",
      false
    );
    this.scheduleOnce(() => {
      this.ropeSpine
        .getComponent("sp.Skeleton")
        .setAnimation(0, "break", false);
      this.AudioManager.playRope_1Sound();
    }, 0.5);

    this.scheduleOnce(() => {
      isGround = true;
      isRope = false;
      this.Character.getComponent("sp.Skeleton").setAnimation(
        0,
        "Casual/Move/Run01",
        true
      );
      this.AudioManager.playRunSound(true, 1);
    }, 1.8);
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.tag === 1) {
      this.characterBreakRope();
    }

    if (otherCollider.tag === 2) {
      characterIsRotate = true;
      this.Character.scaleX = -0.3;

      this.Character.getComponent("sp.Skeleton").setAnimation(
        0,
        "Casual/win/end_win1",
        false
      );

      this.scheduleOnce(() => {
        isGround = true;
        isRope = false;
        this.Character.getComponent("sp.Skeleton").setAnimation(
          0,
          "Casual/Move/Run01",
          true
        );
      }, 1);
      if (checkWallTwice) {
        this.AudioManager.playRunSound(true, 2);
      }
      checkWallTwice = false;
    }

    if (otherCollider.tag === 3) {
      if (checkWallThird) {
        isGround = true;
        isRope = false;
        characterIsRotate = false;
        this.Character.scaleX = 0.3;
        this.Character.getComponent("sp.Skeleton").setAnimation(
          0,
          "Casual/Move/Run01",
          true
        );
        this.AudioManager.playRunSound(true, 3);
      }
      checkWallThird = false;
    }

    if (otherCollider.tag === 4) {
      this.AudioManager.playSmileSound();
      isGround = true;
      isRope = false;
      characterIsRotate = false;
      this.Character.scaleX = 0.3;

      this.GamePlay.Door.getComponent("sp.Skeleton").setAnimation(
        0,
        "open",
        false
      );

      this.Character.getComponent("sp.Skeleton").setAnimation(
        0,
        "Casual/win/end_win1",
        true
      );

      this.scheduleOnce(() => {
        this.Overlay.active = true;
        this.WinScene.active = true;
        this.AudioManager.playWinSound();
        this.GamePlay.Point.active = false;
      }, 1.5);
    }
  },

  onEndContact(contact, selfCollider, otherCollider) {
    console.log(otherCollider.tag);
    if (otherCollider.tag === 1) {
      isGround = false;
      isRope = false;
      this.AudioManager.playScreamSound();
      this.AudioManager.playRunSound(false);
      this.Character.getComponent("sp.Skeleton").setAnimation(
        0,
        "Casual/Fly",
        true
      );

      this.scheduleOnce(() => {
        this.AudioManager.playScreamSound();
      }, 3);
    }

    if (otherCollider.tag === 2) {
      isGround = false;
      isRope = false;
      this.AudioManager.playRunSound(false);
      this.Character.getComponent("sp.Skeleton").setAnimation(
        0,
        "Casual/Fly",
        true
      );
    }
  },

  update(dt) {
    if (isGround && !isRope) {
      this.characterRun();
    } else if (!isGround && !isRope) {
      this.characterFall();
    }
  },
});
