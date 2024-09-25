
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
        

        
        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6) {
        //     // Applovin horizontal

         
        //     return;
        // }

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.bg.scale = 0.55;
            this.GamePlay.bg.y = 98;
        } else {            

            // IpX
            this.GamePlay.bg.scale = 0.67;
            this.GamePlay.bg.y = 150;
        }
        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.bg.scale = 0.5;
        this.GamePlay.bg.y = 98;

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
        this.GamePlay.bg.scale = 0.5;
        this.GamePlay.bg.y = 98;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;      
   
        this.GamePlay.bg.scale = 0.5;
        this.GamePlay.bg.y = 98;
        // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {

        //     if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
        //         // mobile mode applovin



        //         return;
        //     }

        //     // Iphone 6 / 6 plus / 7 / 7 Plus
           
        // } else {    

        //     // Ipad
        // }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
