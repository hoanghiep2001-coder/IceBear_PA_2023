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
  size,
  SkeletalAnimation,
  UIOpacity,
  UIOpacityComponent,
} from "cc";
import { controlCubeBox } from "./controlCubeBox";
const { ccclass, property } = _decorator;

@ccclass("JoyStick")
export class JoyStick extends Component {
  @property(Node)
  controlCubeBox: Node = null;
  @property(Node)
  stick: cc.Node = null;
  @property(Node)
  fakeBg: Node = null;
  @property
  public max_r: number = 40;
  @property(CCBoolean)
  public isTouch: boolean = false;
  @property
  public angleMove: number | null = null;

  controlCat: Component = null;
  setTimeOut: any;
  currentPos: Vec2 = null;

  start() {
    // this.stick.getComponent("cc.UIOpacity").opacity = 200;
    // this.controlCat = this.controlCubeBox.getComponent("controlCubeBox");

    // this.scheduleOnce(() => {
    //   this.fakeBg.on(cc.Node.EventType.TOUCH_START, this.stickStart, this);
    //   this.fakeBg.on(cc.Node.EventType.TOUCH_MOVE, this.stickMove, this);
    //   this.fakeBg.on(cc.Node.EventType.TOUCH_CANCEL, this.stickEnd, this);
    //   this.fakeBg.on(cc.Node.EventType.TOUCH_END, this.stickEnd, this);
    // }, 0.5)
  }


  onLoad() {
    this.stick.setPosition(0, 0, 0);
  }


  private stickStart(event: EventTouch): void {
    this.isTouch = true;
    const screenPos = event.getUILocation();

    let pos = new Vec3(screenPos.x - 160, screenPos.y - 240, 0);
    this.node.setPosition(pos);
    this.node.getComponent("cc.UIOpacity").opacity = 200;

    this.stick.getComponent("cc.UIOpacity").opacity = 200;
    this.stick.setPosition(pos);

  }


  private stickMove(event: EventTouch) {
    const screenPos = event.getUILocation();
    let pos = new Vec3(screenPos.x - 160, screenPos.y - 240, 0);

    const distance = pos.clone().subtract(this.node.position);

    if (distance.length() > this.max_r) {
      // Chuyển vị trí stick về ranh giới của joystick
      distance.normalize().multiplyScalar(this.max_r);
      pos = this.node.position.clone().add(distance);
  }

    this.stick.setPosition(pos);
    this.controlCat.isMoving = true;
    this.controlCat.handleAngleCat();

  }


  private stickEnd(event: cc.Touch) {
    this.isTouch = false;
    this.stick.setPosition(0, 0, 0);
    this.controlCat.isMoving = false;
    this.stick.getComponent("cc.UIOpacity").opacity  = 0;
    this.node.getComponent("cc.UIOpacity").opacity  = 0;
  }


  private convertToLocalLocation(value: Vec2) {
    const localX: number = value.x - 160 - this.stick.getPosition().x;
    const localY: number = value.y - 240 - this.stick.getPosition().y;
    const result = new cc.Vec3(localX, localY, 0);
    return result;
  }


  update(deltaTime: number) {
    // if (this.isTouch) {
    //   const clone = this.stick.getPosition();
    //   const angle = Vec3.angle(v3(clone.x, clone.y, 0), v3(0, 100, 0));
    //   if (clone.x < 0) {
    //     this.angleMove = math.toDegree(-angle);
    //   } else {
    //     this.angleMove = math.toDegree(angle);
    //   }
    // } else {
    //   this.angleMove = null;
    // }
  }
}
