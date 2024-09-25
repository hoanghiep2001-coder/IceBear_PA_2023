import {
  _decorator,
  Component,
  Node,
  Button,
  tween,
  Vec3,
  Quat,
  Camera,
  v3,
  CCFloat,
} from "cc";
import { GameController } from "./GameController";
const { ccclass, property } = _decorator;

@ccclass("NextScene")
export class NextScene extends Component {
  @property(GameController)
  GameController: GameController = null;
  @property(Node)
  canvas2D: Node = null;

  @property(Button)
  hideMask: Button = null;

  @property(Node)
  icon: Node = null;

  @property(Node)
  title: Node = null;

  @property(Node)
  boss1: Node = null;

  @property(Node)
  boss2: Node = null;

  @property(Node)
  camera: Node = null;

  @property(CCFloat)
  private _realHeight: number = null;

  @property(CCFloat)
  private _realWidth: number = null;

  start() {
    window.gameReady && window.gameReady();
    this.hideMask.node.active = true;
    tween(this.boss1)
      .by(3.5, { position: new Vec3(6, 0, 0) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, -90, 0) })
      .by(3.5, { position: new Vec3(-6, 0, 0) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 90, 0) })
      .union()
      .repeatForever()
      .start();

    tween(this.boss2)
      .by(2.5, { position: new Vec3(0, 0, 4.5) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 180, 0) })
      .by(2.5, { position: new Vec3(0, 0, -4.5) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 0, 0) })
      .union()
      .repeatForever()
      .start();

    // console.log(this.camera.getPosition());
  }

  onLoad() {
    this.hideMask.node.on(
      cc.Node.EventType.TOUCH_START,
      this.installHandle,
      this
    );
  }


  private installHandle(): void {
    this.GameController.installHandle();
    
  }


  update(deltaTime: number) {
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.camera.setPosition(v3(-14.8, 24, 0));

      this._realHeight = 480;
      this._realWidth =
        320 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
      // console.log(this._realWidth);
      this.icon.setPosition((this._realWidth - 320) / 2 + 160, 0, 0);
      this.title.setPosition((320 - this._realWidth) / 2 - 160, 0, 0);

      this.icon.setScale(0.9, 0.9, 0.9);
      this.title.setScale(0.35, 0.35, 0.35);
    } else {
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this._realWidth = 370;
      } else {
        this._realWidth = 320;
      }
      this.camera.setPosition(v3(-13, 24, 0));
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
}
