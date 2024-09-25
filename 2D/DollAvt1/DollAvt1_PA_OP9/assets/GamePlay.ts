const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {
  @property(cc.Node)
  container: cc.Node = null;

  @property(cc.Boolean)
  isClickOp1: boolean = false;

  @property(cc.Boolean)
  isClickOp2: boolean = false;

  @property(cc.Node)
  gameBase: cc.Node = null;

  @property(cc.Node)
  openingChooseText: cc.Node = null;

  @property(cc.Node)
  openingOp1: cc.Node = null;

  @property(cc.Node)
  openingOp2: cc.Node = null;

  @property([cc.Node])
  options: cc.Node[] = [];

  @property([cc.Boolean])
  selectedOptions: boolean[] = [false, false, false, false, false, false];

  @property(cc.Node)
  mainGame: cc.Node = null;

  @property(cc.Node)
  character: cc.Node = null;

  @property(cc.Node)
  characterOp1: cc.Node = null;

  @property(cc.Node)
  characterOp2: cc.Node = null;

  @property(cc.Node)
  characterHair: cc.Node = null;

  @property(cc.Node)
  characterHair2: cc.Node = null;

  @property(cc.Node)
  option1: cc.Node = null;

  @property(cc.Node)
  option2: cc.Node = null;

  @property(cc.Node)
  op1Hair: cc.Node = null;

  @property(cc.Node)
  op2Hair: cc.Node = null;

  @property(cc.Node)
  op1Eye: cc.Node = null;

  @property(cc.Node)
  op2Eye: cc.Node = null;

  @property(cc.Boolean)
  isCorrect: boolean = true;

  @property(cc.Node)
  overlay: cc.Node = null;

  @property(cc.Node)
  end: cc.Node = null;

  @property(cc.Node)
  logo: cc.Node = null;

  @property(cc.Node)
  tryAgain: cc.Node = null;

  @property(cc.Node)
  playNow: cc.Node = null;

  @property(cc.Node)
  nextBtn: cc.Node = null;

  @property(cc.Node)
  CharacterEyeDefault1: cc.Node = null;

  @property(cc.Node)
  CharacterEyeDefault2: cc.Node = null;

  @property(cc.Node)
  eyeOption1: cc.Node = null;

  @property(cc.Node)
  eyeOption2: cc.Node = null;

  @property(cc.Node)
  eyeChosen1: cc.Node = null;

  @property(cc.Node)
  eyeChosen2: cc.Node = null;

  @property(cc.Node)
  endBtn: cc.Node = null;

  update(dt): void {
    if (cc.winSize.width <= 242) {
      this.gameBase.scaleX = 0.7;
      this.gameBase.scaleY = 0.7;
      this.end.scaleX = 0.8;
      this.end.scaleY = 0.8;
    } else if (cc.winSize.width <= 271) {
      this.gameBase.scaleX = 0.7;
      this.gameBase.scaleY = 0.7;
    } else if (cc.winSize.width > cc.winSize.height) {
      this.gameBase.scaleX = 1.1;
      this.gameBase.scaleY = 1.1;
    } else {
      this.gameBase.scaleX = 0.9;
      this.gameBase.scaleY = 0.9;
    }
  }

  onLoad() {
    console.log(cc.winSize.width, cc.winSize.height);

    this.node.getComponent("AudioManager").playBackgroundSound();
    this.openingChooseText.active = true;
    if(cc.winSize.width < cc.winSize.height) {
      this.openingChooseText.getComponent(cc.Animation).play("ChooseTextAnim");
    } else {
      this.openingChooseText.getComponent(cc.Animation).play("ChooseTextAnim2");
    }
    this.registerEvent();
    this.scheduleOnce(() => {
      this.openingOp1.active = true;
      this.openingOp2.active = true;
    }, 1.5);
  }

  registerEvent(): void {
    this.options.forEach((option) => {
      option.on("touchend", () => {
        this.node.getComponent("AudioManager").playClickBtnSound();
        if (option.name === "op1") {
          if (!this.selectedOptions[0]) {
            this.openingOp2.getComponent(cc.Animation).play("FadeAnim");
            this.scheduleOnce(() => {
              this.openingOp1.getComponent(cc.Animation).play("Op1ShowScale");
              this.node.getComponent("AudioManager").playSaveSound();
            }, 0.5);

            this.scheduleOnce(() => {
              this.openingOp1.getComponent(cc.Animation).play("FadeAnim");
              this.openingChooseText
                .getComponent(cc.Animation)
                .play("FadeAnim");
            }, 2.5);

            this.scheduleOnce(() => {
              this.openingOp1.active = false;
              this.openingOp2.active = false;
            }, 3);

            this.playMainGame("op1");
          }
          this.selectedOptions[0] = true;
          this.isClickOp1 = true;
          this.characterOp1.active = true;
        }

        if (option.name === "op2") {
          if (!this.selectedOptions[1]) {
            this.openingOp1.getComponent(cc.Animation).play("FadeAnim");
            this.scheduleOnce(() => {
              this.openingOp2.getComponent(cc.Animation).play("Op2ShowScale");
              this.node.getComponent("AudioManager").playSaveSound();
            }, 0.5);

            this.scheduleOnce(() => {
              this.openingOp2.getComponent(cc.Animation).play("FadeAnim");
              this.openingChooseText
                .getComponent(cc.Animation)
                .play("FadeAnim");
            }, 2.5);

            this.scheduleOnce(() => {
              this.openingOp1.active = false;
              this.openingOp2.active = false;
            }, 3);

            this.playMainGame("op2");
          }
          this.selectedOptions[1] = true;
          this.isClickOp2 = true;
          this.characterOp2.active = true;
        }

        if (option.name === "Hair1") {
          if (!this.selectedOptions[2]) {
            this.scheduleOnce(() => {
              this.eyeOption1.active = true;
              this.eyeOption2.active = true;
            }, 0.5);
          }
          this.selectedOptions[2] = true;
        }

        if (option.name === "Hair2") {
          if (!this.selectedOptions[3]) {
            this.scheduleOnce(() => {
              this.eyeOption1.active = true;
              this.eyeOption2.active = true;
            }, 0.5);
          }
          this.selectedOptions[3] = true;
        }

        if (option.name === "EyeNode1") {
          if (!this.selectedOptions[5] && this.isClickOp2) {
            this.CharacterEyeDefault1.active = false;
            this.eyeChosen2.active = true;
            this.scheduleOnce(() => {
              this.node.getComponent("AudioManager").playSaveSound();
            }, 0.3);

            this.scheduleOnce(() => {
              this.endGame(this.isCorrect);
            }, 1);
          } else {
            this.isCorrect = false;
            this.node.getComponent("AudioManager").playWrongSound();
            this.endGame(this.isCorrect);
          }
          this.selectedOptions[5] = true;
        }

        if (option.name === "EyeNode2") {
          if (!this.selectedOptions[4] && this.isClickOp1) {
            this.CharacterEyeDefault1.active = false;
            this.eyeChosen1.active = true;
            this.scheduleOnce(() => {
              this.node.getComponent("AudioManager").playSaveSound();
            }, 0.3);

            this.scheduleOnce(() => {
              this.endGame(this.isCorrect);
            }, 1);
          } else {
            this.isCorrect = false;
            this.node.getComponent("AudioManager").playWrongSound();
            this.endGame(this.isCorrect);
          }
          this.selectedOptions[4] = true;
        }
      });
    });

    this.endBtn.on("touchend", () => {
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    });
  }

  playMainGame(option: string): void {
    this.scheduleOnce(() => {
      this.mainGame.active = true;
      if (cc.winSize.width <= 242) {
        console.log("char2");
        
        this.character.getComponent(cc.Animation).play("ShowCharacter2");
      } else if (cc.winSize.width > cc.winSize.height) {
        console.log("char3");

        this.character.getComponent(cc.Animation).play("ShowCharacter3");
      } else {
        console.log("char1");
        
        this.character.getComponent(cc.Animation).play("ShowCharacter");
      }

      if (option === "op1") {
        this.characterOp1.active = true;
      } else {
        this.characterOp2.active = true;
      }
    }, 3);

    this.scheduleOnce(() => {
      this.option1.active = true;
      this.option2.active = true;

      // main game
      if (option === "op1") {
        this.op1Hair.on("touchend", () => {
          this.characterHair.active = true;
          this.scheduleOnce(() => {
            this.node.getComponent("AudioManager").playSaveSound();
          }, 0.3);
          this.scheduleOnce(() => {
            this.option1.getComponent(cc.Animation).play("Option1_ChangeItem");
            this.option2.getComponent(cc.Animation).play("Option2_ChangeItem");
          }, 1);
          this.scheduleOnce(() => {
            this.op1Hair.active = false;
            this.op2Hair.active = false;
            this.op1Eye.active = true;
            this.op2Eye.active = true;
            this.option1.getComponent(cc.Animation).play("Option1Anim");
            this.option2.getComponent(cc.Animation).play("Option2Anim");
          }, 1.5);
        });
        this.op2Hair.on("touchend", () => {
          this.isCorrect = false;
          this.endGame(this.isCorrect);
          this.node.getComponent("AudioManager").playWrongSound();
        });
      } else {
        this.op1Hair.on("touchend", () => {
          this.isCorrect = false;
          this.endGame(this.isCorrect);
          this.node.getComponent("AudioManager").playWrongSound();
        });
        this.op2Hair.on("touchend", () => {
          this.characterHair2.active = true;
          this.scheduleOnce(() => {
            this.node.getComponent("AudioManager").playSaveSound();
          }, 0.3);
          this.scheduleOnce(() => {
            this.option1.getComponent(cc.Animation).play("Option1_ChangeItem");
            this.option2.getComponent(cc.Animation).play("Option2_ChangeItem");
          }, 1);
          this.scheduleOnce(() => {
            this.op1Hair.active = false;
            this.op2Hair.active = false;
            this.op1Eye.active = true;
            this.op2Eye.active = true;
            this.option1.getComponent(cc.Animation).play("Option1Anim");
            this.option2.getComponent(cc.Animation).play("Option2Anim");
          }, 1.5);
        });
      }
    }, 3.5);
  }

  endGame(correct: boolean): void {
    if (!correct) {
      this.overlay.active = true;
      this.scheduleOnce(() => {
        this.endBtn.active = true;
        this.end.active = true;
        this.tryAgain.active = true;
      }, 1);
    } else {
      this.scheduleOnce(() => {
        this.overlay.active = true;
        this.scheduleOnce(() => {
          this.endBtn.active = true;
          this.end.active = true;
          this.playNow.active = true;
        }, 1);
      }, 1.5)
    }
  }
}
