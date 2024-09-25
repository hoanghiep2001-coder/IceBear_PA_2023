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
  Spine_Hand: sp.Skeleton = null;


  // Node
  @property(cc.Node)
  BG_Vertical: cc.Node = null;
  @property(cc.Node)
  bg_Tiled1: cc.Node = null;
  @property(cc.Node)
  bg_Tiled2: cc.Node = null;
  @property(cc.Node)
  hideMask: cc.Node = null;
  @property(cc.Node)
  point_delete: cc.Node = null;

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
  currentPos: cc.Vec2 = null;
  isPlayBgSound: boolean = false;
  resumeStatus: boolean = true;
  cleanSoundState: number = null;
  device: string = null;
  trackEntry: sp.spine.TrackEntry = null;

  protected onLoad(): void {
    this.install_point.opacity = 0;
    this.Hand_Vertical.opacity = 0;

    this.Hand_openScene.active = false;
    this.install_point.active = false;
  }


  protected start(): void {
    this.HandleGamePlay();

    // ironsource
    this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleActiveSoundIronSource, this);
  }


  private HandleGamePlay(): void {
    this.trackEntry = this.Spine_Hand.setAnimation(0, "animation", false);
    this.Spine_Hand.paused = true;

    // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    this.RegisterEvent();
    this.Hand_openScene.active = true;
    this.Hand_openScene.getComponent(cc.Animation).play("hand_openScene_Anim");
  }


  private RegisterEvent(): void {
    this.point.on(cc.Node.EventType.TOUCH_START, this.onPointTouchStart, this);
    this.point.on(cc.Node.EventType.TOUCH_MOVE, this.onPointTouchMove, this);
    this.point.on(cc.Node.EventType.TOUCH_END, this.onPointTouchEnd, this);
    this.point.on(cc.Node.EventType.TOUCH_CANCEL, this.onPointTouchEnd, this);

    this.install_point.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    this.Spine_Hand.setCompleteListener((trackEntry: sp.spine.TrackEntry) => {
      if(trackEntry.animation.name === "animation") {
        this.handleShowInstallPoint();
      }
    });
  }


  private onPointTouchStart(e: cc.Touch): void {
    this.currentPos = e.getLocation();
    
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
    const touchPos = e.getLocation();
    
    if(touchPos.y < this.currentPos.y) {
        this.handleResumeSpineHand(false);
    } else {
        this.handleResumeSpineHand(true);
    }

    this.currentPos = touchPos;
  }


  private onPointTouchEnd(): void {
    this.handleResumeSpineHand(true);
    this.resumeStatus = true;
  }


  private handleResumeSpineHand(status: boolean): void {
    if(this.resumeStatus === status) return;
    this.resumeStatus = status;

    if(status) {
      this.Spine_Hand.paused = true;
      cc.audioEngine.stop(this.cleanSoundState);
    } else {
      this.Spine_Hand.paused = false;
      this.cleanSoundState = cc.audioEngine.play(this.AudioManager.TearSound, true, 1);
    }
  }


  private handleShowInstallPoint(): void {

    // mtg & applovin
    // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

    cc.audioEngine.stop(this.cleanSoundState);
    cc.audioEngine.play(this.AudioManager.scarySound, false, 1);

    this.install_point.active = true;
    this.toms.forEach(tom => tom.getComponent(cc.Animation).play("Tom_Anim"));

    this.Spine_Hand.node.active = false;
    this.point.active = false;
    this.point.off(cc.Node.EventType.TOUCH_START);
    this.point.off(cc.Node.EventType.TOUCH_MOVE);
    this.point.off(cc.Node.EventType.TOUCH_END);

    this.Hand_Vertical.opacity = 255;
    this.Hand_Vertical.getComponent(cc.Animation).play("Hand_vertical_Anim");
  }


  protected update(dt: number): void {

  }

}
