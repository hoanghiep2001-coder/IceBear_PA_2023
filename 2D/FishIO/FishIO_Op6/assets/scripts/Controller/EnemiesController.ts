import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class EnemiesController extends Component {

    // array
    @property([Prefab])
    enemiesFish: Prefab[] = [];
    @property([Node])
    Point_Lv1: Node[] = [];
    @property([Node])
    Point_Lv2: Node[] = [];
    @property([Node])
    Point_Lv3: Node[] = [];


    Fishes_Lv1: Node[] = [];
    Fishes_Lv2: Node[] = [];

    protected onLoad(): void {

    }


    protected start(): void {
        for (let i = 0; i < this.Point_Lv1.length; ++i) {
            let newFish = instantiate(this.enemiesFish[0]);

            let x = this.Point_Lv1[i].getPosition().x;
            let y = this.Point_Lv1[i].getPosition().y;

            newFish.setPosition(x, y, 0);
            newFish.parent = this.node;
            newFish.name = String(newFish.name + `_${i}`);
        }

        for (let i = 0; i < this.Point_Lv2.length; ++i) {
            let newFish = instantiate(this.enemiesFish[1]);

            let x = this.Point_Lv2[i].getPosition().x;
            let y = this.Point_Lv2[i].getPosition().y;

            newFish.setPosition(x, y);
            newFish.parent = this.node;
            newFish.name = String(newFish.name + `_${i}`)
        }

        // for (let i = 0; i < this.Point_Lv3.length; ++i) {
        //     let newFish = instantiate(this.enemiesFish[2]);

        //     let x = this.Point_Lv3[i].getPosition().x;
        //     let y = this.Point_Lv3[i].getPosition().y;

        //     newFish.setPosition(x, y);
        //     newFish.parent = this.node;
        //     newFish.name = String(newFish.name + `_${i}`)
        // }
    }

}
