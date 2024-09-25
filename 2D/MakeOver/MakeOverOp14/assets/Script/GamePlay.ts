import AudioManger from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

  // Component
  @property(GameController)
  GameController: GameController = null;
  @property(AudioManger)
  AudioManger: AudioManger = null;

  // camera
  @property(cc.Camera)
  camera: cc.Camera = null;

  // node
  @property(cc.Node)
  dollBase: cc.Node = null;
  @property(cc.Node)
  eyes: cc.Node = null;
  @property(cc.Node)
  eyesOff: cc.Node = null;
  @property(cc.Node)
  hair: cc.Node = null;
  @property(cc.Node)
  spine_Smoke: cc.Node = null;
  @property(cc.Node)
  overlay: cc.Node = null;
  @property(cc.Node)
  opntions_Container: cc.Node = null;
  @property(cc.Node)
  option1: cc.Node = null;
  @property(cc.Node)
  option2: cc.Node = null;
  @property(cc.Node)
  text: cc.Node = null;
  @property(cc.Node)
  hand: cc.Node = null;
  @property(cc.Node)
  Tool1: cc.Node = null;
  @property(cc.Node)
  bg_HideMask: cc.Node = null;

  // effect
  @property(cc.ParticleSystem)
  Effect_Blink1: cc.ParticleSystem = null;
  @property(cc.ParticleSystem)
  Effect_Blink2: cc.ParticleSystem = null;

  // state
  isRotate: boolean = false;
  isTouched: boolean = false;

  protected onLoad(): void {
      this.eyesOff.active = false;

      this.hand.opacity = 0;
      this.option1.opacity = 0 ;
      this.option2.opacity = 0 ;
      this.text.opacity = 0;
  }

  protected start(): void {
    // if ironsource, comment this line
    // cc.audioEngine.play(this.AudioManger.bgSound, true, 1);
    this.Effect_Blink1.resetSystem();
    this.Effect_Blink2.resetSystem();

    this.handleBlinkEyes();

    this.handleOpenScene();
  }

  private handleOpenScene(): void {
    

    this.scheduleOnce(() => {
      this.registerEvent();

      // cc.audioEngine.play(this.AudioManger.dirtySound, false, 1);
      this.spine_Smoke.getComponent(cc.Animation).play("Show");
    }, 1);

    this.scheduleOnce(() => {
      this.getComponent(cc.Animation).play("Game_HintAnim");
    }, 3);

    this.scheduleOnce(() => {
      // cc.audioEngine.play(this.AudioManger.itemSound, false , 1);
    }, 3.2)

    this.scheduleOnce(() => {
      this.hand.opacity = 255;
      this.opntions_Container.getComponent(cc.Animation).play("Hint_HandAnim");
    }, 4)
  }

  private registerEvent(): void {
    // others
    this.option1.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    this.option2.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

    // mtg && applovin
    this.bg_HideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
  }

  private handleBlinkEyes(): void {
    this.schedule(() => {
      this.eyes.active = false;
      this.eyesOff.active = true;
      this.scheduleOnce(() => {
      this.eyes.active = true;
      this.eyesOff.active = false;
      }, 0.15);
    }, 3);
  }


  protected update(dt: number): void {
  
  }
}
