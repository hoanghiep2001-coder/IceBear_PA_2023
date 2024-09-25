
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;

    // node
    @property(cc.Node)
    monster1: cc.Node = null;
    @property(cc.Node)
    monster2: cc.Node = null;
    @property(cc.Node)
    monster3: cc.Node = null;
    @property(cc.Node)
    hint_Dream: cc.Node = null;
    @property(cc.Node)
    shelf: cc.Node = null;

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

        this.GamePlay.Bg_Horizontal.active = true;
        this.GamePlay.Bg_Vertical.active = false;

        this.GamePlay.point.scale = 0.5;
        // this.GamePlay.point.x = 90;
        // this.GamePlay.point.y = 69;

        this.monster1.x = -99;
        this.monster1.y = -226;
        this.monster1.scaleX = -0.3;
        this.monster1.scaleY = 0.3;

        this.monster2.x = -67;
        this.monster2.y = -175;
        this.monster2.scaleX = -0.3;
        this.monster2.scaleY = 0.3;

        this.monster3.x = 86;
        this.monster3.y = -239;
        this.monster3.scaleX = 0.4;
        this.monster3.scaleY = 0.4;

        this.shelf.y = -70;
        this.shelf.scale = 0.6;

        this.hint_Dream.y = 404;
        this.hint_Dream.scale = 1;

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX(); 
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        // this.GamePlay.Bg2.scale = 0.65;
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

        // this.GamePlay.Bg2.scale = 0.65;
    }

    private setVertical(): void {
        this.GamePlay.Bg_Horizontal.active = false;
        this.GamePlay.Bg_Vertical.active = true;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {

        this.GamePlay.point.scale = 0.4;
        // this.GamePlay.point.x = 90;
        // this.GamePlay.point.y = 69;

        this.monster1.x = -79;
        this.monster1.y = -226;
        this.monster1.scaleX = -0.2;
        this.monster1.scaleY = 0.2;

        this.monster2.x = -47;
        this.monster2.y = -175;
        this.monster2.scaleX = -0.2;
        this.monster2.scaleY = 0.2;

        this.monster3.x = 66;
        this.monster3.y = -239;
        this.monster3.scaleX = 0.3;
        this.monster3.scaleY = 0.3;

        this.shelf.y = -70;
        this.shelf.scale = 0.6;

        this.hint_Dream.y = 404;
        this.hint_Dream.scale = 0.8;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.point.scale = 0.4;
            // this.GamePlay.point.x = 110;
            // this.GamePlay.point.y = 69;

            this.monster1.x = -99;
            this.monster1.y = -226;
            this.monster1.scaleX = -0.2;
            this.monster1.scaleY = 0.2;

            this.monster2.x = -37;
            this.monster2.y = -175;
            this.monster2.scaleX = -0.2;
            this.monster2.scaleY = 0.2;

            this.monster3.x = 76;
            this.monster3.y = -239;
            this.monster3.scaleX = 0.3;
            this.monster3.scaleY = 0.3;

            this.shelf.y = -70;
            this.shelf.scale = 0.6;

            this.hint_Dream.y = 404;
            this.hint_Dream.scale = 0.8;
        } else {    
            // Ipad
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
