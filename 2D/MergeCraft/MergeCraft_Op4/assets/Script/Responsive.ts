
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;

    // state
    isRotate: boolean = false;

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

        this.GamePlay.isRotate = true;

        this.GamePlay.Cards[0].x = -140;  
        this.GamePlay.Cards[0].y = 45;  
        this.GamePlay.Cards[0].scale = 0.4;

        this.GamePlay.Cards[1].x = 140;  
        this.GamePlay.Cards[1].y = -120;
        this.GamePlay.Cards[1].scale = 0.4;

        this.GamePlay.Cards[2].x = 0;  
        this.GamePlay.Cards[2].y = 45;  
        this.GamePlay.Cards[2].scale = 0.4;

        this.GamePlay.Cards[3].x = 140;  
        this.GamePlay.Cards[3].y = 45;  
        this.GamePlay.Cards[3].scale = 0.4;

        this.GamePlay.Cards[4].x = -140;  
        this.GamePlay.Cards[4].y = -120;  
        this.GamePlay.Cards[4].scale = 0.4;

        this.GamePlay.Cards[5].x = 0;  
        this.GamePlay.Cards[5].y = -120;
        this.GamePlay.Cards[5].scale = 0.4;

        this.GamePlay.Cards_StepTwo[0].scale = 0.5;
        this.GamePlay.Cards_StepTwo[0].x = -100;

        this.GamePlay.Cards_StepTwo[1].scale = 0.5;
        this.GamePlay.Cards_StepTwo[1].x = 100;

        this.GamePlay.text.scale = 0.5;

        this.GamePlay.Bg2.scale = 0.6
        this.GamePlay.Bg2.y = 58;

        this.GamePlay.hint_Line.scale = 0.6;
        this.GamePlay.hint_Line.x = -1;
        this.GamePlay.hint_Line.y = -81;

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX(); 
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        // this.GamePlay.Bg2.scale = 0.65;
    }

    private setHorizontalForTablet(): void {
        // let size = cc.view.getFrameSize().width / cc.view.getFrameSize().height;
        
        // // tablet applovin
        // if(size >= 1.6 && size <= 1.7) {

        // }

        // if(size < 1.4) {
        //     // Ipad

        // } else {
        //     // Normal

        // }

        // this.GamePlay.Bg2.scale = 0.65;
    }

    private setVertical(): void {

        this.GamePlay.isRotate = false;

        this.GamePlay.Cards[0].x = -55;  
        this.GamePlay.Cards[0].y = 70;
        this.GamePlay.Cards[0].scale = 0.3; 

        this.GamePlay.Cards[1].x = 55;  
        this.GamePlay.Cards[1].y = -50;
        this.GamePlay.Cards[1].scale = 0.3; 

        this.GamePlay.Cards[2].x = 55;  
        this.GamePlay.Cards[2].y = 70;
        this.GamePlay.Cards[2].scale = 0.3;  

        this.GamePlay.Cards[3].x = -55;  
        this.GamePlay.Cards[3].y = -50;
        this.GamePlay.Cards[3].scale = 0.3;  

        this.GamePlay.Cards[4].x = -55;  
        this.GamePlay.Cards[4].y = -170;
        this.GamePlay.Cards[4].scale = 0.3; 

        this.GamePlay.Cards[5].x = 55;  
        this.GamePlay.Cards[5].y = -170;
        this.GamePlay.Cards[5].scale = 0.3;  

        this.GamePlay.Cards_StepTwo[0].scale = 0.4;
        this.GamePlay.Cards_StepTwo[0].x = -60;

        this.GamePlay.Cards_StepTwo[1].scale = 0.4;
        this.GamePlay.Cards_StepTwo[1].x = 60;

        this.GamePlay.text.scale = 0.4;

        this.GamePlay.Bg2.y = 8;

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.GamePlay.hint_Line.scale = 0.35;
        this.GamePlay.hint_Line.x = -0.8;
        this.GamePlay.hint_Line.y = -81;

        this.GamePlay.text.scale = 0.35;
        this.GamePlay.Bg2.scale = 0.38;
    }

    private setMobile(): void {
        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {
            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.text.scale = 0.4;
            this.GamePlay.Bg2.scale = 0.38;

            this.GamePlay.hint_Line.scale = 0.35;
            this.GamePlay.hint_Line.x = -0.8;
            this.GamePlay.hint_Line.y = -81;
        } else {    
            // Ipad
            this.GamePlay.text.scale = 0.4;
            this.GamePlay.Bg2.scale = 0.5;

            this.GamePlay.hint_Line.scale = 0.47;
            this.GamePlay.hint_Line.x = -0.8;
            this.GamePlay.hint_Line.y = -105;
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
