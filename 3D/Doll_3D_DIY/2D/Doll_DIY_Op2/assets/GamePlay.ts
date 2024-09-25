const { ccclass, property } = cc._decorator;

@ccclass
export default class Gameplay extends cc.Component {

    // node
    @property(cc.Node)
    doll: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    progressCircle: cc.Node = null;
    @property(cc.Node)
    impactArea: cc.Node = null;
    @property(cc.Node)
    suggest: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    suggestStep2: cc.Node = null;
    @property(cc.Node)
    progressCircle2: cc.Node = null;
    @property(cc.Node)
    hand2: cc.Node = null;

    // graphics

    // state
    currentPosition: cc.Vec2;
    isTouch: boolean = false;

    // sound
    @property(cc.AudioClip)
    bgSound: cc.AudioClip;
    @property(cc.AudioClip)
    drawEyeBrow: cc.AudioClip;
    @property(cc.AudioClip)
    clickBtn: cc.AudioClip;
    @property(cc.AudioClip)
    doneStep: cc.AudioClip;

    public onLoad() {   
        cc.audioEngine.play(this.bgSound, true, 1)
        this.registerEvent();

        this.scheduleOnce(() => {
            this.suggest.active = true;
            this.suggest.getComponent(cc.Animation).play("Show")
        }, 0.5)

        this.scheduleOnce(() => {
            this.hand.active = true;
        }, 1.3)
    };

    private registerEvent():void {
        this.progressCircle.on("touchstart", (e: cc.Touch) => {
            this.currentPosition = e.getLocation();
            this.hand.active  = false
        });

        this.progressCircle.on("touchmove", (e: cc.Touch) => {
            this.progressCircle.x = this.currentPosition.x - cc.winSize.width / 2;

            if(this.progressCircle.getBoundingBox().intersects(this.impactArea.getBoundingBox())) {
                if(!this.isTouch) {
                    this.doll.getComponent(sp.Skeleton).setAnimation(0, "pose", false);
                    this.suggest.getComponent(cc.Animation).play("Fade")

                    this.scheduleOnce(() => {
                        cc.audioEngine.play(this.doneStep, false, 1)
                    }, 0.5)

                    this.scheduleOnce(() => {
                        this.handleStepSecond()
                    }, 1)
                }
                this.isTouch = true;
            }
            
            this.currentPosition = e.getLocation();
        })
    }

    private handleStepSecond(): void {
        this.suggestStep2.active = true;
        this.hand2.active = true;

        this.progressCircle2.on("touchend", () => {
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        })

        this.progressCircle2.on("touchmove", () => {
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        })

        // mtg & applovin
        // this.background.on("touchend", () => {
        //     cc.audioEngine.stopAll();
        //     this.node.getComponent("GameController").installHandle();
        // })
    }
}
