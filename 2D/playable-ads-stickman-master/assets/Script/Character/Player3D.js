const { EnFacing, EnWeapon, EnStickMode, EnStickState } = require("GameEnum");
const CONST = require("CONST");
var GameInfo = require("GameInfo");
var AnimNameStick = require("AnimNameStick");
var HitCombos = require("HitCombos");
var ArcherCombos = require("ArcherCombos");
var HealthBar = require("HealthBar");
var ButtonAttack = require("ButtonAttack");

cc.Class({
    extends: cc.Component,

    properties: {
        Speed : {
            default : 7,
        },
        HealthBar: HealthBar,

        // Particle effect
        DustParticle: cc.ParticleSystem3D,
        DashParticle: cc.ParticleSystem3D,
        BloodParticle: cc.ParticleSystem3D,

        // Action Button Input
        CustomeMoveBG: cc.Node,
        ButtonLeft: cc.Node,
        ButtonRight: cc.Node,
        ButtonAttack: cc.Node,
        ButtonJump: cc.Node,
        ButtonDash: cc.Node,

        // Button Weapon Side
        // ButtonSword: cc.Node,
        // ButtonArcher: cc.Node,
    },

    onLoad () {
        // Init Variable
        this._originScaleX = 1;
        GameInfo.InputMoveHorizontal = 0;
        this._onTheGround = false;
        this._jumpCount = 0;
        this._isDashing = false;

        this._velocityMaxX = 120;
        this._velocityMaxY = 120;

        this._runForce = 1500;
        this._jumpForce = 21000;
        this._jumpForce2 = 25000;

        this._dashForce = 10000;

        this._runForceOnAttack = 300;
        this._velocityMaxXOnAttack = 25;

        this._checkPoint = this.node.getPosition();

        this._isDeath = false;

        this._isHasSword = false;

        this._isHasArcher = false;

        this._numDeath = 0;

        this._lastInputMoveHorizontal = 0;

        this._isWin = false;

        this.initEventAction();
        
        // Set default variable
        this._originScaleX = this.node.scaleX;

        // this.PopupInstall.active = false;

        this._skeleton = this.getComponentInChildren(sp.Skeleton);
        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._hitCombos = this.getComponent(HitCombos);
        this._archerCombos = this.getComponent(ArcherCombos);

        this._skeleton.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if(GameInfo.StickMode == EnStickMode.Archer) this._archerCombos.onStartAnimation(animationName);
            else this._hitCombos.onStartAnimation(animationName);
        });

        this._skeleton.setCompleteListener((trackEntry) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if(GameInfo.StickMode == EnStickMode.Archer) this._archerCombos.onCompleteAnimation(animationName);
            else this._hitCombos.onCompleteAnimation(animationName);
        });

        this.setMixAnimation();

        this.changeWeapon(EnWeapon.None);

        this.HealthBar.init(CONST.StickMaxHP);
    },

    initEventAction(){
        // Init Events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

        // Event Button Move Left
        this.ButtonLeft.on(cc.Node.EventType.TOUCH_START, function(event){
            if(this._isDeath) return;
            GameInfo.InputMoveHorizontal = -1;
            this.flip();
            this._tickHaft = 0;
            cc.tween(this.ButtonLeft).to(0.2, {scale : 0.9}, this).start();

            this._lastInputMoveHorizontal = -1;
        }, this);

        this.ButtonLeft.on(cc.Node.EventType.TOUCH_END, function(event){
            GameInfo.InputMoveHorizontal = 0;
            cc.tween(this.ButtonLeft).to(0.2, {scale : 1}, this).start();
        }, this);

        this.ButtonLeft.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            GameInfo.InputMoveHorizontal = 0;
            cc.tween(this.ButtonLeft).to(0.2, {scale : 1}, this).start();
        }, this);

        // Event Button Move Right
        this.ButtonRight.on(cc.Node.EventType.TOUCH_START, function(event){
            if(this._isDeath) return;
            GameInfo.InputMoveHorizontal = 1;
            this._tickHaft = 0;
            this.flip();
            cc.tween(this.ButtonRight).to(0.2, {scale : 0.9}, this).start();

            this._lastInputMoveHorizontal = 1;
        }, this);

        this.ButtonRight.on(cc.Node.EventType.TOUCH_END, function(event){
            GameInfo.InputMoveHorizontal = 0;
            cc.tween(this.ButtonRight).to(0.2, {scale : 1}, this).start();
        }, this);

        this.ButtonRight.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            GameInfo.InputMoveHorizontal = 0;
            cc.tween(this.ButtonRight).to(0.2, {scale : 1}, this).start();
        }, this);

        // this.CustomeMoveBG.on(cc.Node.EventType.TOUCH_START, function(event){
        //     GameInfo.InputMoveHorizontal = this._lastInputMoveHorizontal;
        // }, this);

        // this.CustomeMoveBG.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
        //     GameInfo.InputMoveHorizontal = 0;
        // }, this);

        // Event Button Attack
        this.ButtonAttack.on(cc.Node.EventType.TOUCH_START, function(event){
            this.attack();
            cc.tween(this.ButtonAttack).to(0.2, {scale : 0.9}, this).start();
        }, this);

        this.ButtonJump.on(cc.Node.EventType.TOUCH_START, function(event){
            this.jump();
            cc.tween(this.ButtonJump).to(0.2, {scale : 0.9}, this).start();
        }, this);

        this.ButtonDash.on(cc.Node.EventType.TOUCH_START, function(event){
            this.dash();
            cc.tween(this.ButtonDash).to(0.2, {scale : 0.9}, this).start();
        }, this);

        this.ButtonAttack.on(cc.Node.EventType.TOUCH_END, function(event){
            this.attack();
            cc.tween(this.ButtonAttack).to(0.2, {scale : 1}, this).start();
        }, this);

        this.ButtonJump.on(cc.Node.EventType.TOUCH_END, function(event){
            this.jump();
            cc.tween(this.ButtonJump).to(0.2, {scale : 1}, this).start();
        }, this);

        this.ButtonDash.on(cc.Node.EventType.TOUCH_END, function(event){
            this.dash();
            cc.tween(this.ButtonDash).to(0.2, {scale : 1}, this).start();
        }, this);


        // Event Change Weapon
        // this.ButtonSword.on(cc.Node.EventType.TOUCH_START, function(event){
        //     this.changeWeaponButton(EnWeapon.Sword);
        // }, this);

        // this.ButtonArcher.on(cc.Node.EventType.TOUCH_START, function(event){
        //     this.changeWeaponButton(EnWeapon.Archer);
        // }, this);
    },

    setMixAnimation(){
        this.setMix(AnimNameStick.NormalIdle, AnimNameStick.NormalRun);
        this.setMix(AnimNameStick.NormalIdle, AnimNameStick.NormalJumpB);
        this.setMix(AnimNameStick.NormalIdle, AnimNameStick.NormalJumpC);
        this.setMix(AnimNameStick.NormalIdle, AnimNameStick.NormalDashA);

        this.setMix(AnimNameStick.NormalRun, AnimNameStick.NormalJumpB);
        this.setMix(AnimNameStick.NormalRun, AnimNameStick.NormalJumpC);
        this.setMix(AnimNameStick.NormalRun, AnimNameStick.NormalDashA);

        this.setMix(AnimNameStick.NormalDashA, AnimNameStick.NormalJumpB);
        this.setMix(AnimNameStick.NormalDashA, AnimNameStick.NormalJumpC);

        this.setMix(AnimNameStick.NormalJumpB, AnimNameStick.NormalJumpC);

        // Mix Sword Anim
        this.setMix(AnimNameStick.SwordIdle, AnimNameStick.SwordRun);
        this.setMix(AnimNameStick.SwordIdle, AnimNameStick.SwordJumpB);
        this.setMix(AnimNameStick.SwordIdle, AnimNameStick.SwordJumpC);
        this.setMix(AnimNameStick.SwordIdle, AnimNameStick.SwordDashA);

        this.setMix(AnimNameStick.SwordRun, AnimNameStick.SwordJumpB);
        this.setMix(AnimNameStick.SwordRun, AnimNameStick.SwordJumpC);
        this.setMix(AnimNameStick.SwordRun, AnimNameStick.SwordDashA);

        this.setMix(AnimNameStick.SwordDashA, AnimNameStick.SwordJumpB);
        this.setMix(AnimNameStick.SwordDashA, AnimNameStick.SwordJumpC);

        this.setMix(AnimNameStick.SwordJumpB, AnimNameStick.SwordJumpC);

        // Mix Archer Anim
        this.setMix(AnimNameStick.ArcherIdle, AnimNameStick.ArcherRun);
        this.setMix(AnimNameStick.ArcherIdle, AnimNameStick.ArcherJumpB);
        this.setMix(AnimNameStick.ArcherIdle, AnimNameStick.ArcherJumpC);
        this.setMix(AnimNameStick.ArcherIdle, AnimNameStick.ArcherDashA);

        this.setMix(AnimNameStick.ArcherRun, AnimNameStick.ArcherJumpB);
        this.setMix(AnimNameStick.ArcherRun, AnimNameStick.ArcherJumpC);
        this.setMix(AnimNameStick.ArcherRun, AnimNameStick.ArcherDashA);

        this.setMix(AnimNameStick.ArcherDashA, AnimNameStick.ArcherJumpB);
        this.setMix(AnimNameStick.ArcherDashA, AnimNameStick.ArcherJumpC);

        this.setMix(AnimNameStick.ArcherJumpB, AnimNameStick.ArcherJumpC);
    },

    start () {
        GameInfo.StickState = EnStickState.Idle;

        this._skeleton.setAnimation(0, AnimNameStick.NormalIdle, true);
        this._currentState = EnStickState.Idle;
    },

    onKeyPressed(event){

        let key_code = event.keyCode;

        switch(key_code){

            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                if(this._isDeath) return;
                GameInfo.InputMoveHorizontal = -1;
                this._tickHaft = 0;
                this.flip();
            break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                if(this._isDeath) return;
                GameInfo.InputMoveHorizontal = 1;
                this._tickHaft = 0;
                this.flip();
            break;

            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jump();
            break;

            case cc.macro.KEY.space:
                this.dash();
            break;

            case cc.macro.KEY.l:
                this.attack();
            break;

        }

    },

    onKeyReleased(event){

        let key_code = event.keyCode;

        switch(key_code){

            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                GameInfo.InputMoveHorizontal = 0;
            break;
        }
    },

    changeWeaponButton(weaponType){
        if(weaponType == EnWeapon.Sword){
            if(GameInfo.StickMode == EnStickMode.Sword){
                this.changeWeapon(EnWeapon.None);
            } else {
                if(this._isHasSword){
                    this.changeWeapon(EnWeapon.Sword);
                } else {
                    cc.log("No Sword Found!!!");
                }
            }
        } else if(weaponType == EnWeapon.Archer){
            if(GameInfo.StickMode == EnStickMode.Archer){
                this.changeWeapon(EnWeapon.None);
            } else {
                if(this._isHasArcher){
                    this.changeWeapon(EnWeapon.Archer);
                } else {
                    cc.log("No Sword Found!!!");
                }
            }
        }
    },

    attack(){
        if(this._isDeath) return;
        
        if(GameInfo.StickMode == EnStickMode.Archer){
            this._archerCombos.onClick();
        } else {
            this._hitCombos.onClick();
        }
    },

    jump(){
        // Jump
        if(this._isDeath) return;

        if(this._isDashing) return;

        if(this._onTheGround){
            let velocity = this._rigidBody.linearVelocity;
            this._rigidBody.linearVelocity = cc.v2(velocity.x, -100);

            // console.log("First Jump");
            this._rigidBody.applyForceToCenter( cc.v2(0,this._jumpForce) , true );
            this._onTheGround = false;

            this.DustParticle.play();

            this.scheduleOnce(function() {
                this._jumpCount = 1;
            }, 0.15);
            return;
        }

        if(!this._onTheGround && this._jumpCount == 1){
            let velocity = this._rigidBody.linearVelocity;
            this._rigidBody.linearVelocity = cc.v2(velocity.x, -100);
            
            // console.log("Second Jump " + velocity);
            this._rigidBody.applyForceToCenter( cc.v2(0,this._jumpForce2) , true );
            this._onTheGround = false;
            this._jumpCount = 0;

            this.DustParticle.play();
            return;
        }
    },

    dash(){
        // Dash
        if(this._isDeath) return;

        this._isDashing = true;
        this._rigidBody.applyForceToCenter( cc.v2(this._dashForce * 3 * this.node.scaleX, 0) , true );
        this._rigidBody.gravityScale = 0.5;

        this.DashParticle.play();

        this.scheduleOnce(function() {
            this._isDashing = false;
            this._rigidBody.gravityScale = 1;
            let velocity = this._rigidBody.linearVelocity;
            this._rigidBody.linearVelocity = cc.v2(0, velocity.y);
        }, 0.25);
    },

    flip(){
        this.node.scaleX = this._originScaleX * GameInfo.InputMoveHorizontal;
    },

    update (dt) {
        if(this._isDeath) return;

        let linearVelocity = this._rigidBody.linearVelocity;

        // this.node.x += this.Speed * 10 * dt * GameInfo.InputMoveHorizontal;
        // cc.log("Is Attack Combo: ", this._hitCombos.IsOnAttackCombo);
        if(this._hitCombos.IsOnAttackCombo || this._archerCombos.IsOnAttacking){
            // Force Slow when on attack combo
            if( (!this._isDashing && GameInfo.InputMoveHorizontal > 0 && linearVelocity.x < this._velocityMaxXOnAttack) || (GameInfo.InputMoveHorizontal < 0 && linearVelocity.x > -this._velocityMaxXOnAttack) ){
                this._rigidBody.applyForceToCenter( cc.v2(GameInfo.InputMoveHorizontal * this._runForceOnAttack, 0) , true );
            }
        } else {
            // Force Normal when on attack combo
            if( (!this._isDashing && GameInfo.InputMoveHorizontal > 0 && linearVelocity.x < this._velocityMaxX) || (GameInfo.InputMoveHorizontal < 0 && linearVelocity.x > -this._velocityMaxX) ){
                this._rigidBody.applyForceToCenter( cc.v2(GameInfo.InputMoveHorizontal * this._runForce, 0) , true );
            }
        }

        if(linearVelocity.x > 0.01 || linearVelocity.x < -0.01){
            GameInfo.StickState = EnStickState.Run;
            if(this._tickHaft <= 0){
                this.DustParticle.play();
                this._tickHaft = 0.5;
            }

            this._tickHaft -= dt;
        }

        if(linearVelocity.y > 0.01)  GameInfo.StickState = EnStickState.JumpUp;
        else if(linearVelocity.y < -0.01)  GameInfo.StickState = EnStickState.JumpDown;

        if(this._isDashing)  GameInfo.StickState = EnStickState.DashA;
        
        if(linearVelocity.x <= 0.01 && linearVelocity.x >= -0.01
        && linearVelocity.y <= 0.01 && linearVelocity.y >= -0.01)
        GameInfo.StickState = EnStickState.Idle;

        this.updateAnimation();

        if(!this._isWin && GameInfo.TotalEnemyAlive <= 0){
            this._isWin = true;
            this.win();
        }
    },

    updateAnimation(){
        if(this._currentState ==  GameInfo.StickState) return;

        if(this._hitCombos.IsOnAttackCombo) return;

        if(this._isDeath) return;

        switch( GameInfo.StickState){
            case EnStickState.Idle:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordIdle, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherIdle, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalIdle, true);
                }
                break;
            case EnStickState.Run:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordRun, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherRun, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalRun, true);
                }
                break;
            case EnStickState.JumpUp:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordJumpB, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherJumpB, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalJumpB, true);
                }
                break;
            case EnStickState.JumpDown:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordJumpC, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherJumpC, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalJumpC, true);
                }
                break;
            case EnStickState.DashA:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordDashA, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherDashA, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalDashA, true);
                }
                break;
            case EnStickState.DashA:
                if (GameInfo.StickMode == EnStickMode.Sword){
                    this._skeleton.setAnimation(0, AnimNameStick.SwordDashA, true);
                } else if (GameInfo.StickMode == EnStickMode.Archer){
                    this._skeleton.setAnimation(0, AnimNameStick.ArcherDashA, true);
                } else {
                    this._skeleton.setAnimation(0, AnimNameStick.NormalDashA, true);
                }
                break;
        }

        this._currentState =  GameInfo.StickState;
    },

    onBeginContact(contact, selfCollider, otherCollider){
        // console.log("Begin Contact: " + selfCollider.tag);
        if(selfCollider.tag == 2){
            this._onTheGround = true;
        }
    },

    setMix(anim1, anim2){
        this._skeleton.setMix(anim1, anim2, 0.1);
    },

    changeWeapon(weaponId){
        if (weaponId == EnWeapon.None){
            GameInfo.StickMode = EnStickMode.Normal;
        } else if (weaponId == EnWeapon.Sword){
            GameInfo.StickMode = EnStickMode.Sword;
            this._isHasSword = true;
            this.ButtonAttack.getComponent(ButtonAttack).setSword();
        } else if (weaponId == EnWeapon.Archer){
            GameInfo.StickMode = EnStickMode.Archer;
            this._isHasArcher = true;
            this.ButtonAttack.getComponent(ButtonAttack).setArcher();
        }
        
        this.changeFightMode();
    },

    changeFightMode(){
        cc.log("Fight Mode ", GameInfo.StickMode);
        this._currentState = EnStickState.None;

        if(GameInfo.StickMode == EnStickMode.Archer){
            this._archerCombos.enabled = true;
            this._hitCombos.enabled = false;
        } else {
            this._archerCombos.enabled = false;
            this._hitCombos.enabled = true;
        }
    },

    checkNearestEnemy(enemyNode, distance) {
        this._archerCombos.checkNearestEnemy(enemyNode, distance);
    },

    removeNearestEnemy(enemyNode) {
        this._archerCombos.removeNearestEnemy(enemyNode);
    },

    hit(damp){
        // console.log("Hit Player ", damp);
        if(this._isDeath) return;

        this.HealthBar.decrement(damp);

        this.BloodParticle.play();

        if(!this.HealthBar.isAlive()){
            this.die();
        }
    },

    die(){
        this._isDeath = true;

        this.node.getComponent(cc.BoxCollider).enabled = false;

        if (GameInfo.StickMode == EnStickMode.Sword){
            this._skeleton.setAnimation(0, AnimNameStick.SwordDie, false);
        } else if (GameInfo.StickMode == EnStickMode.Archer){
            this._skeleton.setAnimation(0, AnimNameStick.ArcherDie, false);
        } else {
            this._skeleton.setAnimation(0, AnimNameStick.NormalDie, false);
        }

        if(this._numDeath < CONST.NumDeathShowInstall){
            this.scheduleOnce(function(){
                this.respawn();
            }, 2);
            this._numDeath += 1;
        } else {
            this.showPopupInstall();
        }
        
    },

    respawn(){
        this._isDeath = false;
        this.node.scaleX = 1;
        this.node.getComponent(cc.BoxCollider).enabled = true;
        this.node.setPosition(this._checkPoint.x, this._checkPoint.y);

        this.HealthBar.init(CONST.StickMaxHP);

        if (GameInfo.StickMode == EnStickMode.Sword){
            this._skeleton.setAnimation(0, AnimNameStick.SwordIdle, true);
        } else if (GameInfo.StickMode == EnStickMode.Archer){
            this._skeleton.setAnimation(0, AnimNameStick.ArcherIdle, true);
        } else {
            this._skeleton.setAnimation(0, AnimNameStick.NormalIdle, true);
        }
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "Trap"){
            console.log("Fall Trap");

            this.die();
        }
    },

    win(){
        this._isDeath = true;

        this.node.getComponent(cc.BoxCollider).enabled = false;

        this._skeleton.setAnimation(0, AnimNameStick.NormalWin, true);

        this.showPopupInstall();
    },

    showPopupInstall(){
        console.log("Call Window End - Popup Instakk");
        window.gameEnd && window.gameEnd();

        this.scheduleOnce(function(){
            GameInfo.IsShowPopupInstall = true;
        }, 2);
    }
});
