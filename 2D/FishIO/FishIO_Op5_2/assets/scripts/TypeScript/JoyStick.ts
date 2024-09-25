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
  // @property(cc.Label)
  // Player_Level: cc.Label = null;

  // @property(cc.Node)
  // HideMask: cc.Node = null;
  // @property(cc.Node)
  // stick: cc.Node = null;
  // @property(cc.Node)
  // heart: cc.Node = null;

  startPos: cc.Vec2 = cc.v2(0, 0);
  // joyStick_Max: number = 50;
  // joyStick_Vector: cc.Vec2 = cc.v2();
  isTouch: boolean = false;

  angle: number = null;
  angleMove: number | null = null;
  radian: number = null;
  currentPos: cc.Vec2 = null;
  setTimeOut: any;

  start() {
    // let canvas: cc.Camera = null;
    // cc.tween(canvas)
    // .to(1, {zoomRatio: 0.5})
    // canvas.designResolution = cc.siz
    // this.Player = this.Player_PhysicCircleCollide.getComponent("PlayerController");
    // this.HideMask.on(cc.Node.EventType.TOUCH_START, this.stickStart, this);
    // this.HideMask.on(cc.Node.EventType.TOUCH_MOVE, this.stickMove, this);
    // this.HideMask.on(cc.Node.EventType.TOUCH_CANCEL, this.stickEnd, this);
    // this.HideMask.on(cc.Node.EventType.TOUCH_END, this.stickEnd, this);
  }


  onLoad() {

  }


  public handleFixCircleCldFishes(): void {
    // this.EnemiesController.Fishes_Lv1.forEach(fish => {
    //   fish.getComponent(cc.PhysicsCircleCollider).radius = 5;
    // })

    // this.EnemiesController.Fishes_Lv2.forEach(fish => {
    //   fish.getComponent(cc.PhysicsCircleCollider).radius = 5;
    // })
  }


  public stickStart(event: cc.Touch): void {
    this.isTouch = true;
    this.currentPos = event.getLocation();
    // this.joyStick_Vector = this.node.convertToNodeSpaceAR(this.currentPos);
    // this.setLimitStickVector(this.joyStick_Vector);
    // this.stick.setPosition(this.joyStick_Vector);

    this.node.x = this.currentPos.x - cc.winSize.width / 2;
    this.node.y = this.currentPos.y - cc.winSize.height / 2;

    this.Player_PhysicCircleCollide.radius = 24;
  }


  // public stickMove(event: cc.Touch) {
  //   this.Player.isMove = true;

  //   this.currentPos = event.getLocation();
  //   this.joyStick_Vector = this.node.convertToNodeSpaceAR(this.currentPos);
  //   this.setLimitStickVector(this.joyStick_Vector);
  //   this.stick.setPosition(this.joyStick_Vector);

  //   this.angle = this.CheckAngleOfStick();
  //   console.log(this.angle);
    
  // }


  // private setLimitStickVector(vector: cc.Vec2): void {
  //   let input_mag = vector.mag();
  //   if (input_mag > this.joyStick_Max) {
  //     vector.mulSelf(this.joyStick_Max / input_mag);
  //   }
  // }


  // private CheckAngleOfStick(): number {
  //   let directionVector: cc.Vec2;
  //   let heartPos = this.heart.getPosition();
  //   directionVector = this.stick.getPosition().sub(heartPos);

  //   const rotationRadians = Math.atan2(directionVector.y, directionVector.x);
  //   const rotationDegrees = cc.misc.radiansToDegrees(rotationRadians);
  //   this.radian = rotationDegrees;
  //   return rotationDegrees;
  // }


  public stickEnd(event: cc.Touch) {
    this.isTouch = false;
    this.Player.getComponent("PlayerController").isMove = false;
    this.Player_PhysicCircleCollide.radius = 40;
    if(this.Player.getComponent("PlayerController").isLive) {
      this.Player.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(0, 0);
    }

    // this.EnemiesController.Fishes_Lv1.forEach(fish => {
    //   fish.getComponent(cc.PhysicsCircleCollider).radius = 27;
    // })

    // this.EnemiesController.Fishes_Lv2.forEach(fish => {
    //   fish.getComponent(cc.PhysicsCircleCollider).radius = 34;
    // })
  }


  protected update(dt: number): void {
    // this.handleRotatePlayer();
    // console.log(this.Player_PhysicCircleCollide.radius);
  }
}
