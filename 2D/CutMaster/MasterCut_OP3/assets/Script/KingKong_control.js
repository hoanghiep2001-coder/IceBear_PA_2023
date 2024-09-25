
cc.Class({
    extends: cc.Component,

    properties: {

        Man: cc.Node,
        Range: cc.Node,
        Rope: cc.Node,
        EndNode: cc.Node,
        Hand: cc.Node,
        BossWarning: cc.Node,
        Man_control: require('Man_control'),
        Bg_black: cc.Node,
        Bg_End: cc.Node,
        Bg_EndLose: cc.Node,
        Warning_audio: cc.AudioClip,
        BossAtack_audio: cc.AudioClip,
        Die_audio: cc.AudioClip,
        Lose_audio: cc.AudioClip,
        RopeMan: cc.Node,
        Ghost: cc.Node,
        SMash: cc.Node,
        Ghost2: cc.Node,
        SMash2: cc.Node,
        StoreAll: cc.Node,

    },

    onLoad() {

        // this.StoreAll.active = true;

        this.TypeKingKong = 2;
        this.direction = null;
        this.flag = null;
        this.flagOneWallTag2 = true;
        this.CutRopeMan = false;
        this.DieOneFlag = true;
        this.WarningAudio = null;
        this.resPonKingKong = true;

    },

    CutRope() {

        this.TypeKingKong = 2;

    },

    RunWhenRopeBreak() {

        this.direction = 'right'
        this.flag = 'run';

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        // cc.audioEngine.stopAll(this.Fly_audio);
        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 2) {

            if (this.flagOneWallTag2) {

                this.CutRopeMan = true;

                this.flagOneWallTag2 = false;
                selfCollider.getComponent(sp.Skeleton).loop = false;
                selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Idle';

                setTimeout(() => {
                    selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Attack02';
                    selfCollider.getComponent(sp.Skeleton).loop = true;
                }, 300);

                setTimeout(() => {
                    this.Range.getComponent(sp.Skeleton).loop = false;
                    this.Range.getComponent(sp.Skeleton).animation = 'Enemy/Die';
                    cc.audioEngine.play(this.BossAtack_audio, false, 1);
                    this.SMash.getComponent(sp.Skeleton).animation = 'master';
                    this.Ghost.getComponent(sp.Skeleton).animation = 'die';
                    cc.audioEngine.play(this.Die_audio, false, 1);
                    if (this.Man_control.IsDie == false) {
                        this.Hand.active = true;
                        this.Hand.getComponent(cc.Animation).play('index_02');
                    }

                }, 600);

                setTimeout(() => {
                    this.Range.active = false;
                }, 2000);

                setTimeout(() => {
                    selfCollider.node.scaleX = 0.188;
                    selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Idle';
                }, 1200);


                setTimeout(() => {
                    this.resPonKingKong = false;
                    selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Walk';
                    this.direction = 'left'
                    this.flag = 'run';

                    if (this.Man_control.IsDie == false && this.RopeMan.active) {
                        this.BossWarning.active = true;
                        this.BossWarning.getComponent(cc.Animation).play();
                        this.WarningAudio = cc.audioEngine.play(this.Warning_audio, false, 1);
                    }

                }, 2000);

            }

        } else if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 7) {

            if (this.DieOneFlag) {

                this.DieOneFlag = false;
                this.EndNode.active = true;
                this.Hand.active = false;

                selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Idle';

                setTimeout(() => {
                    selfCollider.getComponent(sp.Skeleton).loop = false;
                    selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Attack02';
                    this.flag = 'fly';
                }, 500);

                setTimeout(() => {

                    this.Rope.active = false;
                    this.RopeMan.active = false;
                    this.Man.getComponent(sp.Skeleton).loop = false;
                    this.Man_control.resPosition = false;
                    this.Man.getComponent(sp.Skeleton).animation = 'Casual/Die/Die_Front';
                    cc.audioEngine.play(this.BossAtack_audio, false, 1);
                    this.SMash2.getComponent(sp.Skeleton).animation = 'master';
                    this.Ghost2.getComponent(sp.Skeleton).animation = 'die';
                    cc.audioEngine.play(this.Die_audio, false, 1);

                    this.Man_control.IsDie = true;
                    this.Man_control.CutRope();

                    this.node.getComponent(sp.Skeleton).loop = true;
                    this.node.getComponent(sp.Skeleton).animation = 'Monster/Idle';

                }, 900);

                setTimeout(() => {

                    this.Bg_black.getComponent(cc.Animation).play();
                    this.Bg_EndLose.active = true;
                    this.Bg_EndLose.getComponent(cc.Animation).play();
                    cc.audioEngine.play(this.Lose_audio, false, 1);
                    
                    this.StoreAll.active = false;

                }, 2000);

            }

        }

        else if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 99) {

            selfCollider.getComponent(sp.Skeleton).animation = 'Monster/Idle';

            this.flag = 'fly';

        }
    },

    onEndContact(contact, selfCollider, otherCollider) {

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 1) {

            this.flag = 'fly';

        }

    },

    update(dt) {

        if (this.flag == 'run') {
            if (this.direction == 'right') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(50, 0);
            } else {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-25, 0);
            }
        }
        else if (this.flag == 'fly') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
        }

        this.node.getComponent(cc.RigidBody).type = this.TypeKingKong;

        this.BossWarning.width = cc.winSize.width;
        this.BossWarning.height = cc.winSize.height;

        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;

        if (screen_width < screen_height) {

            this.Bg_End.scale = 1;
            this.Bg_EndLose.scale = 1;

        } else {

            this.Bg_End.scale = 1.2;
            this.Bg_EndLose.scale = 1.2;

        }

    },

});
