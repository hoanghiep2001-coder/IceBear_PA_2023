import {
  _decorator,
  Component,
  Node,
  UITransform,
  v3,
  Vec2,
  screen,
  Touch,
  EventTouch,
  v2,
  view,
  Vec3,
  math,
  CCFloat,
  CCInteger,
  CCBoolean,
  Animation,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("JoyStick")
export class JoyStick extends Component {

  @property(Node)
  stick: cc.Node = null;
  @property(Node)
  fakeBg: Node = null;
  @property
  public max_r: number = 100;

  @property(CCBoolean)
  public isTouch: boolean = false;

  @property
  public angleMove: number | null = null;

  // state
  isFinish: boolean = false;

  start() {
    this.angleMove = 0;
  }

  onLoad() {
    this.stick.setPosition(0, 0, 0);
    // this.fakeBg.on(cc.Node.EventType.TOUCH_START, this.stickMove, this);
    // this.fakeBg.on(cc.Node.EventType.TOUCH_MOVE, this.stickMove, this);
    // this.fakeBg.on(cc.Node.EventType.TOUCH_CANCEL, this.stickEnd, this);
    // this.fakeBg.on(cc.Node.EventType.TOUCH_END, this.stickEnd, this);
  }

  private stickMove(event: EventTouch) {
    if (this.isFinish) {
      return;
    }

    let currentPos = event.getLocation();

    this.node.getPosition().x = currentPos.x - cc.winSize.width / 2;
    this.node.getPosition().y = currentPos.y - cc.winSize.height / 2;

    this.isTouch = true;
    const screenPos = event.getUILocation();
    let pos = this.convertToLocalLocation(screenPos);
    const length = pos.mag();
    if (length > this.max_r) {
      pos = pos.multiplyScalar(this.max_r / length);
    }
    this.stick.setPosition(pos);
  }

  private stickEnd(event: cc.Touch) {
    this.isTouch = false;
    this.stick.setPosition(0, 0, 0);
  }

  private convertToLocalLocation(value: Vec2) {
    let result: Vec3;
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      var localX: number = value.x - 160 - this.node.getPosition().x;
      var localY: number = value.y - 240 + 80 - this.node.getPosition().y;

      result = new cc.Vec3(localX, localY, 0);
    } else {
      var localX: number = value.x - 160 - this.node.getPosition().x;
      var localY: number = value.y - 240 - 32 - this.node.getPosition().y;

      result = new cc.Vec3(localX, localY, 0);
    }

    return result;
  }

  update(deltaTime: number) {
    if (this.isTouch) {
      const clone = this.stick.getPosition();
      const angle = Vec3.angle(v3(clone.x, clone.y, 0), v3(0, 100, 0));
      if (clone.x < 0) {
        this.angleMove = math.toDegree(-angle);
      } else {
        this.angleMove = math.toDegree(angle);
      }
    } else {
      this.angleMove = null;
    }
  }
}
