
import { _decorator, Component, Node } from 'cc';
import { Constants } from '../Data/constants';
import { Game } from './Game';
const { ccclass, property } = _decorator;
 
@ccclass('GameController')
export class GameController extends Component {

    @property(Game)
    GamePlay: Game = null;
    
    protected start(): void {
        window.gameReady && window.gameReady();
    }

    public installHandle(): void {
        console.log("install");
        Constants.ironSource.isEndGame = true;
        this.GamePlay.bg.stop();
        this.GamePlay.catSound.stop();
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
        if (typeof(mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.an.catescape.thecatgame");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id6450246575?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.an.catescape.thecatgame");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    }
}

