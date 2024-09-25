import { Constants } from "../Data/constants";
import GamePlay from "./GamePlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responsive extends cc.Component {

    // Component
    @property(GamePlay)
    GamePlay: GamePlay = null;


    // state
    device: string = "";
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
            Constants.isRotate = true;
            this.setHorizontal();
        } else {
            Constants.isRotate = false;
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
        this.GamePlay.node.scale = 0.8;
        this.GamePlay.nextBtn.active = false;

        this.GamePlay.nextBtn_Hrz.x = 400;
        this.GamePlay.nextBtn_Hrz.y = -220;

        if(Constants.isFirstClick) {
            this.GamePlay.nextBtn_Hrz.getComponent(cc.Animation).play("Next_BtnAnim")
            this.GamePlay.nextBtn_Hrz.active = true;
        }

        this.GamePlay.registerEvent(3);

        this.GamePlay.DollBase.x = 150;
        this.GamePlay.DollBase.y = -155;
        this.GamePlay.DollBase.scale = 0.46;

        Constants.isRotate 
        ? this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
        : this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_Anim");

        this.GamePlay.OutFit.x = -50;
        this.GamePlay.OutFit.y = -15;
        this.GamePlay.OutFit.scale = 1;

        this.GamePlay.OutFit.angle = 90;
        this.GamePlay.Boxes.forEach(box => box.angle = -90);

        this.GamePlay.Gojo.x = 83;
        this.GamePlay.Gojo.y = -220;
        this.GamePlay.Gojo.scale = 0.55;

        this.GamePlay.Mathching_Doll.x = -75;
        this.GamePlay.Mathching_Doll.y = 100;
        this.GamePlay.Mathching_Doll.scale = 0.35;

        this.GamePlay.CTA.scale = 1.1;

        // if(cc.view.getFrameSize().height / cc.view.getFrameSize().width >= 0.6) {
        //     // Applovin horizontal

        //     return;
        // }

        if(cc.view.getFrameSize().height / cc.view.getFrameSize().width > 0.55) {
            // Ip 6 / 6Plus / 7 / 7 Plus
            this.GamePlay.background.scale = 1.1;
        } else {
            // IpX
            this.GamePlay.background.scale = 1.3;
        }
        
    }

    private setHorizontalForTablet(): void {
        if(this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;

        this.GamePlay.node.scale = 0.8;
        this.GamePlay.background.scale = 1.1;
        this.GamePlay.nextBtn.active = false;

        this.GamePlay.nextBtn_Hrz.x = 300;
        this.GamePlay.nextBtn_Hrz.y = -180;

        if(Constants.isFirstClick) {
            this.GamePlay.nextBtn_Hrz.getComponent(cc.Animation).play("Next_BtnAnim")
            this.GamePlay.nextBtn_Hrz.active = true;
        }

        this.GamePlay.registerEvent(3);

        this.GamePlay.DollBase.x = 130;
        this.GamePlay.DollBase.y = -155;
        this.GamePlay.DollBase.scale = 0.5;

        Constants.isRotate 
        ? this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
        : this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_Anim");

        this.GamePlay.OutFit.x = -30;
        this.GamePlay.OutFit.y = -15;
        this.GamePlay.OutFit.scale = 0.9;

        this.GamePlay.OutFit.angle = 90;
        this.GamePlay.Boxes.forEach(box => box.angle = -90);

        this.GamePlay.Gojo.x = 83;
        this.GamePlay.Gojo.y = -220;
        this.GamePlay.Gojo.scale = 0.47;

        this.GamePlay.Mathching_Doll.x = -75;
        this.GamePlay.Mathching_Doll.y = 100;
        this.GamePlay.Mathching_Doll.scale = 0.35;

        this.GamePlay.CTA.scale = 1.1;
        // horizontal google
        // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height <= 1.2 && cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 1.2) {

        //     return;
        // }

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

        this.GamePlay.background.scale = 0.9
        this.GamePlay.node.scale = 0.55;
        this.GamePlay.nextBtn_Hrz.active = false;

        if(Constants.isFirstClick) {
            this.GamePlay.nextBtn.getComponent(cc.Animation).play("NextBtn_Anim")
            this.GamePlay.nextBtn.active = true;
        }

        this.GamePlay.registerEvent(3);

        this.GamePlay.DollBase.x = 0;
        this.GamePlay.DollBase.y = -290;
        this.GamePlay.DollBase.scale = 0.6;

        Constants.isRotate 
        ? this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
        : this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_Anim");

        this.GamePlay.OutFit.x = -15;
        this.GamePlay.OutFit.y = 55;
        this.GamePlay.OutFit.scale = 0.8;

        this.GamePlay.OutFit.angle = 0;
        this.GamePlay.Boxes.forEach(box => box.angle = 0);

        this.GamePlay.Gojo.x = 83;
        this.GamePlay.Gojo.y = -300;
        this.GamePlay.Gojo.scale = 0.65;

        this.GamePlay.Mathching_Doll.x = -75;
        this.GamePlay.Mathching_Doll.y = 120;
        this.GamePlay.Mathching_Doll.scale = 0.45;

        this.GamePlay.CTA.scale = 1;
    }

    private setMobile(): void {
        if(this.VERTICAL_MOBILE === this.device) {
            return;
        }   

        this.device = this.VERTICAL_MOBILE;           

        if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.7) {

            // if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
            //     // mobile mode applovin


            //     return;
            // }

            // Iphone 6 / 6 plus / 7 / 7 Plus
            this.GamePlay.nextBtn_Hrz.active = false;

            this.GamePlay.node.scale = 0.68;


            if(Constants.isFirstClick) {
                this.GamePlay.nextBtn.getComponent(cc.Animation).play("NextBtn_Anim")
                this.GamePlay.nextBtn.active = true;
            }

            this.GamePlay.registerEvent(3);

            this.GamePlay.background.scale = 0.75

            this.GamePlay.DollBase.x = 0;
            this.GamePlay.DollBase.y = -210;
            this.GamePlay.DollBase.scale = 0.54;

            Constants.isRotate 
            ? this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
            : this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_Anim");


            this.GamePlay.OutFit.x = -15;
            this.GamePlay.OutFit.y = 55;
            this.GamePlay.OutFit.scale = 0.8;

            this.GamePlay.OutFit.angle = 0;
            this.GamePlay.Boxes.forEach(box => box.angle = 0);

            this.GamePlay.Gojo.x = 83;
            this.GamePlay.Gojo.y = -260;
            this.GamePlay.Gojo.scale = 0.6;

            this.GamePlay.Mathching_Doll.x = -75;
            this.GamePlay.Mathching_Doll.y = 100;
            this.GamePlay.Mathching_Doll.scale = 0.35;

            this.GamePlay.CTA.scale = 1;

        } else {    


            this.GamePlay.nextBtn_Hrz.active = false;
            this.GamePlay.node.scale = 0.68;
            if(Constants.isFirstClick) {
                this.GamePlay.nextBtn.getComponent(cc.Animation).play("NextBtn_Anim")
                this.GamePlay.nextBtn.active = true;
            }

            this.GamePlay.registerEvent(3);

            this.GamePlay.background.scale = 0.75

            this.GamePlay.DollBase.x = 0;
            this.GamePlay.DollBase.y = -210;
            this.GamePlay.DollBase.scale = 0.54;

            Constants.isRotate 
            ? this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
            : this.GamePlay.DollBase.getComponent(cc.Animation).play("DollBase_Anim");


            this.GamePlay.OutFit.x = -15;
            this.GamePlay.OutFit.y = 55;
            this.GamePlay.OutFit.scale = 0.8;

            this.GamePlay.OutFit.angle = 0;
            this.GamePlay.Boxes.forEach(box => box.angle = 0);

            this.GamePlay.Gojo.x = 83;
            this.GamePlay.Gojo.y = -260;
            this.GamePlay.Gojo.scale = 0.6;

            this.GamePlay.Mathching_Doll.x = -75;
            this.GamePlay.Mathching_Doll.y = 100;
            this.GamePlay.Mathching_Doll.scale = 0.35;

            this.GamePlay.CTA.scale = 1;
            // if(cc.view.getFrameSize().width / cc.view.getFrameSize().height < 8.5 
            // && cc.view.getFrameSize().width / cc.view.getFrameSize().height > 8.3) {

            //     return;
            // }

            // Ipad
 
        }
        
    }

    protected update(dt: number): void {
        this.handleRotate();
    }

}
