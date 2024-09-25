
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

        this.GamePlay.bg_Main.scale = 1.5;
        this.GamePlay.tab.y = 200;
        this.GamePlay.OptionContainer_Top.y = -32;
        this.GamePlay.OptionContainer_Bottom.y = 34;

    }

    private setHorizontalForTablet(): void {
        if(this.device === this.HORIZONTAL_TABLET) return; 

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.bg_Main.scale = 1.2;
        this.GamePlay.tab.y = 200;
        this.GamePlay.OptionContainer_Top.y = -32;
        this.GamePlay.OptionContainer_Bottom.y = 34;
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

        this.GamePlay.bg_Main.scale = 0.6;
        this.GamePlay.tab.y = 250;
        this.GamePlay.OptionContainer_Top.y = 18;
        this.GamePlay.OptionContainer_Bottom.y = -16;

    }

    private setMobile(): void {
        if(this.device === this.VERTICAL_MOBILE) return; 

        this.device = this.VERTICAL_MOBILE;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.bg_Main.scale = 0.5;
            this.GamePlay.tab.y = 250;
            this.GamePlay.OptionContainer_Top.y = 18;
            this.GamePlay.OptionContainer_Bottom.y = -16;
        } else {    
            // Ipad
            this.GamePlay.bg_Main.scale = 0.5;
            this.GamePlay.tab.y = 200;
            this.GamePlay.OptionContainer_Top.y = -32;
            this.GamePlay.OptionContainer_Bottom.y = 34;

        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
