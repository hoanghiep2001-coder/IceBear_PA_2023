import { _decorator, Component, Node, tween, Quat, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BossAction")
export class BossAction extends Component {
  start() {
    // [3]
    // tween(this.node)
    //   .by(3.5, { position: new Vec3(6, 0, 0) })
    //   .to(0, { rotation: Quat.fromEuler(new Quat(), 0, -90, 0) })
    //   .by(3.5, { position: new Vec3(-6, 0, 0) })
    //   .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 90, 0) })
    //   .union()
    //   .repeatForever()
    //   .start();

      tween(this.node)
      .by(2.5, { position: new Vec3(0, 0, 3.5) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 180, 0) })
      .by(2.5, { position: new Vec3(0, 0, -3.5) })
      .to(0, { rotation: Quat.fromEuler(new Quat(), 0, 0, 0) })
      .union()
      .repeatForever()
      .start();
  }
}
