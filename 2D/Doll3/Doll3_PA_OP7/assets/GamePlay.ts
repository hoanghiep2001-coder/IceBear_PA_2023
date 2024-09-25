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
    framePickItem: cc.Node = null;

    @property(cc.Node)
    itemsContainer: cc.Node = null;
    @property(cc.Node)
    btnNext: cc.Node = null;
    @property(cc.Node)
    Hand: cc.Node = null;

    // array
    @property([cc.Node])
    tabs: cc.Node[] = [];

    // character
    @property([cc.Node])
    CharacterHairDefault: cc.Node[] = [];
    @property(cc.Node)
    CharacterOutfitDefault: cc.Node = null;
    @property(cc.Node)
    CharacterDressDefault: cc.Node = null;
    @property([cc.Node])
    CharacterHair: cc.Node[] = [];
    @property([cc.Node])        
    CharacterBackHair: cc.Node[] = [];
    @property([cc.Node])
    CharacterOutfit: cc.Node[] = [];
    @property([cc.Node])
    CharacterDress: cc.Node[] = [];
    
    // item frame pick
    @property([cc.Node])
    HairItemPicks: cc.Node[] = [];
    @property([cc.Node])
    HairItems: cc.Node[] = [];  

    @property([cc.Node])
   DressItemPicks: cc.Node[] = [];
    @property([cc.Node])
   DressItems: cc.Node[] = [];  

    @property([cc.Node])
    OutfitItemPicks: cc.Node[] = [];
    @property([cc.Node])
    OutfitItems: cc.Node[] = [];  

    // endgame 
    @property(cc.Node)
    overlay: cc.Node = null;
    @property(cc.Node)
    CTA: cc.Node = null;
    @property(cc.Node)
    btnCTA: cc.Node = null;
    @property(cc.Node)
    particleSys: cc.Node = null;

    // state
    isRotate: boolean = true;
    firstClick: boolean = false;
    clickStep: number = 1;
    btnButtonClickStep: number = 0;
    isClickFree: boolean = false;
    rotateState: number = 0.5;

    // sounds
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;

    protected onLoad(): void {
        this.btnNext.active = false;
        this.btnNext.getComponent(cc.Animation).play("Blink");
        this.CTA.active = false;
        this.overlay.active = false;

        this.overlay.opacity = 0;
    }

    protected start(): void {
        cc.audioEngine.play(this.bgSound, true, 1);

        this.handleRotate();

        this.handleGamePlay();
    }   
            
    private registerEvent(): void {
        // ironsource
        // this.bg_Horizontal.on(cc.Node.EventType.TOUCH_START, () => {
        //     if(this.firstClick) {
        //         return;
        //     }
        //     cc.audioEngine.play(this.bgSound, true, 1);
        //     this.clickStep = 2;
        //     this.firstClick = true;
        // });

        // this.bg_Vertical.on(cc.Node.EventType.TOUCH_START, () => {
        //     if(this.firstClick) {
        //         return;
        //     }

        //     cc.audioEngine.play(this.bgSound, true, 1);
        //     this.clickStep = 2;
        //     this.firstClick = true;
        // });
        // ---------------- end ironsource

        this.HairItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                this.CharacterBackHair.forEach(hair => {
                    hair.active = false;
                });
                this.CharacterHair.forEach(hair => {
                    hair.active = false;
                });
                this.HairItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterHairDefault.forEach(hair => {
                    hair.active = false;
                })
                this.CharacterBackHair[index].active = true;
                this.CharacterHair[index].active = true;
                this.HairItemPicks[index].active = true;

                if(this.btnButtonClickStep == 0) {
                    this.btnButtonClickStep++;
                    this.btnNext.active = true;
                }

                this.particleSys.getComponent(cc.ParticleSystem).resetSystem();
            });
        });

        this.OutfitItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                this.CharacterOutfitDefault.active = false;
                this.CharacterOutfit.forEach(outfit => {
                    outfit.active = false;
                });
                this.OutfitItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterOutfit[index].active = true;
                this.OutfitItemPicks[index].active = true;

                if(this.btnButtonClickStep == 1) {
                    this.btnButtonClickStep++;
                    this.btnNext.active = true;
                }

                this.particleSys.getComponent(cc.ParticleSystem).resetSystem();
            });
        });

        this.DressItems.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, () => {
                if(!this.isClickFree) {
                    return;
                }

                cc.audioEngine.play(this.clickSound, false, 1);
                this.clickStep++;
                this.CharacterDressDefault.active = false;
                this.CharacterDress.forEach(dress => {
                    dress.active = false;
                });
                this.DressItemPicks.forEach(pick => {
                    pick.active = false;
                });
                this.CharacterDress[index].active = true;
                this.DressItemPicks[index].active = true;

                if(this.btnButtonClickStep == 2) {
                    this.btnButtonClickStep++;
                    this.btnNext.active = true;
                }

                this.particleSys.getComponent(cc.ParticleSystem).resetSystem();
            });
        });

        this.btnNext.on(cc.Node.EventType.TOUCH_END, () => {
            if(this.btnButtonClickStep == 1) {
                cc.audioEngine.play(this.clickSound, false, 1);
                this.btnNext.active = false;
                this.tabs[0].active = false;
                this.tabs[1].active = true;
            }

            if(this.btnButtonClickStep == 2) {
                cc.audioEngine.play(this.clickSound, false, 1);
                this.btnNext.active = false;
                this.tabs[1].active = false;
                this.tabs[2].active = true;
            }

            if(this.btnButtonClickStep == 3) {
                cc.audioEngine.play(this.clickSound, false, 1);
                this.btnNext.active = false;
                this.handleShowEndGame()
            }
        });
    }

    private handleGamePlay(): void {
        this.scheduleOnce(() => {
            this.registerEvent();
            this.isClickFree = true;
        }, 0.5);
    }

    private handleShowEndGame(): void {
        this.DressItems.forEach(item => {
            item.off(cc.Node.EventType.TOUCH_START);
        })

        this.overlay.active = true;
        this.overlay.getComponent(cc.Animation).play("OverlayAnim");

        this.CTA.active = true;
        this.CTA.getComponent(cc.Animation).play("EndGameAnim");
        this.Hand.getComponent(cc.Animation).play("HandAnim");

        // mtg & appllovin
        this.bg_Vertical.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        });
        this.bg_Horizontal.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        });

        // others
        this.btnCTA.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
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

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }               

    private setVertical(): void {
        this.bg_Horizontal.active = false;
        this.bg_Vertical.active = true;

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.dollBase.scaleX = 0.55;
        this.dollBase.scaleY = 0.55;
        this.dollBase.y = 58;
        this.dollBase.x = 0;

        this.framePickItem.scaleX = 0.23;
        this.framePickItem.scaleY = 0.23;
        this.framePickItem.y = -180;
        this.framePickItem.x = 0;
        this.btnCTA.scale = 0.5;
    }

    private setMobile(): void {
        this.btnCTA.scale = 0.5;
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.dollBase.scaleX = 0.55;
            this.dollBase.scaleY = 0.55;
            this.dollBase.y = 70;
            this.dollBase.x = 0;

            this.framePickItem.scaleX = 0.26;
            this.framePickItem.scaleY = 0.26;
            this.framePickItem.y = -170;
            this.framePickItem.x = 0;

        } else {
            this.dollBase.scaleX = 0.55;
            this.dollBase.scaleY = 0.55;
            this.dollBase.y = 90;
            this.dollBase.x = 0;

            this.framePickItem.scaleX = 0.26;    
            this.framePickItem.scaleY = 0.26;
            this.framePickItem.y = -170;
            this.framePickItem.x = 0;
        }
    }

    private setHorizontalForIpX(): void {
        this.btnCTA.scale = 0.65;
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6 
        && cc.view.getFrameSize().height / cc.view.getFrameSize().width < 6.5) {
            this.dollBase.scaleX = 0.9;
            this.dollBase.scaleY = 0.9;
            this.dollBase.y = -20;
            this.dollBase.x = -180;
    
            this.framePickItem.scaleX = 0.35;
            this.framePickItem.scaleY = 0.35;
            this.framePickItem.y = -50;
            this.framePickItem.x = 170;
        } else {
            this.dollBase.scaleX = 0.9;
            this.dollBase.scaleY = 0.9;
            this.dollBase.y = -20;
            this.dollBase.x = -200;
    
            this.framePickItem.scaleX = 0.4;
            this.framePickItem.scaleY = 0.4;
            this.framePickItem.y = -50;
            this.framePickItem.x = 190;
        }
    }

    private setHorizontalForTablet(): void {
        this.dollBase.scaleX = 0.9;
        this.dollBase.scaleY = 0.9;
        this.dollBase.y = -20;
        this.dollBase.x = -135;

        this.framePickItem.scaleX = 0.28;
        this.framePickItem.scaleY = 0.28;
        this.framePickItem.y = -50;
        this.framePickItem.x = 140;
        this.btnCTA.scale = 0.65;
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
