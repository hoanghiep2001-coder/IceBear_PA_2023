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
  Vec3,
  ICollisionEvent,
  ERigidBodyType,
  BoxCollider
} from "cc";
import { JoyStick } from "./JoyStick";
import { GamePlay } from "./GamePlay";
const { ccclass, property } = _decorator;

@ccclass("CharacterControls")
export class CharacterControls extends Component {
  @property(JoyStick)
  joyStick: JoyStick;
  @property(GamePlay)
  gamePlay: GamePlay;
  @property(RigidBody)
  _body: RigidBody = null;

  @property(CCString)
  characterDirectionMove: string = "stop";
  @property(SkeletalAnimation)
  _aniSkeleton: SkeletalAnimation = null;
  @property(CCFloat)
  speed: number = 100;

  public velocity: Vec3;
  public position: Vec3 = new Vec3(0, 0, 0);
  private stopRunState: Vec3 = new Vec3(0.1, 0.1, 0.1);
  private characterAnim: string = "";
  private targetRotation: Quat = new Quat();
  private currentRotation: Quat = new Quat();

  start() {
    this._body = this.node.getComponent(RigidBody);
    this.node.setRotationFromEuler(v3(0, 180, 0));
    this._aniSkeleton = this.node.getComponent(SkeletalAnimation);
    this._aniSkeleton.play("stick_idle_01");

    this.handleCollide();


  }

  private switchAnim(value: string): void {
    if (value === "idle" && this.characterAnim != "isIdled") {
      this.characterAnim = "isIdled";
      this._aniSkeleton.play("stick_idle_01");
    }

    if (value === "run" && this.characterAnim != "isRunning") {
      this.characterAnim = "isRunning";
      this._aniSkeleton.play("stick_archer_run");
    }
  }

  directionMove(value: number | null) {
    let result: string = "";
    if (value === null) {
      this.switchAnim("idle");
      return (result = "stop");
    } else {
      this.switchAnim("run");

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

  public handleCountingVelocity(): boolean {
    if (this._body) {
      const currentVelocity = new Vec3();
      this._body.getLinearVelocity(currentVelocity);

      if (
        currentVelocity.length() < this.stopRunState.length()
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  update(deltaTime: number) {
    this.position = this.node.getPosition();
    this.gamePlay.characterPos = this.position;

    if(this.gamePlay.gameStatus === "run") {
      this.switchAnim("run");
      return this._body.setLinearVelocity(new Vec3(this.speed, 0, -this.speed));
    } else if (this.gamePlay.gameStatus === "idle") {
      this.switchAnim("idle");
      return this._body.setLinearVelocity(v3(0, 0, 0));
    }

  }

  private handleCollide(): void {
    let collide = this.getComponent(BoxCollider)
    collide.on("onCollisionEnter", (e: ICollisionEvent) => {
      if (e.otherCollider.getGroup() === 4) {
        this.gamePlay.isWin = true;
      }
    })
  }
}
