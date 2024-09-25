const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // node
    @property(cc.Node)
    GamePlay: cc.Node = null;
    @property(cc.Node)
    bg2: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    combine: cc.Node = null;
    @property(cc.Node)
    dollBubleContainer: cc.Node = null;
    @property(cc.Node)
    henshinContainer: cc.Node = null;
    @property(cc.ParticleSystem)
    henshinParticle: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    breakDollBubbleParticle: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    fake_breakDollBubbleParticle: cc.ParticleSystem = null;

    @property(cc.Node)
    CTA: cc.Node = null;
    @property(cc.Node)
    btnPlay: cc.Node = null;

    // array
    @property([cc.Node])
    items: cc.Node[] = [];

    @property([cc.Node])
    BubbleBreaks: cc.Node[] = [];
    @property([cc.ParticleSystem])
    BubbleBreakAnims: cc.ParticleSystem[] = [];

    @property([cc.Node])
    DollBubbleItems: cc.Node[] = [];

    // character
    @property(cc.Node)
    CharacterBubble: cc.Node = null;

    @property(cc.Node)
    CharacterHairDefault: cc.Node = null;
    @property(cc.Node)
    CharacterDressDefault: cc.Node = null;
    @property(cc.Node)
    CharacterShirtDefault: cc.Node = null;

    @property([cc.Node])
    CharacterItems: cc.Node[] = [];
    @property([cc.Node])
    CharacterBackHairs: cc.Node[] = [];

    @property([cc.Node])
    Bubbles: cc.Node[] = [];

    // state
    currentPos: cc.Vec2 = null;
    isRotate: boolean = true;
    firstClick: boolean = false;
    clickStep: number = 1;
    btnButtonClickStep: number = 0;
    isClickFree: boolean = false;
    rotateState: number = 0.5;
    combinedTime: number = 0;

    ItemPositionDirections: object[] = [

    ];
    ItemCanMove: boolean[] = [true, true, true, true, true, true, true, true, true];
    moveActions: cc.Action[] = [];
    moveParticleActions: cc.Action[] = [];
    ItemCombinded: boolean[] = [false, false, false, false, false, false, false, false, false]
    ItemCombindedName: string = "";
    ItemWithHenshin: number[] = [];
    ChoosenItems: cc.Node[] = []

    // sounds
    @property(cc.AudioClip)
    bgSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    clickSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    henShin: cc.AudioClip = null;
    @property(cc.AudioClip)
    henShin2: cc.AudioClip = null;

    protected onLoad(): void {
        this.ItemPositionDirections = [{
            name: "Shoe1",
            currentDirection: {
                x: 80,
                y: 113
            },
            directions: [{
                x: this.items[0].x + 10,
                y: this.items[0].y + 10
            },
            {
                x: this.items[0].x - 10,
                y: this.items[0].y - 10
            },
            {
                x: this.items[0].x - 15,
                y: this.items[0].y + 15
            }
            ]
        },
        {
            name: "Shoe2",
            currentDirection: {
                x: 97,
                y: -54
            },
            directions: [{
                x: this.items[1].x + 10,
                y: this.items[1].y + 10
            },
            {
                x: this.items[1].x - 10,
                y: this.items[1].y - 10
            },
            {
                x: this.items[1].x - 10,
                y: this.items[1].y + 10
            }
            ]
        },
        {
            name: "Shoe3",
            currentDirection: {
                x: -100,
                y: -54
            },
            directions: [{
                x: this.items[2].x - 10,
                y: this.items[2].y + 10
            },
            {
                x: this.items[2].x + 10,
                y: this.items[2].y + 10
            },
            {
                x: this.items[2].x + 10,
                y: this.items[2].y - 10
            }
            ]
        },
        {
            name: "Dress1",
            currentDirection: {
                x: -51,
                y: 118
            },
            directions: [{
                x: this.items[3].x - 10,
                y: this.items[3].y + 10
            },
            {
                x: this.items[3].x + 10,
                y: this.items[3].y - 10
            },
            {
                x: this.items[3].x - 10,
                y: this.items[3].y - 10
            }
            ]
        },
        {
            name: "Dress2",
            currentDirection: {
                x: 21,
                y: -193
            },
            directions: [{
                x: this.items[4].x + 10,
                y: this.items[4].y - 10
            },
            {
                x: this.items[4].x - 10,
                y: this.items[4].y + 10
            },
            {
                x: this.items[4].x - 10,
                y: this.items[4].y + 10
            }
            ]
        },
        {
            name: "Dress3",
            currentDirection: {
                x: -85,
                y: -165
            },
            directions: [{
                x: this.items[5].x - 10,
                y: this.items[5].y - 10
            },
            {
                x: this.items[5].x + 10,
                y: this.items[5].y - 10
            },
            {
                x: this.items[5].x + 10,
                y: this.items[5].y + 10
            }
            ]
        },
        {
            name: "Hair1",
            currentDirection: {
                x: -101,
                y: 36
            },
            directions: [{
                x: this.items[6].x - 10,
                y: this.items[6].y + 10
            },
            {
                x: this.items[6].x - 10,
                y: this.items[6].y - 10
            },
            {
                x: this.items[6].x + 10,
                y: this.items[6].y - 10
            }
            ]
        },
        {
            name: "Hair2",
            currentDirection: {
                x: 103,
                y: 32
            },
            directions: [{
                x: this.items[7].x - 10,
                y: this.items[7].y + 10
            },
            {
                x: this.items[7].x + 10,
                y: this.items[7].y - 10,
            },
            {
                x: this.items[7].x + 10,
                y: this.items[7].y + 10,
            }
            ]
        },
        {
            name: "Hair3",
            currentDirection: {
                x: 110,
                y: -145
            },
            directions: [{
                x: this.items[8].x + 10,
                y: this.items[8].y - 10
            },
            {
                x: this.items[8].x + 10,
                y: this.items[8].y + 10
            },
            {
                x: this.items[8].x - 10,
                y: this.items[8].y - 10
            }
            ]
        },];

        this.CharacterBubble.active = false;
        this.DollBubbleItems.forEach(item => {
            item.active = false;
        });
        this.henshinContainer.active = false;
    }

    protected start(): void {
        // cc.audioEngine.play(this.bgSound, true, 1);

        this.handleRotate();

        this.handleGamePlay();

        this.registerEvent();

        this.scheduleOnce(() => {
            this.text.getComponent(cc.Animation).play("Text_RengReng");
        }, 0.5);
        this.CharacterBubble.getComponent(cc.Animation).play("DollBaseBubble");
    }

    private registerEvent(): void {
        // ironsource
        this.bg2.on(cc.Node.EventType.TOUCH_START, () => {
            if (this.firstClick) {
                return;
            }
            cc.audioEngine.play(this.bgSound, true, 1);
            this.firstClick = true;
        });

        this.items.forEach((item, index) => {
            item.on(cc.Node.EventType.TOUCH_START, (e: cc.Touch) => {
                if (this.combinedTime >= 3) {
                    return;
                }

                this.currentPos = e.getLocation();
                let filter: cc.Action[] = this.moveActions.filter((action) => {
                    return action.originalTarget._name === item.name
                });

                item.stopAction(filter[filter.length - 1]);

                this.Bubbles[index].active = false;
                this.ChoosenItems.push(item);

                if (this.ItemCanMove[index]) {
                    this.combinedTime++
                    cc.audioEngine.play(this.clickSound, false, 1);
                    this.BubbleBreakAnims[index].resetSystem();
                }

                if (this.combinedTime == 3) {
                    this.scheduleOnce(() => {
                        this.ItemCanMove.forEach(status => {
                            status = false;
                        });

                        this.handleHenshinParticle();

                        this.ChoosenItems.forEach(choosen => {
                            let postion: cc.Vec2 = new cc.Vec2(this.dollBubleContainer.x, this.dollBubleContainer.y)
                            const moveAction = cc.moveTo(1.5, postion);
                            choosen.runAction(moveAction)
                        })
                    }, 1);
                }

                this.ItemCanMove[index] = false;

                if (this.firstClick) {
                    return;
                }
                cc.audioEngine.play(this.bgSound, true, 1);
                this.firstClick = true;
            })

            // item.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Touch) => {
            //     // this.currentPos = e.getLocation();

            //     // item.x = this.currentPos.x - cc.winSize.width / 2;
            //     // item.y = this.currentPos.y - cc.winSize.height / 2;
            //     // this.BubbleBreaks[index].x = this.currentPos.x - cc.winSize.width / 2;
            //     // this.BubbleBreaks[index].y = this.currentPos.y - cc.winSize.height / 2;

            //     if (item.getBoundingBox().intersects(this.combine.getBoundingBox())) {
            //         if (!this.ItemCombinded[index]) {
            //             this.combinedTime++

            //             this.ItemCanMove[index] = false;
            //             this.ItemWithHenshin.push(index);
            //             item.active = false;
            //             this.ItemCombindedName = item.name;

            //             // item.off(cc.Node.EventType.TOUCH_END);
            //             // item.off(cc.Node.EventType.TOUCH_CANCEL);
            //             // this.BubbleBreakAnims[index].resetSystem();

            //             this.handleRemoveItemInSameType(index);

            //             this.dollBubleContainer.active = true;
            //             this.DollBubbleItems[index].active = true;

            //             if (this.combinedTime == 3) {
            //                 this.handleHenshinParticle();
            //             }
            //         }

            //         this.ItemCombinded[index] = true
            //     }
            // });

            // item.on(cc.Node.EventType.TOUCH_END, () => {
            // this.ItemCanMove[index] = true;
            //     let random = Math.floor(Math.random() * 3);
            //     const moveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random]);
            //     this.moveActions.push(item.runAction(moveAction));
            // });

            // item.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            //     this.ItemCanMove[index] = true;
            //     let random = Math.floor(Math.random() * 3);
            //     const moveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random]);
            //     this.moveActions.push(item.runAction(moveAction));
            // });
        });
    }

    private handleGamePlay(): void {
        this.dollBubleContainer.getComponent(cc.Animation).play("DollBaseBubble");

        // this.scheduleOnce(() => {
        //     this.registerEvent();
        //     this.isClickFree = true;
        // }, 0.5);

        this.items.forEach((item, index) => {
            item.getComponent(cc.Animation).play("Blink");
            let random = Math.floor(Math.random() * 3);
            const moveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random]);
            // const particleMoveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random])

            this.moveActions.push(item.runAction(moveAction));
            // this.moveParticleActions.push(this.BubbleBreaks[index].runAction(particleMoveAction));

            this.schedule(() => {
                if (!this.ItemCanMove[index]) {
                    return;
                }

                this.handleMoveAction(index, item, this.BubbleBreaks[index])
            }, 1)
        })
    }

    private handleMoveAction(index: number, node: cc.Node, particleSystem: cc.Node) {
        let random = Math.floor(Math.random() * 3);
        const moveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random]);
        // const particleMoveAction = cc.moveTo(1.5, this.ItemPositionDirections[index].directions[random]);
        let action = node.runAction(moveAction);
        // let particleAction = particleSystem.runAction(particleMoveAction);

        this.moveActions.push(action);
        // this.moveParticleActions.push(particleAction);
    }

    private handleRemoveItemInSameType(item: number): void {
        if (item == 0 || item == 1 || item == 2) {
            this.items[0].active = false;
            this.ItemCanMove[0] = false;
            this.BubbleBreakAnims[0].resetSystem();

            this.items[1].active = false;
            this.ItemCanMove[1] = false;
            this.BubbleBreakAnims[1].resetSystem();

            this.items[2].active = false;
            this.ItemCanMove[2] = false;
            this.BubbleBreakAnims[2].resetSystem();
        }

        if (item == 3 || item == 4 || item == 5) {
            this.items[3].active = false;
            this.ItemCanMove[3] = false;
            this.BubbleBreakAnims[3].resetSystem();

            this.items[4].active = false;
            this.ItemCanMove[4] = false;
            this.BubbleBreakAnims[4].resetSystem();

            this.items[5].active = false;
            this.ItemCanMove[5] = false;
            this.BubbleBreakAnims[5].resetSystem();
        }

        if (item == 6 || item == 7 || item == 8) {
            this.items[6].active = false;
            this.ItemCanMove[6] = false;
            this.BubbleBreakAnims[6].resetSystem();

            this.items[7].active = false;
            this.ItemCanMove[7] = false;
            this.BubbleBreakAnims[7].resetSystem();

            this.items[8].active = false;
            this.ItemCanMove[8] = false;
            this.BubbleBreakAnims[8].resetSystem();
        }
    }

    private handleHenshinParticle(): void {
        this.items.forEach(item => {
            item.active = false;
        })
        this.ChoosenItems.forEach(item => {
            item.active = true;
        })

        this.henshinContainer.active = true;
        cc.audioEngine.play(this.henShin, false, 1);
        this.henshinParticle.resetSystem();
        this.dollBubleContainer.getComponent(cc.Animation).stop("DollBaseBubble");
        this.dollBubleContainer.getComponent(cc.Animation).play("HenshinBreak");

        this.scheduleOnce(() => {
            this.henshinParticle.stopSystem();
            this.breakDollBubbleParticle.resetSystem();
            this.bg2.getComponent(cc.Animation).play("ShowBG2");
            this.ChoosenItems.forEach(item => {
                item.active = false;
            })
        }, 1);

        this.scheduleOnce(() => {
            // this.dollBubleContainer.active = false;
            this.CharacterBubble.active = true;
            this.text.active = false;
            // this.CharacterHairDefault.active = false;
            // this.CharacterDressDefault.active = false;
            // this.CharacterShirtDefault.active = false;
            // this.ItemWithHenshin.forEach(number => {
            //     this.CharacterItems[number].active = true;

            //     if (this.CharacterItems[number].name == "hair_1_2") {
            //         this.CharacterBackHairs[0].active = true;
            //     } else if (this.CharacterItems[number].name == "hair_2_2") {
            //         this.CharacterBackHairs[1].active = true;
            //     } else if (this.CharacterItems[number].name == "hair_3_2") {
            //         this.CharacterBackHairs[2].active = true;
            //     }
            // })
        }, 1.2);

        this.scheduleOnce(() => {
            cc.audioEngine.play(this.henShin2, false, 1);
        }, 1.4)

        this.scheduleOnce(() => {
            this.handleShowEndGame();
        }, 2)
    }

    private handleShowEndGame(): void {
        this.CTA.getComponent(cc.Animation).play("ShowBG2");

        // others
        this.btnPlay.on(cc.Node.EventType.TOUCH_START, () => {
            console.log("install");

            cc.audioEngine.stopAll();
            this.node.getComponent("GameController").installHandle();
        });

        // mtg & appllovin
        //    this.bg2.on(cc.Node.EventType.TOUCH_END, () => {
        //          console.log("install");
        //         cc.audioEngine.stopAll();
        //         this.node.getComponent("GameController").installHandle();
        //     });
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
        this.text.y = 200;
        this.GamePlay.scaleX = 0.85;
        this.GamePlay.scaleY = 0.85;
    }

    private setMobile(): void {
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.text.y = 188;
            this.GamePlay.scaleX = 1;
            this.GamePlay.scaleY = 1;
        } else {
            this.text.y = 188;
            this.GamePlay.scaleX = 1;
            this.GamePlay.scaleY = 1;
        }
    }

    private setHorizontalForIpX(): void {
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6
            && cc.view.getFrameSize().height / cc.view.getFrameSize().width < 6.5) {
            this.text.y = 188;
            this.GamePlay.scaleX = 1;
            this.GamePlay.scaleY = 1;
        } else {
            this.text.y = 188;
            this.GamePlay.scaleX = 1;
            this.GamePlay.scaleY = 1;
        }
    }

    private setHorizontalForTablet(): void {
        this.text.y = 188;
        this.GamePlay.scaleX = 1;
        this.GamePlay.scaleY = 1;
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
