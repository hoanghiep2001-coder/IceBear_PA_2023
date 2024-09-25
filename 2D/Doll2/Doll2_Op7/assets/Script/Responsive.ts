
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

        this.GamePlay.bg_Main.scale = 0.4;

        this.GamePlay.doll.y = -10;
        this.GamePlay.doll.x = -220;
        this.GamePlay.doll.scale = 0.4;

        this.GamePlay.text.y = 120;
        this.GamePlay.text.x = 200;
        this.GamePlay.text.scale = 0.45;

        this.GamePlay.option_container.x = 200;
        this.GamePlay.option_container.y = -250;
        this.GamePlay.option_container.scale = 1.5;

        this.GamePlay.bg_Room1.scale = 0.45;
        this.GamePlay.bg_Room1.y = -80;

        this.GamePlay.bg_Room2.scale = 0.45;
        this.GamePlay.bg_Room2.y = -80;

    }

    private setHorizontalForTablet(): void {
        if(this.device === this.HORIZONTAL_TABLET) return;

        this.device = this.HORIZONTAL_TABLET;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 1.4) {
            // Ipad
            this.setHorizontalForIpad();
        } else {
            // others
            this.setHorizontalForOthers();
        }
    }

    private setHorizontalForIpad(): void {
        this.GamePlay.bg_Main.scale = 0.36;

        this.GamePlay.doll.y = -20;
        this.GamePlay.doll.x = -180;
        this.GamePlay.doll.scale = 0.32;

        this.GamePlay.text.y = 120;
        this.GamePlay.text.x = 100;
        this.GamePlay.text.scale = 0.4;

        this.GamePlay.option_container.x = 100;
        this.GamePlay.option_container.y = -200;
        this.GamePlay.option_container.scale = 1;

        this.GamePlay.bg_Room1.scale = 0.45;
        this.GamePlay.bg_Room1.y = -80;
        
        this.GamePlay.bg_Room2.scale = 0.45;
        this.GamePlay.bg_Room2.y = -80;
    }

    private setHorizontalForOthers(): void {
        this.GamePlay.bg_Main.scale = 0.36;

        this.GamePlay.doll.y = -70;
        this.GamePlay.doll.x = -220;
        this.GamePlay.doll.scale = 0.3;

        this.GamePlay.text.y = 120;
        this.GamePlay.text.x = 200;
        this.GamePlay.text.scale = 0.45;

        this.GamePlay.option_container.x = 200;
        this.GamePlay.option_container.y = -200;
        this.GamePlay.option_container.scale = 1.3;

        this.GamePlay.bg_Room1.scale = 0.5;
        this.GamePlay.bg_Room1.y = -80;
        
        this.GamePlay.bg_Room2.scale = 0.5;
        this.GamePlay.bg_Room2.y = -80;
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

        this.GamePlay.bg_Main.scale = 0.36;

        this.GamePlay.doll.y = -130;
        this.GamePlay.doll.x = 0;
        this.GamePlay.doll.scale = 0.35;

        this.GamePlay.text.y = 250;
        this.GamePlay.text.x = 0;
        this.GamePlay.text.scale = 0.3;

        this.GamePlay.option_container.x = 0;
        this.GamePlay.option_container.y = 0;
        this.GamePlay.option_container.scale = 1;

        this.GamePlay.bg_Room1.scale = 0.38;
        this.GamePlay.bg_Room1.y = 0;
        
        this.GamePlay.bg_Room2.scale = 0.38;
        this.GamePlay.bg_Room2.y = 0;

    }

    private setMobile(): void {
        if(this.device === this.VERTICAL_MOBILE) return;

        this.device = this.VERTICAL_MOBILE;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus

            this.GamePlay.bg_Main.scale = 0.3;

            this.GamePlay.doll.y = -100;
            this.GamePlay.doll.x = 0;
            this.GamePlay.doll.scale = 0.3;
    
            this.GamePlay.text.y = 250;
            this.GamePlay.text.x = 0;
            this.GamePlay.text.scale = 0.3;

            this.GamePlay.option_container.x = 0;
            this.GamePlay.option_container.y = 0;
            this.GamePlay.option_container.scale = 1;

            this.GamePlay.bg_Room1.scale = 0.38;
            this.GamePlay.bg_Room1.y = 0;
            
            this.GamePlay.bg_Room2.scale = 0.38;
            this.GamePlay.bg_Room2.y = 0;
        } else {    
            // Ipad
            this.GamePlay.bg_Main.scale = 0.3;

            this.GamePlay.doll.y = -100;
            this.GamePlay.doll.x = 0;
            this.GamePlay.doll.scale = 0.25;
    
            this.GamePlay.text.y = 220;
            this.GamePlay.text.x = 0;
            this.GamePlay.text.scale = 0.3;

            this.GamePlay.option_container.x = 0;
            this.GamePlay.option_container.y = -20;
            this.GamePlay.option_container.scale = 0.9;

            this.GamePlay.bg_Room1.scale = 0.38;
            this.GamePlay.bg_Room1.y = 0;
            
            this.GamePlay.bg_Room2.scale = 0.38;
            this.GamePlay.bg_Room2.y = 0;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
