const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

  // camera
  @property(cc.Camera)
  camera: cc.Camera = null;

  // node
  @property(cc.Node)
  text_Drag: cc.Node = null;
  @property(cc.Node)
  pointDelete: cc.Node = null;
  @property(cc.Node)
  manNode: cc.Node = null;
  @property(cc.Node)
  background: cc.Node = null;

  // array

  // state
  isRotate: boolean = false;
  isDone: boolean = false;
  currentPos: cc.Vec2 = null;
  isTouched: boolean = false;
  isRunDeleteSound: boolean = false;
  deleteSoundState: number = 0;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  deleteSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  winSound: cc.AudioClip = null;

  protected onLoad(): void {
      this.setRotate();

      this.pointDelete.active = false;
      this.pointDelete.opacity = 0;
  }

  protected start(): void {
    // cc.audioEngine.play(this.bgSound, true, 0.7);
   
    this.handleOpenScene();

    // this.registerEvent();

    // To Store
    this.onToStore();
    // -----------
  }


  private onToStore(): void {
    this.background.on(cc.Node.EventType.TOUCH_START, (() => {
      this.getComponent("GameController").installHandle();
    }), this);
  }


  private handleOpenScene(): void {
    this.text_Drag.getComponent(cc.Animation).play("Scale");
  }

  private registerEvent(): void {
    this.background.on("touchstart", (e: cc.Touch) => {
      this.pointDelete.active = true;
      this.pointDelete.opacity = 255;
      this.isTouched = true;
      this.currentPos = e.getLocation();

      this.deleteSoundState = cc.audioEngine.play(this.deleteSound, true, 1);
    });

    this.background.on("touchmove", (e: cc.Touch) => {
      this.pointDelete.x = this.currentPos.x - cc.winSize.width / 2;
      this.pointDelete.y = this.currentPos.y - cc.winSize.height / 2;
      this.currentPos = e.getLocation();
      
    });

    this.background.on("touchend", (e: cc.Touch) => {
      cc.audioEngine.stop(this.deleteSoundState);
      this.pointDelete.active = false;
    });

    this.background.on("touchcancel", (e: cc.Touch) => {
      cc.audioEngine.stop(this.deleteSoundState)
    });
  }

  private setRotate(): void {
    if(cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.isRotate = true;
      this.node.scaleX = 1.2;
      this.node.scaleY = 1.2;
      // this.camera.node.y = -30;
    } else {
      this.isRotate = false;
      this.node.scaleX = 1;
      this.node.scaleY = 1;
      // this.camera.node.y = 0;
    }
  }

  protected update(dt: number): void {
      this.setRotate();
  }
}
