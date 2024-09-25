
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    text_Vertical: cc.Node = null;
    @property(cc.Node)
    text_Horizontal: cc.Node = null;
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    eraser: cc.Node = null;
    @property(cc.Component)
    SratchAble: cc.Component = null;
    @property(cc.Node)
    CharacterDress: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;
    @property(cc.Node)
    endGame: cc.Node = null;
    @property(cc.Node)
    shining: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    fakeEraser: cc.Node = null;

    @property(cc.Node)
    fakeDress: cc.Node = null;
    // array

    // state 
    currentPos: cc.Vec2 = null;
    isTouched: boolean = false;
    canTouch: boolean = true;
    isRotate : boolean = false;
    isInstall: boolean = false;
    isPlay: boolean = false;
    canPlay: boolean = false;
    isDone: boolean = false;
    isPlayEraserSound: boolean = false;
    soundState: number = null;
    eraserInitPos: cc.Vec2 = new cc.Vec2(75, -154);

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;     
    @property(cc.AudioClip)
    completeSound: cc.AudioClip = null;  
    @property(cc.AudioClip)
    eraserSound: cc.AudioClip = null;  

    protected onLoad(): void {
        this.eraser.active = false;
            this.overlay.active = false;
            this.overlay.opacity = 0;
            this.endGame.active = false;
            this.hand.active = false;
            this.hand.opacity = 0;

    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);

        this.gamePlay.getComponent(cc.Animation).play("GamePlayAnim");

        this.scheduleOnce(() => {
            this.canPlay = true;
            this.hand.active = true;
            this.hand.getComponent(cc.Animation).play("HandAnim");
        }, 2)

        this.registerEvent();
    }   

    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, () => {
            if(this.isTouched) return;

            cc.audioEngine.play(this.bgSound, true, 1);
            this.isTouched = true;
        });

        this.fakeEraser.on(cc.Node.EventType.TOUCH_START, (e: cc.Touch) => {
            if(!this.canPlay) return;

            this.currentPos = e.getLocation();
            this.fakeEraser.opacity = 0;
            this.eraser.active = true;
            this.hand.active = false;
        });

        this.fakeEraser.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Touch) => {
            this.currentPos = e.getLocation();
            this.fakeEraser.opacity = 0;
            this.eraser.active = true;
            if(!this.canPlay) return;

            this.fakeEraser.x = this.currentPos.x - cc.winSize.width / 2;
            this.fakeEraser.y = this.currentPos.y - cc.winSize.height / 2;
            this.eraser.x = this.currentPos.x - cc.winSize.width / 2;
            this.eraser.y = this.currentPos.y - cc.winSize.height / 2;

            if(this.eraser.getBoundingBox().intersects(this.fakeDress.getBoundingBox())) {
                if (this.isPlayEraserSound) {
                    return;
                }       

                this.isPlayEraserSound = true;
                this.soundState = cc.audioEngine.play(this.eraserSound, true, 1);
            } else {
                this.isPlayEraserSound = false;
                cc.audioEngine.stop(this.soundState);
            }
        });

        this.fakeEraser.on(cc.Node.EventType.TOUCH_END, (e: cc.Touch) => {
            this.fakeEraser.opacity = 255;
                this.eraser.active = false;
                this.isPlayEraserSound = false;
                cc.audioEngine.stop(this.soundState);
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
        if(this.isDone) {
            this.text_Horizontal.active = false;
            this.text_Vertical.active = false;
        } else {
            this.text_Horizontal.active = true;
            this.text_Vertical.active = false;
        }

        this.dollBase.scaleX = 0.35;
        this.dollBase.scaleY = 0.35;
        this.text_Vertical.scaleX = 0.5;
        this.text_Vertical.scaleY = 0.5;
        this.endGame.scaleX = 1;
        this.endGame.scaleY = 1;

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
        if(this.isDone) {
            this.text_Horizontal.active = false;
            this.text_Vertical.active = false;
        } else {
            this.text_Horizontal.active = false;
            this.text_Vertical.active = true;
        }
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.dollBase.scaleX = 0.3;
        this.text_Vertical.y = 175;
        this.dollBase.scaleY = 0.3;
        this.text_Vertical.scaleX = 0.45;
        this.text_Vertical.scaleY = 0.45;
        this.endGame.scaleX = 0.95;
        this.endGame.scaleY = 0.95;
    }

    private setMobile(): void {
        this.text_Vertical.y = 193;
        this.dollBase.scaleX = 0.35;
        this.dollBase.scaleY = 0.35;
        this.text_Vertical.scaleX = 0.5;
        this.text_Vertical.scaleY = 0.5;
        this.endGame.scaleX = 1;
        this.endGame.scaleY = 1;
    }

    private handleEndGame(): void {
        if(this.isDone) return;
        
        cc.audioEngine.play(this.completeSound, false, 1);
        this.node.getComponent(cc.Animation).play("EndAnim")
        this.CharacterDress.active = false;
        this.dollBase.active = false;
        this.eraser.active = false;
        this.fakeEraser.active = false;

        this.overlay.active = true;
        this.endGame.active = true;
        this.shining.getComponent(cc.Animation).play("Rotate");

        this.isPlayEraserSound = false;
        cc.audioEngine.stop(this.soundState);

        this.scheduleOnce(() => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        }, 2.5)
    }

    protected update(dt: number): void {
        this.handleRotate();
        if (this.SratchAble.isWin) {
            this.handleEndGame();
            this.isDone = true;
        }

        if(this.isPlayEraserSound) {
            this.hand.active = false;
        }

        if(this.currentPos != null) {
            if(this.currentPos.x != this.eraserInitPos.x) {
                this.hand.active = false;
            }
        }
    }
}
