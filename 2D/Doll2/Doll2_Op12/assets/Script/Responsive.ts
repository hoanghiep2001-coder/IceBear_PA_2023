
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

        this.GamePlay.bg.scale = 1.4;

        this.GamePlay.DollBase.scale = 0.5;
        this.GamePlay.DollBase.y = 0;
        this.GamePlay.DollBase.x = -120;

        this.GamePlay.Options_Container.angle = 90;
        this.GamePlay.Options_Container.scale = 0.8;
        this.GamePlay.Options_Container.x = 120;
        this.GamePlay.Options_Container.y = 0;

        this.GamePlay.Items.forEach(item => item.angle = -90);

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
        this.GamePlay.bg.scale = 1;

        this.GamePlay.DollBase.scale = 0.48;
        this.GamePlay.DollBase.y = 0;
        this.GamePlay.DollBase.x = -120;

        this.GamePlay.Options_Container.angle = 90;
        this.GamePlay.Options_Container.scale = 0.8;
        this.GamePlay.Options_Container.x = 120;
        this.GamePlay.Options_Container.y = 0;

        this.GamePlay.Items.forEach(item => item.angle = -90);
    }

    private setHorizontalForOthers(): void {
        this.GamePlay.bg.scale = 1;

        this.GamePlay.DollBase.scale = 0.45;
        this.GamePlay.DollBase.y = 0;
        this.GamePlay.DollBase.x = -120;

        this.GamePlay.Options_Container.angle = 90;
        this.GamePlay.Options_Container.scale = 0.8;
        this.GamePlay.Options_Container.x = 120;
        this.GamePlay.Options_Container.y = 0;

        this.GamePlay.Items.forEach(item => item.angle = -90);
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

        this.GamePlay.bg.scale = 1;

        this.GamePlay.DollBase.scale = 0.5;
        this.GamePlay.DollBase.x = 0;
        this.GamePlay.DollBase.y = 70;

        this.GamePlay.Options_Container.angle = 0;
        this.GamePlay.Options_Container.scale = 0.8;
        this.GamePlay.Options_Container.x = 0;
        this.GamePlay.Options_Container.y = -240;

        this.GamePlay.Items.forEach(item => item.angle = 0);

    }

    private setMobile(): void {
        if (this.device === this.VERTICAL_MOBILE) return;

        this.device = this.VERTICAL_MOBILE;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.bg.scale = 1;

            this.GamePlay.DollBase.scale = 0.45;
            this.GamePlay.DollBase.x = 0;
            this.GamePlay.DollBase.y = 60;
    
            this.GamePlay.Options_Container.angle = 0;
            this.GamePlay.Options_Container.scale = 0.8;
            this.GamePlay.Options_Container.x = 0;
            this.GamePlay.Options_Container.y = -200;
    
            this.GamePlay.Items.forEach(item => item.angle = 0);
        } else {
            // Ipad
            this.GamePlay.bg.scale = 1;

            this.GamePlay.DollBase.scale = 0.35;
            this.GamePlay.DollBase.x = 0;
            this.GamePlay.DollBase.y = 60;
    
            this.GamePlay.Options_Container.angle = 0;
            this.GamePlay.Options_Container.scale = 0.8;
            this.GamePlay.Options_Container.x = 0;
            this.GamePlay.Options_Container.y = -150;
    
            this.GamePlay.Items.forEach(item => item.angle = 0);
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
