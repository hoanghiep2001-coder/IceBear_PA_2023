const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    characterHairDefault: cc.Node = null;
    @property(cc.Node)
    characterDressDefault: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;

    @property(cc.ParticleSystem)
    Effect_Heart: cc.ParticleSystem = null;
    @property([cc.ParticleSystem])
    Effect_Blinks: cc.ParticleSystem[] = [];

    // array
    @property([cc.Node])
    options: cc.Node[] = [];
    @property([cc.Node])
    characterDresses: cc.Node[] = [];
    @property([cc.Node])
    characterHairs: cc.Node[] = [];
    @property([cc.Node])
    characterBackHairs: cc.Node[] = [];

    @property([cc.Node])
    options_Dress: cc.Node[] = [];
    @property([cc.Node])
    options_Glasses: cc.Node[] = [];
    @property([cc.Node])
    options_Hairs: cc.Node[] = [];

    @property([cc.Node])
    decors: cc.Node[] = [];

    // state 
    isTouched: boolean = false;
    canTouch: boolean = true;
    isRotate : boolean = false;
    isInstall: boolean = false;
    isPlay: boolean = false;
    isDoneStep1: boolean = false;
    isDoneStep2: boolean = false;

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;   
    @property(cc.AudioClip)
    tapSound: cc.AudioClip = null;  
    @property(cc.AudioClip)
    rengSound: cc.AudioClip = null;  

    protected onLoad(): void {
            this.hand.active = false;
            this.options_Hairs.forEach(hair => {
                hair.active = false;
            });
            this.options_Glasses.forEach(glass => {
                glass.active = false;
            });
            this.Effect_Blinks.forEach(effect => effect.resetSystem());
    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);

        this.gamePlay.getComponent(cc.Animation).play("GamePlayAnim");
        this.scheduleOnce(() => {
            this.hand.active = true;
            this.registerEvent();
        }, 2.4)

        this.hand.getComponent(cc.Animation).play("HandAnim");

                // ironsource
                this.background.on(cc.Node.EventType.TOUCH_END, () => {
                    if ( this.isPlay )  return;
        
                    this.isPlay = true;
        
                    cc.audioEngine.play(this.bgSound, true, 1);
                });
    }

    private registerEvent(): void {
        this.options.forEach(option => {
            option.on(cc.Node.EventType.TOUCH_END, () => {
                if(option.name === "item_box_1") {
                    if( this.isDoneStep2 ) {
                        console.log("install");
                        cc.audioEngine.stopAll();
                        this.node.getComponent("GameController").installHandle();
                        this.isInstall = true;
                        return;
                    };

                    if( !this.canTouch ) return;

                    this.Effect_Heart.resetSystem();

                    if( this.isDoneStep1 ) {
                        this.HandleSecondStep();
                        this.hand.active = false;
                        this.characterHairs[0].active = true;
                        this.characterBackHairs[1].active = true;
                        this.characterHairDefault.active = false;
                        this.isDoneStep2 = true;
                        cc.audioEngine.play(this.tapSound, false, 1);
                        return;
                    };

                    cc.audioEngine.play(this.tapSound, false, 1);
                    this.canTouch = false;
                    this.isTouched = true;
                    this.hand.active = false;
                    this.characterDresses[0].active = true;
                    this.characterDressDefault.active = false;
                    this.HandleFirstStep();
                    this.isDoneStep1 = true;
                } else {
                    //
                    if( this.isDoneStep2 ) {
                        console.log("install");
                        cc.audioEngine.stopAll();
                        this.node.getComponent("GameController").installHandle();
                        this.isInstall = true;
                        return;
                    };

                    if( !this.canTouch ) return;

                    this.Effect_Heart.resetSystem();
                    this.canTouch = false;

                    if( this.isDoneStep1 ) {
                        this.HandleSecondStep();
                        this.hand.active = false;
                        this.characterHairs[1].active = true;
                        this.characterBackHairs[0].active = true;
                        this.characterHairDefault.active = false;
                        this.isDoneStep2 = true;
                        cc.audioEngine.play(this.tapSound, false, 1);
                        return;
                    };

                    cc.audioEngine.play(this.tapSound, false, 1);
                    this.isTouched = true;
                    this.hand.active = false;
                    this.characterDresses[1].active = true;
                    this.characterDressDefault.active = false;
                    this.HandleFirstStep();
                    this.isDoneStep1 = true;
                }
            });
        });
    }

    private HandleFirstStep(): void {
        this.gamePlay.getComponent(cc.Animation).play("GamePlayAnim2");

          this.scheduleOnce(() => {
            this.options_Dress.forEach(item => {
                item.active = false;
            });
            this.options_Hairs.forEach(item => {
                item.active = true;
            });
        }, 1);

        this.scheduleOnce(() => {
            this.hand.active = true;
            this.isTouched = true;
            this.canTouch = true;
        }, 2)
    }

    private HandleSecondStep(): void {
        this.gamePlay.getComponent(cc.Animation).play("GamePlayAnim2");

        this.scheduleOnce(() => {
            this.options_Glasses.forEach(item => {
                item.active = true;
            });
            this.options_Hairs.forEach(item => {
                item.active = false;
            });
        }, 1);

        this.scheduleOnce(() => {
            this.hand.active = true;
        }, 2);

        // mtg & applovin
        // this.background.on(cc.Node.EventType.TOUCH_END, () => {
        //     console.log("install");
        //     cc.audioEngine.stopAll();
        //     this.node.getComponent("GameController").installHandle();
        //     this.isInstall = true;
        // });
    }


    // -------------------- responsive
    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.setHorizontal();
            this.decors[0].scale = 0.55;
            this.decors[1].scaleX = -0.55;
            this.decors[1].scaleY = 0.55;
        } else {
            this.isRotate = false;
            this.setVertical();
            this.decors[0].scale = 0.4;
            this.decors[1].scaleX = -0.4;
            this.decors[1].scaleY = 0.4;
        }
    }       

    private setHorizontal(): void {
        this.text.scaleX = 0.65;
        this.text.scaleY = 0.65;

        this.options[0].x = -55;
        this.options[1].x = 55;
        this.options.forEach(option => {
            option.scaleX = 0.35;
            option.scaleY = 0.35;
        })

        this.hand.x = 129;
        this.hand.y = -196;
        this.hand.angle = 0;

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        this.background.scale = 0.57;
        this.background.y = 85;
    }

    private setHorizontalForTablet(): void {
        this.background.scale = 0.42;
        this.background.y = 40;
    }

    private setVertical(): void {
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.background.scale = 0.42;
        this.background.y = 40;

        this.text.scaleX = 0.38;
        this.text.scaleY = 0.38;

        this.options[0].x = -45;
        this.options[1].x = 45;

        this.options.forEach(option => {
            option.scaleX = 0.32;
            option.scaleY = 0.32;
        });

        this.hand.x = 55;
        this.hand.y = -115;
        this.hand.angle = 90;
    }

    private setMobile(): void {
        
        this.background.scale = 0.42;
        this.background.y = 40;

        this.text.scaleX = 0.48;
        this.text.scaleY = 0.48;
        this.options[0].x = -50;
        this.options[1].x = 50;
        this.options.forEach(option => {
            option.scaleX = 0.32;
            option.scaleY = 0.32;
        })

        this.hand.x = 129;
        this.hand.y = -196;
        this.hand.angle = 0;
        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
        //     // Iphone 6 / 6 Plus / 7 / 7 Plus
        //     this.text.scaleX = 0.3;
        //     this.text.scaleY = 0.3;
        // } else { 
        //     this.text.scaleX = 0.3;
        //     this.text.scaleY = 0.3;
        // }
    }

    protected update(dt: number): void {
        this.handleRotate();    
    }
}
