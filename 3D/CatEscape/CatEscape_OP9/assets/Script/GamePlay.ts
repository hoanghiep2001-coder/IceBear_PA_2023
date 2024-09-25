import { _decorator, Component, math, Node, PhysicsSystem, Vec3, Animation, log, RigidBody, AudioSource, UITransform, EventTouch, Vec2, Camera, UIOpacity, ProgressBar, clamp01, ParticleSystem, sp, view, Rect, rect, Widget, Label, animation, Sprite } from 'cc';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {
    // node Container
    // @property(Node)
    // game: Node = null;

    
    @property(Camera)
    camera: Camera = null;

    // 3D
    @property(Node)
    PussyCat: Node = null;

    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;

    // 2D
    @property(Node)
    Container_2D: Node = null;
    @property(Node)
    framePickItem: Node = null;
    @property(Node)
    itemBar: Node = null;
    @property(Node)
    MoneyContainer: Node = null;
    @property(Label)
    CurrentMoney: Label = null;
    @property(Label)
    DownMoney: Label = null;
    @property(Node)
    overlay: Node = null;

    @property(Node)
    ButtonBuyChair: Node = null;
    @property(Node)
    hand: Node = null;

    @property(Node)
    ButtonBuyWall: Node = null;
    @property(Node)
    hand_2: Node = null;

    @property(Node)
    skinChairContainer: Node = null;
    @property(Node)
    skinWallContainer: Node = null;

    @property(Node)
    text: Node = null;
    @property(Node)
    CTA: Node = null;
    @property(Node)
    CTA_HideMask: Node = null;
    @property(Node)
    CTA_Button: Node = null;

    @property(Node)
    ButtonBuyShelfs: Node = null;
    @property(Node)
    hand_3: Node = null;

    // array3D
    @property([Node])
    chairSkins: Node[] = [];
    @property([Node])
    wallSkins: Node[] = [];

    // array2D
    @property([Node])
    chairSkins_2D: Node[] = [];
    @property([Node])
    chairSkinFrameItems_2D: Node[] = [];

    @property([Node])
    ButtonBuyChairs: Node[] = [];
    @property([Node])
    ButtonBuyWalls: Node[] = [];

    @property([Node])
    wallSkins_2D: Node[] = [];
    @property([Node])
    wallSkinFrameItems_2D: Node[] = [];

    @property([Node])
    buttons: Node[] = [];

    // state
    currentPosition: Vec2 = null;    

    currentItem: number = null;
    initMoney: number = 250;

    isPlayBgSound: boolean = false;
    isClickBuyChair: boolean = false;
    isChoosenSkin: boolean = false;

    // FX
    @property(ParticleSystem)
    Comfetti_1: ParticleSystem = null;
    @property(ParticleSystem)
    Comfetti_2: ParticleSystem = null;
    @property(ParticleSystem)
    Comfetti_3: ParticleSystem = null;
    @property(ParticleSystem)
    Comfetti_4: ParticleSystem = null;      

    protected onLoad(): void {
        this.DownMoney.node.active = false;
        this.itemBar.active = false;
        this.skinWallContainer.active = false;

        this.ButtonBuyWall.active = false;
        this.ButtonBuyShelfs.active = false;

        this.hand.active = false;
        this.hand_2.active = false;
        this.hand_3.active = false;

        this.CTA.getComponent(UIOpacity).opacity = 0;
    }   

    protected start(): void {
        this.handleGamePlay();
    }

    private handleGamePlay(): void {
        this.Container_2D.getComponent(Animation).play("OpenScene_Anim");

        this.scheduleOnce(() => {
            this.hand.active = true;
            this.hand.getComponent(Animation).play("Hint_HandAnim");
            this.registerEvent();
        }, 1)
    }

    private registerEvent(): void {
        this.ButtonBuyChair.on(Node.EventType.TOUCH_START, this.handleButtonBuyChairTouchStart, this);
        this.ButtonBuyWall.on(Node.EventType.TOUCH_START, this.handleButtonBuyWallTouchStart, this);
        this.ButtonBuyShelfs.on(Node.EventType.TOUCH_START, this.handleShowCTA, this);

        this.framePickItem.on(Node.EventType.TOUCH_START, this.handleFramePickItemTouchStart, this);

        this.chairSkins_2D.forEach((skin, index) => {
            skin.on(Node.EventType.TOUCH_START, () => {
                this.handleSkinTouchStart(skin, index);
            }, this);
        });

        this.wallSkins_2D.forEach((skin, index) => {
            skin.on(Node.EventType.TOUCH_START, () => {
                this.handleWallSkinTouchStart(skin, index)
            }, this)
        })
    }

    private handleButtonBuyChairTouchStart(): void {
        this.buttons.forEach(button => {
            button.active = false;
        })

        this.AudioManager.clickItemSound.play();
        this.isClickBuyChair = true;
        this.ButtonBuyChairs[0].active = false;
        this.ButtonBuyChairs[1].active = true;
        this.hand.active = false;
        this.overlay.active = false;
        this.PussyCat.active = false;
        this.ButtonBuyChair.active = false;
        this.text.active = false;

        this.itemBar.active = true;

        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        this.AudioManager.bgSound.play();
        this.isPlayBgSound = true;
    }

    private handleButtonBuyWallTouchStart(): void {
        this.buttons.forEach(button => {
            button.active = false;
        });

        this.AudioManager.clickItemSound.play();
        this.ButtonBuyWalls[0].active = false;
        this.ButtonBuyWalls[1].active = true;
        this.hand_2.active = false;
        this.overlay.active = false;
        this.PussyCat.active = false;
        this.ButtonBuyWall.active = false;

        this.itemBar.active = true;
        this.skinChairContainer.active = false;
        this.skinWallContainer.active = true;
    }

    private handleFramePickItemTouchStart(e: EventTouch): void {
        // ironsource
        if(this.isPlayBgSound) {
            return;
        }

        this.AudioManager.bgSound.play();
        this.isPlayBgSound = true;
    }

    private handleFramePickItemTouchMove(e: EventTouch): void {

    }

    private handleSkinTouchStart(skin: Node, index: number): void {

        if(index === 2 || index === 3 || index === 4) {
            return;
        }

        if(index === this.currentItem) {
            return;
        }
        this.currentItem = index;

        this.itemBar.active = false;
        // active the correct skin of user click
        this.chairSkins.forEach(skin => {
            skin.active = false;
        });
        this.chairSkins[index].active = true;

        // active the correct frame item pick of user click
        this.chairSkinFrameItems_2D.forEach(frame => {
            frame.active = false;
        });
        this.chairSkinFrameItems_2D[index].active = true;

        // show & hide buttons
        this.buttons.forEach(button => {
            button.active = true;
        });
        this.ButtonBuyChair.active = false;
        this.ButtonBuyShelfs.active = false;

        this.AudioManager.bravoSound.play();

        // deduction money
        this.handleDeductionMoney();
        this.PussyCat.active = true;

        this.scheduleOnce(() => {
            this.handleChooseWallSkin()
        }, 2)
        
    }

    private handleChooseWallSkin(): void {
        this.ButtonBuyChair.off(Node.EventType.TOUCH_START);

        this.overlay.active = true;
        this.Container_2D.getComponent(Animation).play("OpenScene_Anim");
        this.ButtonBuyWall.active = true;
        this.hand_2.active = true;
        this.hand_2.getComponent(Animation).play("Hint_HandAnim");
    }

    private handleChooseShelfSkin(): void {
        this.ButtonBuyWall.off(Node.EventType.TOUCH_START);

        this.overlay.active = true;
        this.Container_2D.getComponent(Animation).play("OpenScene_Anim");
        this.ButtonBuyShelfs.active = true;
        this.hand_3.active = true;
        this.hand_3.getComponent(Animation).play("Hint_HandAnim");
    }

    private handleWallSkinTouchStart(skin: Node, index: number): void {

        this.itemBar.active = false;
        // this.skinWallContainer.active = true;
        // active the correct skin of user click
        this.wallSkins.forEach(skin => {
            skin.active = false;
        });
        this.wallSkins[index].active = true;

        // active the correct frame item pick of user click
        this.wallSkinFrameItems_2D.forEach(frame => {
            frame.active = false;
        });
        this.wallSkinFrameItems_2D[index].active = true;
        this.isChoosenSkin = false;

         // show & hide buttons
         this.buttons.forEach(button => {
            button.active = true;
        });
        this.ButtonBuyWall.active = false;
        this.ButtonBuyShelfs.active = false;
        this.ButtonBuyChair.active = false;

        this.AudioManager.bravoSound.play();

        // deduction money
        this.handleDeductionMoney();
        this.PussyCat.active = true;

        this.Comfetti_3.play();
        this.Comfetti_4.play();

        this.scheduleOnce(() => {
            this.handleChooseShelfSkin()
        }, 2)
    }

    private handleShowCTA(): void {
        this.hand_3.active = false;
        this.ButtonBuyShelfs.active = false;

            this.CTA.getComponent(Animation).play("CTA_Anim");

            // mtg & applovin
            // this.CTA_HideMask.on(Node.EventType.TOUCH_START, () => {
            //     this.AudioManager.bgSound.pause();
            //     this.GameController.installHandle();
            // }, this);
            
            // others
            this.CTA_Button.on(Node.EventType.TOUCH_START, () => {
                this.AudioManager.bgSound.pause();
                this.GameController.installHandle();
            }, this);
    }

    private handleDeductionMoney(): void {

        this.DownMoney.node.active = true;
        this.initMoney -= 100;

        if(this.initMoney < 0) {
            this.initMoney = 50;
        }

        if(!this.isChoosenSkin) {
            this.CurrentMoney.string = `${this.initMoney}`;
            this.DownMoney.getComponent(Animation).play("DeductionMoney_Anim");
        }

        this.Comfetti_1.play();
        this.Comfetti_2.play();
        this.isChoosenSkin = true;
    }

    protected update(dt: number): void {
   
    }
}
