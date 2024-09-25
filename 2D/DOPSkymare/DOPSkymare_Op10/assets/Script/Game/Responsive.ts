
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
    isRotate: boolean = false;

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
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
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

        Constants.Responsive.currentDevice = "horizon_Tablet";
        this.GamePlay.drawSpace_Lv1.y = 30;
        this.GamePlay.hand_Lv1.scale = 0.3;

        this.GamePlay.drawSpace_Lv2.y = 30;
        
        this.GamePlay.hand_Lv2.scale = 0.3;
        this.GamePlay.text_lv2.scale = 0.5;
        this.GamePlay.text_lv2.y = 140;
        this.GamePlay.spine_level2.scale = 0.2;

        this.GamePlay.text_lv3.scale = 0.48;
        this.GamePlay.text_lv3.y = 135;

        this.GamePlay.text.scale = 0.5;
        this.GamePlay.spine.scale = 0.42;

        this.GamePlay.logo.scale = 0.5;
        this.GamePlay.logo.x = -270;  
        this.GamePlay.logo.y = 0      
        this.GamePlay.text.y = 205;
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        Constants.Responsive.currentDevice = "horizon_Tablet";
        this.GamePlay.drawSpace_Lv1.y = 30;
        this.GamePlay.drawSpace_Lv2.y = 30;
        this.GamePlay.hand_Lv1.scale = 0.3;

        this.GamePlay.hand_Lv2.scale = 0.3;
        this.GamePlay.text_lv2.scale = 0.48;
        this.GamePlay.text_lv2.y = 135;

        this.GamePlay.text_lv3.scale = 0.48;
        this.GamePlay.text_lv3.y = 135;

        this.GamePlay.text.scale = 0.45;
        this.GamePlay.spine.scale = 0.42;

        this.GamePlay.logo.scale = 0.4;
        this.GamePlay.logo.x = -240;  
        this.GamePlay.logo.y = 0      
        this.GamePlay.text.y = 205;


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

        Constants.Responsive.currentDevice = "vertical_mobile";
        this.GamePlay.drawSpace_Lv1.y = 0;
        this.GamePlay.hand_Lv1.scale = 0.18;
        this.GamePlay.hand_Lv2.scale = 0.18;

        this.GamePlay.drawSpace_Lv2.y = 20;
        
        this.GamePlay.spine_level2.scale = 0.15;
        this.GamePlay.text_lv2.scale = 0.35;
        this.GamePlay.text_lv2.y = 70;

        this.GamePlay.spine_level3.scale = 0.28;
        this.GamePlay.text_lv3.scale = 0.3;
        this.GamePlay.text_lv3.y = 75;

        this.GamePlay.text.scale = 0.4;
        this.GamePlay.spine.scale = 0.3;
        this.GamePlay.logo.scale = 0.4;

        this.GamePlay.logo.x = 0;  
        this.GamePlay.logo.y = 150      
        this.GamePlay.text.y =  85;
        this.GamePlay.spine.x = 0;
        this.GamePlay.spine.y = -230;

    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;

        Constants.Responsive.currentDevice = "vertical_mobile";
        this.GamePlay.drawSpace_Lv1.y = 0;
        this.GamePlay.drawSpace_Lv2.y = 20;
        this.GamePlay.hand_Lv1.scale = 0.18;
        this.GamePlay.hand_Lv2.scale = 0.18;
        
        this.GamePlay.text_lv2.scale = 0.45;
        this.GamePlay.text_lv2.y = 120;

        this.GamePlay.text_lv3.scale = 0.38;
        this.GamePlay.text_lv3.y = 120;

        this.GamePlay.text.scale = 0.5;
        this.GamePlay.spine.scale = 0.35;   
        this.GamePlay.logo.scale = 0.4;

        this.GamePlay.logo.x = 0;    
        this.GamePlay.logo.y = 188;
        this.GamePlay.text.y =  128;
        this.GamePlay.spine.x = 0;
        this.GamePlay.spine.y = -240;             

        // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
        //     // Iphone 6 / 6 plus / 7 / 7 Plus
           
        // } else {    
        //     // Ipad

        // }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
