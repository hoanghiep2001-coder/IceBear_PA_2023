import AudioManger from "./AudioManager";
import AudioManager from "./AudioManager";
import { Constants } from "./Data/constants";

const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {
  @property(cc.Node)
  baseGame: cc.Node = null;

  @property(AudioManger)
  AudioManager: AudioManger = null;

  @property(cc.Boolean)
  isPlay: boolean = false;

  @property(cc.Boolean)
  isRotate: boolean = false;

  @property(cc.Vec2)
  startPos: cc.Vec2 = null;

  @property(cc.Node)
  background: cc.Node = null;

  @property(cc.Node)
  hand: cc.Node = null;

  @property(cc.Node)
  dirty: cc.Node = null;

  @property(cc.Node)
  creamSpine: cc.Node = null;

  @property(cc.Node)
  creamEmptyNode: cc.Node = null;

  @property(cc.Node)
  instruct: cc.Node = null;

  @property(cc.Node)
  tweezers: cc.Node = null;

  @property(cc.Node)
  tweezersEmptyNode: cc.Node = null;

  // khi nào bất lực mới dùng đến (thay cho Sratchable) :)
  @property([cc.Node])
  public handImpacts: cc.Node[] = [];

  @property(Number)
  countPointImpact: number = 0;

  @property(Array)
  statusArr: boolean[] = [
    false,
    false,
    false,
    false,
  ];

  @property(cc.Boolean)
  isClean: boolean = false;

  @property(cc.Node)
  overlay: cc.Node = null;

  @property(cc.Node)
  tryAgian: cc.Node = null;

  @property(cc.Node)
  logo: cc.Node = null;

  @property(cc.Node)
  sratchAble: cc.Node = null;

  @property(cc.Node)
  worm1: cc.Node = null;

  @property(cc.Node)
  worm2: cc.Node = null;

  @property(cc.Node)
  impactArea: cc.Node = null;

  @property(cc.Node)
  subTweezers: cc.Node = null;

  @property(cc.Node)
  subTweezers2: cc.Node = null;

  @property(cc.Node)
  subTweezers3: cc.Node = null;

  @property(cc.Boolean)
  isImpact: boolean = false;

  @property(cc.Boolean)
  isEnd: boolean = false;

  @property(cc.Boolean)
  isStopAll: boolean = false;

  isPlaying: boolean = false;

  update(dt): void {
    // ironsource
    // this.handleMuteSoundIronSource();

    if (this.sratchAble.getComponent("Scratchable").isWin) {
      this.caculatePointImpact();

    }

    let screen_width = cc.winSize.width;
    let screen_height = cc.winSize.height;
    if (screen_width < screen_height) {
      this.isRotate = false;
      this.handImpacts[0].x = -70;
      this.handImpacts[0].y = 164;
      this.handImpacts[1].x = 0;
      this.handImpacts[1].y = -80;
      this.handImpacts[2].x = 70;
      this.handImpacts[2].y = -230;
      this.handImpacts[3].x = 110;
      this.handImpacts[3].y = 94;
      this.baseGame.scaleX = 1;
      this.baseGame.scaleY = 1;
      this.sratchAble.scaleX = 1;
      this.sratchAble.scaleY = 1;
      this.logo.scaleX = 0.35;
      this.logo.scaleY = 0.35;
      this.baseGame.y = 0;
      this.sratchAble.y = 0;
      this.impactArea.y = 55;
      if (screen_width < 300) {
        this.logo.scaleX = 0.28;
        this.logo.scaleY = 0.28;
        this.baseGame.scaleX = 0.8;
        this.baseGame.scaleY = 0.8;
        this.baseGame.y = -48;
        this.sratchAble.y = -48;
        this.sratchAble.scaleX = 0.8;
        this.sratchAble.scaleY = 0.8;
        this.handImpacts[0].x = -70;
        this.handImpacts[0].y = 100;
        this.handImpacts[1].x = -10;
        this.handImpacts[1].y = -105;
        this.handImpacts[2].x = 71;
        this.handImpacts[2].y = -231;
        this.handImpacts[3].x = 90;
        this.handImpacts[3].y = 30;
        this.impactArea.y = 10;

      }
    } else {
      this.isRotate = true;
      this.logo.scaleX = 0.55;
      this.logo.scaleY = 0.55;

      this.baseGame.scaleX = 0.8;
      this.baseGame.scaleY = 0.8;
      this.baseGame.y = -48;
      this.sratchAble.y = -48;
      this.sratchAble.scaleX = 0.8;
      this.sratchAble.scaleY = 0.8;
      this.handImpacts[0].x = -70;
      this.handImpacts[0].y = 100;
      this.handImpacts[1].x = -10;
      this.handImpacts[1].y = -105;
      this.handImpacts[2].x = 71;
      this.handImpacts[2].y = -231;
      this.handImpacts[3].x = 90;
      this.handImpacts[3].y = 30;
      this.impactArea.y = 10;
    }
  }

  onLoad(): void {
    // this.AudioManager.playMaggotSound();
    this.registerEvent();
    this.creamEmptyNode.active = true;
    this.scheduleOnce(() => {
      this.creamSpine.active = true;
    }, 0.5);

    this.scheduleOnce(() => {
      // if(Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
      //   this.AudioManager.playShowItem();
      // }

    }, 0.8)

    // show cream spine action
    this.scheduleOnce(() => {
      this.creamSpine.getComponent(sp.Skeleton).setAnimation(0, "Intro", false);
      this.scheduleOnce(() => {
        // if(Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
        //   this.AudioManager.playCreamWaterDrop();
        // }
      }, 1.5);

      this.scheduleOnce(() => {
        this.instruct.active = true;
        
        this.isPlay = true;
        // if (this.isPlay) {
          
        // }
      }, 3);
    }, 2);
  }

  showTweezers() {
    this.scheduleOnce(() => {
      this.creamSpine.active = false;
      this.creamEmptyNode.active = false;
      this.tweezers.active = true;
      this.tweezersEmptyNode.active = true;

      if(Constants.ironSource.SoundState) {
        this.AudioManager.playShowItem();
      }

      this.scheduleOnce(() => {
        this.instruct.active = true;
        if (cc.winSize.width < 300) {
          this.instruct.getComponent(cc.Animation).play("Hand3");
        } else {
          this.instruct.getComponent(cc.Animation).play("Hand2");
        }
      }, 1);
    }, 1);
  }

  registerEvent(): void {
    this.creamEmptyNode.on("touchstart", (e: cc.Touch) => {
      cc.audioEngine.stopAll()
      this.node.getComponent("GameController").installHandle();
    });

    // mtg & applovin
    // this.background.on(cc.Node.EventType.TOUCH_START, (() => {
    //   cc.audioEngine.stopAll()
    //   this.node.getComponent("GameController").installHandle();
    // }), this)

  }

  killMaggot(param: boolean): void {
    if (!param) {
      this.isEnd = true;

      // mtg & applovin 
      // this.background.on(cc.Node.EventType.TOUCH_START, (() => {
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // }), this);

      this.tweezers.active = false;
      this.tweezers.opacity = 0;
      this.tweezersEmptyNode.active = false;
      this.subTweezers2.active = true;
      this.subTweezers3.active = true;
      this.subTweezers2.getComponent(cc.Animation).play("TweezersDrag");
      this.subTweezers3.getComponent(cc.Animation).play("TweezersDrag");
      this.worm1.getComponent(cc.Animation).play("MaggotDrag");

      if(Constants.ironSource.SoundState) {
        this.AudioManager.playKillMaggot1();
      }

      this.isStopAll = true;

      this.scheduleOnce(() => {
        if(Constants.ironSource.SoundState) {
          this.AudioManager.playKillMaggot2();
        }
      }, 0.7);
      // drag maggot from hand
      this.scheduleOnce(() => {
        this.subTweezers.getComponent(cc.Animation).play("KillMaggot");

        if(Constants.ironSource.SoundState) {
          this.AudioManager.playKillMaggot();
        }
      }, 2.2);

      // after kill maggot
      this.scheduleOnce(() => {
        this.subTweezers2.getComponent(cc.Animation).play("FadeAnim");
        this.subTweezers3.getComponent(cc.Animation).play("FadeAnim");
        this.worm1.getComponent(cc.Animation).play("MaggotFall");
      }, 3.2);

      this.scheduleOnce(() => {
        this.tweezers.active = true;
        this.tweezers.getComponent(cc.Animation).play("Tweezers");

        if(Constants.ironSource.SoundState) {
          this.AudioManager.playShowItem();
        }
      }, 4.2);
    }
  }

  endScene(param: boolean): void {
    if (param) {
      // google
      // this.instruct.active = false;
      // this.overlay.active = true;
      // this.tryAgian.on("touchend", () => {
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // });
      // this.scheduleOnce(() => {
      //   this.logo.active = true;
      // }, 2.5);
      // this.scheduleOnce(() => {
      //   this.tryAgian.active = true;
      //   this.AudioManager.playEndSound();
      //   if (this.isRotate) {
      //     this.tryAgian.getComponent(cc.Animation).play("TryAgain_Rotate");
      //   } else {
      //     this.tryAgian.getComponent(cc.Animation).play("TryAgain_Default");
      //   }
      // }, 3.5);

      // others
      cc.audioEngine.stopAll();
      this.node.getComponent("GameController").installHandle();
    }
  }


  handleIronSourcePlaySound() {
    if (Constants.ironSource.isPlayBgSound) {
      return;
    }

    if (Constants.ironSource.SoundState) {
      this.AudioManager.playMaggotSound();
    }

    Constants.ironSource.isPlayBgSound = true;
  }


  handleMuteSoundIronSource() {
    Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

    if (Constants.ironSource.State) {
      if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
        Constants.ironSource.SoundState = true;
        this.AudioManager.playMaggotSound();
      }

      if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
        Constants.ironSource.SoundState = false;
        cc.audioEngine.stopAll();
      }
    }
  }


  caculatePointImpact(): void {
    if (this.isClean) {
      return;
    }

    cc.audioEngine.stop(Constants.cleanSoundState);
    this.isClean = true;
    if (this.isClean) {
      this.dirty.getComponent(cc.Animation).play("FadeAnim");
      this.scheduleOnce(() => {
        this.creamEmptyNode.active = false;
        this.creamSpine.getComponent(cc.Animation).play("FadeAnim");
      }, 0.5);

      this.scheduleOnce(() => {
        this.showTweezers();
      }, 1.5);
    }
  }
}
