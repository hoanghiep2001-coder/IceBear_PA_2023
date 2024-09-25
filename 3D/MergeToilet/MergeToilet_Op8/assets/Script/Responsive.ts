
import { _decorator, Component, math, Node, Tween, tween, view, Animation, screen } from 'cc';
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
        if (screen.windowSize.width > screen.windowSize.height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {
        if(screen.windowSize.height / screen.windowSize.width < 0.65) {
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
        this.GamePlay.currentDevice = this.HORIZONTAL_IPX;

        this.GamePlay.Camera.node.setRotationFromEuler(-50, 0, 0);
        this.GamePlay.Camera.fov = 50;

        this.GamePlay.Coin_Container.setPosition(new math.Vec3(150, 200, 0));
        this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0));
        this.GamePlay.Content.setPosition(new math.Vec3(0, 30, 0));
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.currentDevice = this.HORIZONTAL_TABLET;

        this.GamePlay.Camera.node.setRotationFromEuler(-50, 0, 0);
        this.GamePlay.Camera.fov = 50;

        this.GamePlay.Coin_Container.setPosition(new math.Vec3(150, 200, 0));
        this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0));
        this.GamePlay.Content.setPosition(new math.Vec3(0, 30, 0));
    }

    private setVertical(): void {
        if (screen.windowSize.width / screen.windowSize.height < 0.5) {
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
        this.GamePlay.currentDevice = this.VERTICAL_IPX;

        this.GamePlay.Camera.node.setRotationFromEuler(-52.5, 0, 0);
        this.GamePlay.Camera.fov = 80;

        this.GamePlay.Coin_Container.setPosition(new math.Vec3(90, 260, 0));
        this.GamePlay.Content.setPosition(new math.Vec3(0, 0, 0))

        this.GamePlay.isMergeDone 
        ? this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0))
        : this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0.023))
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        this.GamePlay.currentDevice = this.VERTICAL_MOBILE;

        this.GamePlay.Camera.node.setRotationFromEuler(-52.5, 0, 0);
        this.GamePlay.Camera.fov = 70;

        if(screen.windowSize.height / screen.windowSize.width > 1.5) {
            if (screen.windowSize.width / screen.windowSize.height >= 0.6 && screen.windowSize.width / screen.windowSize.height < 0.62) {
                // mobile mode applovin
                this.GamePlay.Coin_Container.setPosition(new math.Vec3(90, 220, 0));
                this.GamePlay.Content.setPosition(new math.Vec3(0, 0, 0));

                this.GamePlay.isMergeDone 
                ? this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0))
                : this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0.023))

                return;
            }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            this.GamePlay.Coin_Container.setPosition(new math.Vec3(90, 250, 0));
            this.GamePlay.Content.setPosition(new math.Vec3(0, 0, 0));

            this.GamePlay.isMergeDone 
            ? this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0))
            : this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0.023))
            
        } else {
            this.GamePlay.Coin_Container.setPosition(new math.Vec3(90, 210, 0));
            this.GamePlay.Content.setPosition(new math.Vec3(0, 40, 0))

            this.GamePlay.isMergeDone 
            ? this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0))
            : this.GamePlay.platform.setPosition(new math.Vec3(0, 0, 0.023))
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

