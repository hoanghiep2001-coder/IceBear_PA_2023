
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
        this.GamePlay.node.y = 40;
        this.GamePlay.node.scale = 1.15;
    }

    private setHorizontalForTablet(): void {
        // let size = cc.view.getFrameSize().width / cc.view.getFrameSize().height;
        
        // // tablet applovin
        // if(size >= 1.6 && size <= 1.7) {

        // }

        // if(size < 1.4) {
        //     // Ipad

        // } else {
        //     // Normal

        // }

        this.GamePlay.node.y = 40;
        this.GamePlay.node.scale = 1.15;
    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.GamePlay.node.y = 100;
        this.GamePlay.node.scale = 1.1;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.node.y = 40;
            this.GamePlay.node.scale = 1.15;
        } else {    
            // Ipad
            this.GamePlay.node.y = 40;
            this.GamePlay.node.scale = 1.1;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
