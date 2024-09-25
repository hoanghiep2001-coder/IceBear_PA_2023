import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

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

        this.GamePlay.node.scaleX = 1.2;
        this.GamePlay.node.scaleY = 1.2;
        this.GamePlay.camera.node.y = -10;

        this.GamePlay.opntions_Container.y = -70;
        this.GamePlay.text.y = -60;

        this.GamePlay.opntions_Container.scale = 0.9;
        this.GamePlay.text.scale = 0.35;
        this.GamePlay.overlay.scaleX = 1.2;
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.node.scaleX = 1.2;
        this.GamePlay.node.scaleY = 1.2;
        this.GamePlay.camera.node.y = -10;

        this.GamePlay.opntions_Container.y = -70;
        this.GamePlay.text.y = -60;

        this.GamePlay.opntions_Container.scale = 0.9;
        this.GamePlay.text.scale = 0.35;
        this.GamePlay.overlay.scaleX = 1.2;
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

        this.GamePlay.node.scaleX = 1;
        this.GamePlay.node.scaleY = 1;
        this.GamePlay.camera.node.y = 0;
        
        this.GamePlay.opntions_Container.y = -100;
        this.GamePlay.text.y = -90;

        this.GamePlay.opntions_Container.scale = 0.9;
        this.GamePlay.text.scale = 0.3;
        this.GamePlay.overlay.scaleX = 1;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;

        this.GamePlay.node.scaleX = 1;
        this.GamePlay.node.scaleY = 1;
        this.GamePlay.camera.node.y = 0;

        this.GamePlay.opntions_Container.y = -100;
        this.GamePlay.text.y = -90;

        this.GamePlay.opntions_Container.scale = 1;
        this.GamePlay.text.scale = 0.35;
        this.GamePlay.overlay.scaleX = 1;

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   

           
        } else {

        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
