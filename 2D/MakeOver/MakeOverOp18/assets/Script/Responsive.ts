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

        this.GamePlay.bg_Tiled1.active = true;
        this.GamePlay.bg_Tiled2.active = true;

        this.GamePlay.BG_Vertical.active = true;

        this.GamePlay.BG_Vertical.scale = 0.4;
        this.GamePlay.BG_Vertical.y = -35;
        this.GamePlay.BG_Vertical.x = -20
        
        this.GamePlay.Scratchable.y = -50;
        this.GamePlay.Scratchable.scale = 0.4;

        this.GamePlay.install_point.y = 100;
            this.GamePlay.install_point.scale = 0.9;

    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.BG_Vertical.active = false;

        this.GamePlay.bg_Tiled1.active = true;
        this.GamePlay.bg_Tiled2.active = true;

        this.GamePlay.BG_Vertical.active = true;

        this.GamePlay.BG_Vertical.scale = 0.4;
        this.GamePlay.BG_Vertical.y = -35;
        this.GamePlay.BG_Vertical.x = -20
        
        this.GamePlay.Scratchable.y = -50;
        this.GamePlay.Scratchable.scale = 0.4;

        this.GamePlay.install_point.y = 100;
            this.GamePlay.install_point.scale = 0.9;
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

        this.GamePlay.bg_Tiled1.active = false;
        this.GamePlay.bg_Tiled2.active = false;

        this.GamePlay.BG_Vertical.active = true;

        this.GamePlay.BG_Vertical.scale = 0.4;
        this.GamePlay.BG_Vertical.y = -35;
        this.GamePlay.BG_Vertical.x = -20
        
        this.GamePlay.Scratchable.y = -100;
        this.GamePlay.Scratchable.scale = 0.4;

        this.GamePlay.install_point.y = 100;
        this.GamePlay.install_point.scale = 0.9;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        this.GamePlay.BG_Vertical.active = true;
        
        this.GamePlay.bg_Tiled1.active = false;
        this.GamePlay.bg_Tiled2.active = false;

        this.GamePlay.BG_Vertical.active = true;

        this.GamePlay.BG_Vertical.scale = 0.4;
        this.GamePlay.BG_Vertical.y = -35;
        this.GamePlay.BG_Vertical.x = -20
        
        this.GamePlay.Scratchable.y = -100;
        this.GamePlay.Scratchable.scale = 0.4;
        

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            this.GamePlay.install_point.y = 100;
            this.GamePlay.install_point.scale = 0.9;

           
        } else {

            this.GamePlay.install_point.y = 100;
            this.GamePlay.install_point.scale = 0.9;

        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
