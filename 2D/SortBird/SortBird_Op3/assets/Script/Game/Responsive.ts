
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;


    // state
    isRotate: boolean = false;
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
        this.GamePlay.node.y = 0;
        this.GamePlay.background_Road.y = -77.5;
        this.GamePlay.stick5.y = -44;
        
        
        this.GamePlay.warningImactArea.y = -100
        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6) {
        //     // Applovin horizontal

        //     return;
        // }

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.bgWarning.scaleX = 0.45;
            this.GamePlay.bgWarning.scaleY = 0.5;
        } else {
            // IpX
            this.GamePlay.bgWarning.scaleX = 0.55;
            this.GamePlay.bgWarning.scaleY = 0.5;
        }
        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.bgWarning.scaleX = 0.35;
        this.GamePlay.bgWarning.scaleY = 0.45;
        this.GamePlay.warningImactArea.y = -100;
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

        this.GamePlay.node.y = -100;
        this.GamePlay.background_Road.y = -165.5;
        this.GamePlay.bgWarning.scaleX = 0.4;
        this.GamePlay.bgWarning.scaleY = 0.65;
        this.GamePlay.stick5.y = -45;
        
        this.GamePlay.warningImactArea.y = -130;
  
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
            this.GamePlay.node.y = -50;
            this.GamePlay.background_Road.y = -120.5;
            this.GamePlay.bgWarning.scaleX = 0.4;
            this.GamePlay.bgWarning.scaleY = 0.6;
            this.GamePlay.stick5.y = -45;
            
            this.GamePlay.warningImactArea.y = -120;
        } else {    
            // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 8.5 
            // && cc.view.getFrameSize().width / cc.view.getFrameSize().height > 8.3) {

            //     return;
            // }

            // Ipad
            this.GamePlay.bgWarning.scaleX = 0.35;
            this.GamePlay.bgWarning.scaleY = 0.45;
            this.GamePlay.warningImactArea.y = -100;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
