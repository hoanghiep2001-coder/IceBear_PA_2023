
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

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

        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        if (this.device === this.HORIZONTAL_IPX) return;

        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.dollBase.scale = 0.45;
        this.GamePlay.dollBase.x = -120;
        this.GamePlay.dollBase.y = 0;

        this.GamePlay.options_Container.scale = 0.8;
        this.GamePlay.options_Container.x = 120;
        this.GamePlay.options_Container.y = 70;

        this.GamePlay.Option_1.x = 0;
        this.GamePlay.Option_1.y = 50;
        this.GamePlay.Option_2.x = 0;
        this.GamePlay.Option_2.y = -100;
        this.GamePlay.Option_3.x = 0;
        this.GamePlay.Option_3.y = -250;

        this.GamePlay.Hint_Hand_1.x = 120;
        this.GamePlay.Hint_Hand_1.y = -20;
        this.GamePlay.Hint_Hand_1.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_3.x = 120;
        this.GamePlay.Hint_Hand_3.y = -20;
        this.GamePlay.Hint_Hand_3.angle = 90;
    }

    private setHorizontalForTablet(): void {
        if (this.device === this.HORIZONTAL_TABLET) return;

        this.device = this.HORIZONTAL_TABLET;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 1.4) {
            // Ipad
            this.setHorizontalForIpad();
        } else {
            // others
            this.setHorizontalForOthers();
        }
    }

    private setHorizontalForIpad(): void {
        this.GamePlay.dollBase.scale = 0.45;
        this.GamePlay.dollBase.x = -120;
        this.GamePlay.dollBase.y = 0;

        this.GamePlay.options_Container.scale = 0.8;
        this.GamePlay.options_Container.x = 120;
        this.GamePlay.options_Container.y = 70;

        this.GamePlay.Option_1.x = 0;
        this.GamePlay.Option_1.y = 50;
        this.GamePlay.Option_2.x = 0;
        this.GamePlay.Option_2.y = -100;
        this.GamePlay.Option_3.x = 0;
        this.GamePlay.Option_3.y = -250;

        this.GamePlay.Hint_Hand_1.x = 120;
        this.GamePlay.Hint_Hand_1.y = -20;
        this.GamePlay.Hint_Hand_1.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_3.x = 120;
        this.GamePlay.Hint_Hand_3.y = -20;
        this.GamePlay.Hint_Hand_3.angle = 90;
    }

    private setHorizontalForOthers(): void {
        this.GamePlay.dollBase.scale = 0.45;
        this.GamePlay.dollBase.x = -120;
        this.GamePlay.dollBase.y = 0;

        this.GamePlay.options_Container.scale = 0.8;
        this.GamePlay.options_Container.x = 120;
        this.GamePlay.options_Container.y = 70;

        this.GamePlay.Option_1.x = 0;
        this.GamePlay.Option_1.y = 50;
        this.GamePlay.Option_2.x = 0;
        this.GamePlay.Option_2.y = -100;
        this.GamePlay.Option_3.x = 0;
        this.GamePlay.Option_3.y = -250;

        this.GamePlay.Hint_Hand_1.x = 120;
        this.GamePlay.Hint_Hand_1.y = -20;
        this.GamePlay.Hint_Hand_1.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_2.x = 120;
        this.GamePlay.Hint_Hand_2.y = -20;
        this.GamePlay.Hint_Hand_2.angle = 90;

        this.GamePlay.Hint_Hand_3.x = 120;
        this.GamePlay.Hint_Hand_3.y = -20;
        this.GamePlay.Hint_Hand_3.angle = 90;
    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if (this.device === this.VERTICAL_IPX) return;

        this.device = this.VERTICAL_IPX;

        this.GamePlay.dollBase.scale = 0.5;
        this.GamePlay.dollBase.x = 0;
        this.GamePlay.dollBase.y = 45.5;

        this.GamePlay.options_Container.scale = 0.7;
        this.GamePlay.options_Container.x = 0;
        this.GamePlay.options_Container.y = -254.5;

        this.GamePlay.Option_1.x = -140;
        this.GamePlay.Option_1.y = 0;

        this.GamePlay.Option_2.x = 0;
        this.GamePlay.Option_2.y = 0;

        this.GamePlay.Option_3.x = 140;
        this.GamePlay.Option_3.y = 0;

        this.GamePlay.Hint_Hand_1.x = -10;
        this.GamePlay.Hint_Hand_1.y = -110;
        this.GamePlay.Hint_Hand_1.angle = 0;

        this.GamePlay.Hint_Hand_2.x = -10;
        this.GamePlay.Hint_Hand_2.y = -110;
        this.GamePlay.Hint_Hand_2.angle = 0;

        this.GamePlay.Hint_Hand_2.x = -10;
        this.GamePlay.Hint_Hand_2.y = -110;
        this.GamePlay.Hint_Hand_2.angle = 0;

        this.GamePlay.Hint_Hand_3.x = -10;
        this.GamePlay.Hint_Hand_3.y = -110;
        this.GamePlay.Hint_Hand_3.angle = 0;
    }

    private setMobile(): void {
        if (this.device === this.VERTICAL_MOBILE) return;

        this.device = this.VERTICAL_MOBILE;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.dollBase.scale = 0.4;
            this.GamePlay.dollBase.x = 0;
            this.GamePlay.dollBase.y = 52;

            this.GamePlay.options_Container.scale = 0.65;
            this.GamePlay.options_Container.x = 0;
            this.GamePlay.options_Container.y = -200;

            this.GamePlay.Option_1.x = -140;
            this.GamePlay.Option_1.y = 0;

            this.GamePlay.Option_2.x = 0;
            this.GamePlay.Option_2.y = 0;

            this.GamePlay.Option_3.x = 140;
            this.GamePlay.Option_3.y = 0;

            this.GamePlay.Hint_Hand_1.x = -10;
            this.GamePlay.Hint_Hand_1.y = -110;
            this.GamePlay.Hint_Hand_1.angle = 0;
    
            this.GamePlay.Hint_Hand_2.x = -10;
            this.GamePlay.Hint_Hand_2.y = -110;
            this.GamePlay.Hint_Hand_2.angle = 0;
    
            this.GamePlay.Hint_Hand_2.x = -10;
            this.GamePlay.Hint_Hand_2.y = -110;
            this.GamePlay.Hint_Hand_2.angle = 0;
    
            this.GamePlay.Hint_Hand_3.x = -10;
            this.GamePlay.Hint_Hand_3.y = -110;
            this.GamePlay.Hint_Hand_3.angle = 0;
        } else {
            // Ipad
            this.GamePlay.dollBase.scale = 0.35;
            this.GamePlay.dollBase.x = 0;
            this.GamePlay.dollBase.y = 52;

            this.GamePlay.options_Container.scale = 0.5;
            this.GamePlay.options_Container.x = 0;
            this.GamePlay.options_Container.y = -180;

            this.GamePlay.Option_1.x = -140;
            this.GamePlay.Option_1.y = 0;

            this.GamePlay.Option_2.x = 0;
            this.GamePlay.Option_2.y = 0;

            this.GamePlay.Option_3.x = 140;
            this.GamePlay.Option_3.y = 0;

            this.GamePlay.Hint_Hand_1.x = -10;
            this.GamePlay.Hint_Hand_1.y = -110;
            this.GamePlay.Hint_Hand_1.angle = 0;
    
            this.GamePlay.Hint_Hand_2.x = -10;
            this.GamePlay.Hint_Hand_2.y = -110;
            this.GamePlay.Hint_Hand_2.angle = 0;
    
            this.GamePlay.Hint_Hand_2.x = -10;
            this.GamePlay.Hint_Hand_2.y = -110;
            this.GamePlay.Hint_Hand_2.angle = 0;
    
            this.GamePlay.Hint_Hand_3.x = -10;
            this.GamePlay.Hint_Hand_3.y = -110;
            this.GamePlay.Hint_Hand_3.angle = 0;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
