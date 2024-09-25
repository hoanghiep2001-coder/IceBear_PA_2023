import AudioManager from "./AudioManager";
import { GameController } from "./GameController";
import LuffyController from "./LuffyController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // Component
    @property(AudioManager)
    AudioManager: AudioManager;
    @property(GameController)
    GameController: GameController;
    @property(LuffyController)
    LuffyController: LuffyController;


    // node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    pencil: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;

    @property(cc.Node)
    gameHint: cc.Node = null;

    @property(cc.Node)
    gameResult: cc.Node = null;
    @property(cc.Node)
    gameResult_Win: cc.Node = null;
    @property(cc.Node)
    gameResult_Lose: cc.Node = null;

    @property(cc.Node)
    btn_Win: cc.Node = null;
    @property(cc.Node)
    btn_Lose: cc.Node = null;
    @property(cc.Node)
    hideMask: cc.Node = null;

    // characters
    @property(cc.Node)
    Luffy_Point: cc.Node = null;
    @property(cc.Node)
    Luffy_Collide: cc.Node = null;
    @property(sp.Skeleton)
    Luffy_2: sp.Skeleton = null;
    @property(sp.Skeleton)
    Luffy_3: sp.Skeleton = null;
    @property(sp.Skeleton)
    Luffy_4: sp.Skeleton = null;
    @property(sp.Skeleton)
    Luffy_5: sp.Skeleton = null;
    @property([cc.Label])
    Luffy_Levels: cc.Label[] = [];

    // enemies
    @property(sp.Skeleton)
    Enemi_1: sp.Skeleton = null;
    @property(sp.Skeleton)
    Enemi_2: sp.Skeleton = null;
    @property(sp.Skeleton)
    Enemi_3: sp.Skeleton = null;
    @property(sp.Skeleton)
    Enemi_4: sp.Skeleton = null;

    @property(cc.Node)
    Trap: cc.Node = null;

    @property(cc.Node)
    EnemiPoint_1: cc.Node = null;
    @property(cc.Node)
    EnemiPoint_2: cc.Node = null;
    @property(cc.Node)
    EnemiPoint_3: cc.Node = null;
    @property(cc.Node)
    EnemiPoint_4: cc.Node = null;
    @property(cc.Node)
    TrapPoint: cc.Node = null;


    // array
    @property([cc.Node])
    EnemyLines: cc.Node[] = [];
    @property([cc.Label])
    EnemyLevels: cc.Label[] = [];


    // effect
    @property([cc.ParticleSystem])
    Fires: cc.ParticleSystem[] = [];


    // state 
    currentPos: cc.Vec2 = null;
    Spine: sp.Skeleton = null;

    LuffyDrawing: cc.Graphics = null;

    LuffyTargetPoints: cc.Vec2[] = [];

    speed: number = 200;
    LuffyRoadIndex: number = 0;
    drawSoundState: number = null;
    runSoundState: number = null;
    fightSoundState: number = null;
    level: number = 15;
    direction1: number = 0;
    direction2: number = 0;
    direction3: number = 0;
    direction4: number = 0;

    isRotate: boolean = false;
    isDrawing: boolean = true;
    boyRunning: boolean = false;
    isPlayBgSound: boolean = false;
    isFight: boolean = false;
    isDrawLuffyDone: boolean = false;
    isRunGame: boolean = false;
    isLose: boolean = false;
    isWin: boolean = false;
    isCollideTrap: boolean = false;
    isHideTrap: boolean = false;

    enemy: string = "";
    trackEntry: sp.spine.TrackEntry = null;


    protected onLoad(): void {
        this.Luffy_2.node.active = false;
        this.Luffy_3.node.active = false;
        this.Luffy_4.node.active = false;
        this.Luffy_5.node.active = false;

        this.gameResult.active = false;
        this.gameResult_Lose.active = false;
        this.gameResult_Win.active = false;
        this.EnemyLines.forEach(line => line.active = false);
    }


    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.registerEvent();
    }


    private registerEvent(): void {
        this.gameHint.getComponent(cc.Animation).play("GameHint_Anim");
        this.handleLuffyEvent();
        this.btn_Lose.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        this.btn_Win.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        this.hideMask.on(cc.Node.EventType.TOUCH_END, this.handleIronSourceSound, this);
    }


    private handleIronSourceSound(): void {
        if (this.isPlayBgSound) {
            return;
        }

        this.isPlayBgSound = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
    }


    private handleLuffyEvent(): void {
        this.LuffyDrawing = this.pencil.getComponent(cc.Graphics);

        this.Luffy_Point.on(
            cc.Node.EventType.TOUCH_START,
            (e: cc.Touch) => {
                this.currentPos = e.getLocation();
                this.isDrawing = true;
                this.drawSoundState = cc.audioEngine.play(this.AudioManager.drawSound, true, 1);
                this.gameHint.active = false;

                this.handleIronSourceSound();
            },
            this
        );

        this.Luffy_Point.on(
            cc.Node.EventType.TOUCH_MOVE,
            (e: cc.Touch) => {
                this.LuffyDrawing.lineWidth = 5;
                this.LuffyDrawing.moveTo(
                    this.currentPos.x - cc.winSize.width / 2,
                    this.currentPos.y - cc.winSize.height / 2
                );
                this.LuffyDrawing.lineTo(
                    e.getLocation().x - cc.winSize.width / 2,
                    e.getLocation().y - cc.winSize.height / 2
                );

                let lineDrawedX = this.currentPos.x - cc.winSize.width / 2;
                let lineDrawedY = this.currentPos.y - cc.winSize.height / 2;
                this.point.x = this.currentPos.x - cc.winSize.width / 2;
                this.point.y = this.currentPos.y - cc.winSize.height / 2;

                let direction = new cc.Vec2(lineDrawedX, lineDrawedY)
                this.LuffyTargetPoints.push(direction)

                this.currentPos = e.getLocation();
                this.LuffyDrawing.stroke();
            },
            this
        );

        this.Luffy_Point.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            cc.audioEngine.stop(this.drawSoundState);
            this.isDrawing = false;
            this.LuffyController.spine_Luffy.timeScale = 0.6;
            this.isDrawLuffyDone = true;
        });

        this.Luffy_Point.on(cc.Node.EventType.TOUCH_END, () => {
            cc.audioEngine.stop(this.drawSoundState);
            this.LuffyDrawing.clear();
            this.LuffyTargetPoints.splice(0);
        });
    }

    private HandleRunGame(): void {
        if (this.isDrawLuffyDone && !this.isRunGame) {
            this.runSoundState = cc.audioEngine.play(this.AudioManager.runSound, true, 1);
            this.LuffyController.spine_Luffy.setAnimation(0, "run", true);
            this.isRunGame = true;
            this.LuffyController.Line.active = false;
            this.LuffyController.Effect.stopSystem();

            this.Luffy_Point.off(cc.Node.EventType.TOUCH_START);
            this.Luffy_Point.off(cc.Node.EventType.TOUCH_MOVE);
            this.Luffy_Point.off(cc.Node.EventType.TOUCH_END);
            this.Luffy_Point.off(cc.Node.EventType.TOUCH_CANCEL);
        }
    }


    private handleIntersectsEnemies(): void {
        this.handleIntersectsEnemy1();
        this.handleIntersectsEnemy2();
        this.handleIntersectsEnemy3();
        this.handleIntersectsEnemy4();
        this.handleIntersectsTrapPoint();
    }


    private handleIntersectsEnemy1(): void {
        // luffy collide with enemy => fight
        if (
            this.Luffy_Collide.getBoundingBox().intersects(this.EnemiPoint_1.getBoundingBox())
            && this.enemy !== this.EnemiPoint_1.name
        ) {
            this.enemy = this.EnemiPoint_1.name;
            this.isFight = true;
            this.Luffy_2.node.active = true;
            this.Luffy_Levels.forEach(level => level.string = String(this.level));
            this.Enemi_1.setAnimation(0, "attack", false);

            cc.audioEngine.play(this.AudioManager.fightSound, false, 1);
            this.trackEntry = this.Luffy_2.setAnimation(0, "attack", false);
            this.CheckDoneLuffyAtkAnim(this.Enemi_1, 9, this.Luffy_2, 0);
        }

        // point collide with enemy => set fight order
        if (this.point.getBoundingBox().intersects(this.EnemiPoint_1.getBoundingBox()) && !this.direction1) {
            this.direction1 = 1;
            this.Fires[0].resetSystem();
            this.EnemyLines[0].active = true;
        }
    }


    private handleIntersectsEnemy2(): void {
        if (
            this.Luffy_Collide.getBoundingBox().intersects(this.EnemiPoint_2.getBoundingBox())
            && this.enemy !== this.EnemiPoint_2.name
        ) {
            this.enemy = this.EnemiPoint_2.name;
            this.isFight = true;
            this.Luffy_3.node.active = true;
            this.Luffy_Levels.forEach(level => level.string = String(this.level));
            this.Enemi_2.setAnimation(0, "attack", false);

            cc.audioEngine.play(this.AudioManager.fightSound, false, 1);
            this.trackEntry = this.Luffy_3.setAnimation(0, "attack", false);
            this.CheckDoneLuffyAtkAnim(this.Enemi_2, 18, this.Luffy_3, 1);
        }

        // point collide with enemy => set fight order
        if (this.point.getBoundingBox().intersects(this.EnemiPoint_2.getBoundingBox()) && !this.direction2) {
            this.direction2 = 2;
            this.Fires[1].resetSystem();
            this.EnemyLines[1].active = true;
        }
    }


    private handleIntersectsEnemy3(): void {
        if (
            this.Luffy_Collide.getBoundingBox().intersects(this.EnemiPoint_3.getBoundingBox())
            && this.enemy !== this.EnemiPoint_3.name
        ) {
            this.enemy = this.EnemiPoint_3.name;
            this.isFight = true;
            this.Luffy_4.node.active = true;
            this.Luffy_Levels.forEach(level => level.string = String(this.level));
            this.Enemi_3.setAnimation(0, "attack", false);

            cc.audioEngine.play(this.AudioManager.fightSound, false, 1);
            this.trackEntry = this.Luffy_4.setAnimation(0, "attack", false);
            this.CheckDoneLuffyAtkAnim(this.Enemi_3, 31, this.Luffy_4, 2);
        }

        // point collide with enemy => set fight order
        if (this.point.getBoundingBox().intersects(this.EnemiPoint_3.getBoundingBox()) && !this.direction3) {
            this.direction3 = 3;
            this.Fires[2].resetSystem();
            this.EnemyLines[2].active = true;
        }
    }


    private handleIntersectsEnemy4(): void {
        if (
            this.Luffy_Collide.getBoundingBox().intersects(this.EnemiPoint_4.getBoundingBox())
            && this.enemy !== this.EnemiPoint_4.name
        ) {
            this.enemy = this.EnemiPoint_4.name;
            this.isFight = true;
            this.Luffy_5.node.active = true;
            this.Luffy_Levels.forEach(level => level.string = String(this.level));
            this.Enemi_4.setAnimation(0, "attack", false);

            cc.audioEngine.play(this.AudioManager.fightSound, false, 1);
            this.trackEntry = this.Luffy_5.setAnimation(0, "attack", false);
            this.CheckDoneLuffyAtkAnim(this.Enemi_4, 70, this.Luffy_5, 3);
        }

        // point collide with enemy => set fight order
        if (this.point.getBoundingBox().intersects(this.EnemiPoint_4.getBoundingBox()) && !this.direction4) {
            this.direction4 = 4;
            this.Fires[3].resetSystem();
            this.EnemyLines[3].active = true;
        }
    }


    private handleIntersectsTrapPoint(): void {
        if (this.Luffy_Collide.getBoundingBox().intersects(this.TrapPoint.getBoundingBox()) && !this.isCollideTrap && !this.isHideTrap) {
            this.isCollideTrap = true;
            this.CheckLuffyTraped();
        }
    }


    private CheckLuffyTraped(): void {
        cc.audioEngine.stop(this.runSoundState);
        this.level = this.level - 5;
        this.Luffy_Levels.forEach(level => level.string = String(this.level));
        this.LuffyController.spine_Luffy.node.active = true;
        this.LuffyController.spine_Luffy.setAnimation(0, "lose", false);

        this.scheduleOnce(() => {
            this.runSoundState = cc.audioEngine.play(this.AudioManager.runSound, true, 1);
            this.isCollideTrap = false;
            this.isHideTrap = true;

            this.LuffyController.spine_Luffy.setAnimation(0, "run", true);

            this.Trap.active = false;
            this.LuffyController.Run();
        }, 1);
    }


    private CheckDoneLuffyAtkAnim(spine: sp.Skeleton, level: number, luffy: sp.Skeleton, id: number): void {
        this.Spine = spine;

        if (this.level < Number(this.EnemyLevels[id].string)) {
            this.LuffyFightLose(luffy, false);
        } else {

            if (id === 3) this.isWin = true;

            spine.setCompleteListener((trackEntry: sp.spine.TrackEntry) => {
                if (trackEntry.animation.name === "attack") {
                    this.level += Number(this.EnemyLevels[id].string);
                    this.Spine.setAnimation(0, "die", false);
                    this.Fires[id].stopSystem();
                    this.EnemyLines[id].active = false;

                    this.scheduleOnce(() => {
                        this.runSoundState = cc.audioEngine.play(this.AudioManager.runSound, true, 1);
                        this.LuffyController.spine_LevelUp.node.active = true;
                        this.LuffyController.spine_LevelUp.getComponent(cc.Animation).play("Luffy_LevelUpAnim");
                        cc.audioEngine.play(this.AudioManager.winSound, false, 1);

                        luffy.node.active = false;
                        this.EnemyLevels[id].node.active = false;

                        if (this.isWin) {
                            this.isFight = true;
                            cc.audioEngine.stop(this.runSoundState);
                            this.LuffyDrawing.clear();
                            luffy.node.active = true;
                            luffy.setAnimation(0, "idle", true);

                            this.scheduleOnce(() => {
                                cc.audioEngine.stopAll();
                                cc.audioEngine.play(this.AudioManager.winGame, true, 1);
                                this.gameResult.getComponent(cc.Animation).play("GameResult_Anim");
                                this.gameResult.active = true;
                                this.gameResult_Win.active = true;

                                // mtg & applovin
                                // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
                            }, 1);

                            this.scheduleOnce(() => {
                                this.gameResult.getComponent(cc.Animation).play("GameResult_ScaleBtn");
                            }, 3);
                        } else {
                            this.isFight = false;
                            this.LuffyController.Run();
                        }
                    }, 0.7)

                    this.scheduleOnce(() => {
                        this.LuffyController.spine_LevelUp.node.active = false;
                    }, 1.4)
                }
            });
        }
    }


    public LuffyFightLose(luffy: sp.Skeleton, immediately: boolean): void {
        this.isLose = true;

        if (immediately) {
            this.handleLoseImmediately(luffy);
        } else {
            this.handleLoseAfterSchedule(luffy)
        }
    }


    private handleLoseImmediately(luffy: sp.Skeleton): void {
        luffy.timeScale = 1;
        luffy.setAnimation(0, "die_2", false);

        cc.audioEngine.play(this.AudioManager.loseSound, false, 1);
        this.LuffyController.level.node.active = false;

        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.AudioManager.loseGame, true, 1);
            this.gameResult.getComponent(cc.Animation).play("GameResult_Anim");
            this.gameResult.active = true;
            this.gameResult_Lose.active = true;

            // mtg & applovin
            // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        }, 1.5)

        this.scheduleOnce(() => {
            this.gameResult.getComponent(cc.Animation).play("GameResult_ScaleBtn");
        }, 3.5);
    }


    private handleLoseAfterSchedule(luffy: sp.Skeleton): void {
        this.scheduleOnce(() => {
            luffy.timeScale = 1;
            luffy.setAnimation(0, "die_2", false);
            this.Spine.setAnimation(0, "idle", true);
            cc.audioEngine.play(this.AudioManager.loseSound, false, 1);
        }, 1.5);

        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.AudioManager.loseGame, true, 1);
            this.gameResult.getComponent(cc.Animation).play("GameResult_Anim");
            this.gameResult.active = true;
            this.gameResult_Lose.active = true;

            // mtg & applovin
            // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
        }, 2)

        this.scheduleOnce(() => {
            this.gameResult.getComponent(cc.Animation).play("GameResult_ScaleBtn");
        }, 4);
    }


    protected update(dt: number): void {
        this.handleIntersectsEnemies();
        this.HandleRunGame();
    }
}
