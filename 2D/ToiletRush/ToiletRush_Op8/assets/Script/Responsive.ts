import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay;

    // state

    protected onLoad(): void {

    }

    protected start(): void {

    }

    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.GamePlay.isRotate = true;
            this.setHorizontal();
        } else {
            this.GamePlay.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
        //     // Iphone 6 / 6 plus / 7 / 7 Plus / X
        //     this.setHorizontalForIpX();
        // } else {
        //     this.setHorizontalForTablet();
        // }
    }

    // private setHorizontalForIpX(): void {

    // }

    // private setHorizontalForTablet(): void {

    // }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {

    }

    private setMobile(): void {

    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
