import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
    // component
    @property(AudioManager)
    AudioManager: AudioManager = null;
    @property(GameController)
    GameController: GameController = null;


    // Node
    @property(cc.Node)
    background: cc.Node = null;
    @property(cc.Node)
    Hide_Point: cc.Node = null;
    @property(cc.Node)
    Main_Container: cc.Node = null;
    @property(cc.Node)
    Gun_AK47: cc.Node = null;
    @property(cc.Node)
    MergeContainer: cc.Node = null;
    @property(cc.Node)
    StepTwoContainer: cc.Node = null;
    @property(cc.Node)
    GridContainer: cc.Node = null;
    @property(cc.Node)
    hint_Hand: cc.Node = null;
    @property(cc.Node)
    CTA_HintHand: cc.Node = null;
    @property(cc.Node)
    CTA_Button: cc.Node = null;
    @property(cc.Node)
    Hide_Mask: cc.Node = null;
    @property(cc.Node)
    Frame_Ak47: cc.Node = null;


    // Spine 
    // @property(sp.Skeleton)
    // Spine_Gun: sp.Skeleton = null;
    @property(sp.Skeleton)
    Spine_Skibidi: sp.Skeleton = null;


    // array
    @property([cc.Node])
    Items: cc.Node[] = [];
    @property([cc.Node])
    GunOfItems: cc.Node[] = [];
    @property([cc.Node])
    Guns: cc.Node[] = [];
    @property([cc.Node])
    Lines: cc.Node[] = [];


    // effect
    @property([cc.ParticleSystem])
    Effect_Fires: cc.ParticleSystem[] = [];
    @property(cc.ParticleSystem)
    Effect_henShin: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    Effect_Break: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    Effect_Blink: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    Effect_Shoot: cc.ParticleSystem = null;


    // state    
    currentItem: cc.Node = null;
    currentGun: cc.Node = null;
    choosenItem: cc.Node = null;
    choosenItem_Gun: cc.Node = null;
    gunIsChooseToMerge: cc.Node = null;
    choosenItem_Effect: cc.ParticleSystem = null;

    currentPos: cc.Vec2 = null;
    currentGun_Pos: cc.Vec2 = null;

    isMerge: boolean = false;
    isCanClick: boolean = true;
    isClickBtn1: boolean = false;
    isPlayBgSound: boolean = false;

    step: number = 0;
    zombieSoundState: number = null;


    // life cycle method
    protected onLoad(): void {
        this.StepTwoContainer.opacity = 0;
    }


    protected start(): void {
        this.handleGamePlay();

        this.registerEvent();
    }


    private handleGamePlay(): void {
        this.Effect_Fires.forEach(effect => {
            effect.resetSystem();
        });

        // cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        // this.zombieSoundState = cc.audioEngine.play(this.AudioManager.Zombie_Sound, true, 1);
        this.GridContainer.getComponent(cc.Animation).play("Hint_HandAnim");

        // this.scheduleOnce(() => {
        //     this.Spine_Gun.setAnimation(0, "action01_slow", false)
        //     this.Spine_Gun.timeScale = 0.7;

        //     // ironsource
        //     if (this.isPlayBgSound) {
        //         cc.audioEngine.play(this.AudioManager.LineOpenSound, false, 1.5);
        //     }

        //     // others
        //     cc.audioEngine.play(this.AudioManager.LineOpenSound, false, 1.5);
        // }, 0.5);

        // this.scheduleOnce(() => {
        //     // ironsource
        //     if (this.isPlayBgSound) {
        //         cc.audioEngine.play(this.AudioManager.Gun_AK47Sound, false, 1.5);
        //     }

        //     // others
        //     cc.audioEngine.play(this.AudioManager.Gun_AK47Sound, false, 1.5);
        //     this.Effect_Shoot.resetSystem();
        // }, 1);

        // this.scheduleOnce(() => {
        //     this.Spine_Skibidi.setAnimation(0, "hit", false)
        //     this.Spine_Skibidi.timeScale = 0.7;
        //     this.Effect_Shoot.stopSystem();
        //     // ironsource
        //     if (this.isPlayBgSound) {
        //         cc.audioEngine.play(this.AudioManager.Zombie_HurtSound, false, 1.5);
        //     }

        //     // others
        //     cc.audioEngine.play(this.AudioManager.Zombie_HurtSound, false, 1.5);
        //     cc.audioEngine.stop(this.zombieSoundState);
        // }, 1.5);

        // this.scheduleOnce(() => {
        //     // this.Spine_Gun.setAnimation(0, "idle", true)
        //     // this.Spine_Gun.timeScale = 1;
        //     this.Spine_Skibidi.setAnimation(0, "idle", true)
        //     this.Spine_Skibidi.timeScale = 1;
        // }, 2.2);

        // this.scheduleOnce(() => {
        //     // ironsource
        //     // if (this.isPlayBgSound) {
        //     //     this.zombieSoundState = cc.audioEngine.play(this.AudioManager.Zombie_Sound, false, 0.5);
        //     // }

        //     // others
        //     this.zombieSoundState = cc.audioEngine.play(this.AudioManager.Zombie_Sound, true, 0.5);
        // }, 2.5)
    }


    private registerEvent(): void {
        // ironsource
        this.Hide_Mask.on(cc.Node.EventType.TOUCH_END, this.handleTouchSoundIronSource, this);

        this.Items.forEach(item => {
            item.on(cc.Node.EventType.TOUCH_START, this.handleItemTouchStart, this);
            item.on(cc.Node.EventType.TOUCH_MOVE, this.handleItemTouchMove, this);
            item.on(cc.Node.EventType.TOUCH_END, this.handleItemTouchEnd, this);
            item.on(cc.Node.EventType.TOUCH_CANCEL, this.handleItemTouchEnd, this);
        })
    }


    private handleTouchSoundIronSource(): void {
        if (this.isPlayBgSound) {
            return
        }

        this.isPlayBgSound = true;
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.zombieSoundState = cc.audioEngine.play(this.AudioManager.Zombie_Sound, true, 1);
    }


    private handleItemTouchStart(e: any): void {
        cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        this.currentPos = e.getLocation();
        this.currentItem = e.target;
        this.hint_Hand.active = false;
        this.GridContainer.getComponent(cc.Animation).stop("Hint_HandAnim");
        this.Items.forEach(item => item.scale = 0.65);
        this.Lines.forEach(line => line.active = false);
        switch (this.currentItem.name) {
            case "Item_1":
                this.handleSwitchGun(0);
                break;
            case "Item_2":
                this.handleSwitchGun(1);
                break;
            case "Item_3":
                this.handleSwitchGun(2);
                break;
            case "Item_4":
                this.handleSwitchGun(3);
                break;
            case "Item_5":
                this.handleSwitchGun(4);
                break;
            case "Item_6":
                this.handleSwitchGun(5);
                break;
            default:
                break;
        }

        // ironsource
        this.handleTouchSoundIronSource();
    }


    private handleSwitchGun(id: number): void {

        this.currentGun = this.Guns[id];
        this.currentGun_Pos = this.currentGun.getPosition();
        this.choosenItem_Effect = this.Effect_Fires[id];
        this.choosenItem_Gun = this.GunOfItems[id];

        this.currentGun.active = true;
        this.choosenItem_Gun.active = false;
        this.choosenItem_Effect.stopSystem();

        this.Hide_Point.x = this.currentPos.x - cc.winSize.width / 2;
        this.Hide_Point.y = this.currentPos.y - cc.winSize.height / 2;

        this.currentGun.x = this.Hide_Point.x;
        this.currentGun.y = this.Hide_Point.y;
    }


    private handleItemTouchMove(e: cc.Touch): void {
        this.Hide_Point.x = this.currentPos.x - cc.winSize.width / 2;
        this.Hide_Point.y = this.currentPos.y - cc.winSize.height / 2 + 100;

        this.currentGun.x = this.Hide_Point.x;
        this.currentGun.y = this.Hide_Point.y - 100;
        this.currentPos = e.getLocation();
    }


    private handleItemTouchEnd(): void {
        let hasIntersection = false;

        this.Items.forEach(item => {
            if (
                this.Hide_Point.getBoundingBox().intersects(this.currentItem.getBoundingBox())
            ) {
                hasIntersection = false;
                return;
            }

            if (item.getBoundingBox().intersects(this.Hide_Point.getBoundingBox())) {
                hasIntersection = true;
                cc.audioEngine.play(this.AudioManager.ChooseRightSound, false, 1);
                switch (item.name) {
                    case "Item_1":
                        this.gunIsChooseToMerge = this.Guns[0];
                        break;
                    case "Item_2":
                        this.gunIsChooseToMerge = this.Guns[1];
                        break;
                    case "Item_3":
                        this.gunIsChooseToMerge = this.Guns[2];
                        break;
                    default:
                        break;
                }

                this.currentGun.setPosition(this.currentGun_Pos);
            }
        });

        if (hasIntersection) {
            this.handleMergeGun();
        } else {
            this.currentGun.active = false;
            this.choosenItem_Gun.active = true;
            this.choosenItem_Effect.resetSystem();
            this.currentGun.setPosition(this.currentGun_Pos);
            cc.audioEngine.play(this.AudioManager.ChooseWrongSound, false, 0.8);
        }
    }


    private handleMergeGun(): void {
        if (this.isMerge) {
            return;
        }

        cc.audioEngine.stop(this.zombieSoundState);
        this.isMerge = true;
        // this.Spine_Gun.node.active = false;
        this.GridContainer.active = false;
        this.Main_Container.getComponent(cc.Animation).play("MergeAnim");

        this.callTween();

        this.scheduleOnce(() => {
            this.Effect_henShin.resetSystem();
            cc.audioEngine.play(this.AudioManager.MergeSound, false, 0.8);
        }, 0.8)

        this.scheduleOnce(() => {
            this.Effect_henShin.stopSystem();
            this.Effect_Break.resetSystem();
            cc.audioEngine.play(this.AudioManager.DoneMergeSound, false, 0.8);
            cc.audioEngine.play(this.AudioManager.LineOpenSound, false, 1.5);
        }, 1.8);

        this.scheduleOnce(() => {
            this.Effect_Blink.resetSystem();
            this.handleShowCTA();
            cc.audioEngine.play(this.AudioManager.Zombie_Sound, true, 0.5);
        }, 3.8);

        cc.audioEngine.resumeAll()
        this.scheduleOnce(() => {
            this.CTA_HintHand.getComponent(cc.Animation).play("CTA_HintHandAnim");
        }, 5.3)
    }


    private callTween(): void {
        this.gunIsChooseToMerge.active = true;
        let pos = new cc.Vec3(0, 0, 0);

        cc.tween(this.gunIsChooseToMerge)
            .to(0.5, { position: pos })
            .call(() => {
                this.gunIsChooseToMerge.active = false;
            }) 
            .start();


        cc.tween(this.currentGun)
            .to(0.5, { position: pos })
            .call(() => {
                this.currentGun.active = false;
            })
            .start();
    }


    private handleShowCTA(): void {
        this.StepTwoContainer.getComponent(cc.Animation).play("Step2_ShowAnim");

        // others
        this.CTA_Button.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

        // mtg & applovin
        // this.Hide_Mask.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
    }


    protected update(dt: number): void {

    }

}
