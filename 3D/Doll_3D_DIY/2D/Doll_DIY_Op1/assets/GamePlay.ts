const { ccclass, property } = cc._decorator;

@ccclass
export default class Gameplay extends cc.Component {

    // node
    @property(cc.Node)
    dollBase: cc.Node = null;
    @property(cc.Node)
    brushEyeBrow: cc.Node = null;
    @property(cc.Node)
    lineEyeBrow: cc.Node = null;
    @property(cc.Node)
    eyeBrow: cc.Node = null;
    @property(cc.Node)
    impactArea: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    handSelectOp: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;

    // graphics
    @property(cc.Graphics)
    graphics: cc.Graphics;

    // array
    @property([cc.Node])
    hairOptions: cc.Node[] = [];

    // state
    currentPosition: cc.Vec2;
    isTouched: boolean = false;
    eyeBrowSound: number = null
    isDraw: boolean = false;

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
            this.dollBase.getComponent(cc.Animation).play("DollBaseAnim1")
        }, 0.5)

        this.scheduleOnce(() => {
            this.hand.active = true;
        }, 1.8)
    };

    private registerEvent = (): void => {
        this.brushEyeBrow.on("touchstart", (e: cc.Touch) => {
            this.currentPosition = e.getLocation();
            this.hand.active = false;
        });

        this.brushEyeBrow.on("touchmove", (e: cc.Touch) => {
            if (!this.isTouched && this.impactArea.getBoundingBox().intersects(this.lineEyeBrow.getBoundingBox())) {
                // this.graphicss
                this.graphics.lineWidth = 5;
                this.graphics.strokeColor = new cc.Color(165, 42, 42);
                this.graphics.moveTo(
                    this.currentPosition.x - cc.winSize.width / 2 - 50,
                    this.currentPosition.y - cc.winSize.height / 2 - 30
                );
                this.graphics.lineTo(
                    e.getLocation().x - cc.winSize.width / 2 - 50,
                    e.getLocation().y - cc.winSize.height / 2 - 30
                );
                this.graphics.stroke();
                this.playDrawEyeBrowSound();
            }

            this.impactArea.x = this.currentPosition.x - cc.winSize.width / 2 - 50;
            this.impactArea.y = this.currentPosition.y - cc.winSize.height / 2 - 30;
            this.brushEyeBrow.x = this.currentPosition.x - cc.winSize.width / 2;
            this.brushEyeBrow.y = this.currentPosition.y - cc.winSize.height / 2;

            // re-render current position
            this.currentPosition = e.getLocation();
        });

        // open store
        this.hairOptions.forEach(option => {
            option.on("touchend", () => {
                cc.audioEngine.play(this.clickBtn, false, 1);
                cc.audioEngine.stopAll();
                this.node.getComponent("GameController").installHandle();
            });
        });
    }

    private playDrawEyeBrowSound = (): void => {
        if (this.eyeBrowSound !== null) return

        this.isDraw = true;
        this.lineEyeBrow.active = false;
        this.eyeBrowSound = cc.audioEngine.play(this.drawEyeBrow, true, 1)

        this.scheduleOnce(() => {
            this.isTouched = true;
            this.brushEyeBrow.active = false;
            this.lineEyeBrow.active = false;
            this.eyeBrow.active = true;
            this.graphics.clear(true);
            cc.audioEngine.stop(this.eyeBrowSound);

            this.scheduleOnce(() => {
                cc.audioEngine.play(this.doneStep, false, 1)
            }, 0.5)

            this.scheduleOnce(() => {
                this.dollBase.getComponent(cc.Animation).play("DollBaseAnim2")
            }, 1.5)

            this.scheduleOnce(() => {
                this.handSelectOp.active = true;

                // mtg & applovin
                this.background.on("touchend", () => {
                    cc.audioEngine.stopAll();
                    this.node.getComponent("GameController").installHandle();
                })
            }, 3)
        }, 0.75)

        // this.brushEyeBrow.getComponent(cc.Animation).play("BrushAnim")
    }
}
