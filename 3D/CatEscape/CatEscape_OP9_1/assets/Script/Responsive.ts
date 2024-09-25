

import { _decorator, Component, math, Node, Vec3 } from 'cc';
import { GamePlay } from './GamePlay';
const { ccclass, property } = _decorator;

@ccclass('Responsive')
export class Responsive extends Component {

    @property(GamePlay)
    GamePlay: GamePlay = null;

    // state
    device: string = "";
    isRotate: boolean = false;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";

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
        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 0.65) {
            // Iphone 6 / 6 plus / 7 / 7 Plus / X
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        if (this.HORIZONTAL_IPX === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_IPX;

        this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 200, 0));
        this.GamePlay.itemBar.setPosition(new math.Vec3(250, 0, 0));
        this.GamePlay.itemBar.setScale(new math.Vec3(1.1, 1.1, 1.1));

        this.GamePlay.BackGround.setScale(new math.Vec3(0.04, 0.04, 0.04));
        this.GamePlay.BackGround.setPosition(new math.Vec3(0, -0.05, -0.092));

        // this.GamePlay.Room_MainContent.setPosition(new math.Vec3(-0.01, 0, 0));
        this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.4, 0.4, 0.4)));

        // rotate item
        this.GamePlay.Frame_Vertical.active = false;
        this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 90));
        this.GamePlay.Chair_items.forEach((item, index) => {
            let oldPos = item.getPosition();
            this.setPositionForItem(index, oldPos, item);
            item.setRotationFromEuler(0, 0, -90);
        });
        this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1.3, 0.9, 1));
        this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(40, 30, 0));

        this.GamePlay.hand.setPosition(new math.Vec3(220, -50, 0));
        this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -180))
        // --------------------

        this.GamePlay.camera.fov = 35;
    }


    private setPositionForItem(index: number, oldPos: Vec3, item: Node): void {
        switch (index) {
            case 0:
                item.setPosition(-50, oldPos.y, oldPos.z);
                break;
            case 1:
                item.setPosition(20, oldPos.y, oldPos.z);
                break;
            case 2:
                item.setPosition(80, oldPos.y, oldPos.z);
                break;
            case 3:
                item.setPosition(150, oldPos.y, oldPos.z);
                break;
            default:
                break;
        }
    }


    private setHorizontalForTablet(): void {
        if (this.HORIZONTAL_TABLET === this.device) {
            return;
        }

        this.device = this.HORIZONTAL_TABLET;
        this.GamePlay.itemBar.setScale(new math.Vec3(1.1, 1.1, 1.1));
        this.GamePlay.itemBar.setPosition(new math.Vec3(230, 0, 0));
        this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 200, 0));

        this.GamePlay.BackGround.setScale(new math.Vec3(0.04, 0.04, 0.04));
        this.GamePlay.BackGround.setPosition(new math.Vec3(0, -0.05, -0.092));

        this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.4, 0.4, 0.4)));


        // rotate item
        this.GamePlay.Frame_Vertical.active = false;
        this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 90));
        this.GamePlay.Chair_items.forEach((item, index) => {
            let oldPos = item.getPosition();
            this.setPositionForItem(index, oldPos, item);
            item.setRotationFromEuler(0, 0, -90);
        });
        this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1.3, 0.9, 1));
        this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(40, 30, 0));

        this.GamePlay.hand.setPosition(new math.Vec3(200, -50, 0));
        this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -180))
        // --------------------


        this.GamePlay.camera.fov = 35;
    }

    private setVertical(): void {
        if (cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if (this.VERTICAL_IPX === this.device) {
            return;
        }

        this.device = this.VERTICAL_IPX;

        this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 255, 0));
        this.GamePlay.itemBar.setPosition(new math.Vec3(0, -280, 0));
        this.GamePlay.itemBar.setScale(new math.Vec3(1, 1, 1));

        this.GamePlay.BackGround.setScale(new math.Vec3(0.03, 0.03, 0.03));
        this.GamePlay.BackGround.setPosition(new math.Vec3(0, 0.017, -0.092));

        this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.3, 0.3, 0.3)));

        // rotate item
        this.GamePlay.Frame_Vertical.active = true;
        this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 0));
        this.GamePlay.Chair_items.forEach((item, index) => {
            item.setPosition(0, 0, 0)
            item.setRotationFromEuler(0, 0, 0);
        });
        this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1, 1, 1));
        this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(0, 0, 0));

        this.GamePlay.hand.setPosition(new math.Vec3(-120, -250, 0));
        this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -270))
        // --------------------

        this.GamePlay.camera.fov = 55;
    }

    private setMobile(): void {
        if (this.VERTICAL_MOBILE === this.device) {
            return;
        }

        this.device = this.VERTICAL_MOBILE;

        if (cc.view.getFrameSize().height / cc.view.getFrameSize().width > 1.5) {
            if (cc.view.getFrameSize().width / cc.view.getFrameSize().height >= 0.6 && cc.view.getFrameSize().width / cc.view.getFrameSize().height < 0.62) {
                // mobile mode applovin
                this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 225, 0));
                this.GamePlay.itemBar.setScale(new math.Vec3(1, 1, 1));
                this.GamePlay.itemBar.setPosition(new math.Vec3(0, -195, 0));

                this.GamePlay.BackGround.setScale(new math.Vec3(0.03, 0.03, 0.03));
                this.GamePlay.BackGround.setPosition(new math.Vec3(0, 0, -0.092));

                this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.3, 0.3, 0.3)));


                // rotate item
                this.GamePlay.Frame_Vertical.active = true;
                this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 0));
                this.GamePlay.Chair_items.forEach((item, index) => {
                    item.setPosition(0, 0, 0)
                    item.setRotationFromEuler(0, 0, 0);
                });
                this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1, 1, 1));
                this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(0, 0, 0));

                this.GamePlay.hand.setPosition(new math.Vec3(-120, -160, 0));
                this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -270))
                // --------------------


                this.GamePlay.camera.fov = 45;
                return;
            }

            // Iphone 6 / 6 Plus / 7 / 7 Plus
            this.GamePlay.camera.fov = 45;
            this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 225, 0));
            this.GamePlay.itemBar.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.itemBar.setPosition(new math.Vec3(0, -215, 0));

            this.GamePlay.BackGround.setScale(new math.Vec3(0.03, 0.03, 0.03));
            this.GamePlay.BackGround.setPosition(new math.Vec3(0, 0, -0.092));

            this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.3, 0.3, 0.3)));

            // rotate item
            this.GamePlay.Frame_Vertical.active = true;
            this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 0));
            this.GamePlay.Chair_items.forEach((item, index) => {
                item.setPosition(0, 0, 0)
                item.setRotationFromEuler(0, 0, 0);
            });
            this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(0, 0, 0));

            this.GamePlay.hand.setPosition(new math.Vec3(-120, -190, 0));
            this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -270))
            // --------------------

        } else {
            this.GamePlay.camera.fov = 45;
            this.GamePlay.MoneyContainer.setPosition(new math.Vec3(0, 200, 0));
            this.GamePlay.itemBar.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.itemBar.setPosition(new math.Vec3(0, -175, 0));

            this.GamePlay.BackGround.setScale(new math.Vec3(0.03, 0.03, 0.03));
            this.GamePlay.BackGround.setPosition(new math.Vec3(0, 0, -0.092));
            this.GamePlay.buttons.forEach(btn => btn.setScale(new math.Vec3(0.3, 0.3, 0.3)));

            // rotate item
            this.GamePlay.Frame_Vertical.active = true;
            this.GamePlay.Frame_Horizontal.setRotationFromEuler(new math.Vec3(0, 0, 0));
            this.GamePlay.Chair_items.forEach((item, index) => {
                item.setPosition(0, 0, 0)
                item.setRotationFromEuler(0, 0, 0);
            });
            this.GamePlay.Frame_Horizontal_Bg.setScale(new math.Vec3(1, 1, 1));
            this.GamePlay.Frame_Horizontal_Bg.setPosition(new math.Vec3(0, 0, 0));

            this.GamePlay.hand.setPosition(new math.Vec3(-120, -150, 0));
            this.GamePlay.hand.setRotationFromEuler(new math.Vec3(0, 0, -270))
            // --------------------


        }
    }

    protected update(dt: number): void {
        this.handleRotate();
    }
}

