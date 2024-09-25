

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    @property(cc.Node)
    backGround: cc.Node = null;
    @property(cc.Node)
    backGround_Top: cc.Node = null;
    @property(cc.Node)
    backGround_Bot: cc.Node = null;

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
        this.backGround_Bot.active = false;
        this.backGround_Top.active = false;

        this.backGround.scaleX = 0.4;
        this.backGround.scaleY = 0.72;
    }

    private setHorizontalForTablet(): void {
        this.backGround_Bot.active = false;
        this.backGround_Top.active = false;

        this.backGround.scaleX = 0.4;
        this.backGround.scaleY = 0.72;

        // let size = cc.view.getFrameSize().width / cc.view.getFrameSize().height;
        
        // // tablet applovin
        // if(size >= 1.6 && size <= 1.7) {

        // }

        // if(size < 1.4) {
        //     // Ipad

        // } else {
        //     // Normal

        // }

        // this.GamePlay.CTA.y = 0;
    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
      this.backGround_Bot.active = true;
      this.backGround_Top.active = true;

      this.backGround.scaleX = 0.2;
      this.backGround.scaleY = 0.72;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            // this.GamePlay.CTA.y = 0;

            this.backGround_Bot.active = true;
            this.backGround_Top.active = true;

            this.backGround.scaleX = 0.2;
            this.backGround.scaleY = 0.72;
        } else {    

            this.backGround_Bot.active = true;
            this.backGround_Top.active = true;

            this.backGround.scaleX = 0.2;
            this.backGround.scaleY = 0.72;
            // Ipad
            // this.GamePlay.CTA.y = 0;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
