
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
        this.GamePlay.currentDevice = this.HORIZONTAL_IPX;

        this.GamePlay.Camera.node.setRotationFromEuler(-50, 0, 0);
        this.GamePlay.Camera.fov = 50;

        this.GamePlay.hint_Hand.setScale(new math.Vec3(0.12, 0.12, 0));
        this.GamePlay.hint_Hand.setPosition(new math.Vec3(-40, -30, 0));
        this.GamePlay.hint_Hand.getComponent(Animation).play("Hand_Tablet_Anim");

        this.GamePlay.cta_Fight.setScale(new math.Vec3(0.1, 0.1, 0.1));
        this.GamePlay.cta_Fight.setPosition(new math.Vec3(0, -55, 0));
        this.GamePlay.cta_Fight.getComponent(Animation).play("Blink_Tablet_Anim");


        this.GamePlay.firstHint.setScale(new math.Vec3(0.35, 0.35, 0.35));
        this.GamePlay.firstHint.setPosition(new math.Vec3(0, 20, 0));


        this.GamePlay.CTA.setScale(new math.Vec3(0.35, 0.35, 0.35));
        this.GamePlay.CTA.setPosition(new math.Vec3(0, 0, 0));


        this.GamePlay.Spine_Blasts.forEach(spine => {
            spine.node.setScale(new math.Vec3(0.2, 0.2, 0.2));
        });
        this.GamePlay.Spine_Blasts[1].node.setPosition(new math.Vec3(-10, -5, 0))
        this.GamePlay.Spine_Blasts[2].node.setPosition(new math.Vec3(10, -5, 0))
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.currentDevice = this.HORIZONTAL_TABLET;

        this.GamePlay.Camera.node.setRotationFromEuler(-50, 0, 0);
        this.GamePlay.Camera.fov = 50;

        this.GamePlay.hint_Hand.setScale(new math.Vec3(0.12, 0.12, 0));
        this.GamePlay.hint_Hand.setPosition(new math.Vec3(-40, -30, 0));
        this.GamePlay.hint_Hand.getComponent(Animation).play("Hand_Tablet_Anim");

        this.GamePlay.cta_Fight.setScale(new math.Vec3(0.1, 0.1, 0.1));
        this.GamePlay.cta_Fight.setPosition(new math.Vec3(0, -90, 0));
        this.GamePlay.cta_Fight.getComponent(Animation).play("Blink_Tablet_Anim");

        this.GamePlay.firstHint.setScale(new math.Vec3(0.4, 0.4, 0.4));
        this.GamePlay.firstHint.setPosition(new math.Vec3(0, 20, 0));


        this.GamePlay.CTA.setScale(new math.Vec3(0.35, 0.35, 0.35));
        this.GamePlay.CTA.setPosition(new math.Vec3(0, 0, 0));

        this.GamePlay.Spine_Blasts.forEach(spine => {
            spine.node.setScale(new math.Vec3(0.2, 0.2, 0.2));
        });
        this.GamePlay.Spine_Blasts[1].node.setPosition(new math.Vec3(-10, -5, 0))
        this.GamePlay.Spine_Blasts[2].node.setPosition(new math.Vec3(10, -5, 0))

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
        this.GamePlay.currentDevice = this.VERTICAL_IPX;

        this.GamePlay.Camera.node.setRotationFromEuler(-52.5, 0, 0);
        this.GamePlay.Camera.fov = 80;
        
        this.GamePlay.firstHint.setScale(new math.Vec3(1, 1, 1));
        this.GamePlay.firstHint.setPosition(new math.Vec3(0, 0, 0));

        this.GamePlay.hint_Hand.setScale(new math.Vec3(0.25, 0.25, 0));
        this.GamePlay.hint_Hand.setPosition(new math.Vec3(-122, -75, 0));
        this.GamePlay.hint_Hand.getComponent(Animation).play("Hand_IPX_Anim");

        this.GamePlay.cta_Fight.setScale(new math.Vec3(0.3, 0.3, 0.3));
        this.GamePlay.cta_Fight.setPosition(new math.Vec3(0, -225, 0));
        this.GamePlay.cta_Fight.getComponent(Animation).play("Blink_Mobile_Anim");

        this.GamePlay.Spine_Blasts.forEach(spine => {
            spine.node.setScale(new math.Vec3(0.4, 0.4, 0.4));
            let pos = spine.node.getPosition();
            spine.node.setPosition(new math.Vec3(pos.x, pos.y + 70, pos.z));
        });

    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        this.GamePlay.currentDevice = this.VERTICAL_MOBILE;

        this.GamePlay.Camera.node.setRotationFromEuler(-52.5, 0, 0);
        this.GamePlay.Camera.fov = 70;

        if(view.getFrameSize().height / view.getFrameSize().width > 1.5) {
            // if (view.getFrameSize().width / view.getFrameSize().height >= 0.6 && view.getFrameSize().width / view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            this.GamePlay.hint_Hand.setScale(new math.Vec3(0.25, 0.25, 0));
            this.GamePlay.hint_Hand.setPosition(new math.Vec3(-100, -75, 0));
            this.GamePlay.hint_Hand.getComponent(Animation).play("Hand_IP6S_Anim");


            this.GamePlay.firstHint.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.firstHint.setPosition(new math.Vec3(0, 0, 0));


            this.GamePlay.cta_Fight.setScale(new math.Vec3(0.3, 0.3, 0.3));
            this.GamePlay.cta_Fight.setPosition(new math.Vec3(0, -185, 0));
            this.GamePlay.cta_Fight.getComponent(Animation).play("Blink_Mobile_Anim");


            this.GamePlay.CTA.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.CTA.setPosition(new math.Vec3(0, 0, 0));

            this.GamePlay.Spine_Blasts.forEach(spine => {
                spine.node.setScale(new math.Vec3(0.4, 0.4, 0.4));
                let pos = spine.node.getPosition();
                spine.node.setPosition(new math.Vec3(pos.x, pos.y + 50, pos.z));
            });
            
        } else {

            this.GamePlay.hint_Hand.setScale(new math.Vec3(0.25, 0.25, 0));
            this.GamePlay.hint_Hand.setPosition(new math.Vec3(-80, -65, 0));
            this.GamePlay.hint_Hand.getComponent(Animation).play("Hand_OtherMobile_Anim");


            this.GamePlay.firstHint.setScale(new math.Vec3(0.9, 0.9, 0.9));
            this.GamePlay.firstHint.setPosition(new math.Vec3(0, 50, 0));


            this.GamePlay.cta_Fight.setScale(new math.Vec3(0.3, 0.3, 0.3));
            this.GamePlay.cta_Fight.setPosition(new math.Vec3(0, -145, 0));
            this.GamePlay.cta_Fight.getComponent(Animation).play("Blink_Mobile_Anim");


            this.GamePlay.CTA.setScale(new math.Vec3(0.9, 0.9, 0.9));
            this.GamePlay.CTA.setPosition(new math.Vec3(0, 0, 0));

            this.GamePlay.Spine_Blasts.forEach(spine => {
                spine.node.setScale(new math.Vec3(0.4, 0.4, 0.4));
                let pos = spine.node.getPosition();
                spine.node.setPosition(new math.Vec3(pos.x, pos.y + 70, pos.z));
            });
    
        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

