
import { _decorator, Component, Node, math, view } from 'cc';
import { GamePlay } from './GamePlay';
import { JoyStick } from './JoyStick';
const { ccclass, property } = _decorator;
 
@ccclass('Responsive')
export class Responsive extends Component {

    @property(GamePlay)
    GamePlay: GamePlay = null;
    @property(JoyStick)
    JoyStick: JoyStick = null;
    
    isRotate: boolean = false;

    protected start(): void {
        
    }

    
    private handleRotate(): void {
        if (view.getFrameSize().width > view.getFrameSize().height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {

        this.GamePlay.Camera.fov = 50;   
    }


    private setVertical(): void {

        if (view.getFrameSize().width / view.getFrameSize().height < 0.5) {
            // Iphone X
            this.GamePlay.Camera.fov = 64;
        } else {
            // Other Mobile
            this.GamePlay.Camera.fov = 58;
        }
    }

    update (deltaTime: number) {
        this.handleRotate();
    }
}
