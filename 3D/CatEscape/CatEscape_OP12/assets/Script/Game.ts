import {
  _decorator,
  Component,
  Node,
  tween,
  Vec3,
  Quat,
  math,
  AudioClip,
  Button,
  director,
  CCFloat,
  v3,
  EventTouch,
} from "cc";
import { GameController } from "./GameController";
import { JoyStick } from "./JoyStick";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {

  // component
  @property(JoyStick)
  JoyStickComponent: JoyStick = null;

  //3D
  @property(Node)
  Cat: Node = null;
  @property(Node)
  Door: Node = null;
  @property(Node)
  Boss: Node = null;

  // 2D
  @property(Node)
  canvas2D: Node;
  @property(Node)
  icon: Node;
  @property(Node)
  navigate: Node;
  @property(Node)
  text: Node;
  @property(Node)
  title: Node;
  @property(Node)
  joyStick: Node;
  @property(Button)
  tryBtn: Button;
  @property(Button)
  hideMask: Button;
  @property(Node)
  loadMap: Node = null;
  @property(Node)
  fail: Node = null;
  @property(Node)
  mask: Node = null;
  @property(Node)
  camera: Node = null;

  @property
  step: number = 1;

  @property(CCFloat)
  _realHeight: number = null;

  @property(CCFloat)
  _realWidth: number = null;

  // audio
  @property(AudioClip)
  bg: AudioClip = null;
  @property(AudioClip)
  click: AudioClip = null;
  @property(AudioClip)
  lose: AudioClip = null;
  @property(AudioClip)
  win: AudioClip = null;
  @property(AudioClip)
  catSound: AudioClip = null;

  // state
  meowSoundState: number = null;

    // ironsource
    ironSourceState: number = 1;
    ironSourceSoundState: boolean = true;
    isEndGame: boolean = false;
    endGame: boolean = false;

  start() {
    // this.catSound.setLoop(true);
    // this.catSound.play();
    // this.bg.setLoop(true);
    // this.bg.play();


    this.Cat.active = true;
    this.canvas2D.active = true;
    this.text.active = true;
    this.navigate.active = true;
    this.title.active = true;
    this.icon.active = true;
    this.hideMask.node.active = false;
    this.tryBtn.node.active = false;
    this.loadMap.active = false;
    this.fail.active = false;
 

    this.scheduleOnce(() => {
      this.canvas2D.on(Node.EventType.TOUCH_START, this.managerScene, this);
      this.canvas2D.on(Node.EventType.TOUCH_END, this.handleIronSourceSound, this);
    }, 0.5)
  }

  onLoad() {
    
  }


  private handleIronSourceSound(): void {
    if (this.isPlayBgSound) {
        return;
    }

    if (this.ironSourceSoundState) {
        this.catSound.setLoop(true);
        this.catSound.play();
        this.bg.setLoop(true);
        this.bg.play();
    }

    this.isPlayBgSound = true;
}


  managerScene(e: EventTouch) {
    this.step++;
    if (this.step === 2) {
      let pos = e.getUILocation();
      let localPos = new Vec3(pos.x - 160, pos.y - 240, 0);

      if (this.ironSourceSoundState) {
        this.click.play();
      }

      this.JoyStickComponent.node.setPosition(localPos);
      this.JoyStickComponent.stick.setPosition(localPos);

      this.text.active = false;
      this.navigate.active = false;
    }

    if (this.step > 0) {
      if (this.endGame) {
        this.step = -9999;

        if (this.ironSourceSoundState) {
          this.win.play();
        }

        this.joyStick.active = false;
        this.loadMap.active = true;
        this.isEndGame = true;
        setTimeout(() => {
          director.loadScene("CatEscapeNext");
        }, 1000);
      }
    }
  }


  public handleEndGame(): void {
    if (this.step > 0) {
      if (this.endGame) {
        this.step = -9999;

        if (this.ironSourceSoundState) {
          this.win.play();
        }

        this.joyStick.active = false;
        this.loadMap.active = true;
        this.isEndGame = true;
        setTimeout(() => {
          director.loadScene("CatEscapeNext");
        }, 1000);
      }
    }
  }


  update(deltaTime: number) {
    // ironsource
    this.ironSourceState = parseInt(localStorage.getItem("cocosSoundState"), 10)

    if (this.ironSourceState) {
        if (this.ironSourceState === 1 && !this.ironSourceSoundState && !this.isEndGame) {
            this.ironSourceSoundState = true;
            this.bg.play();
            this.catSound.play();
        }

        if (this.ironSourceState === 2 && this.ironSourceSoundState) {
            this.ironSourceSoundState = false;
            this.bg.stop();
            this.catSound.stop();
        }
    }

    // if (this.endGame === false) {
    //   const x = Vec3.distance(this.Cat.getPosition(), this.Door.getPosition());

    //   const y = Vec3.distance(this.Cat.getPosition(), this.Boss.getPosition());
    //   if (x <= 1.5) {
    //     console.log("end");
    //     this.bg.stop();
    //     this.catSound.stop();
    //     this.Cat.active = false;
    //     this.Boss.active = false;
    //     this.endGame = true;
    //     this.managerScene();
    //   }
    // }

    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.camera.setPosition(v3(-14.8, 24, 0));
      this._realHeight = 480;
      this._realWidth =
        320 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
      // console.log(this._realWidth);
      this.icon.setPosition((this._realWidth - 320) / 2 + 160, 0, 0);
      this.title.setPosition((320 - this._realWidth) / 2 - 160, 0, 0);

      this.icon.setScale(0.9, 0.9, 0.9);
      this.title.setScale(0.35, 0.35, 0.35);
    } else {
      this.camera.setPosition(v3(-13, 24, 0));
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this._realWidth = 370;
      } else {
        this._realWidth = 320;
      }
      this._realHeight =
        this._realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);

      this.title.y = (this._realHeight - 480) / 2 + 207;
      this.icon.y = (this._realHeight - 480) / 2 + 207;

      this.icon.setPosition(56, 207 + (this._realHeight - 480) / 2, 0);
      this.title.setPosition(-40, 207 + (this._realHeight - 480) / 2, 0);
      this.icon.setScale(0.25, 0.25, 0.25);
      this.title.setScale(0.2, 0.2, 0.2);
    }
  }
}
