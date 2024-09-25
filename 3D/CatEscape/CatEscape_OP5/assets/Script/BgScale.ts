
import { _decorator, Component, log, Node, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('BgScale')
export class BgScale extends Component {
    
    protected onLoad(): void {
        
    }

    protected start(): void {
        
    }

    private setScale():void {
        // let bgWidth: number = this.node.getComponent(UITransform).contentSize.width;
        // let screen_width: number = view.getFrameSize().width;
        // let screen_height: number = view.getFrameSize().height;
        // if (screen_width != bgWidth) {
        //     this.node.getComponent(UITransform).contentSize.set(screen_width, screen_height);
        // }
        // if (screen_width < screen_height) {
        //     this.node.getComponent(UITransform).contentSize.set(screen_width + 100, screen_height)
        // }
    }   

    protected update(dt: number): void {
        this.setScale();
    }
}

