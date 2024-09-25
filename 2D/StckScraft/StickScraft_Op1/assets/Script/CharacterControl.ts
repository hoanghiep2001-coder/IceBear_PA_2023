import { _decorator, Component, log, math, Node, RigidBody, SkeletalAnimation } from 'cc';
import { GamePlay } from './GamePlay';
import { HitsCombo } from './Character/HitsCombo';
const { ccclass, property } = _decorator;

@ccclass('CharacterControl')
export class CharacterControl extends Component {


    // Component
    @property(GamePlay)
    GamePlay: GamePlay;

    // Ref
    @property(HitsCombo)
    HitsCombo: HitsCombo;

    private speed: number = 4;
    private characterAnim: string = "";
    private hasSwitchedToAttack: boolean = false;

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, () => {
            console.log("check");
        });
    }

    protected start(): void {
        this.getComponent(SkeletalAnimation).play("stick_idle_01");
    }

    private switchAnim(value: string): void {
        if (value === "idle") {

            if (this.hasSwitchedToAttack && this.characterAnim !== "isAttack") {
                this.characterAnim = "isAttack";
                this.HitsCombo.countCombo++;
                this.HitsCombo.handleHitsCombo(this.getComponent(SkeletalAnimation));
            }

            if (!this.hasSwitchedToAttack && this.characterAnim !== "isIdled") {
                this.characterAnim = "isIdled";
                this.getComponent(SkeletalAnimation).play("stick_idle_01");
            }

        }

        if (value === "run" && this.characterAnim != "isRunning") {
            this.characterAnim = "isRunning";
            this.getComponent(SkeletalAnimation).play("stick_archer_run");
        }

        if (value === "jump" && this.characterAnim != "isJumping") {
            this.characterAnim = "isJumping";
            this.getComponent(SkeletalAnimation).play("Jump");
        }
    }

    private handleChangeWeapons(): void {
        switch (this.GamePlay.choosenWeapon) {
            case "fist":
                this.getComponent(SkeletalAnimation).play("stick_idle_01");
                break;
            case "sword":
                this.getComponent(SkeletalAnimation).play("stick_sword_idle");
                break;
            default:
                break;
        }
    }

    private handleMoveLeft(): void {
        if (this.GamePlay.goLeft) {
            this.node.setRotationFromEuler(new math.Vec3(0, -90, 0));
            this.getComponent(RigidBody).setLinearVelocity(new math.Vec3(-this.speed, 0, 0));
            this.switchAnim("run");
        }
    }

    private handleMoveRight(): void {
        if (this.GamePlay.goRight) {
            this.node.setRotationFromEuler(new math.Vec3(0, 90, 0));
            this.getComponent(RigidBody).setLinearVelocity(new math.Vec3(this.speed, 0, 0));
            this.switchAnim("run");
            this.hasSwitchedToAttack = false;
        }
    }

    private handleStandStill(): void {
        if (!this.GamePlay.goRight && !this.GamePlay.goLeft) {
            this.getComponent(RigidBody).setLinearVelocity(new math.Vec3(0, 0, 0));
            this.switchAnim("idle");
            // this.hasSwitchedToAttack = true;
        }
    }

    private handleAttack(): void {
        if (this.GamePlay.attack) {
            this.hasSwitchedToAttack = true;
            this.switchAnim("idle");
        }
    }

    private handleJump(): void {
        if (this.GamePlay.jump) {
            this.getComponent(RigidBody).setLinearVelocity(new math.Vec3(0, this.speed * 2, 0));
            this.switchAnim("jump");
        }
    }

    protected update(dt: number): void {
        if (this.GamePlay.isChangeWeapon) {
            this.handleChangeWeapons();
        }

        this.handleMoveLeft();
        this.handleMoveRight();
        this.handleStandStill();
        this.handleJump();
        this.handleAttack();
    }

}
