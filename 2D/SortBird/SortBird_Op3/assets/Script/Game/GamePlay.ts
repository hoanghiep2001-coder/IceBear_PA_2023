import { Constants } from "../Data/constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  // node
  @property(cc.Node)
  game: cc.Node = null;
  @property(cc.Node)
  secondStickArea: cc.Node = null;
  @property(cc.Node)
  thirdStickArea: cc.Node = null;
  @property(cc.Node)
  boss: cc.Node = null;
  @property(cc.Node)
  cloud: cc.Node = null;
  @property(cc.Node)
  thunder: cc.Node = null;
  @property(cc.Node)
  bossThunder: cc.Node = null;
  @property(cc.Node)
  bossFake: cc.Node = null;
  @property(cc.Node)
  end: cc.Node = null;
  @property(cc.Node)
  tryAgain: cc.Node = null;
  @property(cc.Node)
  background: cc.Node = null;
  @property(cc.Node)
  background_Road: cc.Node = null;
  @property(cc.Node)
  bgWarning: cc.Node = null;
  @property(cc.Node)
  warningImactArea: cc.Node = null;

  @property(cc.Node)
  stick5: cc.Node = null;

  // array
  @property([cc.Node])
  yellowBirds: cc.Node[] = [];
  @property([cc.Node])
  redBirds: cc.Node[] = [];
  @property([cc.Node])
  greenBirds: cc.Node[] = [];
  @property([cc.Node])
  brownBirds: cc.Node[] = [];
  @property([cc.Node])
  hands: cc.Node[] = [];

  // state
  isSorted: boolean = false;
  isRotate: boolean = false;
  clickedState: boolean = false;
  // firstStickState: number[] = [2, 2, 1, 1];
  // secondStickState: number[] = [1, 1];
  // thirdStickState: number[] = [3, 3, 3];
  // fourthStickState: number[] = [2, 4, 2];
  // fifthStickState: number[] = [4, 4, 4, 3];
  // sixthStickState: number[] = [];
  // sortProgressState: boolean[] = [false, false, true, true];
  stepTwoSorted: boolean = false;
  isMoveFast: boolean = false;
  isThunderHit: boolean = false;
  isWin: boolean = false;
  warningSoundState: number = null;

  // rigid body
  bossRigidBody: cc.RigidBody = null;
  bossThunderRigidBody: cc.RigidBody = null;
  bossFakeRigidBody: cc.RigidBody = null;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  sort: cc.AudioClip = null;
  @property(cc.AudioClip)
  flap: cc.AudioClip = null;
  @property(cc.AudioClip)
  tweet: cc.AudioClip = null;
  @property(cc.AudioClip)
  electricSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  thunderSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  warning: cc.AudioClip = null;

  protected onLoad(): void {

    // lock rotation of device
    // if (this.isRotate) {
    //   cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    //     cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    //   });
    // } else {
    //   cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    //     cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    //     // cc.audioEngine.playMusic()
    //   });
    // }

    cc.director.getPhysicsManager().enabled = true;
    let collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;

    this.bossRigidBody = this.boss.getComponent(cc.RigidBody);
    this.bossThunderRigidBody = this.bossThunder.getComponent(cc.RigidBody);
    this.bossFakeRigidBody = this.bossFake.getComponent(cc.RigidBody);

    this.hands[0].active = false;
    this.hands[1].active = false;
    this.hands[2].active = false;
    this.hands[3].active = false;
    this.hands[4].active = false;
    this.cloud.active = false;
    this.thunder.active = false;
    this.bossThunder.active = false;
    this.bossFake.active = false;
    this.end.active = false;
    this.bgWarning.active = false;
  };

  protected start(): void {
    cc.audioEngine.play(this.bgSound, true, 1);
    
    // set intro fly kind for birds 
    this.game.getComponent(cc.Animation).play("Mobile_IntroAnim");
    this.handleSetIntroForBirds();

    // listen impact event
    this.handleImpactEvent();

    this.scheduleOnce(() => {
      // this.registerEvent(1);
      this.hands[0].active = true;
      this.hands[0].getComponent(cc.Animation).play("Mobile_HandAnim");
    }, 2.5);
  };

  private handleSetIntroForBirds(): void {

    this.redBirds.forEach(bird => {
      bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
      }, 1.2);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2.5)
    });

    this.yellowBirds.forEach(bird => {
      bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
      }, 1.2);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2.5)
    });

    this.greenBirds.forEach(bird => {
      bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
      }, 1.2);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2.5)
    });

    this.brownBirds.forEach(bird => {
      bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
      }, 1.2);

      this.scheduleOnce(() => {
        bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2.5)
    });
  };

  private handleImpactEvent(): void {

  };

  private handleBossMove(sorted: string): void {

    // ----------- new for toStore
    if(!this.isWin && !Constants.ironSource.isEndGame) {
      this.boss.y += 0.15;
    }
    // --------------------------




    // ------------- Old
    // if (sorted === "fast") {
    //   this.bossRigidBody.linearVelocity = cc.v2(0, 25);
    //   this.bossThunderRigidBody.linearVelocity = cc.v2(0, 25);
    //   this.bossFakeRigidBody.linearVelocity = cc.v2(0, 25);
    // } else if (sorted === "idle") {
    //   this.bossRigidBody.linearVelocity = cc.v2(0, 0);
    //   this.bossThunderRigidBody.linearVelocity = cc.v2(0, 0);
    //   this.bossFakeRigidBody.linearVelocity = cc.v2(0, 0);
    // } else if (sorted === "slow") {
    //   this.bossRigidBody.linearVelocity = cc.v2(0, 20);
    //   this.bossThunderRigidBody.linearVelocity = cc.v2(0, 20);
    //   this.bossFakeRigidBody.linearVelocity = cc.v2(0, 20);
    // }
    // ---------------------------
  };

  private handleBossFall(thunder: boolean): void {
    if (thunder) {
      this.bossRigidBody.linearVelocity = cc.v2(0, -50);
      this.bossThunderRigidBody.linearVelocity = cc.v2(0, -50);
      this.bossFakeRigidBody.linearVelocity = cc.v2(0, -50);
    }
  };

  private registerEvent(step: number): void {
    if(step == 1) {
      this.redBirds[0].on("touchend", () => {
        this.clickedState ? this.clickedState = false : this.clickedState = true;
  
        this.hands[0].active = false;
        this.hands[1].active = true;
        this.hands[1].getComponent(cc.Animation).play("Mobile_HandAnim2");
  
        if (this.clickedState) {
          // touching sound
          cc.audioEngine.play(this.tweet, false, 1);
          this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "touching", false);
          this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "touching", false);
        } else {
          this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
          this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        }
      });
  
      this.secondStickArea.on("touchend", () => {
        this.hands[1].active = false;
        if (!this.clickedState || this.isSorted) return;
  
        cc.audioEngine.play(this.sort, false, 1)
  
        this.isSorted = true;
  
        this.handleLogicGame(1)
      });
  
      // mtg & applovin
      this.background.on("touchend", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      });
  
      // others
      this.tryAgain.on("touchend", () => {
        cc.audioEngine.stopAll();
        this.node.getComponent("GameController").installHandle();
      });
    } else {
      
    
    this.brownBirds[0].on("touchend", () => {
      this.clickedState ? this.clickedState = false : this.clickedState = true;
      this.hands[2].active = false;
      this.hands[3].active = true;
      this.hands[3].getComponent(cc.Animation).play("Mobile_HandAnim4");

      if (this.clickedState) {
        // touching sound
        cc.audioEngine.play(this.tweet, false, 1);
        this.brownBirds[0].getComponent(sp.Skeleton).setAnimation(0, "touching", false);
      } else {
        this.brownBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }
    });

    this.thirdStickArea.on("touchend", () => {
      this.hands[3].active = false;
      if (this.stepTwoSorted) return;
      console.log("check");
      
      cc.audioEngine.play(this.sort, false, 1)

      this.stepTwoSorted = true;

      this.handleLogicGame(2)
    });
    }
  };

  private handleLogicGame(step: number) : void {
    if ( step == 1 ) {
      this.clickedState = false;
      this.game.getComponent(cc.Animation).play("Mobile_SortAnim");
      this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "fly", true);
      this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
        this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
      }, 1);

      this.scheduleOnce(() => {
        this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2);

      this.scheduleOnce(() => {
        this.redBirds.forEach(bird => {
          cc.audioEngine.play(this.flap, false, 1);
          bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
        });
      }, 2.5);

      this.scheduleOnce(() => {
        this.cloud.active = true;
        cc.audioEngine.play(this.thunderSound, false, 1);
      }, 3);

      this.scheduleOnce(() => {
        this.thunder.active = true;
        this.boss.opacity = 0;
        this.isThunderHit = true;
        this.bossThunder.active = true;
        this.bossFake.active = true;
        this.bossThunder.getComponent(cc.Animation).play("Mobile_BossThunder");
      }, 3.5);

      this.scheduleOnce(() => {
        cc.audioEngine.play(this.electricSound, false, 1);
      }, 3.8);

      this.scheduleOnce(() => {
        this.isThunderHit = false;

        this.hands[2].active = true;
        this.hands[2].getComponent(cc.Animation).play("Mobile_HandAnim3");
      }, 4);

      this.scheduleOnce(() => {
        this.registerEvent(2);
        this.isMoveFast = true;
        this.bossThunder.active = false;
        this.bossFake.active = false;
        this.boss.opacity = 255;
        this.cloud.getComponent(cc.Animation).play("Fade");
        this.thunder.active = false;
        this.boss.getComponent(sp.Skeleton).setAnimation(0, "climb", true);
        this.boss.getComponent(sp.Skeleton).timeScale = 0.65;
      }, 4.5);
    } else {
      this.game.getComponent(cc.Animation).play("Mobile_SortAnim2");
      this.brownBirds[0].getComponent(sp.Skeleton).setAnimation(0, "fly", true);

      this.scheduleOnce(() => {
        this.brownBirds[0].getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
      }, 1);

      this.scheduleOnce(() => {
        this.brownBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
      }, 2);

      this.scheduleOnce(() => {
        this.brownBirds.forEach(bird => {
          cc.audioEngine.play(this.flap, false, 1);
          bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
        });
      }, 2.5);

      this.scheduleOnce(() => {
        this.cloud.active = true;
        this.cloud.opacity = 255;
        cc.audioEngine.play(this.thunderSound, false, 1);
      }, 3);

      this.scheduleOnce(() => {
        this.thunder.active = true;
        this.boss.opacity = 0;
        this.isThunderHit = true;
        this.bossThunder.active = true;
        this.bossFake.active = true;
        this.bossThunder.getComponent(cc.Animation).play("Mobile_BossThunder");
      }, 3.5);

      this.scheduleOnce(() => {
        cc.audioEngine.play(this.electricSound, false, 1);
      }, 3.8);

      this.scheduleOnce(() => {
        this.isThunderHit = false;
        this.hands[4].active = true;
        this.hands[4].getComponent(cc.Animation).play("Mobile_HandAnim5");

        this.yellowBirds[2].on("touchend", () => {
          cc.audioEngine.stopAll();
          this.node.getComponent("GameController").installHandle();
        })
      }, 4);

      this.scheduleOnce(() => {
        this.isMoveFast = true;
        this.bossThunder.active = false;
        this.bossFake.active = false;
        this.boss.opacity = 255;
        this.cloud.getComponent(cc.Animation).play("Fade");
        this.thunder.active = false;
        this.boss.getComponent(sp.Skeleton).setAnimation(0, "climb", true);
        this.boss.getComponent(sp.Skeleton).timeScale = 0.9;
      }, 4.5);
    }
  }


  private handleCollideStick(): void {
      if(this.stick5.getBoundingBox().intersects(this.boss.getBoundingBox())) {
        if (this.isWin) return;

        this.isWin = true;
        this.boss.getComponent(sp.Skeleton).setAnimation(0, "idle", true);

        this.scheduleOnce(() => {
          this.end.active = true;
          this.end.getComponent(cc.Animation).play("Mobile_EndAnim");
        }, 1);

        if(Constants.ironSource.SoundState) {
          cc.audioEngine.stop(this.warningSoundState);
        }
        this.bgWarning.getComponent(cc.Animation).stop("Blink");
        this.bgWarning.opacity = 0;
        // this.bgWarning.active = false;
      }
      
      if(this.warningImactArea.getBoundingBox().intersects(this.boss.getBoundingBox()) ) {
        if(this.bgWarning.active || Constants.ironSource.isEndGame) {
          return;
        }
        
        console.log("chedk");
        
        if(Constants.ironSource.SoundState) {
          this.warningSoundState = cc.audioEngine.play(this.warning, true, 1);
        }
        this.bgWarning.active = true;
        this.bgWarning.getComponent(cc.Animation).play("Blink");
      }

  }


  protected update(dt: number): void {

    // fix 13/12/2023 - Hiep Be
    this.handleCollideStick();
    // --------------

    if (this.isMoveFast && !this.isWin) {
      this.handleBossMove("fast")
    } else if (!this.isMoveFast && !this.isWin) {
      this.handleBossMove("slow")
    }

    if (this.isWin) {
      this.handleBossMove("idle")
    }

    this.isThunderHit ? this.handleBossFall(true) : this.handleBossFall(false);
  }
}
