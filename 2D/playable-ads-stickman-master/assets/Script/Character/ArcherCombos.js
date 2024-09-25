const { EnStickState, EnStickMode } = require("GameEnum");
const CONST = require("CONST");
var AnimNameStick = require("AnimNameStick");
var GameInfo = require("GameInfo");
var ArrowStick = require("ArrowStick");

cc.Class({
    extends: cc.Component,

    properties: {
        PrefabArrow: {
            default: null,
            type: cc.Prefab
        },
        NodeBow: {
            default: null,
            type: cc.Node
        },
        IsOnAttacking: {
            get() {return this._isAttacking;}
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._nearestEnemyNode = null;
        this._nearestEnemyDistance = CONST.MaxDistanceEnemyArcher;

        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._skeleton = this.getComponentInChildren(sp.Skeleton);
    },

    onStartAnimation(animationName){
        if(GameInfo.StickMode != EnStickMode.Archer) return;

        if(animationName == AnimNameStick.ArcherAngleStraight){
            this.scheduleOnce(function() {
                this.fire(0);
            }, 0.15);
        }
        else if (animationName == AnimNameStick.ArcherAngleUp){
            this.scheduleOnce(function() {
                this.fire(1);
            }, 0.15);
        }
    },

    onCompleteAnimation(animationName){
        if(animationName == AnimNameStick.ArcherAngleStraight){

        }
        else if (animationName == AnimNameStick.ArcherAngleUp){

        }
    },

    start () {

    },

    // update (dt) {},

    onClick(){
        if(GameInfo.StickMode != EnStickMode.Archer) return;

        if(this._isAttacking) return;

        // cc.log("On Click ", this._nearestEnemyNode);

        if(this._nearestEnemyNode != null && this.isPlayerFacing(this._nearestEnemyNode)){
            cc.log(this._nearestEnemyNode.name, this.isPlayerFacing(this._nearestEnemyNode));

            let dir = this._nearestEnemyNode.getPosition().sub(this.node.getPosition());
            // cc.log("Check Nearest Enemy ", this._nearestEnemyNode.getPosition(), this.node.getPosition(), dir);
            dir = dir.normalize();
            // cc.log("Normalize Dir ", dir);

            this._angle = this.convertRad2Deg(Math.atan2(dir.y, Math.abs(dir.x)));
            this._dir = dir;

            // cc.log("Archer Fire ", this._angle, this._dir);

            let animNameAtk = AnimNameStick.ArcherAngleStraight;
            if(this._angle > 20) animNameAtk = AnimNameStick.ArcherAngleUp;

            this._skeleton.setAnimation(0, animNameAtk, false);
        } else {
            this._angle = 0;
            this._dir = cc.v2(1 * this.node.scaleX, 0);
            this._skeleton.setAnimation(0, AnimNameStick.ArcherAngleStraight, false);
        }

        this._stickSignWhenClick = this.node.scaleX;

        this._isFired = false;
        this._isAttacking = true;

        this.scheduleOnce(function() {
            this.endAttack();
        }, 0.5);
        
        cc.log("archer mode click fire");
    },

    convertRad2Deg(radians){
        var pi = Math.PI;
        return radians * (180/pi);
    },

    fire(type){
        this._isFired = true;

        // Angle Straight
        if(type == 0){
            this.createArrow(type);
        }
        // Angle Up
        else if(type == 1){
            this.createArrow(type);
        }
    },

    createArrow(type){
        let arrowObj = cc.instantiate(this.PrefabArrow);
        this.node.parent.addChild(arrowObj);

        arrowObj.position = this.node.convertToWorldSpaceAR(this.NodeBow.getPosition());

        if(this.node.scaleX !=  this._stickSignWhenClick){
            this._dir = cc.v2(this._dir.x * -1, this._dir.y);
        }

        var arrowLogic = arrowObj.getComponent(ArrowStick);
        arrowLogic.Launch(this._dir);
    },

    checkNearestEnemy(enemyNode, distance){
        if(distance < this._nearestEnemyDistance){
            this._nearestEnemyDistance = distance;
            this.setNearestEnemy(enemyNode);
        }
    },

    setNearestEnemy(enemyNode){
        this._nearestEnemyNode = enemyNode;
    },

    removeNearestEnemy(enemyNode){
        if(this._nearestEnemyNode == enemyNode){
            this._nearestEnemyNode = null;
            this._nearestEnemyDistance = CONST.MaxDistanceEnemyArcher;
        }
    },

    endAttack(){
        // this.resetSpeedAnim();

        this._isAttacking = false;

        let linearVelocity = this._rigidBody.linearVelocity;
        if (linearVelocity.x > 0.01 || linearVelocity.x < -0.01){
            GameInfo.StickState = EnStickState.Run;
            this._skeleton.setAnimation(0, AnimNameStick.ArcherRun, true);
        } else {
            GameInfo.StickState = EnStickState.Idle;
            this._skeleton.setAnimation(0, AnimNameStick.ArcherIdle, true);
        }
    },

    isPlayerFacing(enemyNode){
        if (this.node.x < enemyNode.x && this.node.scaleX > 0
            || this.node.x > enemyNode.x && this.node.scaleX < 0){
            return true;
        }

        return false;
    },

});
