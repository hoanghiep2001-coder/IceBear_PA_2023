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
  Vec2,
  BoxCollider,
  ICollisionEvent,
} from "cc";
import { JoyStick } from "./JoyStick";
import { Game } from "./Game";
const { ccclass, property } = _decorator;

@ccclass("controlCubeBox")
export class controlCubeBox extends Component {
  @property(Game)
  GamePlay: Game;
  @property(JoyStick)
  joyStick: JoyStick;
  @property(RigidBody)
  _body: RigidBody = null;
  @property(CCString)
  catDirectionMove: string = "stop";
  @property(SkeletalAnimation)
  _aniSkeleton: SkeletalAnimation = null;

  // state
  speed: number = 5;
  radian: number = null;

  isMoving: boolean = false;
  flag: boolean = false;
  isRun: boolean = true;

  // rigidbody: RigidBody = null;
  // collider: BoxCollider = null;

  angle: number = null;
  private targetRotation: Quat = new Quat();
  private currentRotation: Quat = new Quat();


  start() {
    // this.isMoving = false;
    // this._body = this.node.getComponent(RigidBody);
    // this.node.setRotationFromEuler(v3(0, 90, 0));
    // // this._aniSkeleton = this.node.getComponent(SkeletalAnimation);
    // // this._aniSkeleton.play("Cats_Runcycle");

    // this.handleCollideDoor();
  }


  private handleCollideDoor(): void {
    this.rigidbody = this.getComponent(RigidBody);
    this.collider = this.getComponent(BoxCollider);

    this.collider.on("onCollisionEnter", (e: ICollisionEvent) => {
      if (e.otherCollider.node.name === "Door") {
        console.log("end");
        this.GamePlay.bg.stop();
        this.GamePlay.catSound.stop();
        this.GamePlay.Cat.active = false;
        this.GamePlay.Boss.active = false;
        this.GamePlay.endGame = true;
        this.GamePlay.handleEndGame();
      }
  });
  }


  public handleAngleCat(): void {
    // let directionVector: Vec2;
    // let joyStickPos = this.joyStick.node.getPosition();

    // let newPos: Vec2 = new Vec2(joyStickPos.x, joyStickPos.y);
    // directionVector = this.joyStick.stick.getPosition().subtract(newPos);
    
    
    // const rotationRadians = Math.atan2(directionVector.y, directionVector.x);
    // const rotationDegrees = cc.misc.radiansToDegrees(rotationRadians);
    // this.radian = rotationRadians;
    // this.angle = rotationDegrees;
  }


  update(deltaTime: number) {
    // if(this.flag && this.isMoving) {
    //   this.flag = false;
    //   // this._aniSkeleton.resume();
    // }
    
    // if (!this.flag && !this.isMoving) {
    //   this.flag = true;
    //   // this._aniSkeleton.pause();
    // }

    // if (this.isMoving) {
    //   const moveDirection = new Vec3(Math.sin(this.radian), 0, Math.cos(this.radian));
    //   moveDirection.normalize();
    //   moveDirection.multiplyScalar(this.speed * deltaTime); 

    //   let pos = new Vec3(moveDirection.x, 0 , moveDirection.z)

    //   this.node.setRotationFromEuler(v3(0, this.angle, 0));
    //   if(this.isRun) {
    //     if(this.node.getPosition().y > 0 ) {
    //       return;
    //     }
    //     // this._body.setLinearVelocity(pos)
    //     this.node.setPosition(this.node.position.add(pos));
    //   }
    // }
  }
}
