
import { _decorator, Component, math, Node, RigidBody, SkeletalAnimation, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlay')
export class GamePlay extends Component {


    // Component
    @property(Node)
    Character: Node = null;

    // user interface Buttons
    @property(Node)
    Move_Right_Btn: Node = null;
    @property(Node)
    Move_Left_Btn: Node = null;
    @property(Node)
    Attack_Btn: Node = null;
    @property(Node)
    Jump_Btn: Node = null;


    // state
    public choosenWeapon: string = "sword";
    public isChangeWeapon: boolean = false;

    // control
    public goRight: boolean = false;
    public goLeft: boolean = false;
    public attack: boolean = false;
    public jump: boolean = false;

    protected onLoad(): void {

    }

    protected start(): void {
        this.registerEvent();
    }

    private registerEvent(): void {
        this.Move_Right_Btn.on(Node.EventType.TOUCH_START, this.handleMoveRightBtn, this);
        this.Move_Right_Btn.on(Node.EventType.TOUCH_END, this.handleOffMoveRightBtn, this);
        this.Move_Right_Btn.on(Node.EventType.TOUCH_CANCEL, this.handleOffMoveRightBtn, this);

        this.Move_Left_Btn.on(Node.EventType.TOUCH_START, this.handleMoveLeftBtn, this);
        this.Move_Left_Btn.on(Node.EventType.TOUCH_END, this.handleOffMoveLeftBtn, this);
        this.Move_Left_Btn.on(Node.EventType.TOUCH_CANCEL, this.handleOffMoveLeftBtn, this);

        this.Attack_Btn.on(Node.EventType.TOUCH_START, this.handleAttackBtn, this);
        this.Attack_Btn.on(Node.EventType.TOUCH_END, this.handleOffAttackBtn, this);
        this.Attack_Btn.on(Node.EventType.TOUCH_CANCEL, this.handleOffAttackBtn, this);

        this.Jump_Btn.on(Node.EventType.TOUCH_START, this.handleJumpBtn, this);
        this.Jump_Btn.on(Node.EventType.TOUCH_END, this.handleOffJumpBtn, this);
        this.Jump_Btn.on(Node.EventType.TOUCH_CANCEL, this.handleOffJumpBtn, this);
    }

    private handleMoveRightBtn(): void {
        this.goRight = true;
        this.goLeft = false;
        new Tween(this.Move_Right_Btn).to(0.2, { scale: new math.Vec3(0.9, 0.9, 1) }).start();
    }

    private handleOffMoveRightBtn(): void {
        this.goRight = false;
        new Tween(this.Move_Right_Btn).to(0.2, { scale: new math.Vec3(1, 1, 1) }).start();
    }

    private handleMoveLeftBtn(): void {
        this.goLeft = true;
        this.goRight = false;
        new Tween(this.Move_Left_Btn).to(0.2, { scale: new math.Vec3(0.9, 0.9, 1) }).start();
    }

    private handleOffMoveLeftBtn(): void {
        this.goLeft = false;
        new Tween(this.Move_Left_Btn).to(0.2, { scale: new math.Vec3(1, 1, 1) }).start();
    }

    private handleAttackBtn(): void {
        this.attack = true;
        new Tween(this.Attack_Btn).to(0.2, { scale: new math.Vec3(0.9, 0.9, 1) }).start();
    }

    private handleOffAttackBtn(): void {
        this.attack = false;
        new Tween(this.Attack_Btn).to(0.2, { scale: new math.Vec3(1, 1, 1) }).start();

        switch (this.Character.getComponent("CharacterControl").HitsCombo.countCombo) {
            case 0:
                this.scheduleOnce(() => {
                    this.Character.getComponent("CharacterControl").hasSwitchedToAttack = false;
                }, 0.1)
                break;
            case 1:
                this.scheduleOnce(() => {
                    this.Character.getComponent("CharacterControl").hasSwitchedToAttack = false;
                }, 0.3)
                break;
            case 2:
                this.scheduleOnce(() => {
                    this.Character.getComponent("CharacterControl").hasSwitchedToAttack = false;
                }, 0.3)
                break;

            case 3:
                this.scheduleOnce(() => {
                    this.Character.getComponent("CharacterControl").hasSwitchedToAttack = false;
                }, 0.35)
                break;
            default:
                break;
        }
    }

    private handleJumpBtn(): void {
        this.jump = true;
        new Tween(this.Jump_Btn).to(0.2, { scale: new math.Vec3(0.6, 0.6, 1) }).start();
    }

    private handleOffJumpBtn(): void {
        this.jump = false;
        new Tween(this.Jump_Btn).to(0.2, { scale: new math.Vec3(0.7, 0.7, 1) }).start();
    }

    protected update(dt: number): void {

    }
}
