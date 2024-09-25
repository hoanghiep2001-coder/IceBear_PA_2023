import EnemiesController from "./EnemiesController";

const { ccclass, property } = cc._decorator;

@ccclass
export class JoyStick extends cc.Component {


  @property(cc.PhysicsCircleCollider)
  Player_PhysicCircleCollide: cc.PhysicsCircleCollider = null;
  @property(cc.Node)
  Player: cc.Node = null;
  @property(EnemiesController)
  EnemiesController: EnemiesController = null;

  startPos: cc.Vec2 = cc.v2(0, 0);
  isTouch: boolean = false;

  angle: number = null;
  angleMove: number | null = null;
  radian: number = null;
  currentPos: cc.Vec2 = null;
  setTimeOut: any;

  start() {

  }


  onLoad() {

  }


  public handleFixCircleCldFishes(): void {

  }


  public stickStart(event: cc.Touch): void {
    this.isTouch = true;
    this.currentPos = event.getLocation();

    this.node.x = this.currentPos.x - cc.winSize.width / 2;
    this.node.y = this.currentPos.y - cc.winSize.height / 2;

    this.Player_PhysicCircleCollide.radius = 24;
  }


  public stickEnd(event: cc.Touch) {
    this.isTouch = false;
    this.Player.getComponent("PlayerController").isMove = false;
    this.Player_PhysicCircleCollide.radius = 40;
    if(this.Player.getComponent("PlayerController").isLive) {
      this.Player.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(0, 0);
    }
  }
}
