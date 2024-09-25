"use strict";
cc._RF.push(module, '1f602Qc5thE7q4nonQX9g8G', 'GamePlay');
// GamePlay.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // node
        _this.game = null;
        _this.secondStickArea = null;
        // array
        _this.yellowBirds = [];
        _this.redBirds = [];
        _this.greenBirds = [];
        // state
        _this.isSorted = false;
        _this.isRotate = false;
        _this.clickedState = false;
        _this.firstStickState = [2, 2, 1, 1];
        _this.secondStickState = [1, 1];
        _this.sortProgressState = [false, false, true, true];
        return _this;
    }
    // sounds
    GamePlay.prototype.onLoad = function () {
        var _this = this;
        // set intro fly kind for birds 
        this.game.getComponent(cc.Animation).play("Mobile_IntroAnim");
        this.handleSetIntroForBirds();
        this.scheduleOnce(function () {
            _this.registerEvent();
        }, 2.5);
    };
    GamePlay.prototype.handleSetIntroForBirds = function () {
        var _this = this;
        this.redBirds.forEach(function (bird) {
            bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
            _this.scheduleOnce(function () {
                bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
            }, 1.2);
            _this.scheduleOnce(function () {
                bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }, 2.5);
        });
        this.yellowBirds.forEach(function (bird) {
            bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
            _this.scheduleOnce(function () {
                bird.getComponent(sp.Skeleton).setAnimation(0, "grounding", false);
            }, 1.2);
            _this.scheduleOnce(function () {
                bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }, 2.5);
        });
    };
    GamePlay.prototype.registerEvent = function () {
        var _this = this;
        this.redBirds[0].on("touchend", function () {
            _this.clickedState ? _this.clickedState = false : _this.clickedState = true;
            if (_this.clickedState) {
                // touching sound
                _this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "touching", false);
                _this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "touching", false);
            }
            else {
                _this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                _this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }
        });
        this.secondStickArea.on("touchend", function () {
            if (!_this.clickedState || _this.isSorted)
                return;
            _this.isSorted = true;
            _this.game.getComponent(cc.Animation).play("Mobile_SortAnim");
            _this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "fly", true);
            _this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "fly", true);
            _this.scheduleOnce(function () {
                _this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
                _this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
            }, 1);
            _this.scheduleOnce(function () {
                _this.redBirds[0].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
                _this.redBirds[2].getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }, 2);
            _this.scheduleOnce(function () {
                _this.redBirds.forEach(function (bird) {
                    bird.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
                });
            }, 2.5);
        });
    };
    __decorate([
        property(cc.Node)
    ], GamePlay.prototype, "game", void 0);
    __decorate([
        property(cc.Node)
    ], GamePlay.prototype, "secondStickArea", void 0);
    __decorate([
        property([cc.Node])
    ], GamePlay.prototype, "yellowBirds", void 0);
    __decorate([
        property([cc.Node])
    ], GamePlay.prototype, "redBirds", void 0);
    __decorate([
        property([cc.Node])
    ], GamePlay.prototype, "greenBirds", void 0);
    GamePlay = __decorate([
        ccclass
    ], GamePlay);
    return GamePlay;
}(cc.Component));
exports.default = GamePlay;

cc._RF.pop();