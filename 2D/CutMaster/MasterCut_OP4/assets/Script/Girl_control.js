
cc.Class({
    extends: cc.Component,

    properties: {

        GrRope: cc.Node,
        Man_control: require('Man_control'),
        BushLeft: cc.Node,
        BushRight: cc.Node,
        ToStore: require('ToStore'),
        Gun_Audio: cc.AudioClip,
        Die_Audio: cc.AudioClip,
        Win_Audio: cc.AudioClip,
        Yell_Audio: cc.AudioClip,
        Drop_Audio: cc.AudioClip,

    },

    onLoad() {

        this.flag = null;
        this.direction = null;

        this.FlagOne = true;

        this.FlagOneSetPosition = false;

        this.Hiden = false;

        // cc.audioEngine.play(this.Yell_Audio, false, 1);

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        // cc.audioEngine.stopAll(this.Fly_audio);

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 3) {

            if (this.FlagOne) {
                this.FlagOne = false;

                cc.audioEngine.play(this.Drop_Audio, false, 1);

                this.node.getComponent(sp.Skeleton).loop = false;
                this.node.getComponent(sp.Skeleton).animation = 'Casual/Move/Ground_Impact';

                this.node._children[0].active = false;

                this.Man_control.flag = 'fly';
                this.Man_control.ManNode.getComponent(sp.Skeleton).animation = 'toilet/end_lose';


                let Delete = false;

                this.GrRope._children.forEach((element) => {

                    if (element.active == false) {
                        Delete = true;
                    }

                    if (Delete) {
                        element.active = false;
                    }

                });

                setTimeout(() => {

                    this.node.getComponent(sp.Skeleton).animation = 'Casual/Fatality/Bazooka_Idle';

                    let PositionGirl = this.node.getPosition();
                    let PositionMan = this.Man_control.ManNode.getPosition();

                    if (PositionGirl.x > PositionMan.x) {

                        this.node.scaleX = -0.2;
                        this.Man_control.ManNode.scaleX = 0.2;

                    } else {

                        this.node.scaleX = 0.2;
                        this.Man_control.ManNode.scaleX = -0.2;

                    }

                }, 700);

                setTimeout(() => {

                    this.node.getComponent(sp.Skeleton).animation = 'Casual/Fatality/Bazooka_Attack';
                    cc.audioEngine.play(this.Gun_Audio, false, 1);
                    cc.audioEngine.play(this.Die_Audio, false, 1);

                    this.Man_control.ManNode.getComponent(sp.Skeleton).loop = false;
                    this.Man_control.ManNode.getComponent(sp.Skeleton).animation = 'Casual/Die/Die_Boom';

                }, 1300);

                setTimeout(() => {

                    this.ToStore.installHandle();

                }, 3500);
            }

        }
        // 

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 7) {

            if (this.FlagOne) {

                cc.audioEngine.play(this.Win_Audio, false, 1);

                this.FlagOne = false;

                this.node._children[0].active = false;

                this.Man_control.flag = 'fly';

                let Delete = false;

                this.GrRope._children.forEach((element) => {

                    if (element.active == false) {
                        Delete = true;
                    }

                    if (Delete) {
                        element.active = false;
                    }

                });

                let PositionGirl = this.node.getPosition();
                let PositionMan = this.Man_control.ManNode.getPosition();

                if (PositionGirl.x > PositionMan.x) {

                    this.node.scaleX = -0.2;
                    this.Man_control.ManNode.scaleX = 0.2;

                } else {

                    this.node.scaleX = 0.2;
                    this.Man_control.ManNode.scaleX = -0.2;

                }

                this.node.getComponent(sp.Skeleton).loop = false;
                this.node.getComponent(sp.Skeleton).animation = 'Casual/win/end_win1';

                this.Man_control.ManNode.getComponent(sp.Skeleton).loop = false;
                this.Man_control.ManNode.getComponent(sp.Skeleton).animation = 'Casual/win/end_win1';
                this.Man_control.flag = 'fly';

                this.FlagOneSetPosition = true;

                setTimeout(() => {

                    let PositionGirl = this.node.getPosition();
                    let PositionMan = this.Man_control.ManNode.getPosition();
                    let PositionManAndGirl = (PositionGirl.x + PositionMan.x) / 2;

                    this.node.getComponent(sp.Skeleton).loop = true;
                    this.node.getComponent(sp.Skeleton).animation = 'Casual/Move/Run01';

                    this.Man_control.ManNode.getComponent(sp.Skeleton).loop = true;
                    this.Man_control.ManNode.getComponent(sp.Skeleton).animation = 'Casual/Move/Run01';

                    this.Hiden = true;
                    this.Man_control.Hiden = true;

                    if (PositionManAndGirl >= 0) {
                        this.BushLeft.active = true;
                        this.node.scaleX = -0.2;
                        this.Man_control.node.scaleX = -0.2;

                        this.flag = 'run';
                        this.direction = 'left';
                        this.Man_control.flag = 'runFlash';
                        this.Man_control.direction = 'left';

                    } else {

                        this.BushRight.active = true;

                        this.node.scaleX = 0.2;
                        this.Man_control.node.scaleX = 0.2;

                        this.flag = 'run';
                        this.direction = 'right';
                        this.Man_control.flag = 'runFlash';
                        this.Man_control.direction = 'right';

                    }

                }, 800);

            }

        }

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 1 || otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 100) {

            if (this.Hiden) {
                this.node.active = false;
                setTimeout(() => {

                    this.BushLeft.getComponent(sp.Skeleton).animation = 'bush_idle2';
                    this.BushRight.getComponent(sp.Skeleton).animation = 'bush_idle2';

                }, 1000);

                setTimeout(() => {

                    this.ToStore.installHandle();

                }, 3000);
            }
        }

    },

    start() {

    },

    update(dt) {

        if (this.flag == 'run') {
            if (this.direction == 'right') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(150, 0);
            } else {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-150, 0);
            }

        }
        else if (this.flag == 'fly') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
        }

        if (this.FlagOneSetPosition) {
            this.FlagOneSetPosition = false;
            this.node.setPosition(0, -195.795);
        }

    },
});
