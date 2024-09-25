const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  // camera
  @property(cc.Camera)
  camera: cc.Camera = null;

  // node
  @property(cc.Node)
  BackGround: cc.Node = null;

  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  eyes: cc.Node = null;
  @property(cc.Node)
  eyesOff: cc.Node = null;
  @property(cc.Node)
  hair: cc.Node = null;
  @property(cc.Node)
  spine_Smoke: cc.Node = null;
  @property(cc.Node)
  bg_Hospital: cc.Node = null;
  @property(cc.Node)
  bikini: cc.Node = null;
  @property(cc.Node)
  mainContent: cc.Node = null;
  @property(cc.Node)
  circle: cc.Node = null;
  @property(cc.Node)
  tweezers: cc.Node = null;
  @property(cc.Node)
  tweezersEmptyNode: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  maggotRemoveArea: cc.Node = null;
  @property(cc.Node)
  spine_RemoveMaggot: cc.Node = null;
  @property(cc.Node)
  breakMaggot: cc.Node = null;
  @property(cc.Node)
  spine_break: cc.Node = null;
  @property(cc.Node)
  moveDirection: cc.Node = null;

  // array
  @property([cc.Node])
  maggots: cc.Node[] = [];

  // state
  isRotate: boolean = false;
  isDone: boolean = false;
  isTouched: boolean = false;
  isPlayBreakSound: boolean = false;
  isPlayBgSound: boolean = false;

  tweezersInitPos: cc.Vec2 = new cc.Vec2(38, 62);
  tweezersEmptyInitPos: cc.Vec2 = new cc.Vec2(109, 131.5);
  currentPos: cc.Vec2 = null;

  currentTime: number = 0;

  // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  breakSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  itemSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  dirtySound: cc.AudioClip = null;

  // any
  trackEntry = null

  protected onLoad(): void {
      this.setRotate();

      this.eyesOff.active = false;
      this.bg_Hospital.active = false;
      this.mainContent.active = false;
      this.tweezers.active = false;
      this.circle.active = false;
      this.hand.active = false;
      this.spine_RemoveMaggot.active = false;
      this.breakMaggot.active = false;
      this.spine_break.active = false;
      this.moveDirection.active = false;

      this.hand.opacity = 0;
      this.mainContent.opacity = 0;
      this.tweezers.opacity = 0;
      this.circle.opacity = 0;
  }

  protected start(): void {
    cc.audioEngine.play(this.bgSound, true, 1);

    this.handleOpenScene();

    this.registerEvent();
  }

  private handleOpenScene(): void {
    this.scheduleOnce(() => {

      // if ironsource, comment
      // if not, use
      cc.audioEngine.play(this.dirtySound, false, 1);

      this.spine_Smoke.getComponent(cc.Animation).play("Show");
    }, 1);

    this.scheduleOnce(() => {
      this.dollBase.getComponent(cc.Animation).play("Mobile_DollBaseAnim");
    }, 2);

    this.scheduleOnce(() => {
      this.bg_Hospital.getComponent(cc.Animation).play("Show");
      this.hair.getComponent(cc.Animation).play("Fade");
      this.bg_Hospital.active = true;
      this.spine_Smoke.getComponent(cc.Animation).play("Fade");
    }, 2.5);

    this.scheduleOnce(() => {
      this.dollBase.getComponent(cc.Animation).play("Mobile_DollBaseAnim2");
    }, 3);

    this.scheduleOnce(() => {
      this.bikini.getComponent(cc.Animation).play("Fade");
      this.mainContent.active = true;
      this.mainContent.getComponent(cc.Animation).play("Show");
    }, 4);

    this.scheduleOnce(() => {
      this.tweezers.active = true;
      this.circle.active = true;
      this.circle.getComponent(cc.Animation).play("Circle");
      this.mainContent.getComponent(cc.Animation).play("Mobile_MainContent");
    }, 5);

    this.scheduleOnce(() => {
      cc.audioEngine.play(this.itemSound, false, 1);
    }, 5.8);

    this.scheduleOnce(() => {
      this.hand.active = true;
      this.hand.getComponent(cc.Animation).play("Mobile_HandAnim");
    }, 6.5);
  }

  private registerEvent(): void {
    // mtg & applovin
    // this.BackGround.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);
    // this.bg_Hospital.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);

    // others
    this.tweezersEmptyNode.on(cc.Node.EventType.TOUCH_START, this.handleInstall, this);
  }

  private handleInstall(): void {
    console.log("install");
    cc.audioEngine.stopAll();
    this.node.getComponent("GameController").installHandle();
    return;
  }

  private vibration(): void {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(300);
    }
  }

  private setRotate(): void {
    if(cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.isRotate = true;
      this.node.scaleX = 1.3;
      this.node.scaleY = 1.3;
      this.camera.node.y = -30;
    } else {
      this.isRotate = false;
      this.node.scaleX = 1;
      this.node.scaleY = 1;
      this.camera.node.y = 0;
    }
  }

  protected update(dt: number): void {
      this.setRotate();
  }
}
