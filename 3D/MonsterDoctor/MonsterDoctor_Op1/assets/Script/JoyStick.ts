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
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("JoyStick")
export class JoyStick extends Component {


  @property
  public max_r: number = 100;

  @property(CCBoolean)
  public isTouch: boolean = false;

  public stick: Node = null;
  

  // state
  isRotate: boolean = false;
  pos: Vec3 = null;

  start() {}

  onLoad() {

  }

  public stickMove(event: EventTouch, stick: Node) {
    const screenPos = event.getUILocation();
    this.pos = this.convertToLocalLocation(screenPos);
    stick.setPosition(this.pos);
  }


  public convertToLocalLocation(value: Vec2) {
    const localX = value.x - 160 - this.node.getPosition().x;
    const localY = value.y - 240 - this.node.getPosition().y;
    const result = new cc.Vec3(localX, localY, 0);
    return result;
  }

  update(deltaTime: number) {

  }
}
