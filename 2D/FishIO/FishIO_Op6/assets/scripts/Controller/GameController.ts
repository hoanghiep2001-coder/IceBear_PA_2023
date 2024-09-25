import { _decorator, Animation, Component, director, EPhysics2DDrawFlags, log, Node, physics, PhysicsSystem2D } from 'cc';
import { Constants } from '../Data/Constant';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(Node)
    Env_Overlay: Node = null;
    @property(Node)
    GamePlay: Node = null;
    @property(Node)
    CanvasUI: Node = null;
    @property(Node)
    bg_Horizontal: Node = null;

    // state
    flagVideo: boolean = false;
    flagReplay: boolean = false;


    protected start(): void {
        window.gameReady && window.gameReady();
        this.GamePlay.active = false;
        this.CanvasUI.active = false;

        // PhysicsSystem2D.instance.enable = true;
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Shape;


        if(!Constants.forceReplay) {
            // ironsource game start not open sound
            // comment this block code if build ironsource
            this.AudioManager.playSound(Constants.SoundTrack.videoSound);
    
            this.scheduleOnce(() => {
                this.AudioManager.playSound(Constants.SoundTrack.bgSound);
            }, 2);
        } else {
            this.AudioManager.playSound(Constants.SoundTrack.bgSound);
        }
    }


    private startGame(): void {
        this.flagVideo = true;
        this.Env_Overlay.getComponent(Animation).play("Environment_OverlayAnim");
        this.scheduleOnce(() => {
            this.AudioManager.playSound(Constants.SoundTrack.whooseSound);
        }, 0.4);

        this.scheduleOnce(() => {
            this.GamePlay.active = true;
            this.CanvasUI.active = true;
        }, 0.6);

        if(Constants.flagReplay) {
            this.bg_Horizontal.active = false;
        } else {
            this.scheduleOnce(() => {
                this.bg_Horizontal.active = false;
            }, 1);
        }
    }


    public installHandle(): void {
        console.log("install");
        Constants.ironSource.isEndGame = true;
        this.AudioManager.stopAllSound();

        window.gameEnd && window.gameEnd();
        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }

        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id6445980017?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.fishio.hungryfish");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    }


    protected update(dt: number): void {
        if (Constants.isCompleteVideo && !this.flagVideo) {
            this.startGame();
        }


        if(Constants.forceReplay && !Constants.flagReplay) {
            Constants.isTouching = false;
            Constants.isPlayGame = false;
            Constants.flagReplay = true;
            director.loadScene("Game");
        }

    }
}
