const { EnStickMode, EnFacing, EnEnemies, EnEnemyState} = require("GameEnum");
var DetectPlayer = require("DetectPlayer");
var Player3D = require("Player3D");
var EnemyBullet = require("EnemyBullet");
var HealthBarEnemy = require("HealthBarEnemy");
var GameController = require("GameController");
const GameInfo = require("GameInfo");
const CONST = require("CONST");

cc.Class({
    extends: cc.Component,

    properties: {
        Player: Player3D,
        HealthBar: HealthBarEnemy,
        EnemyId: {
            default: EnEnemies.None,
            type: EnEnemies
        },
        Speed: {
            default: 2,
            type: cc.Float
        },
        NodePointA: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        NodePointB: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        Facing: {
            default: EnFacing.Left,
            type: EnFacing,
        },
        CollistionDetectPlayer: DetectPlayer,
        MaxHeath: 100,
        BaseAttack: 10,
        FrequenceAttack: 2,
        PrefabBullet: cc.Prefab,
        NodeBarrel: cc.Node,
        CollisionAttack: cc.Node,

        // Particle Effect
        BloodParticle: cc.ParticleSystem3D,
    },

    onLoad () {
        if(this.NodePointA != null){
           this._pointA = this.node.convertToWorldSpaceAR(this.NodePointA.getPosition()).x;
           this.NodePointA.active = false;
        } else {
            this._pointA = 0;
        }

        if(this.NodePointB != null){
            this._pointB = this.node.convertToWorldSpaceAR(this.NodePointB.getPosition()).x;
            this.NodePointB.active = false;
        } else {
            this._pointB = 0;
        }

        // console.log("Log Move Two Point: " + this._pointA + " " + this._pointB);

        // Get Component Animator
        this._skeleton = this.getComponentInChildren(sp.Skeleton);

        this._stopMove = false;

        this._isDetectPlayer = false;

        this._tick = 0;

        this._waitFrequencyAttack = false;

        this.Speed = CONST.ZombieSpeed;

        this.FrequenceAttack = CONST.ZombieFrequenceAttack;

        if(this.EnemyId == EnEnemies.Zombie) this.HealthBar.init(CONST.ZombieMaxHP);
        else this.HealthBar.init(CONST.PoisonVineMaxHP);

        this._skeleton.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            this.onStartAnimation(animationName);
        });

        this._skeleton.setCompleteListener((trackEntry) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            this.onCompleteAnimation(animationName);
        });
    },

    onStartAnimation(animationName){
        if(animationName == "atk"){

        }
    },

    onCompleteAnimation(animationName){
        if(animationName == "atk"){
            this.endAttack();
        }
    },

    start () {

        if(this.Speed > 0 && !GameInfo.GamePause){
            this._skeleton.setAnimation(0, "walk", true);
            this._currentState = EnEnemyState.Walk;
            this._state = EnEnemyState.Walk;
        } else {
            this._skeleton.setAnimation(0, "idle", true);
            this._currentState = EnEnemyState.Idle;
            this._state = EnEnemyState.Idle;
        }
    },

    update (dt) {
        if(GameInfo.GamePause){
            this._state = EnEnemyState.Idle;
            this.updateAnimationState();
            return;
        } 

        this.moveBettweenTwoPoint(dt);

        this.detectPlayer(dt);

        this.calculateDistancePlayer();

        this.updateAnimationState();
    },

    updateAnimationState(){
        if(this._currentState != this._state){
            if(this._state == EnEnemyState.Walk){
                this._skeleton.setAnimation(0, "walk", true);
            } else if(this._state == EnEnemyState.Idle){
                this._skeleton.setAnimation(0, "idle", true);
            }

            this._currentState = this._state;
        }
    },

    moveBettweenTwoPoint (dt) {
        if(GameInfo.GamePause) return;

        if(this.Speed <= 0 || this._stopMove) return;

        if (this.Facing == EnFacing.Right)
            this.newPosX = this.node.getPosition().x + 1 * this.Speed * 10 * dt;
        else
            this.newPosX = this.node.getPosition().x + -1 * this.Speed * 10 * dt;
        
        this.node.setPosition(this.newPosX, this.node.getPosition().y);

        if ((this.node.getPosition().x >= this._pointB && this.Facing == EnFacing.Right ||
            this.node.getPosition().x <= this._pointA && this.Facing == EnFacing.Left)){
            this.flip();
        }

        this._state = EnEnemyState.Walk;
    },

    flip () {
        if(this.Facing == EnFacing.Left){
            this.Facing = EnFacing.Right;
            this.node.scale = cc.v2(-1, 1);
        } else {
            this.Facing = EnFacing.Left;
            this.node.scale = cc.v2(1, 1);
        }
    },

    detectPlayer (dt) {
        if(this.CollistionDetectPlayer.IsDetectPlayer && !this._isDetectPlayer){
            this._isDetectPlayer = true;
            this._stopMove = true;
            this.actionWhenDetectPlayer();
        }

        if(!this.CollistionDetectPlayer.IsDetectPlayer && this._isDetectPlayer){
            this._isDetectPlayer = false;
            this._stopMove = false;

            if(this.Speed > 0) this._state = EnEnemyState.Walk;
            else this._state = EnEnemyState.Idle;
        }

        if(this._isDetectPlayer){
            if(!this._waitFrequencyAttack){
                this.actionWhenDetectPlayer();
            } else {
                
            }
        }
    },

    actionWhenDetectPlayer(){
        // console.log("Call Attack ==>", this._waitFrequencyAttack);
        if(this._waitFrequencyAttack) return;

        this._waitFrequencyAttack = true;

        this.faceToPlayer();
        this._skeleton.setAnimation(0, "atk", false);

        if(this.EnemyId == EnEnemies.Zombie){
            this.meleeAttack();
        } else if(this.EnemyId == EnEnemies.PoisonVine){
            this.archerAttack();
        }

        this.scheduleOnce(function() {
            this._waitFrequencyAttack = false;
        }, this.FrequenceAttack);
    },

    faceToPlayer(){
        if(!this.isFacingWithPlayer()){
            this.flip();
        }
    },

    isFacingWithPlayer(){
        if(this.Player.node.getPosition().x < this.node.getPosition().x && this.Facing == EnFacing.Right
        || this.Player.node.getPosition().x > this.node.getPosition().x && this.Facing == EnFacing.Left){
            return false;
        }

        return true;
    },

    meleeAttack(){
        // console.log("Melee Attack");
        this.scheduleOnce(function() {
            this.CollisionAttack.active = true;
        }, 0.3);
    },
    
    archerAttack(){
        // console.log("Archer Attack");
        this.scheduleOnce(function() {
            if(!this.HealthBar.isAlive()) return;
            this.createBullet();
        }, 0.3);
    },

    createBullet(){
        let bullet = cc.instantiate(this.PrefabBullet);
        this.node.parent.addChild(bullet);

        bullet.position = this.node.convertToWorldSpaceAR(this.NodeBarrel.getPosition());

        let bulletLogic = bullet.getComponent(EnemyBullet);

        let dir = 1;
        if(this.Facing == EnFacing.Left) dir = -1;

        bulletLogic.Launch(this.BaseAttack, dir);

        // console.log("Create Bullet: " + bullet.getPosition());
    },

    isPlayerFacing(){
        if (this.Player.node.x < this.node.x && this.Player.node.scaleX > 0
            || this.Player.node.x > this.node.x && this.Player.node.scaleX < 0){
            return true;
        }

        return false;
    },

    calculateDistancePlayer(){
        if(!this.HealthBar.isAlive()) return;

        if(GameInfo.StickMode != EnStickMode.Archer) return;

        if(!this.isPlayerFacing()) return;

        let distance = Math.abs(this.node.x - this.Player.node.x);

        if(distance < CONST.MaxDistanceEnemyArcher){
            this.Player.checkNearestEnemy(this.node, distance);
        } else {
            this.Player.removeNearestEnemy(this.node);
        }
    },

    hit(){
        if(!this.HealthBar.isAlive()) return;

        let damp = CONST.StickBaseAttack;
        this.HealthBar.decrement(damp);

        this.BloodParticle.play();

        if(!GameInfo.TutorialDoneStage1) GameInfo.TutorialDoneStage1 = true;
        else if(GameInfo.TutorialStartStage2 && !GameInfo.TutorialDoneStage2) GameInfo.TutorialDoneStage2 = true;

        if(!this.HealthBar.isAlive()){
            this.die();
        }
    },

    die(){
        this.effectDie();
        this.scheduleOnce(function() {
            GameInfo.TotalEnemyAlive -= 1;
            this.node.destroy();
        }, 1);

        this.Player.removeNearestEnemy(this.node);
    },

    effectDie(){
        this.HealthBar.node.active = false;
        let rd = this.node.getComponent(cc.RigidBody);
        rd.type = cc.RigidBodyType.Dynamic;
        rd.gravityScale = 0.1;
        rd.fixedRotation = false;

        cc.tween(this.node)
        .to (0.5, {angle: 90 * this.getSidePlayer()})
        .start();

        rd.applyForceToCenter( cc.v2((Math.random() * 30 + 120) * 250 * this.getSidePlayer(), (Math.random() * 20 + 50) * 250), true);
    },

    getSidePlayer(){
        if(this.Player.node.x > this.node.x) return -1;
        return 1;
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == "BoxPlayer"){
            this.hit();
        }
    },

    endAttack(){
        if(this.Speed <= 0 || this._stopMove){
            this._state = EnEnemyState.Idle;
            this._skeleton.setAnimation(0, "idle", true);
        } else {
            this._state = EnEnemyState.Walk;
            this._skeleton.setAnimation(0, "walk", true);
        }
    },
});
