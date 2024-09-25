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
    textConatiner: cc.Node = null;
    @property(cc.Node)
    topText: cc.Node = null;
    @property(cc.Node)
    sentenseContainer: cc.Node = null;
    @property(cc.Node)
    typingText: cc.Node = null;

    // step 2 Nodes
    @property(cc.Node)
    box_TinhThuong: cc.Node = null;
    @property(cc.Node)
    box_TamThanCoHan: cc.Node = null;
    @property(cc.Node)
    box_TinhBan: cc.Node = null;
    @property(cc.Node)
    box_BanDungNghienNua: cc.Node = null;

    // array
    @property([cc.Node])
    openingBoxes: cc.Node[] = [];
    @property([cc.Node])
    bottomTexts: cc.Node[] = [];
    @property([cc.Node])
    sentences: cc.Node[] = [];
    @property([cc.Node])
    memes: cc.Node[] = [];
    @property([cc.Node])
    box_ToStore: cc.Node[] = [];

    // choose option    
    @property([cc.Node])
    chooseOptions: cc.Node[] = [];
    @property([cc.Node])
    ChooseOptionsToInstall: cc.Node[] = [];
    // state 
    isTouched: boolean = false;
    canTouch: boolean = false;
    isRotate : boolean = false;
    setTopHeight: number = 0;
    setBotHeight: number = 0;
    isInstall: boolean = false;
    isPlay:boolean = false;

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;   
    @property(cc.AudioClip)
    answerSound: cc.AudioClip = null;  
    @property(cc.AudioClip)
    wrongSound: cc.AudioClip = null;  

    protected onLoad(): void {
        this.bottomTexts.forEach(box => {
            box.active = false;
        });
        this.sentences.forEach(sentence => {
            sentence.active = false;
        });
        this.hand.active = false;
        this.topText.active = false;
        this.typingText.active = false;
        this.box_TinhThuong.active = false;
        this.box_TamThanCoHan.active = false;
        this.box_TinhBan.active = false;
        this.box_BanDungNghienNua.active = false;
        this.memes.forEach(meme => {
            meme.active = false;
        });
        this.box_ToStore.forEach(box => {
            box.active = false;
        });
    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);
        this.gamePlay.getComponent(cc.Animation).play("GameplayAnim");

        this.scheduleOnce(() => {
                this.hand.active = true;
                this.hand.getComponent(cc.Animation).play("HandAnim");
                this.registerEvent();
                this.canTouch = true;
        }, 3);

        this.scheduleOnce(() => {
            this.schedule(() => {
                if(!this.isTouched) {
                    this.topText.active = true; 
                    this.topText.getComponent(cc.Animation).play("Show");
                }
            }, 1.5);
        }, 3);
    }

    private registerEvent(): void {     
        // ironsource
        this.background.on(cc.Node.EventType.TOUCH_END, () => {
            if(this.isPlay) return;

            cc.audioEngine.play(this.bgSound, true, 1);
            this.isPlay = true;
        });

        this.chooseOptions.forEach(option => {
            option.on(cc.Node.EventType.TOUCH_END, () => {

                if(!this.canTouch) {
                        return;
                }

                this.isInstall = true;

                if(option.name === "button_Thuong") {
                    this.isTouched = true;
                    cc.audioEngine.play(this.answerSound, false, 1);
                    this.typingText.active = true;
                    this.sentences[2].active = false;
                    this.sentences[4].active = true;
                    this.gamePlay.getComponent(cc.Animation).play("GameplayAnim2");
                    this.handleRunStep2(1);
                } else {
                    this.isTouched = true;
                    cc.audioEngine.play(this.answerSound, false, 1);
                    this.typingText.active = true;
                    this.sentences[2].active = false;
                    this.sentences[3].active = true;
                    this.gamePlay.getComponent(cc.Animation).play("GameplayAnim3");
                    this.handleRunStep2(2);
                }
            });
        });

        this.ChooseOptionsToInstall.forEach(option => {
            option.on(cc.Node.EventType.TOUCH_END, () => {
                // others
                if(this.isInstall) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                    return;
                }
            });
        });
    }

    private handleRunStep2(option: number):void {
        this.hand.active = false;
        this.bottomTexts[0].active = false;
        this.chooseOptions.forEach(option => {
            option.active = false;
        });

        this.scheduleOnce(() => {
            cc.audioEngine.play(this.wrongSound, false, 1)
            option ? this.memes[option - 1].active = true : this.memes[option - 1].active = true;
        }, 3.5);

        this.scheduleOnce(() => {
            this.sentences[3].active = false;
            this.sentences[4].active = false;
            this.isTouched = false;

            if(option == 1) {
                this.gamePlay.getComponent(cc.Animation).play("GameplayAnim4") ;
                this.sentences[0].active = false;
                this.sentences[2].active = false;
                
                this.scheduleOnce(() => {
                    this.hand.active = true;
                }, 1.5);

                // mtg & applovin
                // this.background.on(cc.Node.EventType.TOUCH_END, () => {
                //     if(this.isInstall) {
                //         return;
                //     } 

                //     this.isTouched = true;
                //     console.log("install");
                //     this.isInstall = true;
                //     cc.audioEngine.stopAll();
                //     this.node.getComponent("GameController").installHandle();
                // });
            } else {
                this.gamePlay.getComponent(cc.Animation).play("GameplayAnim5");

                this.sentences[1].active = false;
                this.sentences[2].active = false;
                
                this.scheduleOnce(() => {
                    this.hand.active = true;
                }, 1.5);

                // mtg & applovin
                // this.background.on(cc.Node.EventType.TOUCH_END, () => {
                //     if(this.isInstall) {
                //         return;
                //     } 

                //     this.isTouched = true;
                //     console.log("install");
                //     this.isInstall = true;
                //     cc.audioEngine.stopAll();
                //     this.node.getComponent("GameController").installHandle();
                // });
            }
        }, 5);
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
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.gamePlay.scaleX = 0.75;
        this.gamePlay.scaleY = 0.75;
        this.topText.y = 235;
        this.bottomTexts.forEach(text => {
            text.y = -220
        });
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.gamePlay.scaleX = 0.95;
            this.gamePlay.scaleY = 0.95;
            this.topText.y = 205;
            this.bottomTexts.forEach(text => {
                text.y = -200;
            });
        } else { 
            this.gamePlay.scaleX = 1;
            this.gamePlay.scaleY = 1;
            this.topText.y = 205;
            this.bottomTexts.forEach(text => {
                text.y = -200;
            });
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
