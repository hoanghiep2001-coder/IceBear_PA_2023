

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    IntroContainer: cc.Node = null;
    // state
    isIPX: boolean = false;
    isRotate: boolean = false;

    protected start(): void {
        this.handleRotate();
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
            this.background.scale = 0.35;
            this.isIPX = true;
        } else {
            this.setHorizontalForTablet();
            this.background.scale = 0.3;
            this.isIPX = false;
        }
    }

    private setHorizontalForIpX(): void {
        this.IntroContainer.scale = 1;
    }

    private setHorizontalForTablet(): void {
        this.IntroContainer.scale = 1;
    }

    private setVertical(): void {
        this.background.scale = 0.3;
        this.isIPX = false;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
         
        }
    }

    private setIphoneX(): void {
        this.IntroContainer.scale = 0.9;
    }

    private setMobile(): void {
        this.IntroContainer.scale = 1;
    }

    protected update(dt: number): void {
        // this.handleRotate();
    }
}
