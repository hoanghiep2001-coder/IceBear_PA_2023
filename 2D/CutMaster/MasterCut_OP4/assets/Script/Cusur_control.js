
cc.Class({
    extends: cc.Component,

    properties: {

        Man: cc.Node,
        Man_control: require('Man_control'),
        Main_control: require('Main_control'),
        EndNode: cc.Node,
        Hand: cc.Node,
        Bg_black: cc.Node,
        Bg_End: cc.Node,
        Warning: cc.Node,
        Cut_Audio: cc.AudioClip,
        Gun_Audio: cc.AudioClip,
        Die_Audio: cc.AudioClip,
        Lose_audio: cc.AudioClip,
        StoreAll: cc.Node,
        Bg_boss: cc.Node,

    },

    onLoad() {

        this.FlagOneRopeKing = true;
        this.FlagOneRopeMan = true;
        this.FlagOneMan = true;
        this.IsMove = false;
        this.CheckMove = false;
        this.EventMouseMoveRopeKing = true;

        // this.RopeKing.on('mousemove', () => {
        //     this.Event_Mouse_MoveRopeKing();
        // });

        // this.RopeMan.on('mousemove', () => {
        //     this.Event_Mouse_MoveRopeMan();
        // });
    },

    Event_Mouse_MoveRopeMan() {

        this.Main_control.CheckClick = true;
        this.Bg_boss.active = false;
        cc.audioEngine.stop(this.Main_control.Bg_boss);

        this.Hand.active = false;
        this.Warning.active = false;
        cc.audioEngine.stop(this.KingKong_control.WarningAudio);

        if (this.CutRopeMan) {
            if (this.FlagOneRopeMan) {

                cc.audioEngine.play(this.Cut_Audio, false, 1);
                this.FlagOneRopeMan = false;
                this.FlagOneMan = false;
                this.RopeMan.active = false;
                // this.RopeMan.getComponent(cc.Animation).play();
                this.Man.getComponent(sp.Skeleton).animation = 'Casual/rope/Rope_Lookdown';
                this.Man_control.resPosition = false;
                this.Man_control.CutRope();

                setTimeout(() => {
                    this.RopeMan.active = false;
                }, 100);
            }

        } else {

            if (this.FlagOneRopeMan) {

                this.FlagOneRopeMan = false;

                cc.audioEngine.play(this.Cut_Audio, false, 1);

                this.EndNode.active = true;

                setTimeout(() => {
                    this.RopeMan.active = false;
                    this.Range.getComponent(sp.Skeleton).loop = false;
                    this.Range.getComponent(sp.Skeleton).animation = 'Ranger_Enemy/Attack';
                    cc.audioEngine.play(this.Gun_Audio, false, 1);
                    this.Man.getComponent(sp.Skeleton).loop = false;
                    this.Man_control.resPosition = false;
                    cc.audioEngine.play(this.Die_Audio, false, 1);
                    this.Man.getComponent(sp.Skeleton).animation = 'Casual/Die/Die_Front';
                    this.Ghost.getComponent(sp.Skeleton).animation = 'die';
                    this.Rope.active = false;
                    this.Man_control.CutRope();
                    this.Man_control.IsDie = true;
                    this.Man.getComponent(cc.RigidBody).linearVelocity = cc.v2(10, 0);
                }, 100);

                setTimeout(() => {
                    this.Range.getComponent(sp.Skeleton).loop = true;
                    this.Range.getComponent(sp.Skeleton).animation = 'Ranger_Enemy/Idle';
                }, 200);

                setTimeout(() => {
                    this.Bg_black.getComponent(cc.Animation).play();
                    this.Bg_End.active = true;
                    this.Bg_End.getComponent(cc.Animation).play();
                    cc.audioEngine.play(this.Lose_audio, false, 1);

                    this.StoreAll.active = false;
                }, 1500);
            }

        }

    },

    Event_Mouse_MoveRopeKing() {
        this.CheckMove = this.Main_control.MoveFlag;
        if (this.CheckMove) {
            if (this.EventMouseMoveRopeKing) {
                this.EventMouseMoveRopeKing = false;
                // this.node.setPosition(-5.263, this.node.getPosition().y);
                // this.node.getComponent(cc.PhysicsBoxCollider).size = cc.size(1000, 1000);

                this.Main_control.CheckClick = true;
                this.Bg_boss.active = false;
                cc.audioEngine.stop(this.Main_control.Bg_audio_Id);

                cc.audioEngine.play(this.Cut_Audio, false, 1);

                this.Hand.active = false;

                if (this.FlagOneRopeKing) {

                    this.FlagOneRopeKing = false;
                    this.RopeKing.active = false;
                    // this.RopeKing.getComponent(cc.Animation).play();
                    this.KingKong_control.resPonKingKong = false;
                    this.KingKong.getComponent(sp.Skeleton).animation = 'Monster/Walk';
                    this.KingKong_control.RunWhenRopeBreak();

                    setTimeout(() => {
                        this.RopeKing.active = false;
                    }, 100);
                }

            }
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        // console.log(otherCollider.getComponent(cc.PhysicsBoxCollider).tag);
        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 155) {

            this.Main_control.CheckClick = true;

            otherCollider.node.active = false;
            
            cc.audioEngine.play(this.Cut_Audio, false, 1);

            this.Bg_boss.active = false;
            cc.audioEngine.stop(this.Main_control.BgBoss_audio_Id);
        }
    },

    start() {

    },

    update(dt) {

    },
});
