import { _decorator, Animation, Component, EventTouch, Node, PhysicsSystem, SkeletalAnimation, Vec2, Vec3, ParticleSystem, log, sp, view, UITransform, Label, Sprite, VideoPlayer, director, Button } from 'cc';
const { ccclass, property } = _decorator;
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { Constants } from '../Data/constants';

@ccclass('GamePlay')
export class GamePlay extends Component {
    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;


    @property(VideoPlayer)
    video: VideoPlayer = null;
    @property(Node)
    HideMask: Node = null;


    // Container
    @property(Node)
    UI: Node = null;
    @property(Node)
    Hint: Node = null;
    @property(Node)
    clickHole: Node = null;


    // Node
    @property(Node)
    Logo: Node = null;
    @property(Node)
    icon: Node = null;
    @property(Node)
    UI_FrameBg: Node = null;
    @property(Node)
    UI_YouWin: Node = null;
    @property(Node)
    UI_NewItem: Node = null;
    @property(Node)
    UI_Btn: Node = null;
    @property(Node)
    UI_Gif: Node = null;
    @property(Node)
    UI_Hand: Node = null;


    // background
    @property(Node)
    bg_Top: Node = null;
    @property(Node)
    bg_bot: Node = null;
    @property(Node)
    bg_left: Node = null;
    @property(Node)
    bg_right: Node = null;


    @property([Node])
    Holes: Node[] = [];
    @property([Node])
    Hands: Node[] = [];


    protected onLoad(): void {
        this.UI.active = false;
        this.Hands.forEach(hand => hand.active = false);
    }


    protected start(): void {
        // this.AudioManager.bgSound.play();
        this.video.node.on(VideoPlayer.EventType.READY_TO_PLAY, this.initVideo, this);
        this.registerEvent(1);

        // ironsource
        // this.HideMask.on(Node.EventType.TOUCH_START, this.handleIronSourcePlaySound, this);
    }


    private registerEvent(step: number): void {
        switch (step) {
            case 1:
                this.Holes[0].on(Node.EventType.TOUCH_START, this.handleHole1Click, this);
                
                // mtg & applovin
                // this.HideMask.on(Node.EventType.TOUCH_START, this.handleHole1Click, this);


                this.Hands.forEach(hand => hand.active = false);
                this.Hands[0].active = true;
                this.Hands[0].getComponent(Animation).play("Hand_TurtorialAnim");
                break;
            case 2:
                this.Holes[1].on(Node.EventType.TOUCH_START, this.handleHole2Click, this);
                this.Hands.forEach(hand => hand.active = false);
                this.Hands[1].active = true;
                this.Hands[1].getComponent(Animation).play("Hand_TurtorialAnim");
                break;
            case 3:
                this.Holes[2].on(Node.EventType.TOUCH_START, this.handleHole3Click, this);
                this.Hands.forEach(hand => hand.active = false);
                this.Hands[2].active = true;
                this.Hands[2].getComponent(Animation).play("Hand_TurtorialAnim");
                break;
            case 4:
                this.Holes[3].on(Node.EventType.TOUCH_START, this.handleHole4Click, this);
                this.Hands.forEach(hand => hand.active = false);
                this.Hands[3].active = true;
                this.Hands[3].getComponent(Animation).play("Hand_TurtorialAnim");
                break;
            case 5:
                this.Holes[4].on(Node.EventType.TOUCH_START, this.handleHole5Click, this);
                this.Hands.forEach(hand => hand.active = false);
                this.Hands[4].active = true;
                this.Hands[4].getComponent(Animation).play("Hand_TurtorialAnim");
                break;
            default:
                break;
        }
    }


    private handleHole1Click(): void {
        this.AudioManager.bgSound.stop();
        this.GameController.installHandle();

        // ironsource
        // this.handleIronSourcePlaySound();
    }


    private handleHole2Click(): void {
        if(!Constants.isCanClick) {
            return;
        }

        this.video.play();
        this.Holes[1].off(Node.EventType.TOUCH_START);
        this.registerEvent(3);
        Constants.isCanClick = false;

        this.scheduleOnce(() => {
            Constants.isCanClick = true;

            if(Constants.ironSource.SoundState) {
                this.AudioManager.Rope_2.play();
            }

            this.video.pause();
        }, 1.3);
    }


    private handleHole3Click(): void {
        if(!Constants.isCanClick) {
            return;
        }

        this.video.play();

        if(Constants.ironSource.SoundState) {
            this.AudioManager.Rope_1.play();
        }

        this.registerEvent(1);
        Constants.isCanClick = false;
        
        this.Holes[2].off(Node.EventType.TOUCH_START);

        this.scheduleOnce(() => {
            Constants.isCanClick = true;
            this.video.pause();
        }, 0.8);
    }


    private handleHole4Click(): void {
        if(!Constants.isCanClick) {
            return;
        }

        this.video.play();

        if(Constants.ironSource.SoundState) {
            this.AudioManager.Rope_1.play();
        }

        this.registerEvent(5);
        Constants.isCanClick = false;

        this.Holes[3].off(Node.EventType.TOUCH_START);

        this.scheduleOnce(() => {
            Constants.isCanClick = true;
            this.video.pause();
        }, 0.4)
    }


    private handleHole5Click(): void {

        if(!Constants.isCanClick) {
            return;
        }

        Constants.isCanClick = false;
        this.video.play();
        this.Holes[4].off(Node.EventType.TOUCH_START);
        this.Hands[4].active = false;
        this.scheduleOnce(() => {
            Constants.isCanClick = true;

            if(Constants.ironSource.SoundState) {
                this.AudioManager.Rope_2.play();
            }

            this.UI.active = true;
            this.UI_Hand.getComponent(Animation).play("Hand_HintAnim");
            this.UI.getComponent(Animation).play("UI_ShowAnim");

            this.UI_Btn.on(Node.EventType.TOUCH_START, this.handleInstall, this);

            // applovin & mtg
            this.HideMask.on(Node.EventType.TOUCH_START, this.handleInstall, this);
        }, 1);
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            this.AudioManager.bgSound.play();
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                this.AudioManager.bgSound.play();
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                this.AudioManager.bgSound.stop();
                this.AudioManager.Rope_1.stop();
                this.AudioManager.Rope_2.stop();
            }
        }
    }


    private handleInstall(): void {
        this.GameController.installHandle();
        this.AudioManager.bgSound.stop();
    }


    private initVideo(video: VideoPlayer) {
        video.volume = 0;
        // video.play();
        // video.loop = true;
    }


    protected update(dt: number): void {

        // ironsource
        // this.handleMuteSoundIronSource();
    }
}
