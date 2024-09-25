
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

       this.GamePlay.Logo.active 
       ? this.GamePlay.Logo_Horizontal.active = false
       : this.GamePlay.Logo_Horizontal.active = true;

        this.GamePlay.Text.x = -300;
        this.GamePlay.Text.y = 0;
        this.GamePlay.Text.scale = 0.5;

    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.Logo_Horizontal.active = false;
        this.GamePlay.Text.y = 195;
        this.GamePlay.Text.x = 0;
        this.GamePlay.Text.scale = 0.4;

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

        this.GamePlay.Logo_Horizontal.active = false;
        this.GamePlay.Text.y = 220;
        this.GamePlay.Text.x = 0;
        this.GamePlay.Text.scale = 0.5;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;      

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.Logo_Horizontal.active = false;
            this.GamePlay.Text.y = 200;
            this.GamePlay.Text.x = 0;
            this.GamePlay.Text.scale = 0.5;
        } else {    
            // Ipad
            this.GamePlay.Logo_Horizontal.active = false;
            this.GamePlay.Text.y = 195;
            this.GamePlay.Text.x = 0;
            this.GamePlay.Text.scale = 0.4;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
