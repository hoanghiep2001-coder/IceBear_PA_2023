
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    introCharacter: cc.Node = null;

    @property(cc.Node)
    heplHerTextBox: cc.Node = null;

    @property([cc.Node])
    acnesFocus: cc.Node[] = [];

    @property(cc.Node)
    faceFocus: cc.Node = null;

    @property([cc.Node])
    toolItems: cc.Node[] = [];

    @property([cc.Node])
    impactAreas: cc.Node[] = [];

    @property(Array)
    intersectsStatusArray: boolean[] = [false, false, false, false]

    @property(Number)
    countingAcneArea: number = 0;

    @property(cc.Vec2)
    startPos: cc.Vec2 = null;

    @property(cc.Node)
    mask: cc.Node = null;

    @property(cc.Node)
    acneFace: cc.Node = null;

    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.Node)
    clothe: cc.Node = null;

    @property([cc.Node])
    clotheOptions: cc.Node[] = [];

    @property(cc.Node)
    overlay: cc.Node = null;

    @property(cc.Node)
    endGame: cc.Node = null;

    @property(cc.Node)
    tryAgainBtn: cc.Node = null;

    @property([cc.Node])
    defaultClothes: cc.Node[] = [];

    @property(cc.Node)
    Clothe1: cc.Node = null;

    @property(cc.Node)
    Clothe2: cc.Node = null;

    protected onLoad(): void {
        this.registerEvent();
        this.scheduleOnce(() => {
            this.heplHerTextBox.active = true;
        }, 1)

        this.scheduleOnce(() => {
            this.heplHerTextBox.getComponent(cc.Animation).play("FadeIn1Sec")
        }, 2)

        this.scheduleOnce(() => {
            this.impactAreas[0].active = true;
            this.toolItems[0].active = true;
        }, 3.7)

        this.scheduleOnce(() => {
            this.hand.active = true;
            this.scheduleOnce(() => {
                this.hand.getComponent(cc.Animation).play("FadeIn1Sec")
            }, 2)
            this.acnesFocus.forEach(acne => {
                acne.active = true;
                acne.getComponent(cc.Animation).play("AcneRoll")
            })
        }, 4)
    }

    protected registerEvent(): void {

        this.impactAreas[0].on("touchstart", (e: cc.Touch) => {
            // this.getComponent("AudioManager").playBtnTap();
            this.startPos = e.getLocation();
            this.hand.active = false
        })

        this.impactAreas[0].on("touchmove", (e: cc.Touch) => {
            // FaceWash move where, it's area move to that
            this.impactAreas[0].setPosition(
                this.impactAreas[0].x = this.startPos.x - cc.winSize.width / 2,
                this.impactAreas[0].y = this.startPos.y - cc.winSize.height / 2
            )
            // set pos for faceWash tool
            this.toolItems[0].setPosition(
                this.toolItems[0].x = this.startPos.x - cc.winSize.width / 2 - 50,
                this.toolItems[0].y = this.startPos.y - cc.winSize.height / 2 - 30
            )
            this.startPos = e.getLocation();

            if (
                this.impactAreas[0].getBoundingBox()
                    .intersects(this.impactAreas[1].getBoundingBox())) {
                this.handleIntersectAcne(this.intersectsStatusArray[0], "firstAcne");
                this.intersectsStatusArray[0] = true;
            } else if (
                this.impactAreas[0].getBoundingBox()
                    .intersects(this.impactAreas[2].getBoundingBox())) {
                this.handleIntersectAcne(this.intersectsStatusArray[1], "secondAcne");
                this.intersectsStatusArray[1] = true;
            }
        })
    }

    protected handleIntersectAcne(atOnce: boolean, name: string): void {
        // set action for tool
        if (!atOnce) {
            this.toolItems[0].getComponent(sp.Skeleton).setAnimation(0, "action", true)

            this.scheduleOnce(() => {
                this.toolItems[0].getComponent(sp.Skeleton).setAnimation(0, "idle", false)
            }, 1)
        }

        if (!atOnce && name === "firstAcne") {
            this.countingAcneArea++;
            this.acnesFocus[1].active = false;
            this.toolItems[1].active = true;
            this.getComponent("AudioManager").playCreamSound();
            this.toolItems[1].getComponent(sp.Skeleton).setAnimation(0, "action", false)
        } else if (!atOnce && name === "secondAcne") {
            this.countingAcneArea++;
            this.acnesFocus[0].active = false;
            this.toolItems[2].active = true;
            this.getComponent("AudioManager").playCreamSound();
            this.toolItems[2].getComponent(sp.Skeleton).setAnimation(0, "action", false)
        } else if (!atOnce && name === "firstCream") {
            this.getComponent("AudioManager").playCleanFaceSound();
            this.countingAcneArea++;
        } else if (!atOnce && name === "secondCream") {
            // this.getComponent("AudioManager").playCleanFaceSound();
            this.countingAcneArea++;
        }

        // face wash part
        if (this.countingAcneArea === 2) {
            this.mask.active = true;
            // hide wash Face tool
            this.impactAreas[0].active = false;
            this.toolItems[0].getComponent(cc.Animation).play("FadeIn1Sec");
            this.scheduleOnce(() => {
                this.toolItems[1].getComponent(cc.Animation).play("FadeIn1Sec");
                this.toolItems[2].getComponent(cc.Animation).play("FadeIn1Sec");
            }, 0.5)
            this.handleShowSponge();
        }

        // sponge part
        if (this.countingAcneArea === 4 && !atOnce) {
            this.acneFace.active = false;
            this.mask.getComponent(cc.Animation).play("FadeIn1Sec");
            this.toolItems[3].getComponent(cc.Animation).play("FadeIn1Sec")

            // choose clothe part
            this.scheduleOnce(() => {
                this.introCharacter.getComponent(cc.Animation).play("CharacterZoomOut")
            }, 1.5)

            this.scheduleOnce(() => {
                this.clothe.active = true;
            }, 3)

            this.clotheOptions.forEach(option => {
                option.on("touchend", () => {
                    // others install
                    // cc.audioEngine.stopAll();
                    // this.getComponent("GameController").installHandle()

                    // google
                    this.defaultClothes[0].active = false;
                    this.defaultClothes[1].active = false;
                    this.getComponent("AudioManager").playBtnTap();
                    if (option.name === "Option1") {
                        this.Clothe1.active = true;

                        this.scheduleOnce(() => {
                            this.getComponent("AudioManager").playEndSound();
                            this.endGame.active = true;
                            this.overlay.active = true;
                        }, 1)
                    } else {
                        this.Clothe2.active = true;
                        this.defaultClothes[1].active = true;
                        this.scheduleOnce(() => {
                            this.getComponent("AudioManager").playEndSound();
                            this.endGame.active = true;
                            this.overlay.active = true;
                        }, 1)
                    }
                })
            })

            // google
            this.tryAgainBtn.on("touchend", () => {
                console.log("install");
                

                cc.audioEngine.stopAll();
                this.getComponent("GameController").installHandle()
            })
        }
    }

    protected handleShowSponge(): void {
        this.scheduleOnce(() => {
            this.toolItems[3].active = true;
        }, 2)

        this.toolItems[3].on("touchstart", (e: cc.Touch) => {
            this.startPos = e.getLocation();
        })

        this.toolItems[3].on("touchmove", (e: cc.Touch) => {
            this.toolItems[3].setPosition(
                this.toolItems[3].x = this.startPos.x - cc.winSize.width / 2,
                this.toolItems[3].y = this.startPos.y - cc.winSize.height / 2
            )
            this.startPos = e.getLocation();
            if (
                this.toolItems[3].getBoundingBox()
                    .intersects(this.impactAreas[1].getBoundingBox())) {
                this.handleIntersectAcne(this.intersectsStatusArray[2], "firstCream");
                this.intersectsStatusArray[2] = true;
            } else if (
                this.toolItems[3].getBoundingBox()
                    .intersects(this.impactAreas[2].getBoundingBox())) {
                this.handleIntersectAcne(this.intersectsStatusArray[3], "secondCream");
                this.intersectsStatusArray[3] = true;
            }
        })
    }

}
