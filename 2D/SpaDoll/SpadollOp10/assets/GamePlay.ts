const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    doll: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    hand_2: cc.Node = null;

    @property(cc.Node)
    clockContainer: cc.Node = null;
    @property(cc.Node)
    timeline: cc.Node = null;
    @property(cc.Node)
    clock: cc.Node = null;

    @property(cc.Node)
    text: cc.Node = null;

    // array
    @property([cc.Node])
    options: cc.Node[] = [];

    // state 
    isTouched: boolean = false;
    canTouch: boolean = true;
    isRotate : boolean = false;
    isInstall: boolean = false;
    isRing: boolean = false;
    countingTime: number = 1;
    currentY: number = 0;
    isPlay: boolean = false;
    canPlay: boolean = false;

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;   
    @property(cc.AudioClip)
    tapSound: cc.AudioClip = null;  
    @property(cc.AudioClip)
    rengSound: cc.AudioClip = null;  

    protected onLoad(): void {
        this.hand_2.active = false;
    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);
        this.hand.getComponent(cc.Animation).play("HandAnim");
        this.gamePlay.getComponent(cc.Animation).play("GameplayAnim");

        this.scheduleOnce(() => {
            this.canPlay = true;
        }, 2.5)
        
        this.registerEvent();
    }   

    private registerEvent(): void {
        // ironsource
        this.background.on(cc.Node.EventType.TOUCH_END, () => {
            if(this.isPlay) {
                return;
            }
            this.isPlay = true;
            cc.audioEngine.play(this.bgSound, true, 1);
        });

        this.options.forEach(option => {
            option.on(cc.Node.EventType.TOUCH_END, () => {
                if(!this.canPlay) {
                    return;
                }

                cc.audioEngine.play(this.tapSound, false, 1);
                this.isTouched = true;
                if(option.name === "item_box_1") {
                    this.options[1].active = false;
                    this.hand_2.active = true;
                    this.hand_2.getComponent(cc.Animation).play("HandAnim");
                    let randomX = Math.floor(Math.random() * (161)) - 80;
                    let randomY = Math.floor(Math.random() * (40)) - 200;

                    if(this.currentY - randomY < 100) {
                        randomY = this.currentY + 80;
                    }

                    this.currentY = randomY;

                    this.options[0].setPosition(randomX, randomY);

                    console.log(randomX, randomY);
                } else {
                    this.options[0].active = false;
                    let randomX = Math.floor(Math.random() * (161)) - 80;
                    let randomY = Math.floor(Math.random() * (40)) - 200;

                    if(this.currentY - randomY < 100) {
                        randomY = this.currentY + 80;
                    }

                    this.currentY = randomY;

                    this.options[1].setPosition(randomX, randomY);

                    console.log(randomX, randomY);
                    
                }
            });
        })
    }

    private handleCountingTime(): void {
        if (!this.canTouch) {
            return;
        }

        if(this.countingTime < 0) {
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
            this.canTouch = false;
            console.log("install");
        }

        if(this.countingTime < 0.5 && !this.isRing) {
            this.clock.getComponent(cc.Animation).play("RengReng");
            cc.audioEngine.play(this.rengSound, false, 1)
            this.isRing = true;
        }

        if(this.isTouched) {
            this.countingTime -= 0.0016;

            this.timeline.scaleX = this.countingTime;
        }
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
        this.text.scaleX = 0.6;
        this.text.scaleY = 0.6;
        this.clockContainer.scaleX = 0.25;
        this.clockContainer.scaleY = 0.25;

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
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.text.scaleX = 0.35;
        this.text.scaleY = 0.35;
        this.clockContainer.scaleX = 0.16;
        this.clockContainer.scaleY = 0.16;
    }

    private setMobile(): void {
        this.text.scaleX = 0.5;
        this.text.scaleY = 0.5;
        this.clockContainer.scaleX = 0.2;
        this.clockContainer.scaleY = 0.2;

    }

    protected update(dt: number): void {
        this.handleRotate();
        this.handleCountingTime();
    }
}
