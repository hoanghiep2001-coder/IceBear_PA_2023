const { EnStickState, EnStickMode } = require("GameEnum");
var AnimNameStick = require("AnimNameStick");
var GameInfo = require("GameInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        AttackBox: cc.Node,
        IsOnAttackCombo: {
            get() {return this._isOnAttackCombo;}
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._maxTimeDelayCombos = 1;
        this._maxAttackCombos = 3;
        this._noOfClicks = 0;
        this._isOnAttackCombo = false;
        this._lastClickedTime = new Date();

        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._skeleton = this.getComponentInChildren(sp.Skeleton);
    },

    start () {

    },

    // update (dt) {},

    onStartAnimation(animationName){
        if(GameInfo.StickMode == EnStickMode.Archer) return;
        // cc.log("animation name start ", animationName, this._noOfClicks);
        
        if(animationName == AnimNameStick.NormalJab1){
            this.activeAttackBox(0.15);
        } else if(animationName == AnimNameStick.NormalKick1){
            this.activeAttackBox(0.15);
        } else if(animationName == AnimNameStick.NormalKick2){
            this.activeAttackBox(0.15);
        }
        // Check animation name sword
        else if(animationName == AnimNameStick.SwordAtk1){
            this.activeAttackBox(0.15);
        } else if(animationName == AnimNameStick.SwordAtk2){
            this.activeAttackBox(0.15);
        } else if(animationName == AnimNameStick.SwordAtk3){
            this.activeAttackBox(0.15);
        }
    },

    activeAttackBox(delayTime){
        this.scheduleOnce(function() {
            this.AttackBox.active = true;
        }, delayTime);
    },

    onCompleteAnimation(animationName){
        if(GameInfo.StickMode == EnStickMode.Archer) return;

        // cc.log("animation name end ", animationName, this._noOfClicks);
        if(animationName == AnimNameStick.NormalJab1){
            if(this._noOfClicks <= 1){
               this.cancelAttack();
            } else {
                this.speedUpAnim();
                // cc.log("Run Attack 2 Normal Kick");
                this._skeleton.setAnimation(0, AnimNameStick.NormalKick1, false);
            }
        } else if(animationName == AnimNameStick.NormalKick1){
            if(this._noOfClicks <= 2){
                this.cancelAttack();
             } else {
                this.speedUpAnim();
                this._skeleton.setAnimation(0, AnimNameStick.NormalKick2, false);
             }
        } else if(animationName == AnimNameStick.NormalKick2){
            this.cancelAttack();
        }
        // Check animation name sword
        else if(animationName == AnimNameStick.SwordAtk1){
            if(this._noOfClicks <= 1){
                this.cancelAttack();
             } else {
                this.speedUpAnim();
                this._skeleton.setAnimation(0, AnimNameStick.SwordAtk2, false);
             }
        } else if(animationName == AnimNameStick.SwordAtk2){
            if(this._noOfClicks <= 2){
                this.cancelAttack();
             } else {
                this.speedUpAnim();
                this._skeleton.setAnimation(0, AnimNameStick.SwordAtk3, false);
             }
        } else if(animationName == AnimNameStick.SwordAtk3){
            this.cancelAttack();
        }
    },

    onClick(){
        if(GameInfo.StickMode == EnStickMode.Archer) return;

        this._lastClickedTime = new Date();
        this._noOfClicks += 1;

        if(this._noOfClicks == 1){
            this.callFirstSkill();
        }

        if(this._noOfClicks > this._maxAttackCombos) this._noOfClicks = this._maxAttackCombos;
        this._isOnAttackCombo = true;

        // cc.log("On Click No Of Click ", this._noOfClicks);
    },

    callFirstSkill(){
        // console.log("Call First Skill");
        if(GameInfo.StickMode == EnStickMode.Sword){
            this._skeleton.setAnimation(0, AnimNameStick.SwordAtk1, false);
            this.speedUpAnim();
        } else {
            this._skeleton.setAnimation(0, AnimNameStick.NormalJab1, false);
            this.speedUpAnim();
        }
    },

    cancelAttack(){
        this.resetSpeedAnim();

        this._isOnAttackCombo = false;
        this._noOfClicks = 0;

        let linearVelocity = this._rigidBody.linearVelocity;
        if (linearVelocity.x > 0.01 || linearVelocity.x < -0.01){
            GameInfo.StickState = EnStickState.Run;
            if(GameInfo.StickMode == EnStickMode.Sword){
                this._skeleton.setAnimation(0, AnimNameStick.SwordRun, false);
            } else {
                this._skeleton.setAnimation(0, AnimNameStick.NormalRun, true);
            }
        } else {
            GameInfo.StickState = EnStickState.Idle;
            if(GameInfo.StickMode == EnStickMode.Sword){
                this._skeleton.setAnimation(0, AnimNameStick.SwordIdle, false);
            } else {
                this._skeleton.setAnimation(0, AnimNameStick.NormalIdle, true);
            }
        }
    },

    speedUpAnim(){
        this._skeleton.timeScale = 1.5;
    },

    resetSpeedAnim(){
        this._skeleton.timeScale = 1;
    }
});
