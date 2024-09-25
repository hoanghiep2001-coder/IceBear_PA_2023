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
            this.GamePlay.isRotate = true;
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.GamePlay.isRotate = false;
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

        this.GamePlay.responsivePointScale = -10;
        this.GamePlay.PointsContainer.x = 10;
        
        this.GamePlay.text.scale = 0.35;
        this.GamePlay.text.y = 150;
        
        // this.GamePlay.dollBase.y = -60.5;
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.responsivePointScale = -10;
        this.GamePlay.PointsContainer.x = 10;
        
        this.GamePlay.text.scale = 0.35;
        this.GamePlay.text.y = 150;
        
        // this.GamePlay.dollBase.y = -60.5;
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
        
        this.GamePlay.responsivePointScale = -10;
        this.GamePlay.PointsContainer.x = 10;
        
        this.GamePlay.text.scale = 0.25;
        this.GamePlay.text.y = 170;
        
        // this.GamePlay.dollBase.y = -60.5;

    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            this.GamePlay.responsivePointScale = -10;
            this.GamePlay.PointsContainer.x = 10;
            
            this.GamePlay.text.scale = 0.25;
            this.GamePlay.text.y = 180;
            
            // this.GamePlay.dollBase.y = -60.5;

           
        } else {

            this.GamePlay.responsivePointScale = -10;
            this.GamePlay.PointsContainer.x = 10;
            
            this.GamePlay.text.scale = 0.25;
            this.GamePlay.text.y = 180;
            
            // this.GamePlay.dollBase.y = -60.5;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
