
import { _decorator, Component, math, Node, Tween, tween, view, Animation } from 'cc';
import { GamePlay } from './GamePlay';
const { ccclass, property } = _decorator;
 
@ccclass('Responsive')
export class Responsive extends Component {
    
    @property(GamePlay)
    GamePlay: GamePlay = null;
    
    // state
    device: string = "";
    isRotate: boolean = false;
    hint_Pos_X: number;
    hint_Pos_Y: number;
    
    hand: Node = null;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";    

    protected onLoad(): void {
        
    }

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
        if(view.getFrameSize().height / view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        if(this.HORIZONTAL_IPX === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_IPX;
        // this.GamePlay.currentDevice = this.HORIZONTAL_IPX;

        this.GamePlay.Camera.fov = 38
        this.GamePlay.isRotate = true;
        this.GamePlay.hand_1.setPosition(new math.Vec3(-240, -260, 0));
        this.GamePlay.hand_1.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_2.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_2.setPosition(new math.Vec3(300, -150, 0));
        this.GamePlay.hand_3.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_3.setPosition(new math.Vec3(-50, -430, 0));
        this.GamePlay.hand_4.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_4.setPosition(new math.Vec3(150, -430, 0));

        this.GamePlay.logo.setPosition(0, 320, 0);
        this.GamePlay.pumkin_Base.setPosition(0, -2.25, -199.6);
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.Camera.fov = 38
        this.GamePlay.isRotate = true;
        this.GamePlay.hand_1.setPosition(new math.Vec3(-240, -260, 0));
        this.GamePlay.hand_1.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_2.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_2.setPosition(new math.Vec3(300, -150, 0));
        this.GamePlay.hand_3.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_3.setPosition(new math.Vec3(-50, -430, 0));
        this.GamePlay.hand_4.getComponent(Animation).play("HandHorizontal_Anim");
        this.GamePlay.hand_4.setPosition(new math.Vec3(150, -430, 0));

        this.GamePlay.logo.setPosition(0, 320, 0);
        this.GamePlay.pumkin_Base.setPosition(0, -2.25, -199.6);


    }

    private setVertical(): void {
        if (view.getFrameSize().width / view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if(this.VERTICAL_IPX === this.device) {
            return;
        }

        this.device = this.VERTICAL_IPX;
        this.GamePlay.Camera.fov = 67;
        this.GamePlay.isRotate = false;
        this.GamePlay.hand_1.setPosition(new math.Vec3(-130, -140, 0));
        this.GamePlay.hand_2.setPosition(new math.Vec3(160, -80, 0));
        this.GamePlay.hand_1.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_2.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_3.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_3.setPosition(new math.Vec3(-20, -230, 0));
        this.GamePlay.hand_4.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_4.setPosition(new math.Vec3(80, -230, 0));

        this.GamePlay.logo.setPosition(0, 220, 0);
        this.GamePlay.pumkin_Base.setPosition(0, -2.2, -199.6);

    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        this.GamePlay.Camera.fov = 57;
        this.GamePlay.isRotate = false;
        this.GamePlay.hand_1.setPosition(new math.Vec3(-150, -210, 0));
        this.GamePlay.hand_2.setPosition(new math.Vec3(190, -120, 0));
        this.GamePlay.hand_1.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_2.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_3.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_3.setPosition(new math.Vec3(-20, -310, 0));
        this.GamePlay.hand_4.getComponent(Animation).play("Hand_Anim");
        this.GamePlay.hand_4.setPosition(new math.Vec3(100, -310, 0));

        this.GamePlay.logo.setPosition(0, 230, 0);
        this.GamePlay.pumkin_Base.setPosition(0, -2.3, -199.6);

        if(view.getFrameSize().height / view.getFrameSize().width > 1.5) {
            // if (view.getFrameSize().width / view.getFrameSize().height >= 0.6 && view.getFrameSize().width / view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            
        } else {
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

