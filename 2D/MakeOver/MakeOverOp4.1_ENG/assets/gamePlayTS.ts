const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  background1: cc.Node;

  @property(cc.Node)
  background2: cc.Node;

  @property(cc.Node)
  loveOutSight: cc.Node;

  @property(cc.Node)
  Rosie: cc.Node;

  @property(cc.Node)
  textWhy: cc.Node;

  onLoad(): void {
    const GamePlay = this.node.getComponent("gamePlay");
    const AudioManager = this.node.getComponent("AudioManager");

    let screen_width: number = cc.winSize.width;
    let screen_height: number = cc.winSize.height;
    if (screen_width < screen_height) {
      this.background2.width = screen_width;
      this.background2.height = screen_height;
    }

    this.scheduleOnce(() => {
      this.loveOutSight.active = true;
    }, 0.5);

    this.scheduleOnce(() => {
      this.loveOutSight.getComponent(cc.Animation).play("FadeAnim");
      this.Rosie.getComponent(cc.Animation).stop("RosieWalk");
    }, 3);

    this.scheduleOnce(() => {
      GamePlay.boxchat.active = true;
      AudioManager.playSupriseSound();
    }, 4);

    this.scheduleOnce(() => {
      GamePlay.emoji.active = false;
      this.textWhy.active = true;
      AudioManager.playWhySound();
    }, 5.5);

    this.scheduleOnce(() => {
      this.textWhy.active = false;
      GamePlay.text.active = true;
    }, 7)

    this.scheduleOnce(() => {
      GamePlay.boxchat.getComponent(cc.Animation).play("boxChat2");
    }, 8);

    this.scheduleOnce(() => {
      this.Rosie.getComponent(cc.Animation).play("RosieWalk");
      this.background2.getComponent(cc.Animation).play("Background2Fade");
    }, 9);

    this.scheduleOnce(() => {
      this.Rosie.getComponent(cc.Animation).stop("RosieWalk");
      this.Rosie.getComponent(cc.Animation).play("RosieScale");
    }, 10.5);
  }
}
