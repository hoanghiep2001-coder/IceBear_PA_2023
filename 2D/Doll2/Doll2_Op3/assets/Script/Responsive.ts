
import GamePlay from "./GamePlay";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    isRotate: boolean = false;

    @property(GamePlay)
    GamePlay: GamePlay = null;

    protected start(): void {
        
    }

    private handleRotate(): void {
        if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
            this.isRotate = true;
            this.setHorizontal();

            this.GamePlay.bg_Horizontal_2.active = true;
            this.GamePlay.bg_Horizontal_Flip_2.active = true;
            this.GamePlay.bg_Vertical_2.active = false;

            this.GamePlay.character.x = -200;
            this.GamePlay.character.y = -80;   
           this.GamePlay.character.scale = 0.5;

           this.GamePlay.Button_Container.scale = 1.2;
           this.GamePlay.Button_Container.x = 650;
           this.GamePlay.Button_Container.y = 600;

           this.GamePlay.boy.scale = 1.2;
           this.GamePlay.boy.x = 200;  
           this.GamePlay.boy.y = 400;

           this.GamePlay.text.scale = 0.7;
           this.GamePlay.text.x = 130;
           this.GamePlay.text.y = 100;
        } else {
            this.isRotate = false;
            this.setVertical();

            this.GamePlay.bg_Vertical_2.active = true;

            this.GamePlay.bg_Horizontal_2.active = false;
            this.GamePlay.bg_Horizontal_Flip_2.active = false;

            this.GamePlay.character.x = 0;
            this.GamePlay.character.y = -12;    
            this.GamePlay.character.scale = 0.35;

            this.GamePlay.Button_Container.scale = 1;
            this.GamePlay.Button_Container.y = 0;
            this.GamePlay.Button_Container.x = 0;

            this.GamePlay.text.scale = 0.5;
            this.GamePlay.text.x = 0;
            this.GamePlay.text.y = 212;


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

    }

    private setHorizontalForTablet(): void {

    }

    private setVertical(): void {

        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        this.GamePlay.boy.scale = 1;
        this.GamePlay.boy.x = 200;  
        this.GamePlay.boy.y = 400;
    }

    private setMobile(): void {
        this.GamePlay.boy.scale = 1.2;
        this.GamePlay.boy.x = 220;  
        this.GamePlay.boy.y = 400;  
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}
