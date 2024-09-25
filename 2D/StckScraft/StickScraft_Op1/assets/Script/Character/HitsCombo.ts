
import { _decorator, Component, Node, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HitsCombo')
export class HitsCombo extends Component {

    public countCombo: number = 0;
    private maxTimeDelayCombo: number = 1;
    private maxAttackCombo: number = 3;
    private lastClickedTime: Date = new Date();

    public handleHitsCombo(skeletalAnim: SkeletalAnimation): void {
        switch (this.countCombo) {
            case 1:
                skeletalAnim.play("Sword_1")
                break;
            case 2:
                skeletalAnim.play("Sword_2")
                break;
            case 3:
                skeletalAnim.play("Sword_3")
                break;
            default:
                break;
        }
    }

    protected update(dt: number): void {
        if (this.countCombo >= 4) {
            this.countCombo = 0;
        }
    }

}

