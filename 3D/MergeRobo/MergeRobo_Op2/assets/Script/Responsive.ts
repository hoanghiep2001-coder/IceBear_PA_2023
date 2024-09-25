
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
        this.GamePlay.text_90Per.setPosition(new math.Vec3(0, -180, 0));
        this.GamePlay.text_90Per.setScale(new math.Vec3(0.45, 0.45, 0.45));

        this.GamePlay.text.setPosition(new math.Vec3(0, -10.505, 12.8));
        this.GamePlay.text.setScale(new math.Vec3(3.5, 0.8, 0.33));

        this.GamePlay.Spine_Blast.setScale(new math.Vec3(0.25, 0.25, 0.25));
        this.GamePlay.Spine_Blast.setPosition(new math.Vec3(0, 25, 0));

        this.GamePlay.Spine_Blast2.setPosition(new math.Vec3(-10, 15, 0));
        this.GamePlay.Spine_Blast2.setScale(new math.Vec3(0.15, 0.15, 0.15));

        this.GamePlay.Spine_Blast3.setPosition(new math.Vec3(10, 15, 0));
        this.GamePlay.Spine_Blast3.setScale(new math.Vec3(0.15, 0.15, 0.15));
        this.GamePlay.Camera.fov = 50;   

        this.JoyStick.isRotate = true;

        this.GamePlay.PointRobos[0].setPosition(new math.Vec3(-105, 17, 0));
        this.GamePlay.PointRobos[1].setPosition(new math.Vec3(-48, 17, 0));
        this.GamePlay.PointRobos[2].setPosition(new math.Vec3(2, 12, 0));
        this.GamePlay.PointRobos[3].setPosition(new math.Vec3(1, -41, 0));
        this.GamePlay.PointRobos[4].setPosition(new math.Vec3(-1, -111, 0));
        this.GamePlay.PointRobos[5].setPosition(new math.Vec3(-58, -110, 0));
        this.GamePlay.PointRobos[6].setPosition(new math.Vec3(-122, -111, 0));
        this.GamePlay.PointRobos[7].setPosition(new math.Vec3(-117, -46, 0));
    }


    private setVertical(): void {
      
        this.GamePlay.text.setPosition(new math.Vec3(0, -11.605, 13.392));
        this.GamePlay.text.setScale(new math.Vec3(2.5, 0.4, 0.33));

        this.GamePlay.Spine_Blast.setPosition(new math.Vec3(0, 75, 0));
        this.GamePlay.Spine_Blast.setScale(new math.Vec3(0.6, 0.6, 0.6));

        this.GamePlay.Spine_Blast2.setPosition(new math.Vec3(-30, 65, 0));
        this.GamePlay.Spine_Blast2.setScale(new math.Vec3(0.45, 0.45, 0.45));

        this.GamePlay.Spine_Blast3.setPosition(new math.Vec3(20, 65, 0));
        this.GamePlay.Spine_Blast3.setScale(new math.Vec3(0.45, 0.45, 0.45));

        this.JoyStick.isRotate = false;

        this.GamePlay.PointRobos[0].setPosition(new math.Vec3(-105, 17, 0));
        this.GamePlay.PointRobos[1].setPosition(new math.Vec3(-48, 17, 0));
        this.GamePlay.PointRobos[2].setPosition(new math.Vec3(2, 12, 0));
        this.GamePlay.PointRobos[3].setPosition(new math.Vec3(1, -41, 0));
        this.GamePlay.PointRobos[4].setPosition(new math.Vec3(-1, -126, 0));
        this.GamePlay.PointRobos[5].setPosition(new math.Vec3(-58, -125, 0));
        this.GamePlay.PointRobos[6].setPosition(new math.Vec3(-122, -126, 0));
        this.GamePlay.PointRobos[7].setPosition(new math.Vec3(-117, -46, 0));

        if (view.getFrameSize().width / view.getFrameSize().height < 0.5) {
            // Iphone X

            this.GamePlay.text_90Per.setPosition(new math.Vec3(0, -250, 0));
            this.GamePlay.text_90Per.setScale(new math.Vec3(0.4, 0.4, 0.4));
            this.GamePlay.Camera.fov = 64;
        } else {
            // Other Mobile
            this.GamePlay.text_90Per.setPosition(new math.Vec3(0, -208, 0));
            this.GamePlay.text_90Per.setScale(new math.Vec3(0.4, 0.4, 0.4));
            this.GamePlay.Camera.fov = 58;
        }
    }

    update (deltaTime: number) {
        this.handleRotate();
    }
}
