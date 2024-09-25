const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // node
    @property(cc.Node)
    gamePlay: cc.Node = null;
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    character: cc.Node = null;
    @property(cc.Node)
    Spine_Character: cc.Node = null;
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    line: cc.Node = null;
    @property(cc.Node)
    ground: cc.Node = null;
    @property(cc.Node)
    fakeDraw: cc.Node = null;

    @property(cc.Node)
    firstRiver: cc.Node = null;
    @property(cc.Node)
    secondRiver: cc.Node = null;
    @property(cc.Node)
    thirdRiver: cc.Node = null;

    @property(cc.Node)
    firstPearl: cc.Node = null;
    @property(cc.Node)
    secondPearl: cc.Node = null;
    @property(cc.Node)
    thirdPearl: cc.Node = null;
    @property(cc.Node)
    forthPearl: cc.Node = null;

    @property([cc.Node])
    sparkleContainers: cc.Node[] = [];
    @property([cc.Node])
    sparkles: cc.Node[] = [];

    // result
    @property(cc.Node)
    gameResult: cc.Node = null;
    @property(cc.Node)
    game_Win: cc.Node = null;
    @property(cc.Node)
    game_Lose: cc.Node = null;

    @property(cc.Node)
    game_End: cc.Node = null;

    @property([cc.Node])
    shiningRotates: cc.Node[] = [];
    @property([cc.Node])
    lines: cc.Node[] = [];
    @property([cc.Node])
    fakeRivers: cc.Node[] = [];

    // state 
    isRotate: boolean = false;
    speed: number = 200;
    drawing: cc.Graphics = null;
    currentPos: cc.Vec2 = null;
    targetPoints: cc.Vec2[] = [];
    currentIndex: number = 0;
    isDrawing: boolean = true;
    drawSoundState: number = null;
    runSoundState: number = null;
    isScaleUp: boolean = false;
    isScaleDown: boolean = false;
    isPlayBgSound: boolean = false;
    isRunning: boolean = false;

    tempDirectionX: number = 0;
    tempDirectionY: number = 0;

    isWinGame: boolean = false;
    isLoseGame: boolean = false;
    isScaled: boolean = false;

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
    eatSound: cc.AudioClip = null;

    protected onLoad(): void {
        this.gameResult.active = false;
        this.game_Lose.active = false;
        this.game_Lose.opacity = 0;
        this.game_Win.active = false;
        this.game_Win.opacity = 0;
        this.game_End.active = false;
    }

    protected start(): void {
        cc.audioEngine.play(this.bgSound, true, 1);
        this.gamePlay.getComponent(cc.Animation).play("GamePlayAnim");
        this.drawing = this.line.getComponent(cc.Graphics);

        this.registerEvent();
    }

    private registerEvent(): void {
        // ironsource
        // this.background.on(cc.Node.EventType.TOUCH_END, () => {
        //     if(this.isPlayBgSound) {
        //         return;
        //     }

        //     this.isPlayBgSound = true;
        //     cc.audioEngine.play(this.bgSound, true, 1);
        // });

        this.character.on(
            cc.Node.EventType.TOUCH_START,
            (e: cc.Touch) => {
                if(this.isRunning) {
                    return;
                }

                this.currentPos = e.getLocation();
                this.isDrawing = true;
                this.drawSoundState = cc.audioEngine.play(this.drawSound, true, 1);
                this.gamePlay.getComponent(cc.Animation).stop();
                this.hand.active = false;
                this.lines.forEach(line => {
                    line.active = false;
                })

                // ironsource
                // if(!this.isPlayBgSound) {
                //     this.isPlayBgSound = true;
                //     cc.audioEngine.play(this.bgSound, true, 1);
                // } else {
                //     return;
                // }
            },
            this
        );

        this.character.on(
            cc.Node.EventType.TOUCH_MOVE,
            (e: cc.Touch) => {
                if (this.isRunning) {
                    return;
                }

                this.drawing.lineWidth = 8;
                this.drawing.moveTo(
                    this.currentPos.x - cc.winSize.width / 2,
                    this.currentPos.y - cc.winSize.height / 2
                );
                this.drawing.lineTo(
                    e.getLocation().x - cc.winSize.width / 2,
                    e.getLocation().y - cc.winSize.height / 2
                );

                this.fakeDraw.x = e.getLocation().x - cc.winSize.width / 2;
                this.fakeDraw.y = e.getLocation().y - cc.winSize.height / 2;

                let lineDrawedX = this.currentPos.x - cc.winSize.width / 2;
                let lineDrawedY = this.currentPos.y - cc.winSize.height / 2;
                let direction = new cc.Vec2(lineDrawedX, lineDrawedY)
                this.targetPoints.push(direction)

                this.currentPos = e.getLocation();
                this.drawing.stroke();
            },
            this
        );

        this.character.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            cc.audioEngine.stop(this.drawSoundState);

            if(this.isRunning) {
                return;
            }

            if(this.fakeDraw.getBoundingBox().intersects(this.fakeRivers[0].getBoundingBox())
                || this.fakeDraw.getBoundingBox().intersects(this.fakeRivers[1].getBoundingBox())
                || this.fakeDraw.getBoundingBox().intersects(this.fakeRivers[2].getBoundingBox())
            ) {
                this.runSoundState = cc.audioEngine.play(this.runSound, true, 1);
                this.isDrawing = false;
                this.Spine_Character.getComponent(sp.Skeleton).setAnimation(0, "Walk05", true);
                this.Spine_Character.getComponent(sp.Skeleton).timeScale = 0.6;
                this.characterMove();
            } else {
                this.drawing.clear();
                this.targetPoints.splice(0)
            }
        });

        this.character.on(cc.Node.EventType.TOUCH_END, () => {
            if(this.isRunning) {
                return;
            }

            cc.audioEngine.stop(this.drawSoundState);
            this.drawing.clear();
            this.targetPoints.splice(0);
        });
    }

    private handleResultGame(result: number): void {
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
        }, 0.5)
        if (result == 1) {
            this.scheduleOnce(() => {

                cc.audioEngine.play(this.winSound, false, 1)
            }, 0.6)

            this.Spine_Character.active = false;
            this.drawing.clear();

            this.gameResult.active = true;
            this.gameResult.getComponent(cc.Animation).play("ResultAnim");
            this.shiningRotates[0].getComponent(cc.Animation).play("Rotate");

            this.scheduleOnce(() => {
                this.game_Win.active = true;
            }, 0.5);

            this.scheduleOnce(() => {
                this.gameResult.active = false;
                this.handleEndGame();
            }, 2.5)
        } else {
            this.Spine_Character.active = false;
            this.drawing.clear();

            this.gameResult.active = true;
            this.gameResult.getComponent(cc.Animation).play("ResultAnim");
            this.shiningRotates[1].getComponent(cc.Animation).play("Rotate");

            this.scheduleOnce(() => {
                this.game_Lose.active = true;
            }, 0.5);

            this.scheduleOnce(() => {

                cc.audioEngine.play(this.loseSound, false, 1)
            }, 0.6)

            this.scheduleOnce(() => {
                this.gameResult.active = false;
                this.handleEndGame();
            }, 2.5);
        }
    }

    private handleEndGame(): void {
        cc.audioEngine.play(this.bgSound, true, 1);
        this.game_End.active = true;
        this.gamePlay.active = false;
        this.background.on(cc.Node.EventType.TOUCH_START, () => {
            console.log("true");
            
            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        });
    }

    private characterMove(): void {
        if (this.currentIndex >= this.targetPoints.length) {
            cc.audioEngine.stop(this.runSoundState)
            return;
        }

        if (this.isDrawing) {
            return;
        }

        this.isRunning = true;
        let targetPosition = this.targetPoints[this.currentIndex];

        let CharPosition = new cc.Vec2(this.Spine_Character.x, this.Spine_Character.y);
        let direction = new cc.Vec3(targetPosition.x, targetPosition.y, 0);

        let scaleX = (direction.x > CharPosition.x) ? 0.2 : -0.2;

        cc.tween(this.Spine_Character)
        .to(targetPosition.sub(CharPosition).mag() / this.speed, { position: direction })
        .call(() => {
            this.Spine_Character.scaleX = scaleX;
            console.log(direction.x - CharPosition.x);
            
            this.currentIndex++;
            this.characterMove();
        })
        .start();
        this.character.x = this.Spine_Character.x;
        this.character.y = this.Spine_Character.y + 25;
    }

    private handleEatPearl(): void {
        if(this.character.getBoundingBox().intersects(this.firstPearl.getBoundingBox())) {
            if(!this.firstPearl.active) {
                return;
            }

            cc.audioEngine.play(this.eatSound, false, 1);
            let pos : cc.Vec2 = this.firstPearl.getPosition();
            this.sparkles[0].active = true;
            this.sparkleContainers[0].x = pos.x;
            this.sparkleContainers[0].y = pos.y;
            this.firstPearl.active = false;
        } 

        if(this.character.getBoundingBox().intersects(this.secondPearl.getBoundingBox())) {
            if(!this.secondPearl.active) {
                return;
            }

            cc.audioEngine.play(this.eatSound, false, 1);
            let pos : cc.Vec2 = this.secondPearl.getPosition();
            this.sparkles[1].active = true;
            this.sparkleContainers[1].x = pos.x;
            this.sparkleContainers[1].y = pos.y;
            this.secondPearl.active = false;
        }

        if(this.character.getBoundingBox().intersects(this.forthPearl.getBoundingBox())) {
            if(!this.forthPearl.active) {
                return;
            }

            cc.audioEngine.play(this.eatSound, false, 1);
            let pos : cc.Vec2 = this.forthPearl.getPosition();
            this.sparkles[3].active = true;
            this.sparkleContainers[3].x = pos.x;
            this.sparkleContainers[3].y = pos.y;
            this.forthPearl.active = false;
        }

        if(this.character.getBoundingBox().intersects(this.thirdPearl.getBoundingBox())) {
            if(!this.thirdPearl.active) {
                return;
            }

            cc.audioEngine.play(this.eatSound, false, 1);
            let pos : cc.Vec2 = this.thirdPearl.getPosition();
            this.sparkles[2].active = true;
            this.sparkleContainers[2].x = pos.x;
            this.sparkleContainers[2].y = pos.y;
            this.thirdPearl.active = false;
        }
    }

    private handleCollideRiver(): void {
        if(
            this.character.getBoundingBox().intersects(this.fakeRivers[0].getBoundingBox()) ||
            this.character.getBoundingBox().intersects(this.fakeRivers[2].getBoundingBox())
        ) {
            if(this.isLoseGame) {
                return;
            }

            this.isLoseGame = true;
            this.handleResultGame(0);
        }

        if(
            this.character.getBoundingBox().intersects(this.fakeRivers[0].getBoundingBox()) && !this.isScaled
        ) {
            this.isScaled = true;
            this.firstRiver.getComponent(cc.Animation).play("Blink_Large");
        }

        if(
            this.character.getBoundingBox().intersects(this.fakeRivers[1].getBoundingBox())
        ) {
            if(this.isScaled) {
                return;
            }

            this.isScaled = true;
            this.secondRiver.getComponent(cc.Animation).play("Blink");
        }

        if(
            this.character.getBoundingBox().intersects(this.fakeRivers[2].getBoundingBox())
        ) {
            if(this.isScaled) {
                return;
            }

            this.isScaled = true;
            this.thirdRiver.getComponent(cc.Animation).play("Blink");
        }

        if(
            this.character.getBoundingBox().intersects(this.fakeRivers[1].getBoundingBox())
        ) {
            if(this.isWinGame) {
                return;
            }

            this.isWinGame = true;
            this.handleResultGame(1);
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

    private setHorizontal(): void {
        this.firstPearl.y = 112;
        this.firstPearl.x = -55;
        this.secondPearl.y = -136;
        this.secondPearl.x = 0;
        this.thirdPearl.y = 60;
        this.thirdPearl.x = -15;
        this.forthPearl.y = -70;
        this.forthPearl.x = 0;

        this.firstRiver.y = -180;
        this.secondRiver.y = 180;
        this.thirdRiver.y = 180;

        this.fakeRivers[0].y =  -180 - 20;
        this.fakeRivers[1].y = 180 - 20;
        this.fakeRivers[2].y = 180 - 20;

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
        //     // Iphone 6 / 6 plus / 7 / 7 Plus / X
        //     this.setHorizontalForIpX();
        // } else {
        //     this.setHorizontalForTablet();
        // }
    }

    private setHorizontalForIpX(): void {

    }

    private setHorizontalForTablet(): void {

    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.firstPearl.y = 130;
        this.firstPearl.x = -60;
        this.secondPearl.y = -180;
        this.secondPearl.x = 0;
        this.thirdPearl.y = 70;
        this.thirdPearl.x = -30;
        this.forthPearl.y = -110;
        this.forthPearl.x = 0;

        this.firstRiver.y = -250;
        this.secondRiver.y = 220;
        this.thirdRiver.y = 220;

        this.fakeRivers[0].y =  -250 - 20;
        this.fakeRivers[1].y = 220 - 20;
        this.fakeRivers[2].y = 220 - 20;
    }

    private setMobile(): void {
        this.firstPearl.y = 120;
        this.firstPearl.x = -50;
        this.secondPearl.y = -146;
        this.secondPearl.x = 0;
        this.thirdPearl.y = 60;
        this.thirdPearl.x = -30;
        this.forthPearl.y = -95;
        this.forthPearl.x = 0;

        this.firstRiver.y = -190;
        this.secondRiver.y = 200;
        this.thirdRiver.y = 200;

        this.fakeRivers[0].y = -190 - 20;
        this.fakeRivers[1].y = 200 - 20;
        this.fakeRivers[2].y = 200 - 20;
    }

    protected update(dt: number): void {
        this.handleRotate();
        this.handleEatPearl();
        this.handleCollideRiver();
    }
}
