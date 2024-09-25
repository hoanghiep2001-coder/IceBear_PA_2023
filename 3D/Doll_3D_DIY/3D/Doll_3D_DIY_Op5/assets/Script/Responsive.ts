
import { _decorator, Component, math, Node, Tween, tween, view, Animation, Vec3, UITransform } from 'cc';
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

    private handleRotate(): void {
        if (view.getFrameSize().width > view.getFrameSize().height) {
            this.GamePlay.isRotate = true;
            this.GamePlay.setDevice = "Tablet";
            this.setHorizontal();
        } else {
            this.GamePlay.isRotate = false;
            this.GamePlay.setDevice = "Mobile";
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
        this.GamePlay.Camera.fov = 50;

        this.GamePlay.background1.setScale(new math.Vec3(0.6, 0.6, 1));
        this.GamePlay.background2.setScale(new math.Vec3(0.6, 0.6, 1));

        this.GamePlay.SelectOption_Container.setPosition(new math.Vec3(-160, -200, 0));
        this.GamePlay.SelectOption_Container.setScale(new math.Vec3(1.1, 1.1, 1.1));
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.Camera.fov = 50;

        this.GamePlay.background1.setScale(new math.Vec3(0.6, 0.6, 1));
        this.GamePlay.background2.setScale(new math.Vec3(0.6, 0.6, 1));

        this.GamePlay.SelectOption_Container.setPosition(new math.Vec3(-160, -180, 0));
        this.GamePlay.SelectOption_Container.setScale(new math.Vec3(1.1, 1.1, 1.1));
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

        this.GamePlay.Camera.fov = 60;

        this.GamePlay.background1.setScale(new math.Vec3(0.5, 0.65, 1));
        this.GamePlay.background2.setScale(new math.Vec3(0.5, 0.65, 1));

        this.GamePlay.SelectOption_Container.setPosition(new math.Vec3(-160, -300, 0));
        this.GamePlay.SelectOption_Container.setScale(new math.Vec3(1, 1, 1));
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.GamePlay.Camera.fov = 60;

            this.GamePlay.background1.setScale(new math.Vec3(0.5, 0.65, 1));
            this.GamePlay.background2.setScale(new math.Vec3(0.5, 0.65, 1));

            this.GamePlay.SelectOption_Container.setPosition(new math.Vec3(-160, -240, 0));
            this.GamePlay.SelectOption_Container.setScale(new math.Vec3(1, 1, 1));
        } else {
            this.GamePlay.Camera.fov = 60;

            this.GamePlay.background1.setScale(new math.Vec3(0.5, 0.65, 1));
            this.GamePlay.background2.setScale(new math.Vec3(0.5, 0.65, 1));

            this.GamePlay.SelectOption_Container.setPosition(new math.Vec3(-160, -200, 0));
            this.GamePlay.SelectOption_Container.setScale(new math.Vec3(1, 1, 1));
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

