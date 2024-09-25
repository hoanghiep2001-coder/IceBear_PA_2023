import { _decorator, Animation, Component, Event, EventTouch, log, math, Node, ScrollView, Tween, Vec2, Vec3 } from 'cc';
import { Game } from './Game';
import { GameController } from './GameController';
import { Constants } from '../Data/constants';
const { ccclass, property } = _decorator;


@ccclass('ScrollViewController')
export class ScrollViewController extends Component {

    @property(Game)
    GamePlay: Game = null;
    @property(GameController)
    GameController: GameController = null;
    @property([Node])
    Cats: Node[] = [];
    @property([Node])
    Lines: Node[] = [];

    // toStore
    flag: boolean = false;
    // -------------

    scrollView: ScrollView = null;
    content: Node = null;
    MiddlePos: Vec3 = new math.Vec3(-10, 125, 0);
    isScaleCat1: boolean = false;
    isScaleCat2: boolean = false;
    isScaleCat3: boolean = false;
    selectCat: Node = null;


    protected start(): void {
        this.selectCat = this.Cats[1];
        this.scrollView = this.getComponent(ScrollView);
        this.content = this.scrollView.content;
        this.scrollView.horizontal = false;
        this.registerEvent();
    }


    private registerEvent(): void {
        this.scrollView.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.scrollView.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.scrollView.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.scrollView.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }


    private offEvent(): void {
        this.scrollView.node.off(Node.EventType.TOUCH_MOVE);
        this.content.getComponent(Animation).stop();
    }


    private onTouchStart(e: EventTouch): void {
        if (this.flag) {
            this.GameController.installHandle();
            return;
        }

        if (!this.GamePlay.BtnPlay.active) {
            this.GamePlay.PickCat_Hand.active = false;
            this.GamePlay.BtnPlay.active = true;
            this.GamePlay.BtnPlay.getComponent(Animation).play("BtnPlay_Anim");

            let delta = e.getDelta();
            let scrollSpeed = 0.3;
            let adjDelta = delta.multiplyScalar(scrollSpeed);

            let contentPos = this.content.getPosition();
            let checkThreshHold = this.handleThreshHoldForScroll(contentPos, adjDelta);
            if (!checkThreshHold) {
                return;
            };

            this.handleScrollToCat(contentPos, adjDelta);
            this.content.setPosition(contentPos.x, contentPos.y, contentPos.z += adjDelta.x);
        }

        if (Constants.ironSource.SoundState) {
            this.GamePlay.click.play();
        }

        // ironsource
        this.GamePlay.handleIronSourcePlaySound();
    }


    private onTouchMove(e: EventTouch): void {
        if (this.flag) {
            return;
        }

        let delta = e.getDelta();
        let scrollSpeed = 0.3;
        let adjDelta = delta.multiplyScalar(scrollSpeed);

        let contentPos = this.content.getPosition();
        let checkThreshHold = this.handleThreshHoldForScroll(contentPos, adjDelta);
        if (!checkThreshHold) {
            return;
        };

        this.handleScrollToCat(contentPos, adjDelta);
        this.content.setPosition(contentPos.x, contentPos.y, contentPos.z += adjDelta.x);
    }


    private onTouchEnd(): void {
        let catResult = this.GamePlay.Cats.find(cat => cat.name === this.selectCat.name);
        this.GamePlay.selectNode = catResult;
    }


    private handleThreshHoldForScroll(pos: Vec3, delta: Vec2): boolean {
        if ((pos.z + delta.x) >= 16) {
            return false;
        };

        if ((pos.z + delta.x) <= -16) {
            return false;
        };

        return true;
    }


    private handleScrollToCat(pos: Vec3, delta: Vec2): void {
        if ((pos.z + delta.x) >= 8 && !this.isScaleCat1) {
            this.Lines.forEach(line => line.active = false);
            this.Lines[0].active = true;
            this.selectCat = this.Cats[0];
            this.isScaleCat3 = false;
            this.isScaleCat2 = false;
            this.isScaleCat1 = true;
            let CatPos = new math.Vec3(pos.x, pos.y, 14);
            this.offEvent();

            this.ScaleUp(this.Cats[0]);
            this.ScaleDown(this.Cats[1]);
            this.ScaleDown(this.Cats[2]);
            this.MoveContentToCat(CatPos);

            this.scheduleOnce(() => {
                this.registerEvent();
            }, 0.1);
            return;
        };

        if ((pos.z + delta.x) <= -8 && !this.isScaleCat3) {
            this.Lines.forEach(line => line.active = false);
            this.Lines[2].active = true;

            this.selectCat = this.Cats[2];
            this.isScaleCat3 = true;
            this.isScaleCat1 = false;
            this.isScaleCat2 = false;
            let CatPos = new math.Vec3(pos.x, pos.y, -14);
            this.offEvent();

            this.ScaleUp(this.Cats[2]);
            this.ScaleDown(this.Cats[0]);
            this.ScaleDown(this.Cats[1]);
            this.MoveContentToCat(CatPos);

            this.scheduleOnce(() => {
                this.registerEvent();
            }, 0.1);
            return;
        };

        if (((pos.z + delta.x) <= 7 && (pos.z + delta.x) >= -7) && !this.isScaleCat2) {
            this.Lines.forEach(line => line.active = false);
            this.Lines[1].active = true;
            this.selectCat = this.Cats[1];
            this.isScaleCat1 = false;
            this.isScaleCat3 = false;
            this.isScaleCat2 = true;
            let CatPos = new math.Vec3(pos.x, pos.y, 0);
            this.offEvent();

            this.ScaleUp(this.Cats[1]);
            this.ScaleDown(this.Cats[0]);
            this.ScaleDown(this.Cats[2]);
            this.MoveContentToCat(CatPos);

            this.scheduleOnce(() => {
                this.registerEvent();
            }, 0.15);
            return;
        };
    }


    private MoveContentToCat(pos: Vec3): void {
        new Tween(this.content)
            .to(0.1, { position: new math.Vec3(pos.x, pos.y, pos.z) })
            .start();
    }


    private ScaleUp(cat: Node): void {
        new Tween(cat)
            .to(0.1, { scale: new math.Vec3(320, 320, 320) })
            .start();
    }


    private ScaleDown(cat: Node): void {
        new Tween(cat)
            .to(0.1, { scale: new math.Vec3(180, 180, 180) })
            .start();
    }


    protected update(dt: number): void {
        if (!this.GamePlay.Cat_Container.active && !this.flag) {
            this.flag = true;
        }
    }
}
