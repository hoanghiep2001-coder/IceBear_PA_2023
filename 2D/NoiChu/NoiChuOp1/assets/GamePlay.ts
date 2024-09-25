const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    textBottom: cc.Node = null;
    @property(cc.Node)
    textTop: cc.Node = null;
    @property(cc.Node)
    rectangle: cc.Node = null;

    @property(cc.Node)
    titleConatiner: cc.Node = null;
    @property(cc.Node)
    boxContainer: cc.Node = null;
    
    // array
    @property([cc.Node])
    gamePlayNodes: cc.Node[] = [];  

    // state 
    isTouched: boolean = false;
    isRotate : boolean = false;
    setTopHeight: number = 0;
    setBotHeight: number = 0;

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;   

    protected onLoad(): void {
        this.rectangle.active = false;
        this.hand.active = false;
        this.gamePlayNodes.forEach(node => {
            node.opacity = 0;
        });
    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);
        this.registerEvent();
        this.gamePlay.getComponent(cc.Animation).play("GameplayAnim");

        this.scheduleOnce(() => {
            this.hand.getComponent(cc.Animation).play("HandAnim");
            this.hand.active = true;
        }, 2.5);

        this.scheduleOnce(() => {
            this.schedule(() => {
                if(!this.isTouched) {
                    this.rectangle.active = true;
                    this.textTop.opacity = 255;
                    this.textTop.getComponent(cc.Animation).play("Show");
                }
            }, 1.5)
        }, 4.5);
    }

    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_END, () => {
            this.isTouched = true;
            this.gamePlay.getComponent(cc.Animation).stop();
            this.gamePlayNodes.forEach(node => {
                node.opacity = 255;
            });

            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
            console.log("Check");
        });
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
        // this.textTop.y =  50;
        // this.textBottom.y = -50;

        // this.hand.x = 140;

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
        //     this.setHorizontalForIpX();
        // } else {
        //     this.setHorizontalForTablet();
        // }
    }

    // private setHorizontalForIpX(): void {
    //     this.titleConatiner.x = -180;
    //     this.titleConatiner.y = 0;
    //     this.boxContainer.x = 180;
    //     this.boxContainer.y = 0;

    //     this.titleConatiner.scaleX = 1.3;
    //     this.titleConatiner.scaleY = 1.3;
    //     this.boxContainer.scaleX = 1.2;
    //     this.boxContainer.scaleY = 1.2;
    // }

    // private setHorizontalForTablet(): void {
    //     this.titleConatiner.x = -160;
    //     this.titleConatiner.y = 0;
    //     this.boxContainer.x = 160;
    //     this.boxContainer.y = 0;

    //     this.titleConatiner.scaleX = 1;
    //     this.titleConatiner.scaleY = 1;
    //     this.boxContainer.scaleX = 1;
    //     this.boxContainer.scaleY = 1;
    // }

    private setVertical(): void {
        this.titleConatiner.x = 0;
        this.titleConatiner.y = 0;
        this.titleConatiner.scaleX = 1;
        this.titleConatiner.scaleY = 1;
        this.boxContainer.x = 0;
        this.boxContainer.y = 0;
        this.boxContainer.scaleX = 1;
        this.boxContainer.scaleY = 1;

        this.hand.x = 120;
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.textTop.y =  240;
        this.textBottom.y = -215;
        this.gamePlay.scaleX = 0.8;
        this.gamePlay.scaleY = 0.8;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.textTop.x = 0;
            this.textTop.y = 225;
            this.textBottom.x = 0;
            this.textBottom.y = -200;
            this.gamePlay.scaleX = 0.9;
            this.gamePlay.scaleY = 0.9;
        } else { 
            this.textTop.x = 0;
            this.textTop.y = 210;
            this.textBottom.x = 0;
            this.textBottom.y = -185;
            this.gamePlay.scaleX = 1;
            this.gamePlay.scaleY = 1;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
