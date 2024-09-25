const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // node
    @property(cc.Node)
    bg_Horizontal: cc.Node = null;
    @property(cc.Node)
    bg_Vertical: cc.Node = null;
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    bg_FrameText: cc.Node = null;
    @property(cc.Node)
    text_Frame: cc.Node = null;
    @property(cc.Node)
    text_Opening: cc.Node = null;
    @property(cc.Node)
    text_Revenge: cc.Node = null;
    @property(cc.Node)
    Amanda: cc.Node = null;
    @property(cc.Node)
    You: cc.Node = null;
    @property(cc.Node)
    text_TapToContinue: cc.Node = null;
    @property(cc.Node)
    startBtn: cc.Node = null;
    @property(cc.Node)
    framePickItem: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;
    @property(cc.Node)
    subOverlay: cc.Node = null;

    @property(cc.Node)
    overlay_clearFix: cc.Node = null;
    @property(cc.Node)
    horizontal_overlay_clearFix: cc.Node = null;

    @property(cc.Node)
    tabsContainer: cc.Node = null;
    @property(cc.Node)
    itemsContainer: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;

    // array
    @property([cc.Node])
    Tabs: cc.Node[] = [];
    @property([cc.Node])
    TabFramePicks: cc.Node[] = [];
    @property([cc.Node])
    OptionItems: cc.Node[] = [];
    @property([cc.Node])
    Hints: cc.Node[] = [];
    @property([cc.Node])
    Hands: cc.Node[] = [];
    @property([cc.Node])
    HintFramePicks: cc.Node[] = [];

    // character
    @property([cc.Node])
    CharacterHairDefault: cc.Node[] = [];
    @property(cc.Node)
    CharacterOutfitDefault: cc.Node = null;
    @property(cc.Node)
    CharacterEyeDefault: cc.Node = null;
    @property(cc.Node)
    CharacterMouthDefault: cc.Node = null;
    @property([cc.Node])
    CharacterHair: cc.Node[] = [];
    @property([cc.Node])
    CharacterOutfit: cc.Node[] = [];
    @property([cc.Node])
    CharacterEyes: cc.Node[] = [];
    @property([cc.Node])
    CharacterMouths: cc.Node[] = [];
    @property([cc.Node])
    CharacterHands: cc.Node[] = [];

    @property(cc.Node)
    horizontalOverlay: cc.Node = null;
    @property(cc.Node)
    subHorizontalOverlay: cc.Node = null;

    // item frame pick
    @property([cc.Node])
    HairItemPicks: cc.Node[] = [];
    @property([cc.Node])
    HairItems: cc.Node[] = [];  

    @property([cc.Node])
    OutfitItemPicks: cc.Node[] = [];
    @property([cc.Node])
    OutfitItems: cc.Node[] = [];  

    @property([cc.Node])
    EyeItemPicks: cc.Node[] = [];
    @property([cc.Node])
    EyeItems: cc.Node[] = []; 

    @property([cc.Node])
    MouthItemPicks: cc.Node[] = [];
    @property([cc.Node])
    MouthItems: cc.Node[] = []; 
    
    @property([cc.Node])
    HandItemPicks: cc.Node[] = [];
    @property([cc.Node])
    HandItems: cc.Node[] = []; 

    // state
    isRotate: boolean = true;
    firstClick: boolean = false;
    clickStep: number = 1;
    isClickFree: boolean = false;
    rotateState: number = 0.5;

    // sounds
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;

    protected onLoad(): void {
        this.text_Revenge.active = false;
        this.You.active = false;
        this.text_TapToContinue.active = false;
        this.startBtn.active = false;
        this.framePickItem.active = false;
        this.overlay.active = false;
        this.subOverlay.active = false;
        this.horizontalOverlay.active = false;
        this.subHorizontalOverlay.active = false;
        this.overlay_clearFix.active = false;
        this.horizontal_overlay_clearFix.active = false;
        this.Hints.forEach(hint => {
            hint.active = false;
        });
        this.Hands.forEach(hand => {
            hand.active = false;
        });

        this.text_Opening.opacity = 0;
    }

    protected start(): void {
        cc.audioEngine.play(this.bgSound, true, 1);

        this.handleRotate();

        this.handleGamePlay();
    }

    private registerEvent(): void {
        this.bg_Horizontal.on(cc.Node.EventType.TOUCH_START, () => {
            if(this.clickStep >= 5) {
                console.log("install");
                cc.audioEngine.stopAll();
                this.node.getComponent("GameController").installHandle();
            }

            if(this.firstClick) {
                return;
            }

            // ironsource
            // cc.audioEngine.play(this.bgSound, true, 1);

            cc.audioEngine.play(this.clickSound, false, 1);
            this.clickStep = 2;
            this.firstClick = true;
            this.Amanda.active = false;
            this.text_Opening.active = false;
            this.text_TapToContinue.active = false;
            this.You.active = true;
            this.text_Revenge.active = true;
            this.startBtn.active = true;
        });

        this.bg_Vertical.on(cc.Node.EventType.TOUCH_START, () => {
            if(this.clickStep >= 5) {
                console.log("install");
                cc.audioEngine.stopAll();
                this.node.getComponent("GameController").installHandle();
            }

            if(this.firstClick) {
                return;
            }

            // ironsource
            // cc.audioEngine.play(this.bgSound, true, 1);
            
            cc.audioEngine.play(this.clickSound, false, 1);
            this.clickStep = 2;
            this.firstClick = true;
            this.Amanda.active = false;
            this.text_Opening.active = false;
            this.text_TapToContinue.active = false;
            this.You.active = true;
            this.text_Revenge.active = true;
            this.startBtn.active = true;
        });

        this.startBtn.on(cc.Node.EventType.TOUCH_START, () => {
            cc.audioEngine.play(this.clickSound, false, 1);
            this.bg_FrameText.active = false;
            this.framePickItem.active = true;
           
            if(this.isRotate) {
                this.horizontalOverlay.active = true;
            } else {
                this.overlay.active = true;
            }
            this.overlay.getComponent(cc.Animation).play("OverlayAnim");
            this.horizontalOverlay.getComponent(cc.Animation).play("OverlayAnim");
            this.Hints[0].active = true;

            this.scheduleOnce(() => {
                this.Hands[0].active = true;
                this.Hands[0].getComponent(cc.Animation).play("HandAnim");
            }, 0.5);
        });

        this.Hints[0].on(cc.Node.EventType.TOUCH_START, () => {
            if(this.clickStep > 2) {
                return;
            }

            cc.audioEngine.play(this.clickSound, false, 1);
            this.clickStep = 3;
            this.HintFramePicks[0].active = true;
            this.Hands[0].active = false;
            this.OptionItems[1].active = false;
            this.OptionItems[0].active = true;
            this.Hands[1].active = true;
            this.Hands[1].getComponent(cc.Animation).play("HandAnim");
            this.Hints[1].active = true;

            if(this.isRotate) {
                  this.horizontal_overlay_clearFix.active = true;
                    this.horizontalOverlay.active = false;
            } else {
                 this.overlay_clearFix.active = true;
                    this.overlay.active = false;
            }
        });

        this.Hints[1].on(cc.Node.EventType.TOUCH_START, () => {
            if(this.clickStep > 3) {
                return;
            }

            cc.audioEngine.play(this.clickSound, false, 1);
            this.clickStep = 4;
            this.Hands[1].active = false;

            if(this.isRotate) {
                this.horizontalOverlay.active = false;
                this.horizontal_overlay_clearFix.active = false;
                this.subHorizontalOverlay.active = true;
            } else {
                this.overlay.active = false;
                this.overlay_clearFix.active = false;
                this.subOverlay.active = true;
            }

            this.HintFramePicks[1].active = true;
            this.Hands[2].active = true;
            this.Hands[2].getComponent(cc.Animation).play("HandAnim");
            this.Hints[2].active = true;
            this.CharacterHairDefault[0].active = false;
            this.CharacterHairDefault[1].active = false;
            this.CharacterHair[1].active = true;
        });

        this.Hints[2].on(cc.Node.EventType.TOUCH_START, () => {
            if(this.clickStep > 4) {
                return;
            }

            cc.audioEngine.play(this.clickSound, false, 1);
            this.isClickFree = true;
            this.clickStep = 5;
            this.Hands[2].active = false;
            if(this.isRotate) {
                this.subHorizontalOverlay.active = false;
            } else {
                this.subOverlay.active = false;
            }
            this.Hints[0].active = false;
            this.Hints[1].active = false;
            this.TabFramePicks[1].active = true;
            this.OptionItems[0].active = false;
            this.OptionItems[1].active = true;
        });

        this.Tabs.forEach((tab, index) => {
            tab.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                
                this.Hints[2].active = false;
                this.OptionItems.forEach(option => {
                    option.active = false;
                });
                this.TabFramePicks.forEach(frame => {
                    frame.active = false;
                });

                this.OptionItems[index].active = true;
                this.TabFramePicks[index].active = true;
            })
        });

        this.HairItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                this.CharacterHair.forEach(hair => {
                    hair.active = false;
                });
                this.HairItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterHair[index].active = true;
                this.HairItemPicks[index].active = true;
            });
        });

        this.OutfitItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                this.CharacterOutfitDefault.active = false;
                this.CharacterOutfit.forEach(outfit => {
                    outfit.active = false;
                });
                this.OutfitItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterOutfit[index].active = true;
                this.OutfitItemPicks[index].active = true;
            });
        });

        this.EyeItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                this.CharacterEyeDefault.active = false;
                this.CharacterEyes.forEach(eye => {
                    eye.active = false;
                });
                this.EyeItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterEyes[index].active = true;
                this.EyeItemPicks[index].active = true;
            });
        });

        this.MouthItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                this.CharacterMouthDefault.active = false;
                this.CharacterMouths.forEach(mouth => {
                    mouth.active = false;
                });
                this.MouthItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterMouths[index].active = true;
                this.MouthItemPicks[index].active = true;
            });
        }); 

        this.HandItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                if(this.clickStep >= 5) {
                    console.log("install");
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                console.log(this.clickStep);
                this.CharacterHands.forEach(hand => {
                    hand.active = false;
                });
                this.HandItemPicks.forEach(hand => {
                    hand.active = false;
                });
                this.CharacterHands[index].active = true;
                this.HandItemPicks[index].active = true;
            });
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
        this.bg_Vertical.active = false;
        this.bg_Horizontal.active = true;

        this.text_Opening.x = 0;        
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            this.setHorizontalForIpX(); 
        } else {
            this.setHorizontalForTablet();
        }
    }               

    private setVertical(): void {
        this.bg_Horizontal.active = false;
        this.bg_Vertical.active = true;

        this.text_Opening.x = -180;

        this.Amanda.scaleX = 1;
        this.Amanda.scaleY = 1;
        this.Amanda.y = 23;
        this.Amanda.x = 270;   

        this.text_Opening.scaleX = 1;
        this.text_Opening.scaleY = 1;
        this.text_Revenge.scaleX = 1;
        this.text_Revenge.scaleY = 1;

        this.You.scaleX = 1;
        this.You.scaleY = 1;      
        this.You.y = 132.5;
        this.You.x = -249; 

        this.startBtn.scaleX = 0.5;
        this.startBtn.scaleY = 0.5;      
        this.startBtn.y = 50;
        this.startBtn.x = 0; 

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.dollBase.scaleX = 0.2;
        this.dollBase.scaleY = 0.2;
        this.dollBase.y = 35;
        this.dollBase.x = 0;

        this.bg_FrameText.scaleX = 0.5;
        this.bg_FrameText.scaleY = 0.5;
        this.bg_FrameText.y = -240;
        this.bg_FrameText.x = 0;

        this.text_Frame.scaleX = 0.45;
        this.text_Frame.scaleY = 0.45;
        this.text_Frame.y = 200;
        this.text_Frame.x = 0;

        this.framePickItem.scaleX = 0.21;
        this.framePickItem.scaleY = 0.25;
        this.framePickItem.y = -149;
        this.framePickItem.x = 0;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.dollBase.scaleX = 0.25;
            this.dollBase.scaleY = 0.25;
            this.dollBase.y = 50;
            this.dollBase.x = 0;

            this.framePickItem.scaleX = 0.25;
            this.framePickItem.scaleY = 0.3;
            this.framePickItem.y = -140;
            this.framePickItem.x = 0;
        } else {
            this.dollBase.scaleX = 0.25;
            this.dollBase.scaleY = 0.25;
            this.dollBase.y = 70;
            this.dollBase.x = 0;

            this.framePickItem.scaleX = 0.3;
            this.framePickItem.scaleY = 0.35;
            this.framePickItem.y = -120;
            this.framePickItem.x = 0;
        }

        this.bg_FrameText.scaleX = 0.5;
        this.bg_FrameText.scaleY = 0.5;
        this.bg_FrameText.y = -200;
        this.bg_FrameText.x = 0;

        this.text_Frame.scaleX = 0.5;   
        this.text_Frame.scaleY = 0.5;
        this.text_Frame.y = 200;
        this.text_Frame.x = 0;
    }

    private handleGamePlay(): void {
        this.isRotate 
            ? this.text_Frame.getComponent(cc.Animation).play("Tablet_FrameText_Anim")
            : this.text_Frame.getComponent(cc.Animation).play("Mobile_FrameText_Anim");

        this.scheduleOnce(() => {
            this.registerEvent();
        }, 2);
    }

    private setHorizontalForIpX(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6 
        && cc.view.getFrameSize().height / cc.view.getFrameSize().width < 6.5) {
            this.dollBase.scaleX = 0.45;
            this.dollBase.scaleY = 0.45;
            this.dollBase.y = -35;
            this.dollBase.x = -180;
    
            this.bg_FrameText.scaleX = 0.8;
            this.bg_FrameText.scaleY = 0.8;
            this.bg_FrameText.y = 33;
            this.bg_FrameText.x = 480;                         
    
            this.text_Frame.scaleX = 0.38;
            this.text_Frame.scaleY = 0.38;
            this.text_Frame.y = -100;
            this.text_Frame.x = -320;
    
            this.framePickItem.scaleX = 0.3;
            this.framePickItem.scaleY = 0.35;
            this.framePickItem.y = -50;
            this.framePickItem.x = 220;
    
            this.horizontalOverlay.x =  1920;
            this.horizontalOverlay.y =  2000;
            this.subHorizontalOverlay.x =  1920;
            this.subHorizontalOverlay.y =  2000;
    
            this.Amanda.scaleX = 1.4;
            this.Amanda.scaleY = 1.4;
            this.Amanda.y = 344;
            this.Amanda.x = 237;   
    
            this.text_Opening.scaleX = 1.2;
            this.text_Opening.scaleY = 1.2;
            this.text_Revenge.scaleX = 1.2;
            this.text_Revenge.scaleY = 1.2;
    
            this.You.scaleX = 1.4;
            this.You.scaleY = 1.4;      
            this.You.y = 132.5;
            this.You.x = -163; 
    
            this.startBtn.scaleX = 0.5;
            this.startBtn.scaleY = 0.5;      
            this.startBtn.y = -240;
            this.startBtn.x = -300; 
        } else {
            this.dollBase.scaleX = 0.42;
            this.dollBase.scaleY = 0.42;
            this.dollBase.y = -45;
            this.dollBase.x = -200;
    
            this.bg_FrameText.scaleX = 0.8;
            this.bg_FrameText.scaleY = 0.8;
            this.bg_FrameText.y = 33;
            this.bg_FrameText.x = 480;                         
    
            this.text_Frame.scaleX = 0.42;
            this.text_Frame.scaleY = 0.42;
            this.text_Frame.y = -100;
            this.text_Frame.x = -290;
    
            this.framePickItem.scaleX = 0.35;
            this.framePickItem.scaleY = 0.4;
            this.framePickItem.y = -50;
            this.framePickItem.x = 220;
    
            this.horizontalOverlay.x =  1920;
            this.horizontalOverlay.y =  2000;
            this.subHorizontalOverlay.x =  1920;
            this.subHorizontalOverlay.y =  2000;
    
            this.Amanda.scaleX = 1.4;
            this.Amanda.scaleY = 1.4;
            this.Amanda.y = 344;
            this.Amanda.x = 237;   
    
            this.text_Opening.scaleX = 1.2;
            this.text_Opening.scaleY = 1.2;
            this.text_Revenge.scaleX = 1.2;
            this.text_Revenge.scaleY = 1.2;
    
            this.You.scaleX = 1.4;
            this.You.scaleY = 1.4;      
            this.You.y = 132.5;
            this.You.x = -163; 
    
            this.startBtn.scaleX = 0.5;
            this.startBtn.scaleY = 0.5;      
            this.startBtn.y = -240;
            this.startBtn.x = -300; 
        }
    }

    private setHorizontalForTablet(): void {
        
        let size = cc.view.getFrameSize().width / cc.view.getFrameSize().height;
        
        // tablet applovin
        if(size >= 1.6 && size <= 1.7) {
            console.log("in");
            
            this.dollBase.scaleX = 0.38;
            this.dollBase.scaleY = 0.38;
            this.dollBase.y = -65;
            this.dollBase.x = -120;
    
            this.bg_FrameText.scaleX = 0.8;
            this.bg_FrameText.scaleY = 0.8;
            this.bg_FrameText.y = 33;
            this.bg_FrameText.x = 480;                         
    
            this.text_Frame.scaleX = 0.32;
            this.text_Frame.scaleY = 0.32;
            this.text_Frame.y = -100;
            this.text_Frame.x = -360;
    
            this.framePickItem.scaleX = 0.26;
            this.framePickItem.scaleY = 0.31;
            this.framePickItem.y = -50;
            this.framePickItem.x = 180;
    
            this.horizontalOverlay.x =  1920;
            this.horizontalOverlay.y =  2000;
            this.subHorizontalOverlay.x =  1920;
            this.subHorizontalOverlay.y =  2000;
    
            this.Amanda.scaleX = 1.4;
            this.Amanda.scaleY = 1.4;
            this.Amanda.y = 344;
            this.Amanda.x = 237;   
    
            this.text_Opening.scaleX = 1.2;
            this.text_Opening.scaleY = 1.2;
            this.text_Revenge.scaleX = 1.2;
            this.text_Revenge.scaleY = 1.2;
    
            this.You.scaleX = 1.4;
            this.You.scaleY = 1.4;      
            this.You.y = 132.5;
            this.You.x = -163; 
    
            this.startBtn.scaleX = 0.5;
            this.startBtn.scaleY = 0.5;      
            this.startBtn.y = -240;
            this.startBtn.x = -360; 
        }

        if(size < 1.4) {
            // Ipad
        this.dollBase.scaleX = 0.38;
        this.dollBase.scaleY = 0.38;
        this.dollBase.y = -65;
        this.dollBase.x = -120;

        this.bg_FrameText.scaleX = 0.8;
        this.bg_FrameText.scaleY = 0.8;
        this.bg_FrameText.y = 33;
        this.bg_FrameText.x = 480;                         

        this.text_Frame.scaleX = 0.32;
        this.text_Frame.scaleY = 0.32;
        this.text_Frame.y = -100;
        this.text_Frame.x = -360;

        this.framePickItem.scaleX = 0.24;
        this.framePickItem.scaleY = 0.29;
        this.framePickItem.y = -50;
        this.framePickItem.x = 180;

        this.horizontalOverlay.x =  1920;
        this.horizontalOverlay.y =  2000;
        this.subHorizontalOverlay.x =  1920;
        this.subHorizontalOverlay.y =  2000;

        this.Amanda.scaleX = 1.4;
        this.Amanda.scaleY = 1.4;
        this.Amanda.y = 344;
        this.Amanda.x = 237;   

        this.text_Opening.scaleX = 1.2;
        this.text_Opening.scaleY = 1.2;
        this.text_Revenge.scaleX = 1.2;
        this.text_Revenge.scaleY = 1.2;

        this.You.scaleX = 1.4;
        this.You.scaleY = 1.4;      
        this.You.y = 132.5;
        this.You.x = -163; 

        this.startBtn.scaleX = 0.5;
        this.startBtn.scaleY = 0.5;      
        this.startBtn.y = -240;
        this.startBtn.x = -360; 
        } else {
            // Normal
        this.dollBase.scaleX = 0.4;
        this.dollBase.scaleY = 0.4;
        this.dollBase.y = -55;
        this.dollBase.x = -150;

        this.bg_FrameText.scaleX = 0.8;
        this.bg_FrameText.scaleY = 0.8;
        this.bg_FrameText.y = 33;
        this.bg_FrameText.x = 480;                         

        this.text_Frame.scaleX = 0.32;
        this.text_Frame.scaleY = 0.32;
        this.text_Frame.y = -100;
        this.text_Frame.x = -360;

        this.framePickItem.scaleX = 0.24;
        this.framePickItem.scaleY = 0.29;
        this.framePickItem.y = -50;
        this.framePickItem.x = 220;

        this.horizontalOverlay.x =  1920;
        this.horizontalOverlay.y =  2000;
        this.subHorizontalOverlay.x =  1920;
        this.subHorizontalOverlay.y =  2000;

        this.Amanda.scaleX = 1.4;
        this.Amanda.scaleY = 1.4;
        this.Amanda.y = 344;
        this.Amanda.x = 237;   

        this.text_Opening.scaleX = 1.2;
        this.text_Opening.scaleY = 1.2;
        this.text_Revenge.scaleX = 1.2;
        this.text_Revenge.scaleY = 1.2;

        this.You.scaleX = 1.4;
        this.You.scaleY = 1.4;      
        this.You.y = 132.5;
        this.You.x = -163; 

        this.startBtn.scaleX = 0.5;
        this.startBtn.scaleY = 0.5;      
        this.startBtn.y = -240;
        this.startBtn.x = -360; 
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
