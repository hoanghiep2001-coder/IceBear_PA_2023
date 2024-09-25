import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass("Responsive")
export default class Responsive extends cc.Component {

    isRotate: boolean = false;

    @property(GamePlay)
    GamePlay: GamePlay;

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

    }

    private setHorizontalForTablet(): void {

    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.GamePlay.logo.y = 230;
        this.GamePlay.itemBar.y = -230;
    }

    private setMobile(): void {
        this.GamePlay.logo.y = 200;
        this.GamePlay.itemBar.y = -166;
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
