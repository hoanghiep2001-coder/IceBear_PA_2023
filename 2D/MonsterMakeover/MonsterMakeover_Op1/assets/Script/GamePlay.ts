    import AudioManager from "./AudioManager";
    import { GameController } from "./GameController";

    const { ccclass, property } = cc._decorator;

    @ccclass
    export default class GamePlay extends cc.Component {

        // Component
        @property(AudioManager)
        AudioManager: AudioManager = null;
        @property(GameController)
        GameController: GameController = null;

        // Node
        @property(cc.Node)
        hideMask: cc.Node = null;
        @property(cc.Node)
        Spine_monster: cc.Node = null;
        @property(cc.Node)
        hand: cc.Node = null;
        @property(cc.Node)
        text: cc.Node = null;
        @property(cc.Node)
        tab_Container: cc.Node = null;
        @property(cc.Node)
        tab_Health: cc.Node = null;
        @property(cc.Node)
        changeMode_Container: cc.Node = null;

        // array
        @property([cc.Node])
        cta_Buttons: cc.Node[] = [];

        // State
        curentPosition: cc.Vec2 = null;
        isClicked: boolean = false;
        isPlayBgSound: boolean = false;
        isEndGame: boolean = false;
        currentIndex: number = 1;

        // spine track entry
        trackEntry: sp.spine.TrackEntry = null;

        protected onLoad(): void {
        
        }

        protected start(): void {
            // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            this.handleGamePlay();

            this.scheduleOnce(() => {
                this.registerEvent();
            }, 1)

        }

        private handleGamePlay(): void {
            this.hand.getComponent(cc.Animation).play("Hand_HintAnim");
            this.getComponent(cc.Animation).play("GamePlay_OpenSceneAnim");
        }       

        private registerEvent(): void {
            this.hideMask.on(cc.Node.EventType.TOUCH_START, this.handleHideMaskTouchStart, this);
        } 

        private handleHideMaskTouchStart(): void {
            this.handleHitMonster();
        }

        private handleHitMonster(): void {
            if(this.isClicked) {
                return;
            }
            
            this.isClicked = true;
            this.trackEntry = this.Spine_monster.getComponent(sp.Skeleton).setAnimation(0, "slap_it", false);
            this.handleMinusHealthMonster();
            cc.audioEngine.play(this.AudioManager.slapSound, false, 1);
            this.hand.active = false;

            if(this.isPlayBgSound) {
                return;
            }

            // ironsource
            this.isPlayBgSound = true;
            cc.audioEngine.play(this.AudioManager.bgSound, true, 1);

        }

        private handleMinusHealthMonster(): void {
            this.currentIndex -= 0.2;
            this.tab_Health.scaleX = this.currentIndex;

            if(this.tab_Health.scaleX <= 0.5) {
                this.showChangeMode();
            }
        }

        private getCurTimeOfSlapAnim(): void {
            if(this.trackEntry) {


                if(this.trackEntry.trackTime >= this.trackEntry.animationEnd) {
                    this.isClicked = false;
                    this.Spine_monster.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                }


            }
        }

        private showChangeMode(): void {

            // off event of hideMask
            this.hideMask.off(cc.Node.EventType.TOUCH_START);

            // show change mode
            this.getComponent(cc.Animation).play("GamePlay_ChangeModeAnim");

            // others
            this.cta_Buttons.forEach(btn => {
                btn.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
            });

            // mtg && applovin 
            // this.hideMask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        }

        protected update(dt: number): void {
            if(this.isClicked) {
                this.getCurTimeOfSlapAnim();
            }
        }
    }
