
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
        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.bg_wedding.scale = 2.1;
        this.GamePlay.bg_house.scale = 0.7;

        this.GamePlay.text.y = 220;
        this.GamePlay.Button_Container.y = 100;
        this.GamePlay.baby.y = -120;
    }

    private setHorizontalForTablet(): void {
        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.bg_wedding.scale = 1.8;
        this.GamePlay.bg_house.scale = 0.7;

        this.GamePlay.text.y = 220;
        this.GamePlay.Button_Container.y = 100;
        this.GamePlay.baby.y = -120;
    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.device = this.VERTICAL_IPX;

        this.GamePlay.bg_wedding.scale = 0.6;
        this.GamePlay.bg_house.scale = 0.7;

        this.GamePlay.text.y = 250;
        this.GamePlay.Button_Container.y = 0;
        this.GamePlay.baby.y = -160;

    }

    private setMobile(): void {
        this.device = this.VERTICAL_MOBILE;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.bg_wedding.scale = 0.7;
            this.GamePlay.bg_house.scale = 0.6;
    
            this.GamePlay.text.y = 250;
            this.GamePlay.Button_Container.y = 0;
            this.GamePlay.baby.y = -160;
        } else {    
            // Ipad
            this.GamePlay.bg_wedding.scale = 0.7;
            this.GamePlay.bg_house.scale = 0.6;
    
            this.GamePlay.text.y = 220;
            this.GamePlay.Button_Container.y = 100;
            this.GamePlay.baby.y = -120;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
