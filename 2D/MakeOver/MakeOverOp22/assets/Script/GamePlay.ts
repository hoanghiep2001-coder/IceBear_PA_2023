import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {

  @property(AudioManager)
  AudioManager: AudioManager = null;
  @property(GameController)
  GameController: GameController = null;
  @property(sp.Skeleton)
  spine_cleanser: sp.Skeleton = null;

  // Node
  @property(cc.Node)
  bg: cc.Node = null;
  @property(cc.Node)
  popup: cc.Node = null;
  @property(cc.Node)
  popup_horizontal: cc.Node = null;
  @property(cc.Node)
  installPoint: cc.Node = null;
  @property(cc.Node)
  installPoint2: cc.Node = null;
  @property(cc.Node)
  text: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  Scratchable: cc.Node = null;
  @property(cc.Node)
  Point_Cleanser: cc.Node = null;
  @property(cc.Node)
  hand_MainContent: cc.Node = null;
  @property(cc.Node)
  spiderContainer: cc.Node = null;

  // decor
  @property(cc.Node)
  decor_pumpkin: cc.Node = null;
  @property(cc.Node)
  decor_spiderweb1: cc.Node = null;
  @property(cc.Node)
  decor_spiderweb2: cc.Node = null;

  // array
  @property([cc.Node])
  spiders: cc.Node[] = [];

  // state
  Component_Scratchable: cc.Component = null;
  currentPos: cc.Vec2 = null;

  isEndGame: boolean = false;
  isRotate: boolean = false;
  isPlayBgSound: boolean = false;
  isTouch: boolean = false;

  cleanSoundState: number = null;
  device: string = null;


  protected onLoad(): void {
    this.hand.active = false;
    this.spiders.forEach(spider => spider.active = false);
    this.popup.active = false;
    this.popup_horizontal.active = false;

    this.popup.opacity = 0;
    this.popup_horizontal.opacity = 0;
    this.spine_cleanser.node.opacity = 0;
  }


  protected start(): void {
      this.Component_Scratchable = this.Scratchable.getComponent("Scratchable")
      this.handleGamePlay();
           // ironsource
           this.bg.on(cc.Node.EventType.TOUCH_END, this.handleActiveSoundIronSource, this);
  }


  private handleGamePlay(): void {
    // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    this.spine_cleanser.paused = true;

    this.scheduleOnce(() => {
      this.spine_cleanser.getComponent(cc.Animation).play("Show");

      // ironsource
      this.isPlayBgSound ? cc.audioEngine.play(this.AudioManager.moveItemSound, false, 1) : ""

      // cc.audioEngine.play(this.AudioManager.moveItemSound, false, 1);
    }, 1);

    this.scheduleOnce(() => {
      this.spine_cleanser.paused = false;
    }, 1.5);

    this.scheduleOnce(() => {
      // ironsource
      this.isPlayBgSound ? cc.audioEngine.play(this.AudioManager.waterDropSound, false, 1) : ""

      // cc.audioEngine.play(this.AudioManager.waterDropSound, false, 1);
    }, 3);

    // register Event after 1.5s
    this.scheduleOnce(() => {
      this.registerEvent();
      this.hand.active = true;
      this.hand.getComponent(cc.Animation).play("hand_openScene_Anim");
    }, 4);
  }


  private registerEvent(): void {
      this.Point_Cleanser.on(cc.Node.EventType.TOUCH_START, this.handlePointTouchStart, this);
      this.Point_Cleanser.on(cc.Node.EventType.TOUCH_MOVE, this.handlePointTouchMove, this);
      this.Point_Cleanser.on(cc.Node.EventType.TOUCH_END, this.handlePointTouchEnd, this);
      this.Point_Cleanser.on(cc.Node.EventType.TOUCH_CANCEL, this.handlePointTouchEnd, this);
  }


  private handleActiveSoundIronSource(): void {
    if(this.isPlayBgSound) {
      return
    }

    this.isPlayBgSound = true;
    cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
  }


  private handlePointTouchStart(e: cc.Touch): void {
    this.currentPos = e.getLocation();

    this.isTouch = true;
    this.hand.active = false;
    this.spine_cleanser.setAnimation(0, "Action", true);
    this.spine_cleanser.paused = false;
    this.cleanSoundState = cc.audioEngine.play(this.AudioManager.cleanSound, true, 1);
  }


  private handlePointTouchMove(e: cc.Touch): void {
    this.Point_Cleanser.x = this.currentPos.x - cc.winSize.width / 2;
    this.Point_Cleanser.y = this.currentPos.y - cc.winSize.height / 2;

    this.spine_cleanser.node.x = this.currentPos.x - cc.winSize.width / 2 - 60;
    this.spine_cleanser.node.y = this.currentPos.y - cc.winSize.height / 2 - 60;

    this.currentPos = e.getLocation();
  }


  private handlePointTouchEnd(): void {
    this.isTouch = false;
    this.spine_cleanser.paused = true;
    cc.audioEngine.stop(this.cleanSoundState);
  }


  private handleShowSpiders(): void {
    cc.audioEngine.play(this.AudioManager.scarySound, false, 1);
    this.Point_Cleanser.active = false;

    this.spiders.forEach(spider => {
      spider.active = true;
      spider.getComponent(cc.Animation).play("Spiders_anim");
    });

    this.scheduleOnce(() => {
      this.handleShowPopup();
    }, 1);
  }


  private handleShowPopup(): void {
    this.isEndGame = true;
    this.checkRotate();
    this.handleRegisterInstallEvent();
  }


  private checkRotate(): void {
    if(this.isRotate) {

      this.decor_pumpkin.active = true;
      this.popup_horizontal.active = true;
      this.getComponent(cc.Animation).play("GamePlay_EndAnimForRotate");

      this.scheduleOnce(() => {
        this.popup_horizontal.getComponent(cc.Animation).play("Show");
      }, 1);

      this.scheduleOnce(() => {
        this.popup_horizontal.getComponent(cc.Animation).play("PopupHorizontal_HintAnim");
      }, 1.8);


    } else {

      this.decor_pumpkin.active = false;
      this.popup.active = true;
      this.popup.getComponent(cc.Animation).play("Show");
  
      this.scheduleOnce(() => {
        this.popup.getComponent(cc.Animation).play("Popup_HintAnim");
      }, 0.8);
    }
  }


  private handleRegisterInstallEvent(): void {
    // others
    this.installPoint.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    this.installPoint2.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

    // mtg && applovin
    // this.bg.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
  }


  protected update(dt: number): void {
    if (this.Component_Scratchable.isWin && this.Scratchable.active ) {
      this.handleShowSpiders();
      this.Scratchable.active = false;
      this.spine_cleanser.node.active = false;
      cc.audioEngine.stop(this.cleanSoundState);
    }
  }

}
