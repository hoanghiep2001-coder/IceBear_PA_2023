
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;

    // state
    isRotate: boolean = false;

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
        this.GamePlay.logo.active = true;

        this.GamePlay.CTA.y = 180;
        this.GamePlay.UI.scale = 1.2;
        this.GamePlay.CTA.x = 300;
    }

    private setHorizontalForTablet(): void {
        this.GamePlay.logo.active = false;

        this.GamePlay.UI.scale = 1.2;
        this.GamePlay.CTA.y = 0;
        this.GamePlay.CTA.x = 0;
    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.GamePlay.logo.active = false;

        this.GamePlay.CTA.x = 0;
        this.GamePlay.CTA.y = -100;
        this.GamePlay.UI.scale = 1;
    }

    private setMobile(): void {
        this.GamePlay.logo.active = false;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.CTA.y = 0;
            this.GamePlay.CTA.x = 0;
            this.GamePlay.UI.scale = 1;
        } else {    
            // Ipad
            this.GamePlay.CTA.y = 0;
            this.GamePlay.CTA.x = 0;
            this.GamePlay.UI.scale = 1;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
