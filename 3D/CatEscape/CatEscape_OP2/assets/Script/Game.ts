import {
  _decorator,
  Component,
  Node,
  tween,
  Vec3,
  Quat,
  math,
  AudioClip,
  Button,
  director,
  CCFloat,
  v3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  //3D

  @property(Node)
  Cat: Node = null;

  @property(Node)
  Door: Node = null;

  @property(Node)
  Boss: Node = null;

  // 2D
  @property(Node)
  canvas2D: Node;

  @property(Node)
  icon: Node;

  @property(Node)
  navigate: Node;

  @property(Node)
  text: Node;

  @property(Node)
  title: Node;

  @property(Node)
  joyStick: Node;

  @property(Button)
  tryBtn: Button;

  @property(Button)
  hideMask: Button;

  @property(Node)
  loadMap: Node = null;

  @property(Node)
  fail: Node = null;

  @property(Node)
  mask: Node = null;

  @property(Node)
  camera: Node = null;

  @property
  endGame: boolean = false;

  @property
  step: number = 1;

  @property(CCFloat)
  _realHeight: number = null;

  @property(CCFloat)
  _realWidth: number = null;

  // audio
  @property(AudioClip)
  bg: AudioClip = null;

  @property(AudioClip)
  click: AudioClip = null;

  @property(AudioClip)
  lose: AudioClip = null;

  @property(AudioClip)
  win: AudioClip = null;

  start() {
    window.gameReady && window.gameReady();
    this.Cat.active = true;
    this.canvas2D.active = true;
    this.text.active = true;
    this.navigate.active = true;
    this.title.active = true;
    this.icon.active = true;
    this.joyStick.active = false;
    this.hideMask.node.active = false;
    this.tryBtn.node.active = false;
    this.loadMap.active = false;
    this.fail.active = false;
    // this.bg.setLoop(true);
    // this.bg.play();
  }

  onLoad() {
    this.canvas2D.on(Node.EventType.TOUCH_START, this.managerScene, this);
    this.tryBtn.node.on(
      cc.Node.EventType.TOUCH_START,
      this.installHandle,
      this
    );

    this.hideMask.node.on(
      cc.Node.EventType.TOUCH_START,
      this.installHandle,
      this
    );
  }

  managerScene() {
    this.step++;
    if (this.step === 2) {
      this.click.play();
      this.joyStick.active = true;
      this.text.active = false;
      this.navigate.active = false;
    }

    if (this.step > 0) {
      if (this.endGame) {
        this.step = -9999;
        this.win.play();
        // this.icon.active = true;
        // this.title.active = true;
        this.joyStick.active = false;
        // this.hideMask.node.active = true;
        this.loadMap.active = true;
        // this.fail.active = true;
        setTimeout(() => {
          this.tryBtn.node.active = true;
          // this.fail.active = false;
          // this.onFinish();
          director.loadScene("CatEscapeNext");
          this.bg.pause;
        }, 1000);
      }
    }
  }

  onFinish() {
    window.gameEnd && window.gameEnd();
  }

  update(deltaTime: number) {
    if (this.endGame === false) {
      const x = Vec3.distance(this.Cat.getPosition(), this.Door.getPosition());

      const y = Vec3.distance(this.Cat.getPosition(), this.Boss.getPosition());
      if (x <= 1.5) {
        console.log("end");
        this.Cat.active = false;
        this.Boss.active = false;
        this.endGame = true;
        this.managerScene();
      }
    }

    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.camera.setPosition(v3(-14.8, 24, 0));
      this._realHeight = 480;
      this._realWidth =
        320 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
      console.log(this._realWidth);
      this.icon.setPosition((this._realWidth - 320) / 2 + 160, 0, 0);
      this.title.setPosition((320 - this._realWidth) / 2 - 160, 0, 0);

      this.icon.setScale(0.9, 0.9, 0.9);
      this.title.setScale(0.35, 0.35, 0.35);
    } else {
      this.camera.setPosition(v3(-13, 24, 0));
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this._realWidth = 370;
      } else {
        this._realWidth = 320;
      }
      this._realHeight =
        this._realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);

      this.title.y = (this._realHeight - 480) / 2 + 207;
      this.icon.y = (this._realHeight - 480) / 2 + 207;

      this.icon.setPosition(56, 207 + (this._realHeight - 480) / 2, 0);
      this.title.setPosition(-40, 207 + (this._realHeight - 480) / 2, 0);
      this.icon.setScale(0.25, 0.25, 0.25);
      this.title.setScale(0.2, 0.2, 0.2);
    }
  }

  installHandle() {
    console.log("install");
    this.bg.pause();
    if (typeof playableSDK != "undefined") {
      window.playableSDK.openAppStore();
      return;
    }

    // If ad network is google ads
    if (typeof ExitApi != "undefined") {
      ExitApi.exit();
      return;
    }

    // If ad netwrok is ironsources
    if (typeof dapi != "undefined") {
      dapi.openStoreUrl();
      return;
    }

    // If ad network support MRAID 2.0
    if (typeof mraid != "undefined") {
      if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
        mraid.open(
          "https://play.google.com/store/apps/details?id=com.an.catescape.thecatgame"
        );
        return;
      }

      if (
        cc.sys.os == cc.sys.OS_IOS ||
        cc.sys.os == cc.sys.IPHONE ||
        cc.sys.os == cc.sys.IPAD
      ) {
        mraid.open("https://itunes.apple.com.io.catescape.thecatgame");
        return;
      }

      mraid.open(
        "https://play.google.com/store/apps/details?id=com.an.catescape.thecatgame"
      );
      return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  }
}
