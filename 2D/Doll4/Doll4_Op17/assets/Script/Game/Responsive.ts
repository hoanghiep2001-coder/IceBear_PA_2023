import { Constants } from "../Data/constants";
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;


    // state
    device: string = "";
    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";

    protected onLoad(): void {

    }

    protected start(): void {

    }

    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            Constants.isRotate = true;
            this.setHorizontal();
        } else {
            Constants.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX(); 
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        if(this.HORIZONTAL_IPX === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.Hand.angle = -90;
        this.GamePlay.Hand.x = -232;
        this.GamePlay.Hand.y = 0;

        this.GamePlay.Hand_2.angle = -90;
        this.GamePlay.Hand_2.x = -232;
        this.GamePlay.Hand_2.y = 0;

        this.GamePlay.SpineBoy.node.scale = 0.8;

        this.GamePlay.Box1.scale = 0.75;
        this.GamePlay.Box1.x = 140;
        this.GamePlay.Box1.y = 20;

        this.GamePlay.Box2.scale = 0.75;
        this.GamePlay.Box2.x = 140;
        this.GamePlay.Box2.y = -150;


        if(Constants.Responsive.isDissapointed) {
            this.GamePlay.CharacterContainer.scale = 0.52;
            this.GamePlay.CharacterContainer.y = -80;
            this.GamePlay.CharacterContainer.x = -160;
        } else {
            this.GamePlay.CharacterContainer.scale = 0.55;
            this.GamePlay.CharacterContainer.y = -50;
            this.GamePlay.CharacterContainer.x = -160;
        }

        this.GamePlay.SpineBoy_2.node.scale = 0.9;
        this.GamePlay.SpineBoy_2.node.x = 130;
        this.GamePlay.SpineBoy_2.node.y = -250;

        this.GamePlay.Text_TryAgain.scale = 0.7;
        this.GamePlay.Text_TryAgain.y = 145;
        this.GamePlay.Text_TryAgain.x = 140;

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6) {
        //     // Applovin horizontal

        //     return;
        // }

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.background.scale = 0.92;
            this.GamePlay.background.y = 120;
        } else {
            // IpX
            this.GamePlay.background.scale = 1.1;
            this.GamePlay.background.y = 180;
        }
        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.background.scale = 0.7;
        this.GamePlay.background.y = 0;

        this.GamePlay.Hand.angle = -90;
        this.GamePlay.Hand.x = -232;
        this.GamePlay.Hand.y = 0;
        
        this.GamePlay.Hand_2.angle = -90;
        this.GamePlay.Hand_2.x = -232;
        this.GamePlay.Hand_2.y = 0;

        this.GamePlay.SpineBoy.node.scale = 0.8;

        this.GamePlay.Box1.scale = 0.75;
        this.GamePlay.Box1.x = 140;
        this.GamePlay.Box1.y = 20;

        this.GamePlay.Box2.scale = 0.75;
        this.GamePlay.Box2.x = 140;
        this.GamePlay.Box2.y = -150;

        if(Constants.Responsive.isDissapointed) {
            this.GamePlay.CharacterContainer.scale = 0.52;
            this.GamePlay.CharacterContainer.y = -80;
            this.GamePlay.CharacterContainer.x = -160;
        } else {
            this.GamePlay.CharacterContainer.scale = 0.55;
            this.GamePlay.CharacterContainer.y = -50;
            this.GamePlay.CharacterContainer.x = -160;
        }

        this.GamePlay.SpineBoy_2.node.scale = 0.9;
        this.GamePlay.SpineBoy_2.node.y = -250;

        this.GamePlay.Text_TryAgain.scale = 0.7;
        this.GamePlay.Text_TryAgain.y = 145;
        this.GamePlay.Text_TryAgain.x = 140;

        // horizontal google
        // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height <= 1.2 && cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 1.2) {

        //     return;
        // }

    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if(this.VERTICAL_IPX === this.device) {
            return;
        }

        this.device = this.VERTICAL_IPX;

        this.GamePlay.background.scale = 0.6;
        this.GamePlay.background.y = 0;

        this.GamePlay.Hand.angle = 0;
        this.GamePlay.Hand.x = 0;
        this.GamePlay.Hand.y = -220;

        this.GamePlay.Hand_2.angle = 0;
        this.GamePlay.Hand_2.x = 0;
        this.GamePlay.Hand_2.y = -220;

        this.GamePlay.SpineBoy.node.scale = 0.65;

        this.GamePlay.Box1.scale = 0.5;
        this.GamePlay.Box1.x = -90;
        this.GamePlay.Box1.y = -185;

        this.GamePlay.Box2.scale = 0.5;
        this.GamePlay.Box2.x = 90;
        this.GamePlay.Box2.y = -185;

        if(Constants.Responsive.isDissapointed) {
            this.GamePlay.CharacterContainer.scale = 0.4;
            this.GamePlay.CharacterContainer.y = -80;
            this.GamePlay.CharacterContainer.x = -80;
        } else {
            this.GamePlay.CharacterContainer.scale = 0.45;
            this.GamePlay.CharacterContainer.y = -50;
            this.GamePlay.CharacterContainer.x = 0;
        }

        this.GamePlay.SpineBoy_2.node.scale = 0.7;
        this.GamePlay.SpineBoy_2.node.y = -210;
        this.GamePlay.SpineBoy_2.node.x = 90;

        this.GamePlay.Text_TryAgain.scale = 0.6;
        this.GamePlay.Text_TryAgain.y = -105;
        this.GamePlay.Text_TryAgain.x = 0;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;           

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {

            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin


            //     return;
            // }

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.background.scale = 0.6;
            this.GamePlay.background.y = 0;

            this.GamePlay.Hand.angle = 0;
            this.GamePlay.Hand.x = 0;
            this.GamePlay.Hand.y = -220;

            this.GamePlay.Hand_2.angle = 0;
            this.GamePlay.Hand_2.x = 0;
            this.GamePlay.Hand_2.y = -220;

            this.GamePlay.SpineBoy.node.scale = 0.7;

            this.GamePlay.Box1.scale = 0.5;
            this.GamePlay.Box1.x = -90;
            this.GamePlay.Box1.y = -185;

            this.GamePlay.Box2.scale = 0.5;
            this.GamePlay.Box2.x = 90;
            this.GamePlay.Box2.y = -185;

            if(Constants.Responsive.isDissapointed) {
                this.GamePlay.CharacterContainer.scale = 0.4;
                this.GamePlay.CharacterContainer.y = -80;
                this.GamePlay.CharacterContainer.x = -80;
            } else {
                this.GamePlay.CharacterContainer.scale = 0.45;
                this.GamePlay.CharacterContainer.y = -50;
                this.GamePlay.CharacterContainer.x = 0;
            }

            this.GamePlay.SpineBoy_2.node.scale = 0.8;
            this.GamePlay.SpineBoy_2.node.y = -210;

            this.GamePlay.Text_TryAgain.scale = 0.6;
            this.GamePlay.Text_TryAgain.y = -105;
            this.GamePlay.Text_TryAgain.x = 0;

        
        } else {    
            // Ipad
            this.GamePlay.background.scale = 0.6;
            this.GamePlay.background.y = 50;

            this.GamePlay.Hand.angle = 0;
            this.GamePlay.Hand.x = 0;
            this.GamePlay.Hand.y = -220;

            this.GamePlay.Hand_2.angle = 0;
            this.GamePlay.Hand_2.x = 0;
            this.GamePlay.Hand_2.y = -220;

            this.GamePlay.SpineBoy.node.scale = 0.7;

            this.GamePlay.Box1.scale = 0.5;
            this.GamePlay.Box1.x = -90;
            this.GamePlay.Box1.y = -185;

            this.GamePlay.Box2.scale = 0.5;
            this.GamePlay.Box2.x = 90;
            this.GamePlay.Box2.y = -185;

            if(Constants.Responsive.isDissapointed) {
                this.GamePlay.CharacterContainer.scale = 0.4;
                this.GamePlay.CharacterContainer.y = -80;
                this.GamePlay.CharacterContainer.x = -80;
            } else {
                this.GamePlay.CharacterContainer.scale = 0.45;
                this.GamePlay.CharacterContainer.y = -50;
                this.GamePlay.CharacterContainer.x = 0;
            }

            this.GamePlay.SpineBoy_2.node.scale = 0.8;
            this.GamePlay.SpineBoy_2.node.y = -210;

            this.GamePlay.Text_TryAgain.scale = 0.6;
            this.GamePlay.Text_TryAgain.y = -105;
            this.GamePlay.Text_TryAgain.x = 0;

        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
