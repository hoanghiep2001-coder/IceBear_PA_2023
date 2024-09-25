const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  // node
  @property(cc.Node)
  background: cc.Node = null;
  @property(cc.Node)
  game: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  correctDress: cc.Node = null;
  @property(cc.Node)
  correctDress2: cc.Node = null;
  @property(cc.Node)
  fireWorks: cc.Node = null;
  @property(cc.Node)
  endCharacter: cc.Node = null;

  // array
  @property([cc.Node])
  stopCircleAreas: cc.Node[] = [];
  @property([cc.Node])
  characters: cc.Node[] = [];
  @property([cc.Node])
  dresses: cc.Node[] = [];
  @property([cc.Node])
  projectedCharacters: cc.Node[] = [];

  // state
  isRotate: boolean = false;
  currentPosition: cc.Vec2 = null;
  clearFixPosition: cc.Vec2 = null;
  tempPostision: cc.Vec2 = null;
  step: number = 1;
  isDone: boolean = false;
  circleClicked: number = 0;
  isClickedFirstTime: boolean = false;

  protected onLoad(): void {
    this.fireWorks.active = false;
    this.node.getComponent("AudioManager").playBgSound();

    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.game.getComponent(cc.Animation).play("Tablet_Intro");

      this.scheduleOnce(() => {
        this.game.getComponent(cc.Animation).play("Tablet_HandAnim");
        this.registerEvent();
      }, 2.5)
    } else {
      this.isRotate = false;
      this.game.getComponent(cc.Animation).play("Mobile_Intro");

      this.scheduleOnce(() => {
        this.game.getComponent(cc.Animation).play("Mobile_HandAnim");
        this.registerEvent();
      }, 2.5)
    }
  }

  private registerEvent(): void {
    this.dresses[0].on("touchstart", (e: cc.Touch) => {
      this.currentPosition = e.getLocation();
      this.hand.active = false;

      this.isRotate
        ? this.game.getComponent(cc.Animation).stop("Tablet_HandAnim")
        : this.game.getComponent(cc.Animation).stop("Mobile_HandAnim")

      if (this.isRotate) {
        if (!this.isClickedFirstTime) {
          this.dresses[0].getComponent(cc.Animation).play("Tablet_TakeOffDress");
        }
        this.isClickedFirstTime = true;
      } else {
        if (!this.isClickedFirstTime) {
          this.dresses[0].getComponent(cc.Animation).play("Mobile_TakeOffDress");
        }
        this.isClickedFirstTime = true;
      }
    });

    this.dresses[0].on("touchmove", (e: cc.Touch) => {

      if (this.isDone) return;
      this.dresses[0].x = this.currentPosition.x - cc.winSize.width / 2;
      if (this.dresses[0].getBoundingBox().intersects(this.stopCircleAreas[0].getBoundingBox())) {
        this.dresses[0].x = this.tempPostision.x - cc.winSize.width / 2;
      }

      if (
        this.dresses[0].getBoundingBox().intersects(this.stopCircleAreas[2].getBoundingBox())
        || this.dresses[0].getBoundingBox().intersects(this.stopCircleAreas[1].getBoundingBox())
      ) {
        this.isDone = true;
        this.correctDress.active = true;
        this.dresses[0].active = false;
        this.dresses[1].active = false;
        this.handleSwapDress(1);

        this.scheduleOnce(() => {
          this.handleSwapPrincess();
        }, 3.5)
      }

      this.currentPosition = e.getLocation();
    });
  }

  private handleSwapDress(param: number): void {
    this.vibration();

    this.correctDress2.active = true;

    this.scheduleOnce(() => {
      this.fireWorks.active = true;
      this.node.getComponent("AudioManager").playEndStepSound();
    }, 0.5)
  }

  private handleSwapPrincess(): void {
    this.correctDress.active = false;
    this.correctDress2.active = false;
    this.projectedCharacters.forEach(char => {
      char.active = true;
    })

    this.characters.forEach(character => {
      character.active = false;
    })

    this.dresses.forEach(dress => {
      dress.active = false;
    })

    this.isRotate
      ? this.game.getComponent(cc.Animation).play("Tablet_SwapPrincess")
      : this.game.getComponent(cc.Animation).play("Mobile_SwapPrincess");

    this.scheduleOnce(() => {

      this.hand.active = true;
      this.isRotate
        ? this.game.getComponent(cc.Animation).play("Tablet_HandAnim")
        : this.game.getComponent(cc.Animation).play("Mobile_HandAnim");

      this.handleEndPlayableAds();
    }, 2);
  }

  private handleEndPlayableAds(): void {

    // others
    this.endCharacter.on("touchstart", () => {
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    });

    // mtg & applovin
    // this.background.on("touchstart", () => {
    //   cc.audioEngine.stopAll();
    //   this.node.getComponent("GameController").installHandle();
    // })
  }

  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }

  protected update(dt: number): void {
    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.fireWorks.scaleX = 0.3;
      this.fireWorks.scaleY = 0.3;
      this.projectedCharacters[0].x = -145;
      this.projectedCharacters[0].y = -75;
      this.projectedCharacters[1].x = 145;
      this.projectedCharacters[1].y = -75;
      this.correctDress.scaleX = 0.3;
      this.correctDress.scaleY = 0.3;
      this.correctDress.x = 145;
      this.correctDress.y = -130;
      this.correctDress2.scaleX = 0.3;
      this.correctDress2.scaleY = 0.3;
      this.correctDress2.x = -151.246;
      this.correctDress2.y = -139.802;
    } else {
      this.isRotate = false;
      this.projectedCharacters[0].x = -55;
      this.projectedCharacters[0].y = -45;
      this.projectedCharacters[1].x = 55;
      this.projectedCharacters[1].y = -45;
      this.fireWorks.scaleX = 0.15;
      this.fireWorks.scaleY = 0.15;
      this.correctDress.scaleX = 0.25;
      this.correctDress.scaleY = 0.25;
      this.correctDress.x = 55.285;
      this.correctDress.y = -91.005;
    }
  }

}
