import { _decorator, Animation, Component, Node } from 'cc';
import { Constants } from '../Data/Constant';
const { ccclass, property } = _decorator;


@ccclass('UI_Controller')
export class UI_Controller extends Component {

    @property(Node)
    icon: Node = null;
    @property(Node)
    logo: Node = null;
    @property(Node)
    Reload: Node = null;

    // state
    flagReplay: boolean = false;

    protected start(): void {
    }

    protected update(dt: number): void {
        if(!Constants.flagReplay) {
            if(Constants.isReplay && !this.flagReplay) {
                this.flagReplay = true;

                this.scheduleOnce(() => {
                    this.Reload.getComponent(Animation).play("Reload_RotateAnim");
        
                    this.scheduleOnce(() => {
                        Constants.forceReplay = true;
                    }, 0.8);
                }, 0.5);
            }
        }
    }
}

