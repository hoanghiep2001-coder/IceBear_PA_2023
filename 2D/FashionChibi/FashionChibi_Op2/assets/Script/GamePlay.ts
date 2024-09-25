import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

  @property(AudioManager)
  AudioManager: AudioManager = null;
  @property(GameController)
  GameController: GameController = null;
  @property(sp.Skeleton)
  fireWorks: sp.Skeleton = null;


  // node
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  bg: cc.Node = null;
  @property(cc.Node)
  endPoint: cc.Node = null;
  @property(cc.Node)
  endPoint2: cc.Node = null;

  // dress
  @property([cc.Node])
  dresses: cc.Node[] = [];
  @property(cc.Node)
  dress1: cc.Node = null;
  @property(cc.Node)
  dress2: cc.Node = null;
  @property([cc.Node])
  dressInstalls: cc.Node[] = [];

  // character
  @property(cc.Node)
  character1:cc.Node = null;
  @property(cc.Node)
  character2:cc.Node = null;
  @property(cc.Node)
  character3:cc.Node = null;
  @property(cc.Node)
  character4:cc.Node = null;

  @property(cc.Node)
  correctCharacter1:cc.Node = null;
  @property(cc.Node)
  correctCharacter2:cc.Node = null;

  // state
  pickedDresS: cc.Node = null;
  currentPos: cc.Vec2 = null;
  dress1InitPos: cc.Vec2 = null;
  dress2InitPos: cc.Vec2 = null;

  isPlayBgSound: boolean = false;
  isCollide: boolean = false;

  protected onLoad(): void {

  }

  protected start(): void {
    this.dress1InitPos = this.dress1.getPosition();
    this.dress2InitPos = this.dress2.getPosition();
    this.handleGamePlay();
  }


  private handleGamePlay(): void {
    // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    this.getComponent(cc.Animation).play("GamePlay_HintAnim");
    this.registerEvent();
  }


  private registerEvent(): void {
    // ironsource
    this.bg.on(cc.Node.EventType.TOUCH_START, this.handleSoundIronSource, this);
    this.dresses.forEach(dress => {
      dress.on(cc.Node.EventType.TOUCH_START, this.handleDressTouchStart, this);
      dress.on(cc.Node.EventType.TOUCH_MOVE, this.handleDressTouchMove, this);
      dress.on(cc.Node.EventType.TOUCH_END, this.handleDressTouchEnd, this);
      dress.on(cc.Node.EventType.TOUCH_CANCEL, this.handleDressTouchEnd, this);
    });
  }


  private handleDressTouchStart(e: cc.Touch): void {
    e.target._name  === "Dress_1" ? this.pickedDresS = this.dress1 : this.pickedDresS = this.dress2;
    this.currentPos = e.getLocation();
    this.hand.active = false;
    this.dress1.scale = 0.3;
    this.dress2.scale = 0.3;
    this.getComponent(cc.Animation).stop("GamePlay_HintAnim");

    // ironsource
    this.handleSoundIronSource();
  }


  private handleDressTouchMove(e: cc.Touch): void {
    this.handleCheckCollideDress(e);
    this.currentPos = e.getLocation();
  }


  private handleDressTouchEnd(): void {
    if(!this.dress1.getBoundingBox().intersects(this.dress2.getBoundingBox()) && !this.isCollide) {
      this.dress1.setPosition(this.dress1InitPos);
      this.dress2.setPosition(this.dress2InitPos);
    }
  }


  private handleCheckCollideDress(pos: cc.Touch): void {
    if(this.dress1.getBoundingBox().intersects(this.endPoint.getBoundingBox())) {
      if(pos.getLocation().x > this.currentPos.x ) {
        this.dress1.x = this.currentPos.x - cc.winSize.width / 2;
      }

      return;
    } else if(this.dress2.getBoundingBox().intersects(this.endPoint2.getBoundingBox())) {
      if(pos.getLocation().x < this.currentPos.x ) {
        this.dress2.x = this.currentPos.x - cc.winSize.width / 2;
      }

      return;
    } else if(this.dress1.getBoundingBox().intersects(this.dress2.getBoundingBox()) && !this.isCollide) {
      this.isCollide = true;
      this.vibration();

      cc.audioEngine.play(this.AudioManager.correctSound, false, 1);
      this.fireWorks.node.active = true;
      this.correctCharacter1.active = true;
      this.correctCharacter2.active = true;
      this.character1.active = false;
      this.character2.active = false;
      this.dress1.active = false;
      this.dress2.active = false;

      this.scheduleOnce(() => {
        this.SwapCharacter();
      }, 1)
    }

    else {
      this.pickedDresS.x = this.currentPos.x - cc.winSize.width / 2;
    }
  }


  private SwapCharacter(): void {
    this.getComponent(cc.Animation).play("GamePlay_SwapCharacter");

    this.scheduleOnce(() => {
      this.getComponent(cc.Animation).play("GamePlay_HintAnim");
      this.hand.active = true;

      // mtg & applovin
      // this.bg.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

      // others
      this.dressInstalls.forEach(dress => dress.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this));
    }, 1.4)
    
  }


  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }


  // ironsource
  private handleSoundIronSource(): void {
    if(this.isPlayBgSound) {
      return;
    }

    this.isPlayBgSound = true;
    cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
  }


  protected update(dt: number): void {

  }

}
