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
  fireWorks: cc.Node = null;
  @property(cc.Node)
  test: cc.Node = null;

  // array
  @property([cc.Node])
  circles: cc.Node[] = [];
  @property([cc.Node])
  stopCircleAreas: cc.Node[] = [];
  @property([cc.Node])
  scratchAbles: cc.Node[] = [];
  @property([cc.Node])
  characters: cc.Node[] = [];
  @property([cc.Node])
  dresses: cc.Node[] = [];
  @property([cc.Node])
  projectedCharacters: cc.Node[] = [];
  @property([cc.Node])
  fillScratchables: cc.Node[] = [];

  // state
  testPos: cc.Vec2 = new cc.Vec2(0,0);
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
    // this.node.getComponent("AudioManager").playBgSound();
    
    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.game.getComponent(cc.Animation).play("Tablet_Intro");

      this.scheduleOnce(() => {
        this.node.getComponent("AudioManager").playScreamSound();
      }, 1);

      this.scheduleOnce(() => {
        this.game.getComponent(cc.Animation).play("Tablet_HandAnim");
        this.registerEvent();
      }, 2.5)
    } else {
      this.isRotate = false;
      this.game.getComponent(cc.Animation).play("Mobile_Intro");

      this.scheduleOnce(() => {
        this.node.getComponent("AudioManager").playScreamSound();
      }, 1);

      this.scheduleOnce(() => {
        this.game.getComponent(cc.Animation).play("Mobile_HandAnim");
        this.registerEvent();
      }, 2.5);
    }
  }

  private registerEvent(): void {
    this.background.on("touchmove", (e) => {
      let touchInfo = e.touch.getDelta();

        this.testPos = new cc.Vec2(touchInfo.x, touchInfo.y);

        if (this.test != null)
        {
           this.test.angle += (this.testPos.x / 1);
        }
        else
        {
            cc.log("Can't access toRotate???");
        }
    });

    this.background.on("touchend", function()
    {
        this.testPos = new cc.Vec2(0,0);
    }, this)

    // circle 1
    // this.circles[0].on("touchstart", (e: cc.Touch) => {
    //   this.circleClicked = 1;
    //   this.currentPosition = e.getLocation();

    //   if (!this.isClickedFirstTime) {
    //     this.isClickedFirstTime = true;
    //     this.tempPostision = e.getLocation();
    //   }
    //   this.hand.active = false;
    //   this.scratchAbles[0].active = false;
    //   this.circles[1].off("touchstart");
    //   this.circles[1].off("touchmove");

    //   this.isRotate 
    //     ? this.game.getComponent(cc.Animation).stop("Tablet_HandAnim") 
    //     : this.game.getComponent(cc.Animation).stop("Mobile_HandAnim") 
    // });

    // this.circles[0].on("touchmove", (e: cc.Touch) => {

    //   if (this.isDone) return;

    //   this.circles[0].x = this.currentPosition.x - cc.winSize.width / 2;

    //   if (this.circles[0].getBoundingBox().intersects(this.stopCircleAreas[0].getBoundingBox())) {
    //     this.circles[0].x = this.tempPostision.x - cc.winSize.width / 2;
    //   }

    //   if (
    //     this.circles[0].getBoundingBox().intersects(this.stopCircleAreas[2].getBoundingBox())
    //     || this.circles[0].getBoundingBox().intersects(this.stopCircleAreas[1].getBoundingBox()) 
    //   ) {
    //     this.isDone = true;

    //     this.handleSwapDress(1);

    //     this.scheduleOnce(() => {
    //       this.handleSwapPrincess();
    //     }, 3.5)
    //   }

    //   this.currentPosition = e.getLocation();
    // });


    // // circle 2
    // this.circles[1].on("touchstart", (e: cc.Touch) => {
    //   this.circleClicked = 2;
    //   this.currentPosition = e.getLocation();

    //   if (!this.isClickedFirstTime) {
    //     this.isClickedFirstTime = true;
    //     this.tempPostision = e.getLocation();
    //   }

    //   this.hand.active = false;
    //   this.scratchAbles[1].active = false;
    //   this.circles[0].off("touchstart");
    //   this.circles[0].off("touchmove");

    //   this.isRotate 
    //   ? this.game.getComponent(cc.Animation).stop("Tablet_HandAnim") 
    //   : this.game.getComponent(cc.Animation).stop("Mobile_HandAnim") 
    // });

    // this.circles[1].on("touchmove", (e: cc.Touch) => {
    //   if (this.isDone) return;

    //   this.circles[1].x = this.currentPosition.x - cc.winSize.width / 2;

    //   if (this.circles[1].getBoundingBox().intersects(this.stopCircleAreas[1].getBoundingBox())) {
    //     this.circles[1].x = this.tempPostision.x - cc.winSize.width / 2;
    //   }

    //   if (
    //     this.circles[1].getBoundingBox().intersects(this.stopCircleAreas[3].getBoundingBox()) 
    //     || this.circles[1].getBoundingBox().intersects(this.stopCircleAreas[0].getBoundingBox()) 
    //   ) {
    //     this.isDone = true;

    //     this.handleSwapDress(0);

    //     this.scheduleOnce(() => {
    //       this.handleSwapPrincess();
    //     }, 3.5)
    //   }

    //   this.currentPosition = e.getLocation();
    // });
  }

  private handleSwapDress(param: number): void {
    this.isRotate 
      ? this.game.getComponent(cc.Animation).play("Tablet_SwapDress") 
      : this.game.getComponent(cc.Animation).play("Mobile_SwapDress")

    this.scratchAbles[param].active = false;
    this.fillScratchables[param].active = false;
    this.circles.forEach(circle => {
      circle.active = false
    });

    this.scheduleOnce(() => {
      this.fireWorks.active = true;
      this.node.getComponent("AudioManager").playEndStepSound();
    }, 2)
  }

  private handleSwapPrincess(): void {

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
      this.scratchAbles.forEach(item => {
        item.active = true;
      });

      this.circles.forEach(circle => {
        circle.active = true;
      });
      this.circles[this.circleClicked - 1].x = this.tempPostision.x - cc.winSize.width / 2;

      this.hand.active = true;
      this.isRotate
        ? this.game.getComponent(cc.Animation).play("Tablet_HandAnim")
        : this.game.getComponent(cc.Animation).play("Mobile_HandAnim");

      this.handleEndPlayableAds();
    }, 2);
  }

  private handleEndPlayableAds(): void {
    this.circles.forEach(circle => {
      circle.off("touchstart");
      circle.off("touchmove");

      // others
      circle.on("touchstart", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      })

      circle.on("touchmove", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      })

      // mtg & applovin
      this.background.on("touchstart", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      })
    })
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
    } else {
      this.isRotate = false;
      this.projectedCharacters[0].x = -55;
      this.projectedCharacters[0].y = -45;
      this.projectedCharacters[1].x = 55;
      this.projectedCharacters[1].y = -45;
      this.fireWorks.scaleX = 0.15;
      this.fireWorks.scaleY = 0.15;
    }
  }

}
