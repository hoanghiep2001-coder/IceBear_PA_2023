import {
  _decorator,
  Component,
  Node,
  RigidBody,
  v3,
  CCString,
  CCFloat,
  SkeletalAnimation,
  Quat,
  Vec3
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

  private targetRotation: Quat = new Quat();
  private currentRotation: Quat = new Quat();

  start() { 
    this._body = this.node.getComponent(RigidBody);
    this.node.setRotationFromEuler(v3(0, 90, 0));
    this._aniSkeleton = this.node.getComponent(SkeletalAnimation);
    this._aniSkeleton.play("BBB_crawl");
  }

  directionMove(value: number | null) {
    let result: string = "";
    if (value === null) {
      this._aniSkeleton.pause();
      return (result = "stop");
    } else {
      this._aniSkeleton.resume();   

      if (-25 <= value && value < 0) return (result = "top");
      if (0 <= value && value < 25) return (result = "top");
      if (25 <= value && value < 90) return (result = "top-right");
      if (-90 <= value && value < -25) return (result = "top-left");
      

      if (90 <= value && value < 135) return (result = "right");
      if (-135 <= value && value < -90) return (result = "left");


      if (165 <= value && value < 180) return (result = "bottom");
      if (-180 <= value && value < -165) return (result = "bottom");
      if (135 <= value && value < 180) return (result = "bottom-right");
      if (-180 <= value && value < -135) return (result = "bottom-left");

    }
  }

  update(deltaTime: number) {
    this.catDirectionMove = this.directionMove(this.joyStick.angleMove);

    this.currentRotation = this._body.node.getRotation();
    Quat.slerp(this.currentRotation, this.currentRotation, this.targetRotation, deltaTime * 5);
    this._body.node.setRotation(this.currentRotation);

    const velocity = new Vec3();
    Vec3.multiplyScalar(velocity, v3(this.speed, 0, 0), deltaTime);
    this._body.setLinearVelocity(velocity);

    switch (this.catDirectionMove) {
      case "stop":
        return this._body.setLinearVelocity(v3(0, 0, 0));

      case "top":
        Quat.fromEuler(this.targetRotation, 0, 90, 0);
        return this._body.setLinearVelocity(new Vec3(this.speed, 0, 0));
      case "top-right":
        Quat.fromEuler(this.targetRotation, 0, 45, 0);
        return this._body.setLinearVelocity(new Vec3(this.speed, 0, 3));
      case "top-left":
        Quat.fromEuler(this.targetRotation, 0, 135, 0);
        return this._body.setLinearVelocity(new Vec3(this.speed, 0, -3));

      case "left":    
        Quat.fromEuler(this.targetRotation, 0, 180, 0);
        return this._body.setLinearVelocity(new Vec3(0, 0, -this.speed));
      case "right":
        Quat.fromEuler(this.targetRotation, 0, 0, 0);
        return this._body.setLinearVelocity(new Vec3(0, 0, this.speed));

      case "bottom-right":
        Quat.fromEuler(this.targetRotation, 0, -45, 0);
        return this._body.setLinearVelocity(new Vec3(-this.speed, 0, 3));
      case "bottom":
        Quat.fromEuler(this.targetRotation, 0, -90, 0);
        return this._body.setLinearVelocity(new Vec3(-this.speed, 0, 0));
      case "bottom-left":
        Quat.fromEuler(this.targetRotation, 0, -135, 0);
        return this._body.setLinearVelocity(new Vec3(-this.speed, 0, -3));
    }

  }
}
