
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
        this.GamePlay.node.scale = 1.1;
        this.GamePlay.node.y = 20;

        this.GamePlay.icon.active = true;


        this.GamePlay.text.scale = 0.5;
        this.GamePlay.logo.scale = 0.5;

        this.GamePlay.logo.x = -250;
        this.GamePlay.logo.y = -20;
        this.GamePlay.text.y = 140;

        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.node.scale = 1.1;
        this.GamePlay.node.y = 20;

        this.GamePlay.icon.active = true;
        this.GamePlay.icon.scale = 0.35;
        this.GamePlay.icon.x = 200;
        
        this.GamePlay.text.scale = 0.45;
        this.GamePlay.logo.scale = 0.35;

        this.GamePlay.logo.x = -210;
        this.GamePlay.logo.y = -20;
        this.GamePlay.text.y = 140;

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

        this.GamePlay.node.scale = 0.85;
        this.GamePlay.node.y = 0;
        this.GamePlay.icon.active = false;

        this.GamePlay.text.scale = 0.4;
        this.GamePlay.logo.scale = 0.5;

        this.GamePlay.logo.x = 0;
        this.GamePlay.logo.y = 175;
        this.GamePlay.text.y =  96;

    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;
        this.GamePlay.icon.active = false;
        this.GamePlay.node.scale = 1;
        this.GamePlay.node.y = 0;

        this.GamePlay.text.scale = 0.4;
        this.GamePlay.logo.scale = 0.5;

        this.GamePlay.logo.x = 0;
        this.GamePlay.logo.y = 175;
        this.GamePlay.text.y =  96;
        // this.GamePlay.text.scale = 0.5;   

        // this.GamePlay.text.y =  165;             

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
           
        } else {    
            // Ipad
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
