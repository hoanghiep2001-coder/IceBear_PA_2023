const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {

  // node
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  scissor: cc.Node = null;
  @property(cc.Node)
  defaultHair: cc.Node = null;
  @property(cc.Node)
  defaultHairLeft: cc.Node = null;
  @property(cc.Node)
  defaultHairRight: cc.Node = null;
  @property(cc.Node)
  cutHairShape: cc.Node = null;
   @property(cc.Node)
  dyeHairShape: cc.Node = null;
  @property(cc.Node)
  anyaHair: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  dragText: cc.Node = null;
  @property(cc.Node)
  dyeHair: cc.Node = null; 
  @property(cc.Node)
  dyeHairArea: cc.Node = null;
  @property(cc.Node)
  pinkScratable: cc.Node = null;
  @property(cc.Node)
  pinkHair: cc.Node = null;
  @property(cc.Node)
  circle: cc.Node = null;
  @property(cc.Node)
  tweezers: cc.Node = null;
  @property(cc.Node)
  background: cc.Node = null;

  // array
  @property([cc.Node])
  dropHairCuts: cc.Node[] = [];
  @property([cc.Node])
  cutHairImpactAreas: cc.Node[] = [];

  // state
  isRotate: boolean = false;
  currentPosition: cc.Vec2;

  tempSoundState: number;
  playCuttingSoundState: boolean = false;
  leftHairIsDown: boolean = false;
  rightHairIsDown: boolean = false;
  cutHairStatus: boolean[] = [false, false, false, false];
  dyeHairStatus: boolean[] = [false, false, false, false];
  countingStatus: number = 0;
  isDoneCutting: boolean = false;
  isDoneDying: boolean = false;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  cutSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  hairDyingSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  showItemSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  endStepSound: cc.AudioClip = null;

  protected onLoad(): void {
    cc.audioEngine.play(this.bgSound, true, 1);
    this.scheduleOnce(() => {
      if(this.isRotate) {
        console.log("rotated");
      } else {
        this.dollBase.getComponent(cc.Animation).play("DollBaseAnim");
      }
    }, 0.5);  

    this.scheduleOnce(() => {
      this.cutHairShape.active = true;
      this.hand.active = true;
      this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");
    }, 1.5)

    this.scheduleOnce(() => {
      this.registerEvent(1);
    }, 3);
  }

  private registerEvent(step: number): void {
    if(step == 1) {
      this.stepOne();
    } else if(step == 2) {
      this.stepTwo();
    } else if(step == 3) {
      // others
      this.tweezers.on("touchend", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      });

      this.tweezers.on("touchmove", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      });

      // applovin & MTG
      // this.background.on("touchend", () => {
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // });
    }
  }

  private handleDoneCuttingHair(status: boolean): void {
    if(!status) return;

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.endStepSound, false, 1)
      this.handleDyeHair()
    }, 0.5)
    cc.audioEngine.stop(this.tempSoundState);
    this.defaultHair.getComponent(cc.Animation).play("Fade");
    this.scissor.active = false;
  }

  private handleDyeHair(): void {
    this.scheduleOnce(() => {
      this.dyeHair.active = true;
      this.registerEvent(2);
      this.countingStatus = 0;
    }, 1)
  }

  private stepOne(): void {
    this.scissor.on("touchstart", (e: cc.Touch) => {
      this.hand.active = false;
      this.dragText.active = false;
      this.currentPosition = e.getLocation();
      this.scissor.getComponent(sp.Skeleton).setAnimation(0, "action", true);
      this.dropHairCuts.forEach(item => {
        item.getComponent(sp.Skeleton).setAnimation(0, "action", true);
      })
      this.cutHairShape.getComponent(cc.Animation).play("Fade");
      this.tempSoundState = cc.audioEngine.play(this.cutSound, true, 1)

      this.scheduleOnce(() => {
        this.cutHairShape.active = false
      }, 0.2)
    });

    this.scissor.on("touchmove", (e: cc.Touch) => {
      if (this.isDoneCutting) return;

      this.scissor.x = this.currentPosition.x - cc.winSize.width / 2;
      this.scissor.y = this.currentPosition.y - cc.winSize.height / 2 + 10;

      this.currentPosition = e.getLocation();

      // counting point cut hair 
      this.cutHairImpactAreas.forEach((area, index) => {
        if (this.scissor.getBoundingBox().intersects(area.getBoundingBox())) {
          this.cutHairStatus[index] = true;
        }
      });

      if(this.scissor.getBoundingBox().intersects(this.cutHairImpactAreas[2].getBoundingBox())) {
        if (this.leftHairIsDown) return;

        this.leftHairIsDown = true;
        this.cutHairStatus[2] = true;
        this.defaultHairLeft.getComponent(cc.Animation).play("DropHair");
      }

      if(this.scissor.getBoundingBox().intersects(this.cutHairImpactAreas[3].getBoundingBox())) {
        if (this.rightHairIsDown) return;

        this.cutHairStatus[3] = true;
        this.rightHairIsDown = true
        this.defaultHairRight.getComponent(cc.Animation).play("DropHair");
      }

      this.countingStatus = this.cutHairStatus.filter((status) => status === true).length;
      if (this.countingStatus >= 2) {
        this.isDoneCutting = true;
        this.handleDoneCuttingHair(this.isDoneCutting);
      }
    });

    this.scissor.on("touchend", (e: cc.Touch) => {
      cc.audioEngine.stop(this.tempSoundState);
      this.scissor.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      this.dropHairCuts.forEach(item => {
        item.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      })
    });
  }

  private stepTwo(): void {
    this.dyeHairArea.active = true; 
    
    this.dyeHairShape.active = true;
    this.dyeHairShape.getComponent(cc.Animation).play("cutHairShape");
    
    this.scheduleOnce(() => {
      this.hand.active = true;
    }, 1.5)

    this.dyeHairArea.on("touchstart", (e: cc.Touch) => {
      this.hand.active = false;
      this.currentPosition = e.getLocation();
      this.dyeHair.getComponent(sp.Skeleton).setAnimation(0, "action", true);
      this.dyeHairShape.getComponent(cc.Animation).play("Fade");
      this.tempSoundState = cc.audioEngine.play(this.hairDyingSound, true, 1)

      this.scheduleOnce(() => {
        this.cutHairShape.active = false
      }, 0.2)
    });

    this.dyeHairArea.on("touchmove", (e: cc.Touch) => {
      if (this.isDoneDying) return;

      this.dyeHair.x = this.currentPosition.x - cc.winSize.width / 2;
      this.dyeHair.y = this.currentPosition.y - cc.winSize.height / 2 - 130;

      this.dyeHairArea.x = this.currentPosition.x - cc.winSize.width / 2 + 20;
      this.dyeHairArea.y = this.currentPosition.y - cc.winSize.height / 2 + 20; 

      this.currentPosition = e.getLocation();

      // counting point cut hair 
      this.cutHairImpactAreas.forEach((area, index) => {
        if (this.dyeHairArea.getBoundingBox().intersects(area.getBoundingBox())) {
          this.dyeHairStatus[index] = true;
        }
      });

      this.countingStatus = this.dyeHairStatus.filter((status) => status === true).length;
      if (this.countingStatus >= 2) {
        this.isDoneDying = true;
        this.handleDoneDyingHair(this.isDoneDying);
      }
    });

    this.dyeHairArea.on("touchend", (e: cc.Touch) => {
      cc.audioEngine.stop(this.tempSoundState);
      this.dyeHair.getComponent(sp.Skeleton).setAnimation(0, "idle02", true);
    });
  }

  private handleDoneDyingHair(isDoneDying: boolean):void {
    if(!isDoneDying) return;

    this.anyaHair.active = false;
    this.pinkHair.active = true;
    this.pinkScratable.getComponent(cc.Animation).play("Fade")

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.endStepSound, false, 1)
      this.handleShowTweezers()
    }, 0.5)
    cc.audioEngine.stop(this.tempSoundState);
    this.dyeHair.active = false;
    this.dyeHairArea.active = false;
  }

  private handleShowTweezers(): void {
    this.circle.active = true;
    this.tweezers.getComponent(cc.Animation).play("Show");

    this.registerEvent(3)
  }
}
