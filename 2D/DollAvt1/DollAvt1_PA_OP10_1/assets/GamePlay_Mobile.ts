const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

  // node
  @property(cc.Node)
  background: cc.Node = null;
  @property(cc.Node)
  game: cc.Node = null;
  @property(cc.Node)
  dirtyHair: cc.Node = null;
  @property(cc.Node)
  impactArea: cc.Node = null;
  @property(cc.Node)
  characterDirtyHair: cc.Node = null;
  @property(cc.Node)
  oops: cc.Node = null;
  @property(cc.Node)
  doll: cc.Node = null;
  @property(cc.Node)
  wall: cc.Node = null;
  @property(cc.Node)
  noMoveFlag: cc.Node = null;

  // array
  @property([cc.Node])
  keys: cc.Node[] = [];
  @property([cc.Node])
  beautyHairs: cc.Node[] = [];
  @property([cc.Node])
  hands: cc.Node[] = [];

  // state
  currentPosition: cc.Vec2 = null;
  isRotate: boolean = false;
  isIphoneX: boolean = false;
  isCompleteStep1: boolean = false;
  moveKeySoundState: number = null;

  // rigid body
  dirtyHairRigidBody: cc.RigidBody = null;

  // audio
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  angrySound : cc.AudioClip = null;
  @property(cc.AudioClip)
  moveKeySound: cc.AudioClip = null;

  protected start(): void {
    cc.winSize.width > cc.winSize.height
      ? this.isRotate = true
      : this.isRotate = false;

    cc.audioEngine.play(this.bgSound, true, 1);
    this.registerPhysicsEvent();
    this.registerEvent();

    this.game.getComponent(cc.Animation).play("IpX_IntroAnim");

    this.scheduleOnce(() => {
         this.hands[0].getComponent(cc.Animation).play("IpX_Hand");
    }, 1);
  };

  private registerEvent(): void {
    this.keys[0].on("touchstart", (e: cc.Touch) => {
      this.currentPosition = e.getLocation();
      this.hands[0].active = false;
      this.moveKeySoundState = cc.audioEngine.play(this.moveKeySound, true, 1)
    });

    this.keys[0].on("touchmove", (e: cc.Touch) => {
      this.keys[0].x = this.currentPosition.x - cc.winSize.width / 2 - 20;

      if (
        !this.isCompleteStep1
        && this.keys[0].getBoundingBox().intersects(this.impactArea.getBoundingBox())
      ) {
        this.isCompleteStep1 = true;
        this.keys[0].off("touchmove");
        this.keys[0].active = false;
        cc.audioEngine.stop(this.moveKeySoundState)
      }

      if (this.keys[0].getBoundingBox().intersects(this.noMoveFlag.getBoundingBox())) {
        if (this.isRotate) {
          console.log("rotate");

        } else {
          this.keys[0].x = -53;
          this.keys[0].y = -108;
        }
      }

      this.currentPosition = e.getLocation();
    });

    this.keys[0].on("touchend", (e: cc.Touch) => {
      cc.audioEngine.stop(this.moveKeySoundState)
    });
  }

  private registerPhysicsEvent(): void {
    this.dirtyHairRigidBody = this.dirtyHair.getComponent(cc.RigidBody);

    console.log(this.dirtyHairRigidBody);

    this.dirtyHairRigidBody.onBeginContact = (contact, selfCol, otherCol) => {
      if (otherCol.tag === 0) {
        this.dirtyHair.active = false;
        this.beautyHairs.forEach(item => {
          item.active = false;
        });
        this.characterDirtyHair.active = true;
      }
    }

    this.dirtyHairRigidBody.onEndContact = (contact, selfCol, otherCol) => {
      if (otherCol.tag === 0) {
        this.oops.getComponent(cc.Animation).play("IpX_Oops");
        this.doll.getComponent(cc.Animation).play("IpX_Smell");
        cc.audioEngine.play(this.angrySound, false, 1);

        this.scheduleOnce(() => {
          this.hands[1].getComponent(cc.Animation).play("IpX_Hand2");;
          this.handleEndGame();
        }, 1)
      }
    }
  }

  private dirtyHairFall(): void {
    this.dirtyHairRigidBody.linearVelocity = cc.v2(0, -80)
  }

  private handleEndGame(): void {
    // others
    this.keys[1].on("touchstart", () => {
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    });

    this.keys[1].on("touchmove", () => {
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    });

    // mtg & applovin
    // this.background.on("touchend", () => {
    //   cc.audioEngine.stopAll();
    //   this.node.getComponent("GameController").installHandle();
    // });
  }

  protected update(dt: number): void {

    if (this.isCompleteStep1) {
      this.dirtyHairFall()
    }
  }
}
