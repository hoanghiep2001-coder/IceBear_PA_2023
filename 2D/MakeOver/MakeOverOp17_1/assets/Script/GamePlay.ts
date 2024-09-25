import AudioManger from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

  // Component
  @property(AudioManger)
  AudioManger: AudioManger = null;
  @property(GameController)
  GameController: GameController = null;


  // node
  @property(cc.Node)
  hideMask: cc.Node = null;
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  bg: cc.Node = null;
  @property(cc.Node)
  text: cc.Node = null;

  @property(cc.Node)
  intersectsContainer: cc.Node = null;
  @property(cc.Node)
  boxContainer: cc.Node = null;
  @property(cc.Node)
  PointsContainer: cc.Node = null;
  @property(cc.Node)
  MaggotContainer: cc.Node = null;

  @property(cc.Node)
  layer: cc.Node = null;

  @property(cc.Node)
  hand_1: cc.Node = null;
  @property(cc.Node)
  hand_2: cc.Node = null;


  // tweezers
  @property(cc.Node)
  tweezers: cc.Node = null;
  @property(cc.Node)
  tweezersGlow: cc.Node = null;
  @property(cc.Node)
  pointOfTweezers: cc.Node = null;


  // array
  @property([cc.Node])
  circles: cc.Node[] = [];
  @property([cc.Node])
  maggotPoints: cc.Node[] = [];
  @property([sp.Skeleton])
  spine_Maggots: sp.Skeleton[] = [];
  @property([sp.Skeleton])
  spine_RemoveMGs: sp.Skeleton[] = [];
  @property([sp.Skeleton])
  spine_Breaks: sp.Skeleton[] = [];
  @property([cc.Node])
  tweezers_RemoveMgs: cc.Node[] = [];
  @property([cc.Node])
  tweezers_Defaults: cc.Node[] = [];
  @property([cc.Node])
  Maggot_Nodes: cc.Node[] = [];


  // state
  tweezer_1: cc.Node = null;
  tweezer_2: cc.Node = null;
  maggot_remove: cc.Node = null;
  tweezers_remove: cc.Node = null;

  maggot: sp.Skeleton = null;
  removeSpine: sp.Skeleton = null;

  tweezersInitPos: cc.Vec2 = new cc.Vec2(3, -170);
  tweezersPointInitPos: cc.Vec2 = new cc.Vec2(60, 0);
  currentPos: cc.Vec2 = null;
  startPos: cc.Vec2 = null;

  isRotate: boolean = false;
  isDone: boolean = false;
  isPlayBreakSound: boolean = false;
  isTouched: boolean = false;
  isPlayRemoveMgSound: boolean = false;
  isPlayBgSound: boolean = false;


  step: number = 0;
  point: number = null;
  countingTime: number = 0;
  currentTime: number = 0;
  flagScale: number = 0;
  flagAngle: number = 0;
  previousAngle: number = 0;
  currentIndex: number = 0;
  responsivePointScale: number = 0;
  removeMgSoundState: number = 0;
  spliceTweezers: number = 0;


  // any
  trackEntry: sp.spine.TrackEntry = null;


  protected onLoad(): void {
    this.hand_1.opacity = 0;
    this.hand_2.active = false;
    this.tweezers.opacity = 255;
    this.boxContainer.opacity = 0;
    this.circles.forEach(circle => circle.active = false);
    this.tweezers_RemoveMgs.forEach(tweezers => tweezers.active = false);
  }


  protected start(): void {
    // cc.audioEngine.play(this.AudioManger.bgSound, true, 1);
    this.handleOpenScene();
    this.registerEvent();
  }


  private handleOpenScene(): void {

    // zoom to mr beast
    this.scheduleOnce(() => {
      this.dollBase.getComponent(cc.Animation).play("DollBase_ZoomMgAnim");
      this.text.active = false;
    }, 1.5);


    // show maggots
    this.scheduleOnce(() => {
      this.MaggotContainer.getComponent(cc.Animation).play("Maggot_ShowAnim");

      this.scheduleOnce(() => {
          // ironsource
      // if(this.isPlayBgSound) {
      //   cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      // }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.2);

      this.scheduleOnce(() => {
        // ironsource
        // if(this.isPlayBgSound) {
        //   cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
        // }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.4);

      this.scheduleOnce(() => {
        // ironsource
        // if(this.isPlayBgSound) {
        //   cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
        // }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.6);
    }, 2.2);


    // show tweezers
    this.scheduleOnce(() => {
      this.boxContainer.getComponent(cc.Animation).play("Box_ShowTweezersAnim");

      // ironsource
      // if(this.isPlayBgSound) {
      //   cc.audioEngine.play(this.AudioManger.itemSound, false, 1);
      // }

      // cc.audioEngine.play(this.AudioManger.itemSound, false, 1);
    }, 3.5);


    // show hint
    this.scheduleOnce(() => {
      this.boxContainer.getComponent(cc.Animation).play("Box_TweezersGlowAnim");
      this.hand_1.getComponent(cc.Animation).play("Hand_HintAnim_1");
      this.circles.forEach(circle => circle.active = true);
      this.circles.forEach(circle => circle.getComponent(cc.Animation).play("Circle_RotateAnim"));
    }, 4.3);
  }


  private registerEvent(): void {
    this.tweezers.on(cc.Node.EventType.TOUCH_START, this.handleHideMaskTouchStart, this);

    // mtg & applovin
    // this.hideMask.on(cc.Node.EventType.TOUCH_START, () => {

    // this.GameController.installHandle();
    // }, this);
  }


  private handleHideMaskTouchStart(e: cc.Touch): void {
    this.GameController.installHandle();
  }


  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }

  protected update(dt: number): void {

  }
}
