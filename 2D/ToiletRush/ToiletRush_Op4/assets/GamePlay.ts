const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    Spine_Boy: cc.Node = null;
    @property(cc.Node)
    BoyArea: cc.Node = null;
    @property(cc.Node)
    Spine_Girl: cc.Node = null;
    @property(cc.Node)
    GirlArea: cc.Node = null;
    @property(cc.Node)
    BoyPencil: cc.Node = null;
    @property(cc.Node)
    GirlPencil: cc.Node = null;

    @property(cc.Node)
    fakeDraw: cc.Node = null;

    @property(cc.Node)
    boyCollide: cc.Node = null;
    @property(cc.Node)
    girlCollide: cc.Node = null;

    @property(cc.Node)
    Spine_Fight: cc.Node = null;
    @property(cc.Node)
    angry: cc.Node = null;
    @property(cc.Node)
    oldGrandma: cc.Node = null;

    @property(cc.Node)
    WinGame: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;
    @property(cc.Node)
    rotate: cc.Node = null;
    @property(cc.Node)
    endGame: cc.Node = null;

    // array
    @property([cc.Node])
    Houses: cc.Node[] = [];

    // state 
    currentPos: cc.Vec2 = null;

    BoyDrawing: cc.Graphics = null;
    GirlDrawing: cc.Graphics = null;

    boyTargetPoints: cc.Vec2[] = [];
    girlTargetPoints: cc.Vec2[] = [];

    speed: number = 150;
    boyRoadIndex: number = 0;
    girlRoadIndex: number = 0;
    drawSoundState: number = null;
    runSoundState: number = null;
    fightSoundState: number = null;

    isRotate: boolean = false;
    isDrawing: boolean = true;
    boyRunning: boolean = false;
    isPlayBgSound: boolean = false;
    isBoyInRedHouse: boolean = false;
    isBoyInBlueHouse: boolean = false;
    isGirlInRedHouse: boolean = false;
    isGirlInBlueHouse: boolean = false;
    isFight: boolean = false;
    isDrawGirlDone: boolean = false;
    isDrawBoyDone: boolean = false;
    isRunGame: boolean = false;
    isInHouseAll: boolean = false;

    // sound 
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    winSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    loseSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    runSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    drawSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    fightSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    inHouseSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    screamSound: cc.AudioClip = null;

    protected onLoad(): void {
        this.endGame.active = false;
    }

    protected start(): void {
        this.registerEvent();
    }

    private registerEvent(): void {
        // ironsource
        this.background.on(cc.Node.EventType.TOUCH_END, () => {
            if (this.isPlayBgSound) {
                return;
            }

            this.isPlayBgSound = true;
            cc.audioEngine.play(this.bgSound, true, 1);
        });

        this.handleBoyEvent();

        this.handleGirlEvent();
    }

    private handleBoyEvent(): void {
        this.BoyDrawing = this.BoyPencil.getComponent(cc.Graphics);

        this.BoyArea.on(
            cc.Node.EventType.TOUCH_START,
            (e: cc.Touch) => {
                this.currentPos = e.getLocation();
                this.isDrawing = true;
                this.drawSoundState = cc.audioEngine.play(this.drawSound, true, 1);
                // this.gamePlay.getComponent(cc.Animation).stop();
                // this.hand.active = false;
                // this.lines.forEach(line => {
                //     line.active = false;
                // })
            },
            this
        );

        this.BoyArea.on(
            cc.Node.EventType.TOUCH_MOVE,
            (e: cc.Touch) => {
                this.BoyDrawing.lineWidth = 8;
                this.BoyDrawing.moveTo(
                    this.currentPos.x - cc.winSize.width / 2,
                    this.currentPos.y - cc.winSize.height / 2
                );
                this.BoyDrawing.lineTo(
                    e.getLocation().x - cc.winSize.width / 2,
                    e.getLocation().y - cc.winSize.height / 2
                );

                this.fakeDraw.x = e.getLocation().x - cc.winSize.width / 2;
                this.fakeDraw.y = e.getLocation().y - cc.winSize.height / 2;

                let lineDrawedX = this.currentPos.x - cc.winSize.width / 2;
                let lineDrawedY = this.currentPos.y - cc.winSize.height / 2;
                let direction = new cc.Vec2(lineDrawedX, lineDrawedY)
                this.boyTargetPoints.push(direction)

                this.currentPos = e.getLocation();
                this.BoyDrawing.stroke();
            },
            this
        );

        this.BoyArea.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            cc.audioEngine.stop(this.drawSoundState);
            if (this.fakeDraw.getBoundingBox().intersects(this.Houses[0].getBoundingBox())
                || this.fakeDraw.getBoundingBox().intersects(this.Houses[1].getBoundingBox())
            ) {
                this.isDrawing = false;
                this.Spine_Boy.getComponent(sp.Skeleton).timeScale = 0.6;
                this.isDrawBoyDone = true;
            } else {
                this.BoyDrawing.clear();
                this.boyTargetPoints.splice(0);
            }
        });

        this.BoyArea.on(cc.Node.EventType.TOUCH_END, () => {
            cc.audioEngine.stop(this.drawSoundState);
            this.BoyDrawing.clear();
            this.boyTargetPoints.splice(0);
        });
    }

    private handleGirlEvent(): void {
        this.GirlDrawing = this.GirlPencil.getComponent(cc.Graphics);

        this.GirlArea.on(
            cc.Node.EventType.TOUCH_START,
            (e: cc.Touch) => {
                this.currentPos = e.getLocation();
                this.isDrawing = true;
                this.drawSoundState = cc.audioEngine.play(this.drawSound, true, 1);
                // this.gamePlay.getComponent(cc.Animation).stop();
                // this.hand.active = false;
                // this.lines.forEach(line => {
                //     line.active = false;
                // })
            },
            this
        );

        this.GirlArea.on(
            cc.Node.EventType.TOUCH_MOVE,
            (e: cc.Touch) => {
                this.GirlDrawing.lineWidth = 8;
                this.GirlDrawing.moveTo(
                    this.currentPos.x - cc.winSize.width / 2,
                    this.currentPos.y - cc.winSize.height / 2
                );
                this.GirlDrawing.lineTo(
                    e.getLocation().x - cc.winSize.width / 2,
                    e.getLocation().y - cc.winSize.height / 2
                );

                this.fakeDraw.x = e.getLocation().x - cc.winSize.width / 2;
                this.fakeDraw.y = e.getLocation().y - cc.winSize.height / 2;

                let lineDrawedX = this.currentPos.x - cc.winSize.width / 2;
                let lineDrawedY = this.currentPos.y - cc.winSize.height / 2;
                let direction = new cc.Vec2(lineDrawedX, lineDrawedY)
                this.girlTargetPoints.push(direction);

                this.currentPos = e.getLocation();
                this.GirlDrawing.stroke();
            },
            this
        );

        this.GirlArea.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            cc.audioEngine.stop(this.drawSoundState);
            if (
                this.fakeDraw.getBoundingBox().intersects(this.Houses[1].getBoundingBox())
            ) {
                // this.runSoundState = cc.audioEngine.play(this.runSound, true, 1);
                this.isDrawing = false;
                this.Spine_Girl.getComponent(sp.Skeleton).timeScale = 0.6;
                this.isDrawGirlDone = true;
            } else {
                this.GirlDrawing.clear();
                this.girlTargetPoints.splice(0);
            }
        });

        this.GirlArea.on(cc.Node.EventType.TOUCH_END, () => {
            cc.audioEngine.stop(this.drawSoundState);
            this.GirlDrawing.clear();
            this.girlTargetPoints.splice(0);
        });
    }

    private boyMove(): void {
        if (this.boyRoadIndex >= this.boyTargetPoints.length) {
            cc.audioEngine.stop(this.runSoundState)
            return;
        }

        if (this.isDrawing) {
            return;
        }

        let targetPosition = this.boyTargetPoints[this.boyRoadIndex];

        let CharPosition = new cc.Vec2(this.Spine_Boy.x, this.Spine_Boy.y);
        let direction = new cc.Vec3(targetPosition.x, targetPosition.y, 0);

        let scaleX = (direction.x > CharPosition.x) ? 0.25 : -0.25;

        cc.tween(this.Spine_Boy)
            .to(targetPosition.sub(CharPosition).mag() / this.speed, { position: direction })
            .call(() => {
                this.Spine_Boy.scaleX = scaleX;
                this.boyRoadIndex++;
                this.boyMove();
            })
            .start();
        this.boyCollide.setPosition(this.Spine_Boy.x, this.Spine_Boy.y + 21);
    }

    private girlMove(): void {
        if (this.girlRoadIndex >= this.girlTargetPoints.length) {
            cc.audioEngine.stop(this.runSoundState);
            return;
        }

        if (this.isDrawing) {
            return;
        }

        let targetPosition = this.girlTargetPoints[this.girlRoadIndex];

        let CharPosition = new cc.Vec2(this.Spine_Girl.x, this.Spine_Girl.y);
        let direction = new cc.Vec3(targetPosition.x, targetPosition.y, 0);

        let scaleX = (direction.x > CharPosition.x) ? 0.25 : -0.25;

        cc.tween(this.Spine_Girl)
            .to(targetPosition.sub(CharPosition).mag() / this.speed, { position: direction })
            .call(() => {
                this.Spine_Girl.scaleX = scaleX;
                this.girlRoadIndex++;
                this.girlMove();
            })
            .start();
        this.girlCollide.setPosition(this.Spine_Girl.x, this.Spine_Girl.y + 21);
    }

    private HanldeDraw(): void {
        if (this.isDrawBoyDone && this.isDrawGirlDone && !this.isRunGame) {
            this.runSoundState = cc.audioEngine.play(this.runSound, true, 1);
            this.Spine_Boy.getComponent(sp.Skeleton).setAnimation(0, "Run_Toilet01", true);
            this.Spine_Girl.getComponent(sp.Skeleton).setAnimation(0, "toilet/Run_Toilet01", true);
            this.isRunGame = true;
            this.boyMove();
            this.girlMove();
        }
    }

    private handleIntersecs(): void {
        if (this.boyCollide.getBoundingBox().intersects(this.Houses[1].getBoundingBox()) && !this.isBoyInRedHouse) {
            this.boyTargetPoints.splice(0)
            cc.audioEngine.play(this.inHouseSound, false, 1);
            this.Spine_Boy.active = false;
            this.BoyArea.active = false;
            this.boyCollide.active = false;
            this.BoyDrawing.clear();
            this.Houses[1].getComponent(cc.Animation).play("Blink");
            this.isBoyInRedHouse = true;
        }

        if (this.boyCollide.getBoundingBox().intersects(this.Houses[0].getBoundingBox()) && !this.isBoyInBlueHouse) {
            this.boyCollide.active = false;
            this.boyTargetPoints.splice(0)
            cc.audioEngine.play(this.inHouseSound, false, 1);
            this.Spine_Boy.active = false;
            this.BoyArea.active = false;
            
            this.BoyDrawing.clear();
            this.Houses[0].getComponent(cc.Animation).play("Blink");
            this.isBoyInBlueHouse = true;
        }

        if (this.girlCollide.getBoundingBox().intersects(this.Houses[1].getBoundingBox()) && !this.isGirlInRedHouse) {
            this.girlCollide.active = false;
            this.girlTargetPoints.splice(0)
            cc.audioEngine.play(this.inHouseSound, false, 1);
            this.Spine_Girl.active = false;
            this.GirlArea.active = false;
            
            this.GirlDrawing.clear();
            this.Houses[1].getComponent(cc.Animation).play("Blink");
            this.isGirlInRedHouse = true;
        }

        let girl = this.girlCollide.getBoundingBoxToWorld();
        let boy = this.boyCollide.getBoundingBoxToWorld();

        if (girl.intersects(boy) && !this.isFight) {
            let intersection = new cc.Rect();
            let pos = girl.intersection(intersection, boy);
            let FightPos = new cc.Vec2(pos.center.x - cc.winSize.width / 2, pos.center.y - cc.winSize.height / 2 - 10)
            this.Spine_Fight.active = true;
            this.Spine_Fight.x = FightPos.x;
            this.Spine_Fight.y = FightPos.y;

            this.isFight = true;
            cc.audioEngine.play(this.fightSound, false, 1);
            cc.audioEngine.stop(this.runSoundState)

            this.scheduleOnce(() => {
                this.handleEndGame();
            }, 3.5);

            this.Spine_Girl.active = false;
            this.GirlArea.active = false;

            this.BoyArea.active = false;
            this.Spine_Boy.active = false;

            this.boyCollide.active = false;
            this.girlCollide.active = false;

            this.GirlDrawing.clear();
            this.BoyDrawing.clear();
            this.boyTargetPoints.splice(0)
            this.girlTargetPoints.splice(0)
        }

        if ((this.isBoyInBlueHouse || this.isBoyInRedHouse) && this.isGirlInRedHouse && !this.isInHouseAll) {
            this.isInHouseAll = true;
            cc.audioEngine.stop(this.runSoundState);

            if (this.isBoyInRedHouse && this.isGirlInRedHouse) {
                this.scheduleOnce(() => {
                    this.angry.active = true;
                }, 0.5);

                cc.audioEngine.play(this.screamSound, false, 1);
                this.Houses[1].getComponent(cc.Animation).play("ToiCongChuyen");

                this.scheduleOnce(() => {
                    this.angry.active = false;
                    this.oldGrandma.getComponent(cc.Animation).play("DanhGhen");
                }, 1.5);
            } else if (this.isBoyInBlueHouse && this.isGirlInRedHouse) {
                this.scheduleOnce(() => {
                    cc.audioEngine.play(this.winSound, false, 1);
                }, 0.5);

                this.scheduleOnce(() => {
                    this.handleEndGame();
                }, 2);
            }
        }

        if (this.oldGrandma.getBoundingBox().intersects(this.Houses[1].getBoundingBox()) && !this.isFight) {
            this.Spine_Fight.x = this.Houses[1].x;
            this.Spine_Fight.y = this.Houses[1].y - 90;

            this.fightSoundState = cc.audioEngine.play(this.fightSound, true, 1);
            this.isFight = true;
            this.Spine_Fight.active = true;
            this.oldGrandma.active = false;

            this.scheduleOnce(() => {
                this.oldGrandma.getComponent(cc.Animation).stop("DanhGhen");
                cc.audioEngine.stop(this.fightSoundState);
                this.Spine_Fight.active = false;
                this.oldGrandma.active = true;
                this.Houses[1].active = false;
                this.Houses[2].active = true;
                this.oldGrandma.x = this.Houses[1].x;
            }, 3.5);

            this.scheduleOnce(() => {
                this.handleEndGame();
            }, 4.5)
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

    private handleEndGame(): void {
        this.gamePlay.active = true;
        this.endGame.active = true;
        this.Spine_Fight.active = false;
        this.background.on("touchstart", () => {
            console.log("install");
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        });
    }

    private setHorizontal(): void {

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
        //     // Iphone 6 / 6 plus / 7 / 7 Plus / X
        //     this.setHorizontalForIpX();
        // } else {
        //     this.setHorizontalForTablet();
        // }
    }

    // private setHorizontalForIpX(): void {

    // }

    // private setHorizontalForTablet(): void {

    // }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {

    }

    private setMobile(): void {

    }

    protected update(dt: number): void {
        this.handleRotate();
        this.handleIntersecs();
        this.HanldeDraw();
    }
}
