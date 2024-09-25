
import { _decorator, Component, math, Node, Tween, tween, view, Animation, screen, log } from 'cc';
import { GamePlay } from './GamePlay';
import { Constants } from '../Data/constants';
const { ccclass, property } = _decorator;


@ccclass('Responsive')
export class Responsive extends Component {

    @property(GamePlay)
    GamePlay: GamePlay = null;

    // state
    device: string = "";
    isRotate: boolean = false;
    hint_Pos_X: number;
    hint_Pos_Y: number;

    hand: Node = null;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";


    protected onLoad(): void {

    }


    protected start(): void {

    }


    private handleRotate(): void {
        if (screen.windowSize.width > screen.windowSize.height) {
            Constants.isRotate = true;
            this.setHorizontal();
        } else {
            Constants.isRotate = false;
            this.setVertical();
        }
    }


    private setHorizontal(): void {
        if (screen.windowSize.height / screen.windowSize.width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }


    private setHorizontalForIpX(): void {
        if (this.HORIZONTAL_IPX === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.icon.active = true;
        this.GamePlay.Logo.active = true;
        this.GamePlay.bg_Top.active = true;
        this.GamePlay.bg_bot.active = true;

        this.GamePlay.Logo.setScale(new math.Vec3(0.35, 0.35, 0.35));
        this.GamePlay.Logo.setPosition(new math.Vec3(-260, 0, 0));

        this.GamePlay.icon.setScale(new math.Vec3(0.3, 0.3, 0.3));
        this.GamePlay.icon.setPosition(new math.Vec3(250, 0, 0));

        this.GamePlay.video.node.setPosition(new math.Vec3(0, 0, 0));
        this.GamePlay.video.node.setScale(new math.Vec3(0.25, 0.25, 0.3));

        this.GamePlay.UI_FrameBg.setScale(new math.Vec3(0.25, 0.36, 1));

        this.GamePlay.clickHole.setPosition(new math.Vec3(0, 25, 0));
        this.GamePlay.Hint.setPosition(new math.Vec3(0, 25, 0));

        this.GamePlay.Holes[1].setPosition(new math.Vec3(-20, -145, 0))
        this.GamePlay.Hands[1].setPosition(new math.Vec3(-106.5, -140, 0))

        this.GamePlay.Holes[4].setPosition(new math.Vec3(-65, -145, 0))
        this.GamePlay.Hands[4].setPosition(new math.Vec3(-150.5, -140, 0))

        // if(cc.screen.windowSize.height / cc.screen.windowSize.width >= 0.6) {
        //     // Applovin horizontal

        //     return;
        // }

        if (screen.windowSize.height / screen.windowSize.width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.bg_left.setPosition(new math.Vec3(-630, 0, 0));
            this.GamePlay.bg_right.setPosition(new math.Vec3(630, 0, 0));
            console.log(1);

        } else {
            // IpX
            // this.GamePlay.bg_Top.setPosition(new math.Vec3(0, 735, 0))
            this.GamePlay.bg_left.setPosition(new math.Vec3(-630, 0, 0));
            this.GamePlay.bg_right.setPosition(new math.Vec3(630, 0, 0));
            console.log(2);

        }

    }


    private setHorizontalForTablet(): void {
        if (this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.icon.active = true;
        this.GamePlay.Logo.active = true;
        this.GamePlay.bg_Top.active = true;
        this.GamePlay.bg_bot.active = true;

        this.GamePlay.Logo.setScale(new math.Vec3(0.25, 0.25, 0.25));
        this.GamePlay.Logo.setPosition(new math.Vec3(-220, 0, 0));

        this.GamePlay.icon.setScale(new math.Vec3(0.2, 0.2, 0.3));
        this.GamePlay.icon.setPosition(new math.Vec3(210, 0, 0));

        this.GamePlay.bg_left.setPosition(new math.Vec3(-630, 0, 0));
        this.GamePlay.bg_right.setPosition(new math.Vec3(630, 0, 0));
        this.GamePlay.bg_Top.setPosition(new math.Vec3(0, 740, 0));
        this.GamePlay.bg_bot.setPosition(new math.Vec3(0, -740, 0));


        this.GamePlay.clickHole.setPosition(new math.Vec3(0, 25, 0));
        this.GamePlay.Hint.setPosition(new math.Vec3(0, 25, 0));

        this.GamePlay.Holes[1].setPosition(new math.Vec3(-20, -145, 0))
        this.GamePlay.Hands[1].setPosition(new math.Vec3(-106.5, -140, 0))

        this.GamePlay.Holes[4].setPosition(new math.Vec3(-65, -145, 0))
        this.GamePlay.Hands[4].setPosition(new math.Vec3(-150.5, -140, 0))

        this.GamePlay.video.node.setPosition(new math.Vec3(0, 0, 0));
        this.GamePlay.video.node.setScale(new math.Vec3(0.25, 0.25, 0.3));

        this.GamePlay.UI_FrameBg.setScale(new math.Vec3(0.25, 0.34, 1));

        console.log(3);


        // horizontal google
        // if(cc.screen.windowSize.width / cc.screen.windowSize.height <= 1.2 && cc.screen.windowSize.width / cc.screen.windowSize.height >= 1.2) {

        //     return;
        // }

    }


    private setVertical(): void {
        if (screen.windowSize.width / screen.windowSize.height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }


    private setIphoneX(): void {
        if (this.VERTICAL_IPX === this.device) {
            return;
        }

        this.device = this.VERTICAL_IPX;
        this.GamePlay.bg_Top.active = true;
        this.GamePlay.bg_bot.active = true;
        this.GamePlay.Logo.active = false;
        this.GamePlay.icon.active = false;

        this.GamePlay.video.node.setPosition(new math.Vec3(0, 0, 0));
        this.GamePlay.video.node.setScale(new math.Vec3(0.3, 0.3, 0.3));

        this.GamePlay.bg_left.setPosition(new math.Vec3(-660, 0, 0));
        this.GamePlay.bg_right.setPosition(new math.Vec3(660, 0, 0));

        this.GamePlay.clickHole.setPosition(new math.Vec3(0, 8, 0));
        this.GamePlay.Hint.setPosition(new math.Vec3(0, 8, 0));

        this.GamePlay.Holes[1].setPosition(new math.Vec3(-20, -155, 0))
        this.GamePlay.Hands[1].setPosition(new math.Vec3(-106.5, -151, 0))

        this.GamePlay.Holes[4].setPosition(new math.Vec3(-65, -155, 0))
        this.GamePlay.Hands[4].setPosition(new math.Vec3(-150.5, -155, 0))

        this.GamePlay.bg_Top.setPosition(new math.Vec3(0, 770, 0));
        this.GamePlay.bg_bot.setPosition(new math.Vec3(0, -770, 0));

        this.GamePlay.UI_FrameBg.setScale(new math.Vec3(0.6, 0.6, 1));

        console.log(4);
    }


    private setMobile(): void {
        if (this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;

        this.GamePlay.icon.active = false;
        this.GamePlay.Logo.active = false;

        if (screen.windowSize.width / screen.windowSize.height < 0.7) {
            // if (cc.screen.windowSize.width / cc.screen.windowSize.height >= 0.6 && cc.screen.windowSize.width / cc.screen.windowSize.height < 0.62) {
            //     // mobile mode applovin

            //     return;
            // }

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.bg_Top.active = false;
            this.GamePlay.bg_bot.active = false;

            this.GamePlay.video.node.setPosition(new math.Vec3(0, 0, 0));
            this.GamePlay.video.node.setScale(new math.Vec3(0.3, 0.3, 0.3));

            this.GamePlay.bg_left.setPosition(new math.Vec3(-660, 0, 0));
            this.GamePlay.bg_right.setPosition(new math.Vec3(660, 0, 0));
            this.GamePlay.bg_Top.setPosition(new math.Vec3(0, 740, 0));
            this.GamePlay.bg_bot.setPosition(new math.Vec3(0, -740, 0));

            this.GamePlay.clickHole.setPosition(new math.Vec3(0, 8, 0));
            this.GamePlay.Hint.setPosition(new math.Vec3(0, 8, 0));

            this.GamePlay.Holes[1].setPosition(new math.Vec3(-20, -155, 0))
            this.GamePlay.Hands[1].setPosition(new math.Vec3(-106.5, -151, 0))

            this.GamePlay.Holes[4].setPosition(new math.Vec3(-65, -155, 0))
            this.GamePlay.Hands[4].setPosition(new math.Vec3(-150.5, -155, 0))

            this.GamePlay.UI_FrameBg.setScale(new math.Vec3(0.42, 0.42, 1));


            console.log(5);
        } else {
            // Ipad
            this.GamePlay.bg_Top.active = false;
            this.GamePlay.bg_bot.active = false;
            this.GamePlay.video.node.setPosition(new math.Vec3(0, 0, 0));
            this.GamePlay.video.node.setScale(new math.Vec3(0.25, 0.25, 0.25));

            this.GamePlay.bg_left.setPosition(new math.Vec3(-630, 0, 0));
            this.GamePlay.bg_right.setPosition(new math.Vec3(630, 0, 0));
            this.GamePlay.bg_Top.setPosition(new math.Vec3(0, 710, 0));
            this.GamePlay.bg_bot.setPosition(new math.Vec3(0, -710, 0));

            this.GamePlay.Holes[1].setPosition(new math.Vec3(-20, -155, 0))
            this.GamePlay.Hands[1].setPosition(new math.Vec3(-106.5, -151, 0))

            this.GamePlay.Holes[4].setPosition(new math.Vec3(-65, -155, 0))
            this.GamePlay.Hands[4].setPosition(new math.Vec3(-150.5, -155, 0))

            this.GamePlay.clickHole.setPosition(new math.Vec3(0, 8, 0));
            this.GamePlay.Hint.setPosition(new math.Vec3(0, 8, 0));

            this.GamePlay.UI_FrameBg.setScale(new math.Vec3(0.34, 0.34, 1));

            console.log(6);
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

