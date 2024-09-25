const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Camera)
  camera: cc.Camera = null;

  @property(cc.Node)
  game: cc.Node = null;

  @property(cc.Node)
  intro: cc.Node = null;

  @property(cc.Node)
  princes: cc.Node = null;

  @property(cc.Node)
  characterEmoji: cc.Node = null;

  @property(cc.Node)
  character: cc.Node = null;

  @property(cc.Node)
  background1: cc.Node = null;

  @property(cc.Node)
  background2: cc.Node = null;

  @property(cc.Node)
  mainContent: cc.Node = null;

  @property(cc.Node)
  helpMeText: cc.Node = null;

  @property(cc.Node)
  hand: cc.Node = null;

  @property([cc.Node])
  public monsters: cc.Node[] = [];

  @property([cc.Node])
  public transforms: cc.Node[] = [];

  @property([cc.Node])
  public characterWeapons: cc.Node[] = [];

  @property([cc.Node])
  endGame: cc.Node[] = [];

  @property(cc.Node)
  tryAgain: cc.Node = null;

  @property([cc.AudioClip])
  sounds: cc.AudioClip[] = [];

  isRotate: boolean = false;
  isCanClick: boolean = false;
  characterLevel: number = 10;
  wolfLevel: number = 3;
  skeletonLevel: number = 9;
  knightLevel: number = 30;
  currentLevel: number = 0;
  step: number = 1;
  audioManager = null;

  protected onLoad(): void {
    this.audioManager = this.node.getComponent("AudioManager");
    this.audioManager.playLoopSound(this.sounds[0], true);

    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
    } else {
      this.isRotate = false;
    }

    this.registerEvents();

    this.scheduleOnce(() => {
      this.characterEmoji.active = true;
    }, 2.5);

    this.scheduleOnce(() => {
      if (this.isRotate) {
        this.camera.node.x = 220;
        this.mainContent.getComponent(cc.Animation).play("Tablet_ShowPrincess");
      } else {
        this.camera.getComponent(cc.Animation).play("Camera");
      }
      this.mainContent.active = true;
      this.background1.active = false;
      this.helpMeText.active = true;
    }, 4);

    this.scheduleOnce(() => {
      this.helpMeText.active = false;
    }, 6);

    if (this.isRotate) {
      this.scheduleOnce(() => {
        this.hand.active = true;
        this.isCanClick = true;
      }, 6.5);
    } else {
      this.scheduleOnce(() => {
        this.hand.active = true;
        this.isCanClick = true;
      }, 8.5);
    }
  }

  protected registerEvents(): void {
    this.node.on("touchstart", () => {
      if (!this.isCanClick) return;
      if (this.step === 1) {
        this.step = 2;
        this.isCanClick = false;
        this.hand.active = false;
        // đấm con sói
        if (this.isRotate) {
          this.mainContent
            .getComponent(cc.Animation)
            .play("Tablet_MainContent1");
        } else {
          this.mainContent.getComponent(cc.Animation).play("MainContent1");
        }

        this.characterLevel += this.wolfLevel;
        console.log(this.characterLevel);

        this.scheduleOnce(() => {
          this.audioManager.playManyHitsSound(this.sounds[1]);
          this.character
            .getComponent(sp.Skeleton)
            .setAnimation(0, "atk_melee", false);

          this.monsters[0].getComponent(sp.Skeleton).setAnimation(0, "attack", true)

          this.scheduleOnce(() => {
            this.monsters[0].getComponent(sp.Skeleton).setAnimation(0, "attack", false)
          }, 1)
        }, 2.2);

        this.scheduleOnce(() => {
          this.monsters[0].active = false;
        }, 4);

        this.scheduleOnce(() => {
          this.audioManager.playLoopSound(this.sounds[3], false);
          this.transforms[0].active = true;
          this.character.active = false;
          this.characterWeapons[0].active = true;
          this.isCanClick = true;

          if (this.isRotate) {
            this.mainContent
              .getComponent(cc.Animation)
              .play("Tablet_MainContentZoomOut");
          } else {
            this.mainContent
              .getComponent(cc.Animation)
              .play("MainContentZoomOut");
          }


        }, 4.5);
      } else if (this.step === 2) {
        this.step = 3;
        this.isCanClick = false;
        this.transforms[0].active = false;

        // đấm con xương
        if (this.isRotate) {
          this.mainContent
            .getComponent(cc.Animation)
            .play("Tablet_MainContent2");
        } else {
          this.mainContent.getComponent(cc.Animation).play("MainContent2");
        }
        this.characterLevel += this.skeletonLevel;
        console.log(this.characterLevel);

        this.scheduleOnce(() => {
          this.audioManager.playManyHitsSound(this.sounds[2]);
          this.characterWeapons[0]
            .getComponent(sp.Skeleton)
            .setAnimation(0, "atk_sword", false);

          this.monsters[1].getComponent(sp.Skeleton).setAnimation(0, "attack", true)

          this.scheduleOnce(() => {
            this.monsters[1].getComponent(sp.Skeleton).setAnimation(0, "attack", false)
          }, 1)
        }, 2.2);

        this.scheduleOnce(() => {
          this.monsters[1].active = false;
        }, 4.3);

        this.scheduleOnce(() => {
          this.audioManager.playLoopSound(this.sounds[3], false);
          this.characterWeapons[0].active = false;
          this.transforms[1].active = true;
          this.characterWeapons[1].active = true;
        }, 5);

        this.scheduleOnce(() => {
          if (this.isRotate) {
            this.mainContent
              .getComponent(cc.Animation)
              .play("Tablet_MainContentZoomOut");
          } else {
            this.camera.getComponent(cc.Animation).play("CameraStep2");
            this.mainContent
              .getComponent(cc.Animation)
              .play("MainContentZoomOut");
          }
          this.isCanClick = true;
        }, 5.5);
      } else if (this.step === 3) {
        this.step = 4;
        this.isCanClick = false;

        // đấm con knight
        this.characterWeapons[1].active = false;
        this.characterWeapons[2].active = true;
        if (this.isRotate) {
          this.mainContent
            .getComponent(cc.Animation)
            .play("Tablet_MainContent3");
        } else {
          this.mainContent.getComponent(cc.Animation).play("MainContent3");
        }
        this.characterLevel += this.knightLevel;
        console.log(this.characterLevel);

        this.scheduleOnce(() => {
          this.audioManager.playManyHitsSound(this.sounds[2]);
          this.characterWeapons[2]
            .getComponent(sp.Skeleton)
            .setAnimation(0, "atk_katana", false);

          this.monsters[2].getComponent(sp.Skeleton).setAnimation(0, "attack", true)

          this.scheduleOnce(() => {
            this.monsters[2].getComponent(sp.Skeleton).setAnimation(0, "attack", false)
          }, 1)
        }, 2);

        this.scheduleOnce(() => {
          this.characterWeapons[2].active = false;
        }, 4.2);

        this.scheduleOnce(() => {
          this.handleEndGame();
        }, 5);
      }
    });
  }

  protected handleEndGame(): void {
    if (this.isRotate) {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      });
    } else {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      });
    }

    this.endGame.forEach((node) => {
      node.active = true;
    });

    // others
    this.tryAgain.on("touchstart", () => {
      cc.audioEngine.stopAll()
      this.node.getComponent("GameController").installHandle();
    })

    // MTG & applovin
    // this.endGame[0].on("touchstart", () => {
    //   cc.audioEngine.stopAll();
    //   this.node.getComponent("GameController").installHandle();
    // });
  }

  update(dt: number): void {
    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.game.scaleX = 1.3;
      this.game.scaleY = 1.3;
      this.intro.y = 30;
      this.background1.scaleX = 0.7;
      this.background1.scaleY = 0.7;
      this.background1.y = 350;
      this.background2.scaleX = 0.8;
      this.background2.scaleY = 0.8;
      this.background2.y = 140;
      this.endGame[1].x = 190;
    } else {
      this.isRotate = false;
      this.game.scaleX = 1;
      this.game.scaleY = 1;
      this.intro.y = 0;
      this.background1.scaleX = 0.3;
      this.background1.scaleY = 0.3;
      this.background1.y = 30;
      this.background2.scaleX = 0.5;
      this.background2.scaleY = 0.5;
      this.background2.y = 15;
      this.endGame[1].x = 110;
    }
  }
}
