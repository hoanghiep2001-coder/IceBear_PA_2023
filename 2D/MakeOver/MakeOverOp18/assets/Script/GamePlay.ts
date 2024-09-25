import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass("GamePlay")
export default class GamePlay extends cc.Component {

  @property(AudioManager)
  AudioManager: AudioManager = null;
  @property(GameController)
  GameController: GameController = null;
  @property(cc.Node)
  Scratchable: cc.Node = null;


  @property(sp.Skeleton)
  Spine_Sponge: sp.Skeleton = null;


  // Node
  @property(cc.Node)
  BG_Vertical: cc.Node = null;
  @property(cc.Node)
  BG_Horizontal: cc.Node = null;
  @property(cc.Node)
  bg_Tiled1: cc.Node = null;
  @property(cc.Node)
  bg_Tiled2: cc.Node = null;
  @property(cc.Node)
  hideMask: cc.Node = null;

  @property(cc.Node)
  Hand: cc.Node = null;
  @property(cc.Node)
  install_point: cc.Node = null;
  @property(cc.Node)
  point: cc.Node = null;
  @property(cc.Node)
  Hand_Vertical: cc.Node = null;
  @property(cc.Node)
  Hand_openScene: cc.Node = null;

  // array
  @property([cc.Node])
  toms: cc.Node[] = [];


  // state
  Component_Scratchable: cc.Component = null;
  currentPos: cc.Vec2 = null;
  isPlayBgSound: boolean = false;
  cleanSoundState: number = null;
  device: string = null;


  protected onLoad(): void {
    this.Spine_Sponge.node.opacity = 0;
    this.install_point.opacity = 0;
    this.Hand_Vertical.opacity = 0;

    this.Hand_openScene.active = false;
    this.install_point.active = false;
    this.Component_Scratchable = this.Scratchable.getComponent("Scratchable");
  }


  protected start(): void {
    this.HandleGamePlay();

    // ironsource
    this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleActiveSoundIronSource, this);

  }


  private HandleGamePlay(): void {

    this.Spine_Sponge.paused = true;
    // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

    this.scheduleOnce(() => {
      this.Spine_Sponge.getComponent(cc.Animation).play("Show");

      // ironsource
      if(this.isPlayBgSound) {
        cc.audioEngine.play(this.AudioManager.moveItemSound, false, 1);
      }

      // cc.audioEngine.play(this.AudioManager.moveItemSound, false, 1);


    }, 1);

    this.scheduleOnce(() => {
      this.Spine_Sponge.paused = false;
    }, 1.5);

    this.scheduleOnce(() => {
      // ironsource
      if(this.isPlayBgSound) {
        cc.audioEngine.play(this.AudioManager.waterDropSound, false, 1);
      }

      // cc.audioEngine.play(this.AudioManager.waterDropSound, false, 1);
    }, 3);

    // register Event after 1.5s
    this.scheduleOnce(() => {
      this.RegisterEvent();
      this.Hand_openScene.active = true;
      this.Hand_openScene.getComponent(cc.Animation).play("hand_openScene_Anim");
    }, 4);
  }


  private RegisterEvent(): void {
    this.point.on(cc.Node.EventType.TOUCH_START, this.onPointTouchStart, this);
    this.point.on(cc.Node.EventType.TOUCH_MOVE, this.onPointTouchMove, this);
    this.point.on(cc.Node.EventType.TOUCH_END, this.onPointTouchEnd, this);
    this.point.on(cc.Node.EventType.TOUCH_CANCEL, this.onPointTouchEnd, this);

    this.install_point.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
  }


  private onPointTouchStart(e: cc.Touch): void {
    this.currentPos = e.getLocation();

    this.Spine_Sponge.setAnimation(0, "Action", true);
    this.Spine_Sponge.paused = false;
    this.cleanSoundState = cc.audioEngine.play(this.AudioManager.cleanSound, true, 1);
    this.Hand_openScene.active = false;

    // ironsource
    this.handleActiveSoundIronSource();
  }


  private handleActiveSoundIronSource(): void {
    if(this.isPlayBgSound) {
      return
    }

    this.isPlayBgSound = true;
    cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
  }


  private onPointTouchMove(e: cc.Touch): void {
    this.point.x = this.currentPos.x - cc.winSize.width / 2;
    this.point.y = this.currentPos.y - cc.winSize.height / 2;

    this.Spine_Sponge.node.x = this.currentPos.x - cc.winSize.width / 2 - 60;
    this.Spine_Sponge.node.y = this.currentPos.y - cc.winSize.height / 2 - 80;

    this.currentPos = e.getLocation();
  }


  private onPointTouchEnd(): void {
    this.Spine_Sponge.paused = true;
    cc.audioEngine.stop(this.cleanSoundState);
  }


  private handleShowInstallPoint(): void {

    // mtg & applovin
    // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

    cc.audioEngine.play(this.AudioManager.scarySound, false, 1);
    this.install_point.active = true;

    this.toms.forEach(tom => tom.getComponent(cc.Animation).play("Tom_Anim"));

    this.Spine_Sponge.node.active = false;


    this.Hand_Vertical.opacity = 255;
    this.Hand_Vertical.getComponent(cc.Animation).play("Hand_vertical_Anim");
  }


  protected update(dt: number): void {
    if (this.Component_Scratchable.isWin && this.Hand.active) {
      this.Hand.active = false;
      this.handleShowInstallPoint();
    }
  }

}
