import { _decorator, Component, EventTouch, Node, toDegree, Vec3, Vec2, Camera, screen, UITransform, Animation, UIOpacity, sp, tween, Tween, toRadian, log } from 'cc';
import { PlayerController } from './PlayerController';
import { Constants } from '../Data/Constant';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { IronSource } from '../Data/IronSource';
const { ccclass, property } = _decorator;

@ccclass('TouchAreaController')
export class TouchAreaController extends Component {
  @property(IronSource)
  IronSource: IronSource = null;
  @property(AudioManager)
  AudioManager: AudioManager = null;
  @property(GameController)
  GameController: GameController = null;
  @property(Camera)
  camera: Camera = null;


  @property(Node)
  player: Node = null;
  @property(Node)
  fakeHideMask: Node = null;
  @property(Node)
  hideMask: Node = null;
  @property(Node)
  tutorial: Node = null;
  @property(Node)
  stickPoint: Node = null;


  playerController: PlayerController = null;
  stickPointUIOpacity: UIOpacity = null;
  tutorialOpacity: UIOpacity = null;
  levelPlayer: Node = null;
  playerSpine: sp.Skeleton = null;

  positionTouch: Vec3 = new Vec3(0, 0, 0);
  localTouch: Vec3 = new Vec3(0, 0, 0);
  locationPos: Vec2 = new Vec2(0, 0);
  angleCount: number = null;


  protected start(): void {
    // toStore
    // Constants.toStore = true;

    this.init();
    this.registerEvent();
  }


  private init(): void {
    this.levelPlayer = this.player.getChildByName("Body").getChildByName("Level");
    this.playerSpine = this.player.getChildByName("Body").getChildByName("Spine_Fish").getComponent(sp.Skeleton);
    this.playerController = this.player.getComponent(PlayerController);
    this.stickPointUIOpacity = this.stickPoint.getComponent(UIOpacity);
    this.tutorialOpacity = this.tutorial.getComponent(UIOpacity);
  }


  public registerEvent(): void {
    if (Constants.toStore) {
      this.hideMask.on(Node.EventType.TOUCH_START, this.GameController.installHandle, this);
      return;
    };

    this.hideMask.on(Node.EventType.TOUCH_START, this.onHideMaskTouchStart, this);
    this.hideMask.on(Node.EventType.TOUCH_MOVE, this.onHideMaskTouchMove, this);
    this.hideMask.on(Node.EventType.TOUCH_END, this.onHideMaskTouchEnd, this);
    this.hideMask.on(Node.EventType.TOUCH_CANCEL, this.onHideMaskTouchEnd, this);
  };


  public offEvent() {
    this.hideMask.off(Node.EventType.TOUCH_START);
    this.hideMask.off(Node.EventType.TOUCH_MOVE);
    this.hideMask.off(Node.EventType.TOUCH_END);
    this.hideMask.off(Node.EventType.TOUCH_CANCEL);
  };


  private onHideMaskTouchStart(event: EventTouch) {
    if(!this.playerController.isLive || !Constants.isCompleteVideo) {
      return;
    }

    if(Constants.flagReplay) {
      this.GameController.installHandle();
      return;
    }
    
    Constants.isPlayGame = true;
    Constants.isTouching = true;
    this.playerController.isMove = true;
    this.stickPointUIOpacity.opacity = 180;
    this.tutorialOpacity.opacity = 0;
    this.tutorial.getComponent(Animation).stop();
    this.playerSpine.setAnimation(0, "eat", true);
    this.playerSpine.timeScale = 1;
    // this.IronSource.handleIronSourcePlaySound();
  }


  private onHideMaskTouchMove(event: EventTouch) {
    if(!this.playerController.isLive || Constants.forceReplay || !Constants.isCompleteVideo) {
      return;
    }

    let touchPos = event.getUILocation();
    this.localTouch = this.convertToLocalLocation(touchPos);
    this.positionTouch = this.localTouch;

    this.positionTouch.x += this.camera.node.getPosition().x;
    this.positionTouch.y += this.camera.node.getPosition().y;
  
    this.handleStickPos();
    this.playerController.move();
  }


  private onHideMaskTouchEnd(): void {

    Constants.isTouching = false;
    this.playerController.isMove = false;
    this.playerController.stop();
    this.stickPointUIOpacity.opacity = 0;
    this.playerSpine.setAnimation(0, "idle", true);
    this.playerSpine.timeScale = 1.5;
    this.handleShowTutorialAgain();
  }


  // clear fix bug from 14/12/2023
  // critical bug: Not get the exactly pos of stickPoint in 3D env.
  // --- update 19/12/2023: Fixed
  // --- Dev: Hiep
  private handleStickPos(): void {
    let newStickPos = new Vec3(
      this.positionTouch.x -= this.camera.node.getPosition().x,
      this.positionTouch.y -= this.camera.node.getPosition().y,
      0
    );

    // count angle of player
    let angleInRadian = Math.atan2(newStickPos.y, newStickPos.x);
    this.angleCount = angleInRadian * (180 / Math.PI);
    this.stickPoint.setPosition(newStickPos);
    // --------------------
  }


  private handleShowTutorialAgain(): void {
    this.scheduleOnce(() => {
      if (Constants.isTouching) {
        return;
      };
      this.tutorial.getComponent(Animation).play("Tutorial_ShowAnim");
    }, 3);
  }


  public HandleAnglePlayer(player: Node): void {
    player.angle = this.angleCount;

    if(this.angleCount >= 90 || this.angleCount <= -90) {
      player.setScale(new Vec3(-1, -1, 1.2))
      this.levelPlayer.setScale(new Vec3(0.5, 0.5, 0.5));
    } else {
      player.setScale(new Vec3(-1, 1, 1))
      this.levelPlayer.setScale(new Vec3(-0.5, 0.5, 0.5));
    }
  }


  public convertToLocalLocation(value: Vec2): Vec3 {
    const localX: number = value.x - 240;
    const localY: number = value.y - 160;
    const result = new Vec3(localX, localY, 0);
    return result;
  }
}

