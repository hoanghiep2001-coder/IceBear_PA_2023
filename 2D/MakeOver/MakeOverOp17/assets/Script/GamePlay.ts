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
      if(this.isPlayBgSound) {
        cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.2);

      this.scheduleOnce(() => {
        // ironsource
        if(this.isPlayBgSound) {
          cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
        }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.4);

      this.scheduleOnce(() => {
        // ironsource
        if(this.isPlayBgSound) {
          cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
        }

        // cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      }, 0.6);
    }, 2.2);


    // show tweezers
    this.scheduleOnce(() => {
      this.boxContainer.getComponent(cc.Animation).play("Box_ShowTweezersAnim");

      // ironsource
      if(this.isPlayBgSound) {
        cc.audioEngine.play(this.AudioManger.itemSound, false, 1);
      }

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
    this.tweezers.on(cc.Node.EventType.TOUCH_MOVE, this.handleHideMaskTouchMove, this);

    // ironsource
    this.hideMask.on(cc.Node.EventType.TOUCH_START, () => {

      if(this.isPlayBgSound) {
        return;
      }

      this.isPlayBgSound = true;
      cc.audioEngine.play(this.AudioManger.bgSound, true, 1);
    }, this);
  }


  private handleHideMaskTouchStart(e: cc.Touch): void {
    if (this.isDone) {
      this.hideMask.off(cc.Node.EventType.TOUCH_MOVE);
      this.tweezers.off(cc.Node.EventType.TOUCH_MOVE);
      this.GameController.installHandle();
      return;
    }

    if (this.isPlayRemoveMgSound) {
      this.removeMgSoundState = cc.audioEngine.play(this.AudioManger.removeMgSound_2, true, 1);
    }

    // this.boxContainer.getComponent(cc.Animation).stop("Box_TweezersGlowAnim");
    this.layer.opacity = 0;
    this.tweezersGlow.active = false;
    this.hand_1.active = false;
    this.hand_2.active = false;
    this.currentPos = e.getLocation();
    this.startPos = e.getLocation();


    // ironsource
    if(this.isPlayBgSound) {
      return;
    }

    this.isPlayBgSound = true;
    cc.audioEngine.play(this.AudioManger.bgSound, true, 1);
  }


  private handleHideMaskTouchMove(e: cc.Touch): void {

    this.tweezers.x = this.currentPos.x - cc.winSize.width / 2;
    this.tweezers.y = this.currentPos.y - cc.winSize.height / 2 + 15;
    this.pointOfTweezers.x = this.currentPos.x - cc.winSize.width / 2 - 150 - this.responsivePointScale;
    this.pointOfTweezers.y = this.currentPos.y - cc.winSize.height / 2 + 35;


    this.maggotPoints.forEach((point, index) => {
      if (this.pointOfTweezers.getBoundingBox().intersects(point.getBoundingBox())) {
        // assign spine = index
        this.removeSpine = this.spine_RemoveMGs[index];
        this.maggot = this.spine_Maggots[index];
        this.point = index;
        this.handleSelectTweezers();

        this.registerEventRemoveMaggot();        

          
        // fix un regconize tweezers2_01 & tweezers2_02
        if(this.point == 1 && this.step == 1) {
          this.tweezer_1 = this.tweezers_Defaults[2];
          this.tweezer_2 = this.tweezers_Defaults[3];
          this.maggot_remove = this.Maggot_Nodes[1];
          this.spliceTweezers = 2;
        }
      }
    });

    this.currentPos = e.getLocation();
  }


  private handleHideMaskTouchEnd(): void {
    if (!this.isTouched) return;

    if (this.removeMgSoundState) {
      cc.audioEngine.stop(this.removeMgSoundState);
    }
  }


  private registerEventRemoveMaggot(): void {

    this.setAnimForSpine();
    this.tweezers.off(cc.Node.EventType.TOUCH_MOVE);
    this.tweezers.off(cc.Node.EventType.TOUCH_START);

    // ironsource
    // this.hideMask.off(cc.Node.EventType.TOUCH_START);
    // ------

    this.hideMask.on(cc.Node.EventType.TOUCH_MOVE, this.handleSetRemoveMgAnim, this);
    this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleHideMaskTouchStart, this);


    this.scheduleOnce(() => {
      this.hideMask.on(cc.Node.EventType.TOUCH_END, this.handleHideMaskTouchEnd, this);
      this.hideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.handleHideMaskTouchEnd, this);

      this.circles.forEach(circle => circle.active = false);
      this.hand_2.active = true;
      this.hand_2.getComponent(cc.Animation).play("Hand_HintAnim_2");
    }, 1.1);
  }


  private registerCompleteSpineEvent(): void {
    this.flagAngle = 0;
    this.countingTime = 0;
    this.flagScale = 0;

    this.removeSpine.setCompleteListener((trackEntry: sp.spine.TrackEntry) => {
      if(trackEntry.animation.name === "Action03_c") {

        cc.audioEngine.play(this.AudioManger.smileSound, false, 1);
        cc.audioEngine.play(this.AudioManger.completeSound, false, 0.6);

        this.isTouched = false;
        this.currentIndex++;
        this.hideMask.off(cc.Node.EventType.TOUCH_MOVE);
        this.hideMask.off(cc.Node.EventType.TOUCH_START);
        this.tweezers.setPosition(this.tweezersInitPos)
        
        this.circles.forEach(circle => {
          circle.active = true;
          circle.getComponent(cc.Animation).play("Circle_RotateAnim")
        });

        if(this.currentIndex == 2) {
          this.isDone = true;
        }
        
        this.scheduleOnce(() => {
          cc.audioEngine.play(this.AudioManger.itemSound, false, 1);
          this.boxContainer.getComponent(cc.Animation).play("Box_ShowTweezersAnim");
        }, 0.8)
        
        this.scheduleOnce(() => {
          this.tweezers.opacity = 255;
          this.layer.opacity = 150;
          this.tweezersGlow.active = true;
        
          this.tweezers.on(cc.Node.EventType.TOUCH_START, this.handleHideMaskTouchStart, this);
          this.tweezers.on(cc.Node.EventType.TOUCH_MOVE, this.handleHideMaskTouchMove, this);
        }, 1.2)

        this.scheduleOnce(() => {
          this.hand_1.getComponent(cc.Animation).play("Hand_HintAnim_1");
          this.boxContainer.getComponent(cc.Animation).play("Box_TweezersGlowAnim");
          this.hand_1.active = true;
        }, 1.6);
      }
    });
  }


  private handleSelectTweezers(): void {
    this.step++;

    switch (this.point) {
      case 0:
        this.tweezer_1 = this.tweezers_Defaults[0];
        this.tweezer_2 = this.tweezers_Defaults[1];
        this.maggot_remove = this.Maggot_Nodes[0];
        this.spliceTweezers = 0;
        break;
      case 1:
        this.tweezer_1 = this.tweezers_Defaults[2];
        this.tweezer_2 = this.tweezers_Defaults[3];
        this.maggot_remove = this.Maggot_Nodes[1];
        this.spliceTweezers = 2;
        
      case 2:
        this.tweezer_1 = this.tweezers_Defaults[4];
        this.tweezer_2 = this.tweezers_Defaults[5];
        this.maggot_remove = this.Maggot_Nodes[2];
        this.spliceTweezers = 4;
      default:
        break;
    }
  }


  private handleSetRemoveMgAnim(e: cc.Touch): void {
    const touchPos = e.getLocation();

    if(this.countingTime >= 100) {
      this.tweezers_remove.active = false;
      this.handleDoneRemoveMg();
      this.removeSpine.node.active = true;
      this.trackEntry = this.removeSpine.setAnimation(0, "Action03_c", false);
      this.registerCompleteSpineEvent();
    }

    if (this.currentPos && this.startPos) {
        if (touchPos.y > this.currentPos.y) {
            this.countingTime = Math.min(this.countingTime + 1, 100);
            this.flagScale = Math.min(this.flagScale + 1, 100);
        } else if (touchPos.y < this.currentPos.y) {
            this.flagScale = Math.max(this.flagScale - 1, 0);
        }
    }
    
    const newScaleX = 0.2 + (0.2 * this.flagScale / 100);
    const minAngle = -18;
    const maxAngle = 4;
    this.flagAngle = minAngle + (maxAngle - minAngle) * (this.flagScale / 100);
    

    if (this.maggot_remove) {
        this.maggot_remove.scaleX = newScaleX;
        
        this.tweezer_1.angle = this.flagAngle;
        this.tweezer_2.angle = this.flagAngle;
    }
    
    this.currentPos = touchPos;
  }


  private handleDoneRemoveMg(): void {
      if (this.isPlayBreakSound) {
        return;
      }

        // stop remove mg sound
        cc.audioEngine.stop(this.removeMgSoundState);
        this.isPlayRemoveMgSound = false;

        // remove doned maggot Point
        this.scheduleOnce(() => {
          this.spine_Breaks[this.point].node.active = true;

          this.maggotPoints.splice(this.point, 1);
          this.spine_Maggots.splice(this.point, 1);
          this.spine_RemoveMGs.splice(this.point, 1);
          this.spine_Breaks.splice(this.point, 1);

          if(this.point == 1) {
            this.circles.splice(this.point + 1, 1);
          } else {
            this.circles.splice(this.point, 1);
          }

          this.tweezers_Defaults.splice(this.spliceTweezers, 2);
          this.tweezers_RemoveMgs.splice(this.point, 1);
          this.Maggot_Nodes.splice(this.point, 1);
        }, 0.3)

        this.hideMask.off(cc.Node.EventType.TOUCH_END);
        this.hideMask.off(cc.Node.EventType.TOUCH_CANCEL);

        this.vibration();
        cc.audioEngine.play(this.AudioManger.breakSound, false, 1);
        this.isPlayBreakSound = true;
        this.removeSpine.getComponent(sp.Skeleton).paused = false;
  }


  private setAnimForSpine(): void {
    if (this.isTouched) return;

    this.isTouched = true;
    this.isPlayBreakSound = false;
    this.tweezers.opacity = 0;
    this.removeSpine.node.active = true;
    this.maggot.paused = true;

    this.scheduleOnce(() => {
      this.maggot.node.active = false;
    }, 0.95);

    this.scheduleOnce(() => {
      this.isPlayRemoveMgSound = true;
      this.removeSpine.paused = true;
      cc.audioEngine.play(this.AudioManger.removeMgSound_1, false, 1);
      this.tweezers_RemoveMgs[this.point].active = true;
      this.tweezers_remove = this.tweezers_RemoveMgs[this.point];      

      this.removeSpine.node.active = false;
    }, 1)
  }


  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }

  protected update(dt: number): void {

  }
}
