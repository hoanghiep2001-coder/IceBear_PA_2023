import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // component
    @property(AudioManager)
    AudioManager: AudioManager = null;

    // node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    point: cc.Node = null;
    @property(cc.Node)
    hint_Hand: cc.Node = null;
    @property(cc.Node)
    text: cc.Node = null;
    @property(cc.Node)
    arena: cc.Node = null;
    @property(cc.Node)
    StickManContainer: cc.Node = null;
    @property(cc.Node)
    logo: cc.Node = null;
    @property(cc.Node)
    continue_Btn: cc.Node = null;
    @property(cc.Node)
    endGame: cc.Node = null;

    // array
    @property([cc.Node])
    stick_Heros: cc.Node[] = [];
    @property([cc.Node])
    stick_Hero_Areas: cc.Node[] = [];
    @property([cc.Node])
    arenaPositions: cc.Node[] = [];
    @property([cc.Node])
    stick_HerosInArea: cc.Node[] = [];
    @property([cc.Node])
    stick_Monsters: cc.Node[] = [];
    @property([cc.Node])
    hint_Blinks: cc.Node[] = [];

    // state
    currentPosition: cc.Vec2 = null;
    stickHero1Pos: cc.Vec2 = new cc.Vec2(-90, -167);
    stickHero2Pos: cc.Vec2 = new cc.Vec2(2, -176.5);
    stickHero3Pos: cc.Vec2 = new cc.Vec2(90, -173.8);
    stickHero1AreaPos: cc.Vec2 = new cc.Vec2(-85, -134);
    stickHero2AreaPos: cc.Vec2 = new cc.Vec2(4, -140);
    stickHero3AreaPos: cc.Vec2 = new cc.Vec2(92, -137);

    monster1Pos: cc.Vec2 = null;
    monster2Pos: cc.Vec2 = null;
    monster3Pos: cc.Vec2 = null;

    heroIsChoosing: number = null;
    arenaIsChoosing: number = null;
    coutingTimeDrag: number = 0;
    countingFight: number = 0;

    isSetPositionDone: boolean = false;
    isFightOfFirstHero: boolean = false; 
    isFightOfSecondHero: boolean = false; 
    isFightOfThirdHero: boolean = false; 
    isEndGame: boolean = false;
    isPlayBg: boolean = false;

    heroChosenArr: number[] = []

    protected onLoad(): void {
        this.continue_Btn.opacity = 0;
        this.logo.opacity = 0;
        this.hint_Hand.opacity = 0;
        this.text.opacity = 0;
        this.stick_Heros.forEach(hero => {
            hero.opacity = 0;
        });

        this.endGame.active = false;
        this.hint_Blinks.forEach(hint => {
            hint.active = false;
        });
        this.stick_HerosInArea.forEach(hero => {
            hero.active = false;
        });
    }

    protected start(): void {
        // cc.audioEngine.play(this.AudioManager.bgSound, true, 0.7);

        this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");

        this.scheduleOnce(() => {
            this.hint_Hand.opacity = 255;
            this.hint_Hand.getComponent(cc.Animation).play("Hint_Hand");
        }, 2.4)

        this.registerEvent();
    }

    private registerEvent(): void {
        this.background.on(cc.Node.EventType.TOUCH_START, this.handleBackgroundTouchStart, this);
        this.background.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.background.on(cc.Node.EventType.TOUCH_END, this.handleTouchEnd, this);
        this.background.on(cc.Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);

        this.stick_Hero_Areas.forEach((hero, index) => {
            hero.on(cc.Node.EventType.TOUCH_START, () => {
                this.handleHeroTouchStart(index);
            });

            hero.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
            hero.on(cc.Node.EventType.TOUCH_END, this.handleTouchEnd, this);
            hero.on(cc.Node.EventType.TOUCH_CANCEL, this.handleTouchEnd, this);
        });

    }

    private handleBackgroundTouchStart(e: cc.Touch): void {
        this.currentPosition = e.getLocation();

        this.point.x = this.currentPosition.x - cc.winSize.width / 2;
        this.point.y = this.currentPosition.y - cc.winSize.height / 2;

        // ironsource
        if(this.isPlayBg) {
            return;
        }
        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 0.7);
    }

    private handleTouchMove(e: cc.Touch): void {

        this.currentPosition = e.getLocation();

        this.point.x = this.currentPosition.x - cc.winSize.width / 2;
        this.point.y = this.currentPosition.y - cc.winSize.height / 2;

        // move stick hero with point
        if (this.heroIsChoosing || this.heroIsChoosing == 0) {
            this.stick_Hero_Areas[this.heroIsChoosing].x = this.currentPosition.x - cc.winSize.width / 2;
            this.stick_Hero_Areas[this.heroIsChoosing].y = this.currentPosition.y - cc.winSize.height / 2 + 20;

            this.stick_Heros[this.heroIsChoosing].x = this.currentPosition.x - cc.winSize.width / 2;
            this.stick_Heros[this.heroIsChoosing].y = this.currentPosition.y - cc.winSize.height / 2 - 10;
        }
    }

    private handleTouchEnd(e: cc.Touch): void {
        if (this.heroIsChoosing === null) {
            return;
        }

        // If stick hero intersect with its arena postion, It will be set is that position. 
        // If not, it will be return on its origin position.
        if (
            this.stick_Hero_Areas[this.heroIsChoosing].getBoundingBox()
                .intersects(this.arenaPositions[this.arenaIsChoosing].getBoundingBox())
                ) 
        {   
            // unActive Hint Blink
            this.hint_Blinks[this.heroIsChoosing].active = false;
            this.hint_Blinks[this.heroIsChoosing].getComponent(cc.Animation).stop();

            // unActive stick hero is draged
            this.stick_Hero_Areas[this.heroIsChoosing].active = false;
            this.stick_Heros[this.heroIsChoosing].active = false;

            // Active stick hero when set correct postion
            this.stick_HerosInArea[this.heroIsChoosing].active = true;

            cc.audioEngine.play(this.AudioManager.correctSound, false, 2);
            this.heroIsChoosing = null;
            this.arenaIsChoosing = null;
            this.isSetPositionDone = false;

        } else {
            switch (this.heroIsChoosing) {
                case 0:
                    this.stick_Hero_Areas[0].setPosition(this.stickHero1AreaPos);
                    this.stick_Heros[0].setPosition(this.stickHero1Pos);
                    break;
                case 1:
                    this.stick_Hero_Areas[1].setPosition(this.stickHero2AreaPos);
                    this.stick_Heros[1].setPosition(this.stickHero2Pos);
                    break;
                case 2:
                    this.stick_Hero_Areas[2].setPosition(this.stickHero3AreaPos);
                    this.stick_Heros[2].setPosition(this.stickHero3Pos);
                    break;
                default:
                    break;
            }
        }
    }

    private handleHeroTouchStart(heroId: number): void {
        if (this.isSetPositionDone) {
            return;
        }

        if(this.coutingTimeDrag >= 2) {
            this.getComponent("GameController").installHandle();
        }

        this.text.active = false;
        this.hint_Hand.active = false;
        cc.audioEngine.play(this.AudioManager.clickSound, false, 2);
        this.coutingTimeDrag++;
        this.isSetPositionDone = true;
        this.heroIsChoosing = heroId;
        this.arenaIsChoosing = heroId;
        this.heroChosenArr.push(heroId)

        this.hint_Blinks[this.heroIsChoosing].active = true;
        this.hint_Blinks[this.heroIsChoosing].getComponent(cc.Animation).play("Hint_Blink");

         // ironsource
         if(this.isPlayBg) {
            return;
        }
        this.isPlayBg = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 0.7);
    }

    // private handleMoveHeros(): void {
    //     this.monster1Pos = this.stick_Monsters[0].getPosition();
    //     this.monster2Pos = this.stick_Monsters[1].getPosition();
    //     this.monster3Pos = this.stick_Monsters[2].getPosition();
        
    //     const heroPositions = [
    //         this.monster1Pos.x - 50,
    //         this.monster2Pos.x - 150,
    //         this.monster3Pos.x - 100,
    //     ];

    //     for (const heroIndex of this.heroChosenArr) {
    //         if (heroIndex >= 0 && heroIndex < this.stick_HerosInArea.length) {
    //             cc.tween(this.stick_HerosInArea[heroIndex])
    //                 .to(1, { x: heroPositions[heroIndex] })
    //                 .start();
    //         }
    //     }
    // }

    // private handleFight(): void {
    //     if(
    //         this.stick_HerosInArea[0].getBoundingBox()
    //         .intersects(this.stick_Monsters[0].getBoundingBox()) && !this.isFightOfFirstHero) 
    //     {

    //         let attackSound = cc.audioEngine.play(this.AudioManager.meleeSound, true, 0.5);
    //         this.isFightOfFirstHero = true;
    //         this.stick_HerosInArea[0].getComponent(sp.Skeleton).setAnimation(0, "atk_melee", true);
    //         this.stick_Monsters[0].getComponent(sp.Skeleton).setAnimation(0, "attack", true);

    //         this.scheduleOnce(() => {
    //             this.countingFight++;
    //             cc.audioEngine.stop(attackSound);
    //             this.stick_HerosInArea[0].active = false;
    //             this.stick_Monsters[0].getComponent(sp.Skeleton).setAnimation(0, "Idlee", true);
    //         }, 2)
    //     }

    //     if(
    //         this.stick_HerosInArea[1].getBoundingBox()
    //         .intersects(this.stick_Monsters[1].getBoundingBox()) && !this.isFightOfSecondHero) 
    //     {

    //         let attackSound = cc.audioEngine.play(this.AudioManager.swordSound, true, 0.5);
    //         this.isFightOfSecondHero = true;
    //         this.stick_HerosInArea[1].getComponent(sp.Skeleton).setAnimation(0, "atk_katana", true);
    //         this.stick_Monsters[1].getComponent(sp.Skeleton).setAnimation(0, "attack", true);

    //         this.scheduleOnce(() => {
    //             this.countingFight++;
    //             cc.audioEngine.stop(attackSound);
    //             this.stick_HerosInArea[1].active = false;
    //             this.stick_Monsters[1].getComponent(sp.Skeleton).setAnimation(0, "Idlee", true);
    //         }, 2)
    //     }

    //     if(
    //         this.stick_HerosInArea[2].getBoundingBox()
    //         .intersects(this.stick_Monsters[2].getBoundingBox()) && !this.isFightOfThirdHero) 
    //     {

    //         let attackSound = cc.audioEngine.play(this.AudioManager.katanaSound, true, 0.5);
    //         this.isFightOfThirdHero = true;
    //         this.stick_HerosInArea[2].getComponent(sp.Skeleton).setAnimation(0, "atk_sword", true);
    //         this.stick_Monsters[2].getComponent(sp.Skeleton).setAnimation(0, "attack", true);

    //         this.scheduleOnce(() => {
    //             this.countingFight++;
    //             cc.audioEngine.stop(attackSound);
    //             this.stick_HerosInArea[2].active = false;
    //             this.stick_Monsters[2].getComponent(sp.Skeleton).setAnimation(0, "Idlee", true);
    //         }, 2)
    //     }
    // }

    private handleEndGame(): void {
        if(this.countingFight >= 2 && !this.isEndGame)  {
            this.isEndGame = true;          

            this.endGame.active = true;
            this.endGame.getComponent(cc.Animation).play("EndGame_Anim");

            // mtg && applovin
            // this.background.off(cc.Node.EventType.TOUCH_MOVE)
            // this.background.off(cc.Node.EventType.TOUCH_START);
            // this.background.on(cc.Node.EventType.TOUCH_START, () => {
            //     this.getComponent("GameController").installHandle();
            // }, this)

            // others
            this.continue_Btn.on(cc.Node.EventType.TOUCH_START, () => {
                this.getComponent("GameController").installHandle();
            }, this );
        }
    }

    protected update(dt: number): void {
        // this.handleFight();
        this.handleEndGame();
    }

}
