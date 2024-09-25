import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    @property(GamePlay)
    GamePlay: GamePlay = null;
    
    // state
    device: string = "";
    isRotate: boolean = false;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";    

    protected onLoad(): void {
        
    }

    protected start(): void {

    }

    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }

    private setHorizontal(): void {
        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
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
        this.GamePlay.isRotate = true;

        this.GamePlay.bg.scale = 0.85;

        this.GamePlay.spine_cleanser.node.scale = 0.2;

        this.GamePlay.text.scale = 0.55;
        this.GamePlay.text.y = 190;

        this.GamePlay.hand_MainContent.scale = 0.45;

        this.GamePlay.Scratchable.scaleX = 0.2;
        this.GamePlay.Scratchable.scaleY = 0.3;
        this.GamePlay.spiderContainer.scale = 1.5;
        this.GamePlay.spiderContainer.x = 0;
        this.GamePlay.spiderContainer.y = -50;

        this.GamePlay.popup.scale = 1;
        this.GamePlay.popup.y = 0;

        if(this.GamePlay.isEndGame) {
            this.GamePlay.hand_MainContent.x = -130;
            this.GamePlay.spiderContainer.x = -136;
            this.GamePlay.popup_horizontal.opacity = 255;
            this.GamePlay.popup_horizontal.active = true;
            this.GamePlay.popup_horizontal.getComponent(cc.Animation).play("PopupHorizontal_HintAnim");
            this.GamePlay.popup.active = false;
        }

        this.GamePlay.decor_pumpkin.scale = 0.45;
        this.GamePlay.decor_spiderweb1.scale = 0.55;
        this.GamePlay.decor_spiderweb2.scaleX = -0.55;
        this.GamePlay.decor_spiderweb2.scaleY = 0.55;

    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.isRotate = true;

        this.GamePlay.bg.scale = 0.7;

        this.GamePlay.spine_cleanser.node.scale = 0.2;

        this.GamePlay.text.scale = 0.55;
        this.GamePlay.text.y = 190;

        this.GamePlay.hand_MainContent.scale = 0.45;

        this.GamePlay.Scratchable.scaleX = 0.2;
        this.GamePlay.Scratchable.scaleY = 0.3;
        this.GamePlay.spiderContainer.scale = 1.5;
        this.GamePlay.spiderContainer.x = 0;
        this.GamePlay.spiderContainer.y = -50;

        this.GamePlay.popup.scale = 1;
        this.GamePlay.popup.y = 0;
        this.GamePlay.popup_horizontal.x = 20;

        if(this.GamePlay.isEndGame) {
            this.GamePlay.spiderContainer.x = -136;
            this.GamePlay.hand_MainContent.x = -130;
            this.GamePlay.popup_horizontal.opacity = 255;
            this.GamePlay.popup_horizontal.active = true;
            this.GamePlay.popup_horizontal.getComponent(cc.Animation).play("PopupHorizontal_HintAnim");
            this.GamePlay.popup.active = false;
        }

        this.GamePlay.decor_pumpkin.scale = 0.45;
        this.GamePlay.decor_spiderweb1.scale = 0.55;
        this.GamePlay.decor_spiderweb2.scaleX = -0.55;
        this.GamePlay.decor_spiderweb2.scaleY = 0.55;
    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
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
        this.GamePlay.isRotate = false;

        this.GamePlay.bg.scale = 0.4;
        this.GamePlay.spine_cleanser.node.scale = 0.15;

        this.GamePlay.text.scale = 0.4;
        this.GamePlay.text.y = 150;

        this.GamePlay.hand_MainContent.scale = 0.35;
        this.GamePlay.Scratchable.scaleX = 0.1;
        this.GamePlay.Scratchable.scaleY = 0.2;
        this.GamePlay.spiderContainer.scale = 1;
        this.GamePlay.spiderContainer.x = -1.3;
        this.GamePlay.spiderContainer.y = -61;

        this.GamePlay.popup.scale = 0.8;
        this.GamePlay.popup.y = -40;

        if(this.GamePlay.isEndGame) {
            this.GamePlay.getComponent(cc.Animation).stop("GamePlay_EndAnimForRotate");
            this.GamePlay.hand_MainContent.x = 1.7;
            this.GamePlay.spiderContainer.x = -1.3;
            this.GamePlay.popup.opacity = 255;
            this.GamePlay.popup.active = true;
            this.GamePlay.popup.getComponent(cc.Animation).play("Popup_HintAnim");
            this.GamePlay.popup_horizontal.active = false;
        }

        this.GamePlay.decor_pumpkin.scale = 0.3;
        this.GamePlay.decor_spiderweb1.scale = 0.35;
        this.GamePlay.decor_spiderweb2.scaleX = -0.35;
        this.GamePlay.decor_spiderweb2.scaleY = 0.35;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;
        

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin
          
            //     return;
            // }

            // Iphone 6 / 6 Plus / 7 / 7 Plus   
            this.GamePlay.bg.scale = 0.4;
            this.GamePlay.spine_cleanser.node.scale = 0.15;

            this.GamePlay.isRotate = false;

            this.GamePlay.bg.scale = 0.4;
            this.GamePlay.spine_cleanser.node.scale = 0.15;
    
            this.GamePlay.text.scale = 0.4;
            this.GamePlay.text.y = 150;
    
            this.GamePlay.hand_MainContent.scale = 0.35;
            this.GamePlay.Scratchable.scaleX = 0.1;
            this.GamePlay.Scratchable.scaleY = 0.2;
            this.GamePlay.spiderContainer.scale = 1;
            this.GamePlay.spiderContainer.x = -1.3;
            this.GamePlay.spiderContainer.y = -61;
    
            this.GamePlay.popup.scale = 0.9;
            this.GamePlay.popup.y = -25;
    
            if(this.GamePlay.isEndGame) {
                this.GamePlay.getComponent(cc.Animation).stop("GamePlay_EndAnimForRotate");
                this.GamePlay.hand_MainContent.x = 1.7;
                this.GamePlay.spiderContainer.x = -1.3;
                this.GamePlay.popup.opacity = 255;
                this.GamePlay.popup.active = true;
                this.GamePlay.popup.getComponent(cc.Animation).play("Popup_HintAnim");
                this.GamePlay.popup_horizontal.active = false;
            }
    
            this.GamePlay.decor_pumpkin.scale = 0.3;
            this.GamePlay.decor_spiderweb1.scale = 0.35;
            this.GamePlay.decor_spiderweb2.scaleX = -0.35;
            this.GamePlay.decor_spiderweb2.scaleY = 0.35;
        } else {
            this.GamePlay.bg.scale = 0.4;
            this.GamePlay.spine_cleanser.node.scale = 0.15;

            this.GamePlay.isRotate = false;

            this.GamePlay.bg.scale = 0.4;
            this.GamePlay.spine_cleanser.node.scale = 0.15;
    
            this.GamePlay.text.scale = 0.4;
            this.GamePlay.text.y = 150;
    
            this.GamePlay.hand_MainContent.scale = 0.35;
            this.GamePlay.Scratchable.scaleX = 0.1;
            this.GamePlay.Scratchable.scaleY = 0.2;
            this.GamePlay.spiderContainer.scale = 1;
            this.GamePlay.spiderContainer.x = -1.3;
            this.GamePlay.spiderContainer.y = -61;
    
            this.GamePlay.popup.scale = 0.9;
            this.GamePlay.popup.y = -20;
    
            if(this.GamePlay.isEndGame) {
                this.GamePlay.getComponent(cc.Animation).stop("GamePlay_EndAnimForRotate");
                this.GamePlay.hand_MainContent.x = 1.7;
                this.GamePlay.spiderContainer.x = -1.3;
                this.GamePlay.popup.opacity = 255;
                this.GamePlay.popup.active = true;
                this.GamePlay.popup.getComponent(cc.Animation).play("Popup_HintAnim");
                this.GamePlay.popup_horizontal.active = false;
            }
    
            this.GamePlay.decor_pumpkin.scale = 0.3;
            this.GamePlay.decor_spiderweb1.scale = 0.35;
            this.GamePlay.decor_spiderweb2.scaleX = -0.35;
            this.GamePlay.decor_spiderweb2.scaleY = 0.35;

        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
