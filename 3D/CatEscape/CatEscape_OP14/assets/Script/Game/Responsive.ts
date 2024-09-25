import { math, screen } from "cc";
import { Constants } from "../Data/constants";
import { Game } from "./Game";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(Game)
    Game: Game = null;

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
        if (screen.windowSize.width > screen.windowSize.height) {
            Constants.isRotate = true;
            this.setHorizontal();
        } else {
            Constants.isRotate = false;
            this.setVertical();
        }
    }


    private setHorizontal(): void {
        if(screen.windowSize.height / screen.windowSize.width < 0.65) {
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

        this.Game.PickCat_Hand.setPosition(new math.Vec3(0, -230, 0));
        this.Game.Text_SelectSkin.setPosition(new math.Vec3(0, 195, 0));
        this.Game.text.setPosition(new math.Vec3(0, -224, 0));
        this.Game.BtnPlay.setPosition(new math.Vec3(0, -194, 0));
        this.Game.navigate.setPosition(new math.Vec3(0, 10, 0));

        if(this.Game.text.active) {
            this.Game.title.active = true;
            this.Game.icon.active = true;
        }

        // if(screen.windowSize.height / screen.windowSize.width >= 0.6) {
        //     // Applovin horizontal

        //     return;
        // }
        

        if(screen.windowSize.height / screen.windowSize.width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
        } else {
            // IpX
        }
        
    }


    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.Game.PickCat_Hand.setPosition(new math.Vec3(0, -230, 0));
        this.Game.Text_SelectSkin.setPosition(new math.Vec3(0, 195, 0));
        this.Game.text.setPosition(new math.Vec3(0, 195, 0));
        this.Game.BtnPlay.setPosition(new math.Vec3(0, -194, 0));
        this.Game.navigate.setPosition(new math.Vec3(0, 0, 0));

        if(this.Game.text.active) {
            this.Game.title.active = true;
            this.Game.icon.active = true;
        }

        console.log("let");
        
        // horizontal google
        // if(screen.windowSize.width / screen.windowSize.height <= 1.2 && screen.windowSize.width / screen.windowSize.height >= 1.2) {

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
        if(this.VERTICAL_IPX === this.device) {
            return;
        }

        this.device = this.VERTICAL_IPX;

        this.Game.PickCat_Hand.setPosition(new math.Vec3(0, -270, 0));
        this.Game.Text_SelectSkin.setPosition(new math.Vec3(0, 225, 0));
        this.Game.text.setPosition(new math.Vec3(0, 225, 0));
        this.Game.BtnPlay.setPosition(new math.Vec3(0, -270, 0));
        this.Game.navigate.setPosition(new math.Vec3(0, -100, 0));

        if(this.Game.text.active) {
            this.Game.title.active = false;
            this.Game.icon.active = false;
        }
    }


    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;           

        if(this.Game.text.active) {
            this.Game.title.active = false;
            this.Game.icon.active = false;
        }

        if(screen.windowSize.width / screen.windowSize.height < 0.7) {
            // if (screen.windowSize.width / screen.windowSize.height >= 0.6 && screen.windowSize.width / screen.windowSize.height < 0.62) {
            //     // mobile mode applovin


            //     return;
            // }

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.Game.PickCat_Hand.setPosition(new math.Vec3(0, -230, 0));
            this.Game.Text_SelectSkin.setPosition(new math.Vec3(0, 205, 0));
            this.Game.text.setPosition(new math.Vec3(0, 205, 0));
            this.Game.BtnPlay.setPosition(new math.Vec3(0, -220, 0));
            this.Game.navigate.setPosition(new math.Vec3(0, -40, 0));
        } else {    

            // if(screen.windowSize.width / screen.windowSize.height < 8.5 
            // && screen.windowSize.width / screen.windowSize.height > 8.3) {

            //     return;
            // }

            // Ipad
            this.Game.PickCat_Hand.setPosition(new math.Vec3(0, -230, 0));
            this.Game.Text_SelectSkin.setPosition(new math.Vec3(0, 195, 0));
            this.Game.text.setPosition(new math.Vec3(0, 195, 0));
            this.Game.BtnPlay.setPosition(new math.Vec3(0, -194, 0));
            this.Game.navigate.setPosition(new math.Vec3(0, -20, 0));
        }
        
    }


    protected update(dt: number): void {
        this.handleRotate();
    }

}
