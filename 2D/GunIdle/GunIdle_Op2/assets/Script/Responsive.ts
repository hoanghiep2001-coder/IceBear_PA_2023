
import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {
    device: string = "";
    isRotate: boolean = false;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";

    @property(GamePlay)
    GamePlay: GamePlay = null;

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
        if(this.device === this.HORIZONTAL_IPX) return;

        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.background.y = 72;
        this.GamePlay.background.scale = 2.2;
        this.GamePlay.CTA_Button.scale = 0.4;
        this.GamePlay.Frame_Ak47.scale = 0.9;

        this.GamePlay.CTA_HintHand.y = -120;
        this.GamePlay.CTA_Button.y = -120;
        this.GamePlay.Frame_Ak47.y = -50;
        this.GamePlay.GridContainer.y = -80;

    }

    private setHorizontalForTablet(): void {
        if(this.device === this.HORIZONTAL_TABLET) return;

        this.device = this.HORIZONTAL_TABLET;
        
        this.GamePlay.background.y = 135;
        this.GamePlay.background.scale = 1.5;
        this.GamePlay.CTA_Button.scale = 0.3;
        this.GamePlay.Frame_Ak47.scale = 1;

        this.GamePlay.CTA_HintHand.y = -120;
        this.GamePlay.CTA_Button.y = -120;
        this.GamePlay.Frame_Ak47.y = -70;
        this.GamePlay.GridContainer.y = -80;
    }

    private setHorizontalForIpad(): void {

    }

    private setHorizontalForOthers(): void {

    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if(this.device === this.VERTICAL_IPX) return;

        this.device = this.VERTICAL_IPX;

        this.GamePlay.background.y = 180;
        this.GamePlay.background.scale = 1.5;
        this.GamePlay.CTA_Button.scale = 0.3;
        this.GamePlay.Frame_Ak47.scale = 1;

        this.GamePlay.CTA_HintHand.y = -120;
        this.GamePlay.CTA_Button.y = -120;
        this.GamePlay.Frame_Ak47.y = -70;
        this.GamePlay.GridContainer.y = -120;

    }

    private setMobile(): void {
        if(this.device === this.VERTICAL_MOBILE) return;

        this.device = this.VERTICAL_MOBILE;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.background.y = 130;
            this.GamePlay.background.scale = 1.5;
            this.GamePlay.CTA_Button.scale = 0.3;
            this.GamePlay.Frame_Ak47.scale = 1;

            this.GamePlay.CTA_HintHand.y = -130;
            this.GamePlay.CTA_Button.y = -130;
            this.GamePlay.Frame_Ak47.y = -70;
            this.GamePlay.GridContainer.y = -80;
        } else {    
            // Ipad
            this.GamePlay.background.y = 130;
            this.GamePlay.background.scale = 1.5;
            this.GamePlay.CTA_Button.scale = 0.3;
            this.GamePlay.Frame_Ak47.scale = 1;

            this.GamePlay.CTA_HintHand.y = -110;
            this.GamePlay.CTA_Button.y = -110;
            this.GamePlay.Frame_Ak47.y = -70;
            this.GamePlay.GridContainer.y = -80;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
