const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    image_1: cc.Node = null;
    @property(cc.Node)
    image_2: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.ParticleSystem)
    particle: cc.ParticleSystem = null;

    @property([cc.Node])
    picks: cc.Node[] = [];
    @property([cc.Node])
    areas: cc.Node[] = [];

    @property([cc.Node])
    CompleteParticlesContainer: cc.Node[] = [];
    @property([cc.ParticleSystem])
    CompleteParticles: cc.ParticleSystem[] = [];
    @property([cc.Node])
    hands: cc.Node[] = [];

    // state
    currentPosition: cc.Vec2 = null;
    isRotate: boolean = true;
    firstClickItem: boolean = false;
    secondClickItem: boolean = false;
    clickStep: number = 0;
    isClickFree: boolean = false;
    rotateState: number = 0.5;
    isDoneFirstClick: boolean = false;

    pickedItem: cc.Node = null;
    fakeAreas: cc.Node[] = [];
    fakePicks: cc.Node[] = [];

    // sounds
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    completeSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    wrongSound: cc.AudioClip = null;

    protected onLoad(): void {
        this.picks.forEach(pick => {
            pick.active = false;
        })

        this.hands.forEach(hand => {
            hand.active = false;
            hand.getComponent(cc.Animation).play("HandAnim");
        });

        this.hands[0].active = true;
    }

    protected start(): void {
        cc.audioEngine.play(this.bgSound, true, 1);

        this.handleRotate();

        this.handleGamePlay();

        this.registerEvent();
    }

    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, (e: cc.Touch) => {
            this.currentPosition = e.getLocation();

            cc.audioEngine.play(this.clickSound, false, 1);

            this.point.x = this.currentPosition.x - cc.winSize.width / 2;
            this.point.y = this.currentPosition.y - cc.winSize.height / 2;

            this.particle.resetSystem();
        });

        this.areas[0].on(cc.Node.EventType.TOUCH_END, (e: cc.Touch) => {
            this.hands[0].active = false;
            this.hands[4].active = true;

            this.currentPosition = e.getLocation();
                    this.point.x = this.currentPosition.x - cc.winSize.width / 2;
                    this.point.y = this.currentPosition.y - cc.winSize.height / 2;
                    this.particle.resetSystem();
                    cc.audioEngine.play(this.clickSound, false, 1);
    
                    this.handleShowPick(0, this.areas[0]);
        });

        this.areas[4].on(cc.Node.EventType.TOUCH_END, (e: cc.Touch) => {
            this.hands[4].active = false; 

            this.currentPosition = e.getLocation();
                    this.point.x = this.currentPosition.x - cc.winSize.width / 2;
                    this.point.y = this.currentPosition.y - cc.winSize.height / 2;
                    this.particle.resetSystem();
                    cc.audioEngine.play(this.clickSound, false, 1);
    
                    this.handleShowPick(4, this.areas[4]);

            this.areas.forEach((area, index) => {
                area.on(cc.Node.EventType.TOUCH_START, (e: cc.Touch) => {
                    this.currentPosition = e.getLocation();
                    this.point.x = this.currentPosition.x - cc.winSize.width / 2;
                    this.point.y = this.currentPosition.y - cc.winSize.height / 2;
                    this.particle.resetSystem();
                    cc.audioEngine.play(this.clickSound, false, 1);
    
                    this.handleShowPick(index, area);
                });
    
            })
        });
    }

    private handleShowPick(item: number, area: cc.Node): void {
        if(this.picks[item].active) {
            return;
        }

        this.isDoneFirstClick = false
        this.fakeAreas.push(area);

        if(this.secondClickItem) {
            // pick true
            if(this.pickedItem.name === this.picks[item].name) {
                if(this.clickStep >= 3) {
                    console.log("install");
                    
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                    return;
                }

                this.clickStep++
                this.fakePicks.push(this.pickedItem, this.picks[item])

                this.picks[item].active = true;

                this.fakeAreas[this.fakeAreas.length - 1].off(cc.Node.EventType.TOUCH_END);
                this.fakeAreas[this.fakeAreas.length - 2].off(cc.Node.EventType.TOUCH_END);

                this.CompleteParticles.forEach(particle => {
                    particle.resetSystem();
                });

                cc.audioEngine.play(this.completeSound, false, 1)

                this.secondClickItem = false;
                this.firstClickItem = false;
                this.isDoneFirstClick = true;

            // pick wrong
            } else {
                this.picks[item].active = true;

                this.scheduleOnce(() => {
                    cc.audioEngine.play(this.wrongSound, false, 1);
                }, 0.5)

                this.scheduleOnce(() => {
                    this.pickedItem = null;
                    this.firstClickItem = false;
                    this.secondClickItem = false;
                    this.picks.forEach(pick => {
                        pick.active = false;
                    });

                    this.fakePicks.forEach(pick => {
                        pick.active = true;
                    });
                }, 1);
            }
        }

        if(!this.firstClickItem && !this.isDoneFirstClick) {
            this.pickedItem = this.picks[item];
            this.firstClickItem = true;
            this.secondClickItem = true;
             this.picks.forEach(pick => {
                pick.active = false;
            });
            this.picks[item].active = true;

            this.fakePicks.forEach(pick => {
                pick.active = true;
            });
            console.log("check2");
            
        }

        // this.pickedItem = this.pickedItem === "" ? area.name : this.pickedItem
    }

    
    private handleGamePlay(): void {

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
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.image_1.x = 0;
        this.image_1.y = 95;
        this.image_1.scaleX = 0.52;
        this.image_1.scaleY = 0.52;

        this.image_2.x = 0;
        this.image_2.y = -127;
        this.image_2.scaleX = 0.52;
        this.image_2.scaleY = 0.52;

        this.text.y = 218;
        this.text.scaleX = 0.4;
        this.text.scaleY = 0.4;

        this.CompleteParticlesContainer[0].x = -91;
        this.CompleteParticlesContainer[0].y = -230;
        this.CompleteParticlesContainer[0].scaleX = 0.4;
        this.CompleteParticlesContainer[0].scaleY = 0.4;

        this.CompleteParticlesContainer[1].x = 91;
        this.CompleteParticlesContainer[1].y = -230;
        this.CompleteParticlesContainer[1].scaleX = 0.4;
        this.CompleteParticlesContainer[1].scaleY = 0.4;
    }

    private setMobile(): void {
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.image_1.x = 0;
            this.image_1.y = 95;
            this.image_1.scaleX = 0.52;
            this.image_1.scaleY = 0.52;
    
            this.image_2.x = 0;
            this.image_2.y = -127;
            this.image_2.scaleX = 0.52;
            this.image_2.scaleY = 0.52;
    
            this.text.y = 218;
            this.text.scaleX = 0.45;
            this.text.scaleY = 0.45;

            this.CompleteParticlesContainer[0].x = -91;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.4;
            this.CompleteParticlesContainer[0].scaleY = 0.4;

            this.CompleteParticlesContainer[1].x = 91;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.4;
            this.CompleteParticlesContainer[1].scaleY = 0.4;
        } else {
            this.image_1.x = 0;
            this.image_1.y = 95;
            this.image_1.scaleX = 0.52;
            this.image_1.scaleY = 0.52;
    
            this.image_2.x = 0;
            this.image_2.y = -127;
            this.image_2.scaleX = 0.52;
            this.image_2.scaleY = 0.52;
    
            this.text.y = 218;
            this.text.scaleX = 0.45;
            this.text.scaleY = 0.45;

            this.CompleteParticlesContainer[0].x = -91;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.4;
            this.CompleteParticlesContainer[0].scaleY = 0.4;

            this.CompleteParticlesContainer[1].x = 91;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.4;
            this.CompleteParticlesContainer[1].scaleY = 0.4;
        }
    }

    private setHorizontalForIpX(): void {
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6
            && cc.view.getFrameSize().height / cc.view.getFrameSize().width < 6.5) {
                this.image_1.x = 150;
                this.image_1.y = -35;
                this.image_1.scaleX = 0.9;
                this.image_1.scaleY = 0.9;
        
                this.image_2.x = -150;
                this.image_2.y = -35;
                this.image_2.scaleX = 0.9;
                this.image_2.scaleY = 0.9;
                
                this.text.y = 200;
                this.text.scaleX = 0.8;
                this.text.scaleY = 0.8;
    
                this.CompleteParticlesContainer[0].x = -150;
                this.CompleteParticlesContainer[0].y = -230;
                this.CompleteParticlesContainer[0].scaleX = 0.6;
                this.CompleteParticlesContainer[0].scaleY = 0.6;
    
                this.CompleteParticlesContainer[1].x = 150;
                this.CompleteParticlesContainer[1].y = -230;
                this.CompleteParticlesContainer[1].scaleX = 0.6;
                this.CompleteParticlesContainer[1].scaleY = 0.6;
        } else {
            this.image_1.x = 150;
            this.image_1.y = -35;
            this.image_1.scaleX = 0.9;
            this.image_1.scaleY = 0.9;
    
            this.image_2.x = -150;
            this.image_2.y = -35;
            this.image_2.scaleX = 0.9;
            this.image_2.scaleY = 0.9;
            
            this.text.y = 200;
            this.text.scaleX = 0.8;
            this.text.scaleY = 0.8;

            this.CompleteParticlesContainer[0].x = -150;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.6;
            this.CompleteParticlesContainer[0].scaleY = 0.6;

            this.CompleteParticlesContainer[1].x = 150;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.6;
            this.CompleteParticlesContainer[1].scaleY = 0.6;
        }
    }

    private setHorizontalForTablet(): void {

        let size = cc.view.getFrameSize().width / cc.view.getFrameSize().height;

        // tablet applovin
        if (size >= 1.6 && size <= 1.7) {
            this.image_1.x = 150;
            this.image_1.y = -35;
            this.image_1.scaleX = 0.9;
            this.image_1.scaleY = 0.9;
    
            this.image_2.x = -150;
            this.image_2.y = -35;
            this.image_2.scaleX = 0.9;
            this.image_2.scaleY = 0.9;
            
            this.text.y = 200;
            this.text.scaleX = 0.8;
            this.text.scaleY = 0.8;

            this.CompleteParticlesContainer[0].x = -150;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.6;
            this.CompleteParticlesContainer[0].scaleY = 0.6;

            this.CompleteParticlesContainer[1].x = 150;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.6;
            this.CompleteParticlesContainer[1].scaleY = 0.6;
        }

        if (size < 1.4) {
            // Ipad
            this.image_1.x = 150;
            this.image_1.y = -35;
            this.image_1.scaleX = 0.9;
            this.image_1.scaleY = 0.9;
    
            this.image_2.x = -150;
            this.image_2.y = -35;
            this.image_2.scaleX = 0.9;
            this.image_2.scaleY = 0.9;
            
            this.text.y = 200;
            this.text.scaleX = 0.8;
            this.text.scaleY = 0.8;

            this.CompleteParticlesContainer[0].x = -150;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.6;
            this.CompleteParticlesContainer[0].scaleY = 0.6;

            this.CompleteParticlesContainer[1].x = 150;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.6;
            this.CompleteParticlesContainer[1].scaleY = 0.6;
        } else {
            // Normal
            this.image_1.x = 150;
            this.image_1.y = -35;
            this.image_1.scaleX = 0.9;
            this.image_1.scaleY = 0.9;
    
            this.image_2.x = -150;
            this.image_2.y = -35;
            this.image_2.scaleX = 0.9;
            this.image_2.scaleY = 0.9;
            
            this.text.y = 200;
            this.text.scaleX = 0.8;
            this.text.scaleY = 0.8;

            this.CompleteParticlesContainer[0].x = -150;
            this.CompleteParticlesContainer[0].y = -230;
            this.CompleteParticlesContainer[0].scaleX = 0.6;
            this.CompleteParticlesContainer[0].scaleY = 0.6;

            this.CompleteParticlesContainer[1].x = 150;
            this.CompleteParticlesContainer[1].y = -230;
            this.CompleteParticlesContainer[1].scaleX = 0.6;
            this.CompleteParticlesContainer[1].scaleY = 0.6;
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
