import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestClick')
export class TestClick extends Component {
    @property(Node)
    Check: Node = null;

    protected onLoad(): void {

    }

    protected start(): void {
        this.Check.on(Node.EventType.TOUCH_START, () => {
            console.log("check");

        });
    }

    protected update(dt: number): void {

    }
}

