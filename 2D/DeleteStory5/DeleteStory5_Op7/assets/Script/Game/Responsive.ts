
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
        this.GamePlay.device = this.HORIZONTAL_IPX;

        this.GamePlay.Text_delete.y = 190;
        this.GamePlay.Text_delete.scale = 0.48;
        this.GamePlay.Text_TheTruth.y = 190;
        this.GamePlay.Text_TheTruth.scale = 0.52;

        this.GamePlay.spine_OpenScene.node.scale = 0.4;
        this.GamePlay.spine_OpenScene.node.y = -190;

        this.GamePlay.spine_NextLevel.node.scale = 0.4;
        this.GamePlay.spine_NextLevel.node.y = -220;

        this.GamePlay.Scratchable.scale = 0.4;
        this.GamePlay.Scratchable.y = -127.5;
        this.GamePlay.Scratchable.x = 107;

        this.GamePlay.point.scale = 0.4;
        this.GamePlay.point.x = 87.5;
        this.GamePlay.point.y = -96.5;

        this.GamePlay.btn_Next.y = -190;
        this.GamePlay.btn_Next.scale = 0.5;

        this.GamePlay.btn_install.scale = 0.7;

        
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6) {
            // Applovin horizontal

            this.GamePlay.btn_install.scale = 0.7;
            return;
        }

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.btn_install.scale = 0.7;
        } else {            

            // IpX
        }
        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.Text_delete.y = 190;
        this.GamePlay.Text_delete.scale = 0.47;
        this.GamePlay.Text_TheTruth.y = 200;
        this.GamePlay.Text_TheTruth.scale = 0.5;

        this.GamePlay.btn_Next.y = -200;
        this.GamePlay.btn_install.scale = 0.5;

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
        this.GamePlay.device = this.VERTICAL_IPX;

        this.GamePlay.Text_delete.y = 180;
        this.GamePlay.Text_delete.scale = 0.3;
        this.GamePlay.Text_TheTruth.y = 150;
        this.GamePlay.Text_TheTruth.scale = 0.4;

        this.GamePlay.btn_install.scale = 0.4;

        this.GamePlay.spine_OpenScene.node.scale = 0.25;
        this.GamePlay.spine_OpenScene.node.y = -120;

        this.GamePlay.spine_NextLevel.node.scale = 0.3;
        this.GamePlay.spine_NextLevel.node.y = -180;

        this.GamePlay.Scratchable.scale = 0.25;
        this.GamePlay.Scratchable.y = -81;
        this.GamePlay.Scratchable.x = 61.5;

        this.GamePlay.point.scale = 0.25;
        this.GamePlay.point.x = 42;
        this.GamePlay.point.y = -50;

        this.GamePlay.btn_Next.y = -170;
        this.GamePlay.btn_Next.scale = 0.4;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;      
        this.GamePlay.device = this.VERTICAL_MOBILE;     

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {

            if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 
            && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
                // mobile mode applovin

                this.GamePlay.Text_delete.y = 210;
                this.GamePlay.Text_delete.scale = 0.4;
                this.GamePlay.Text_TheTruth.y = 210;
                this.GamePlay.Text_TheTruth.scale = 0.5;
     
                this.GamePlay.btn_Next.y = -220;
                this.GamePlay.btn_install.scale = 0.4;

                return;
            }

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.Text_delete.y = 180;
            this.GamePlay.Text_delete.scale = 0.38;
            this.GamePlay.Text_TheTruth.y = 150;
            this.GamePlay.Text_TheTruth.scale = 0.4;
    
            this.GamePlay.btn_install.scale = 0.4;
    
            this.GamePlay.spine_OpenScene.node.scale = 0.32;
            this.GamePlay.spine_OpenScene.node.y = -144.5;
    
            this.GamePlay.spine_NextLevel.node.scale = 0.3;
            this.GamePlay.spine_NextLevel.node.y = -180;
    
            this.GamePlay.Scratchable.scale = 0.32;
            this.GamePlay.Scratchable.y = -95;
            this.GamePlay.Scratchable.x = 83;
    
            this.GamePlay.point.scale = 0.32;
            this.GamePlay.point.x = 57;
            this.GamePlay.point.y = -58;
    
            this.GamePlay.btn_Next.y = -180;
            this.GamePlay.btn_Next.scale = 0.4;
           
        } else {    

            // Ipad
            this.GamePlay.Text_delete.y = 200;
            this.GamePlay.Text_delete.scale = 0.47;
            this.GamePlay.Text_TheTruth.y = 200;
            this.GamePlay.Text_TheTruth.scale = 0.5;

            this.GamePlay.btn_Next.y = -200;
            this.GamePlay.btn_install.scale = 0.4;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
