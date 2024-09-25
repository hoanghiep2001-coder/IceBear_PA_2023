
import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    isRotate: boolean = false;

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
        this.GamePlay.arena.scale = 0.5;
        this.GamePlay.text.scale = 0.6;
        this.GamePlay.StickManContainer.scale = 1;
        this.GamePlay.logo.scale = 0.6;
        this.GamePlay.continue_Btn.scale = 0.5;

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
        this.GamePlay.arena.scale = 0.35;
        this.GamePlay.text.scale = 0.4;
        this.GamePlay.StickManContainer.scale = 0.9;
        this.GamePlay.logo.scale = 0.5;
        this.GamePlay.continue_Btn.scale = 0.4;
    }

    private setMobile(): void {
        this.GamePlay.arena.scale = 0.4;
        this.GamePlay.text.scale = 0.5;
        this.GamePlay.StickManContainer.scale = 1;
        this.GamePlay.logo.scale = 0.6;
        this.GamePlay.continue_Btn.scale = 0.5;
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
