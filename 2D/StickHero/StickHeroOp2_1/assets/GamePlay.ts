const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  // camera
  @property(cc.Camera)
  camera: cc.Camera = null;

  // node 
  @property(cc.Node)
  game: cc.Node = null;
  @property(cc.Node)
  intro: cc.Node = null;
  @property(cc.Node)
  princes: cc.Node = null;
  @property(cc.Node)
  characterEmoji: cc.Node = null;
  @property(cc.Node)
  background1: cc.Node = null;
  @property(cc.Node)
  background2: cc.Node = null;
  @property(cc.Node)
  mainContent: cc.Node = null;
  @property(cc.Node)
  overlay: cc.Node = null;
  @property(cc.Node)
  transformSpine: cc.Node = null;
  @property(cc.Node)
  princessText: cc.Node = null;
  @property(cc.Node)
  chooseText: cc.Node = null;
  @property(cc.Node)
  weaponsContainer: cc.Node = null;
  @property(cc.Node)
  Boss: cc.Node = null;
  @property(cc.Node)
  tryAgain: cc.Node = null;

  // array
  @property([cc.Node])
  weapons: cc.Node[] = [];
  @property([cc.Node])
  characters: cc.Node[] = [];
  @property([cc.Node])
  monster: cc.Node[] = [];
  @property([cc.Node])
  fightArea: cc.Node[] = [];
  @property([cc.Node])
  endGame: cc.Node[] = [];
  @property([cc.AudioClip])
  sounds: cc.AudioClip[] = [];

  // state
  isRotate: boolean = false;
  isCanClick: boolean = false;
  isChoosed: boolean = false;
  isRunGame: boolean = false;
  audioManager = null;

  // rigidbody
  characterRigidbody: cc.RigidBody = null;
  choosenChar: cc.Node = null;
  charRun: boolean = false;
  bossRun: boolean = false;

  protected onLoad(): void {
    // to know the rotation of device
    if(cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
    } else {
      this.isRotate = false;
    }

    // lock rotation of device
    if (this.isRotate) {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      });
    } else {
      cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      });
    }

    this.audioManager = this.node.getComponent("AudioManager");
    // bg sound
    this.audioManager.playLoopSound(this.sounds[0], true);

    // physics engine
    cc.director.getPhysicsManager().enabled = true;
    let collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;

    this.scheduleOnce(() => {
      this.characterEmoji.active = true;
    }, 2.5);

    this.scheduleOnce(() => {
      this.background1.active = false;
      this.mainContent.active = true;
      if (!this.isRotate) {
        this.camera.getComponent(cc.Animation).play("Mobile_CameraAnim1");
      } 
    }, 4);

    // handle beetween mobile & tablet devices
    if(this.isRotate) {
      this.scheduleOnce(() => {
        this.overlay.active = true;
      }, 4.5);

      this.scheduleOnce(() => {
        this.chooseText.active = true;
        this.chooseText.getComponent(cc.Animation).play("Tablet_ChooseWeaponText")
        this.weapons.forEach(weapon => {
          weapon.active = true;
          weapon.getComponent(cc.Animation).play("Tablet_ShowWeapons");
        })
        this.registerEvents();
      }, 5);
    } else {
      this.scheduleOnce(() => {
        this.overlay.active = true;
      }, 5.5);

      this.scheduleOnce(() => {
        this.chooseText.active = true;
        this.chooseText.getComponent(cc.Animation).play("Mobile_ChooseWeaponText")
        this.weapons.forEach(weapon => {
          weapon.active = true;
          weapon.getComponent(cc.Animation).play("Tablet_ShowWeapons");
        })
        this.registerEvents();
      }, 6);
    } 
  }

  protected registerEvents(): void {
    this.weapons.forEach(weapon => {
      weapon.on("touchend", () => {
        this.chooseText.active = false;
        this.overlay.active = false;
        if (this.isChoosed) return;

        this.isChoosed = true;
        this.transformSpine.active = true;
        if (weapon.name === "weapon_katana") {
          this.choosenChar = this.characters[1];
          this.characters[0].active = false;
          this.characters[1].active = true;
        }

        if (weapon.name === "weapon_sword") {
          this.choosenChar = this.characters[2];
          this.characters[0].active = false;
          this.characters[2].active = true;
        }

        // transform sound
        this.audioManager.playLoopSound(this.sounds[3], false);

        this.characterRigidbody = this.choosenChar.getComponent(cc.RigidBody)

        this.handleHideWeapon()

        this.scheduleOnce(() => {
          this.isRunGame = true;
          this.charRun = true;

          if(!this.isRotate) {
            this.camera.getComponent(cc.Animation).play("Mobile_CameraAnim2");
          }
        }, 1)
      })
    })
  }

  protected handleHideWeapon(): void {
    this.weapons.forEach(weapon => {
      weapon.getComponent(cc.Animation).play("HideWeapon");
    })
  }

  protected characterRun(): void {
    this.characterRigidbody.linearVelocity = cc.v2(
      250,
      this.characterRigidbody.linearVelocity.y
    );

    this.characterRigidbody.onBeginContact = (contact, selfCol, otherCol) => {
      if (otherCol.tag === 2) {
        this.charRun = false;
        
        this.handleFight();
      }
    }
  }

  protected handleFight(): void {

    this.choosenChar.name === "Katana_Character"
      ? this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "atk_katana", false)
      : this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "atk_sword", false)

      this.audioManager.playManyHitsSound(this.sounds[2]);

    this.monster.forEach(monster => {
      monster.getComponent(sp.Skeleton).setAnimation(0, "attack", true);
    })

    this.scheduleOnce(() => {
      this.monster.forEach(monster => {
        monster.getComponent(sp.Skeleton).setAnimation(0, "attack", false);
      })
      this.scheduleOnce(() => {
        this.monster[0].active = false;
        this.monster[1].active = false;

        this.choosenChar.name === "Katana_Character"
          ? this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "idle", true)
          : this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "idle_sword", true)
      }, 1.3)
    }, 1);

    this.scheduleOnce(() => {
      this.fightArea[0].active = false;
      this.handleSwitchToBossFight();
    }, 3);
  }

  protected handleSwitchToBossFight(): void {
    if(this.isRotate) {
      this.camera.getComponent(cc.Animation).play("Tablet_CameraAnim")
      this.scheduleOnce(() => {
        this.princessText.active = true;
      }, 0.3)

      this.scheduleOnce(() => {
        this.Boss.getComponent(sp.Skeleton).setAnimation(0, "run", true)
        this.charRun = true;
        this.bossRun = true;
      }, 3);
    } else {
      this.princessText.active = true;

      this.scheduleOnce(() => {
        this.Boss.getComponent(sp.Skeleton).setAnimation(0, "run", true)
        this.charRun = true;
        this.bossRun = true;
      }, 3);
    }
  }

  protected bossFight(): void {
    const bossRigidbody = this.Boss.getComponent(cc.RigidBody)
    bossRigidbody.linearVelocity = cc.v2(
      -600,
      bossRigidbody.linearVelocity.y
    );

    bossRigidbody.onBeginContact = (contact, selfCol, otherCol) => {
      if (otherCol.tag === 0) {
        this.audioManager.playManyHitsSound(this.sounds[2]);
        this.choosenChar.name === "Katana_Character"
          ? this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "atk_katana", false)
          : this.choosenChar.getComponent(sp.Skeleton).setAnimation(0, "atk_sword", false)

        this.scheduleOnce(() => {
          this.scheduleOnce(() => {
            this.choosenChar.active = false;
            this.Boss.getComponent(sp.Skeleton).setAnimation(0, "idle", true)
            this.bossRun = false;
          }, 0.5)
  
          this.scheduleOnce(() => {
            this.handleEndGame();
          }, 1.5)
        }, 0.5)
      }
    }
  }

  protected handleEndGame(): void {
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
    if (this.isRunGame && this.charRun) {
      this.characterRun();
    }

    if (this.isRunGame && this.bossRun) {
      this.bossFight();
    }

    if (cc.winSize.width > cc.winSize.height) {
      this.isRotate = true;
      this.game.scaleX = 1.3;
      this.game.scaleY = 1.3;
      this.intro.y = 30;
      this.mainContent.scaleX = 1;
      this.mainContent.scaleY = 1;
      this.background1.scaleX = 0.7;
      this.background1.scaleY = 0.7;
      this.background2.scaleY = 0.5;
      this.background1.y = 350;
      this.characters[0].x = -140 ;
      this.weaponsContainer.x = 0;
      this.fightArea[0].x = 72;
      this.endGame[0].x = 0;
      this.endGame[1].x = 0;
    } else {      
      this.isRotate = false;
      this.game.scaleX = 1;
      this.game.scaleY = 1;
      this.intro.y = 0;
      this.mainContent.scaleX = 0.8;
      this.mainContent.scaleY = 0.8;
      this.background1.scaleX = 0.3;
      this.background1.scaleY = 0.3;
      this.background2.scaleY = 0.8;
      this.background1.y = 30;
      this.characters[0].x = -140 ;
      this.weaponsContainer.x = -170;
      this.endGame[0].x = -200;
      this.endGame[1].x = -200;
      this.fightArea[0].x = 190;
    }
  }
}
