import { JoyStick } from "./JoyStick";
import Player from "./PlayerMount";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PowerController extends cc.Component {

  @property(Player)
  Mount: Player = null;
  @property(JoyStick)
  JoyStick: JoyStick = null;

  @property(cc.Camera)
  Camera: cc.Camera = null;
  @property(sp.Skeleton)
  Spine_Bubble: sp.Skeleton = null;
  @property(sp.Skeleton)
  Spine_PlayerPower: sp.Skeleton = null;
  @property(cc.Node)
  touchArea: cc.Node = null;
  @property(cc.Node)
  Button_CTA: cc.Node = null;
  @property(cc.Node)
  Hand_CTA: cc.Node = null;

  isTransforming: boolean = false;
  isLevel2: boolean = false;
  isLevel3: boolean = false;


  protected start(): void {

  }


  private callTween(collide: cc.Node, scale: number, prevScale: number): void {
    let level = collide.getChildByName("Body").getChildByName("Level");
    let component = level.getComponent(cc.Label);
    this.Mount.score = this.Mount.score*10;
    console.log(this.Mount.score);
    
    if(scale == 2.2) {      
      component.fontSize = 30;
      component.lineHeight = 30;
    } else {
      component.fontSize = 25;
      component.lineHeight = 25;
    }

    cc.tween(collide)
      .to(0.1, { scale: scale })
      .call(() => {
        cc.tween(collide)
          .to(0.1, { scale: prevScale })
          .start()
      })
      .start();
  }


  public handlePowerUp(collide: cc.Node, otherCollide: cc.Node): void {
    this.JoyStick.node.opacity = 0;
    this.touchArea.getComponent("TouchArea").isTouched = false;
    let spine = collide.getChildByName("Body").getChildByName("Spine_Fish").getComponent(sp.Skeleton);
    spine.setAnimation(0, "idle", true);
    this.isLevel2 = true;
    this.isTransforming = true;
    otherCollide.destroy();
    this.touchArea.getComponent("TouchArea").offEvent();
    this.Spine_Bubble.node.active = true;
    this.Spine_Bubble.setAnimation(0, "action", false);
    
    this.scheduleOnce(() => {
      this.Spine_PlayerPower.node.active = true;
      this.Spine_PlayerPower.setAnimation(0, "Evo02", false);
    }, 0.5)

    this.scheduleOnce(() => {
      this.callTween(collide, 2.2, 2);
    }, 1.5)


    this.scheduleOnce(() => {
      this.isTransforming = false;
      cc.tween(this.Camera)
        .to(1, { zoomRatio: 0.65 })
        .start();
    }, 2);
  }


  public handlePowerUpLv2(collide: cc.Node, otherCollide: cc.Node): void {
    this.JoyStick.node.opacity = 0;
    this.touchArea.getComponent("TouchArea").isTouched = false;
    let spine = collide.getChildByName("Body").getChildByName("Spine_Fish").getComponent(sp.Skeleton);
    spine.setAnimation(0, "idle", true);
    this.isLevel2 = false;
    this.isLevel3 = true;
    this.isTransforming = true;
    otherCollide.destroy();
    this.touchArea.getComponent("TouchArea").offEvent();
    this.Spine_Bubble.node.active = true;
    this.Spine_Bubble.setAnimation(0, "action", false);
    
    this.scheduleOnce(() => {
      this.Spine_PlayerPower.node.active = true;
      this.Spine_PlayerPower.setAnimation(0, "Evo02", false);
    }, 0.5)

    this.scheduleOnce(() => {
      this.isTransforming = false;
      this.callTween(collide, 4.2, 4);
    }, 1.5)


    this.scheduleOnce(() => {
      this.Button_CTA.getComponent(cc.Animation).play("Btn_CTAAnim");
      this.Hand_CTA.getComponent(cc.Animation).play("Btn_HandAnim");

      cc.tween(this.Camera)
        .to(1, { zoomRatio: 0.3 })
        .start();
    }, 2);
  }


}
