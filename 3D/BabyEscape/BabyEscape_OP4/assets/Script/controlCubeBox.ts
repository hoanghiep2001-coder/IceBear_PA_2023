import {
  _decorator,
  Component,
  Node,
  RigidBody,
  v3,
  CCString,
  CCFloat,
  SkeletalAnimation,
} from "cc";
import { JoyStick } from "./JoyStick";
const { ccclass, property } = _decorator;

@ccclass("controlCubeBox")
export class controlCubeBox extends Component {
  @property(JoyStick)
  joyStick: JoyStick;

  @property(RigidBody)
  _body: RigidBody = null;

  @property(CCString)
  catDirectionMove: string = "stop";

  @property(SkeletalAnimation)
  _aniSkeleton: SkeletalAnimation = null;

  @property(CCFloat)
  speed: number = 100;

  start() {
    this._body = this.node.getComponent(RigidBody);
    this.node.setRotationFromEuler(v3(0, 90, 0));
    this._aniSkeleton = this.node.getComponent(SkeletalAnimation);
    this._aniSkeleton.play("Cats_Runcycle");
  }

  directionMove(value: number | null) {
    let result: string = "";
    if (value === null) {
      this._aniSkeleton.pause();
      return (result = "stop");
    } else {
      this._aniSkeleton.resume();

      if (-45 <= value && value < 45) return (result = "top");
      if (45 <= value && value < 135) return (result = "right");
      if (135 <= value && value < 180) return (result = "bottom");
      if (-180 <= value && value < -135) return (result = "bottom");
      if (-135 <= value && value < -45) return (result = "left");
    }
  }

  update(deltaTime: number) {
    this.catDirectionMove = this.directionMove(this.joyStick.angleMove);
    switch (this.catDirectionMove) {
      case "stop":
        return this._body.setLinearVelocity(v3(0, 0, 0));
      case "top":
        this.node.setRotationFromEuler(v3(0, 90, 0));
        return this._body.setLinearVelocity(v3(this.speed, 0, 0));
      case "right":
        this.node.setRotationFromEuler(v3(0, 0, 0));
        return this._body.setLinearVelocity(v3(0, 0, this.speed));
      case "bottom":
        this.node.setRotationFromEuler(v3(0, -90, 0));
        return this._body.setLinearVelocity(v3(-this.speed, 0, 0));
      case "left":
        this.node.setRotationFromEuler(v3(0, 180, 0));
        return this._body.setLinearVelocity(v3(0, 0, -this.speed));
      default:
        return this._body.setLinearVelocity(v3(0, 0, 0));
    }
  }
}
