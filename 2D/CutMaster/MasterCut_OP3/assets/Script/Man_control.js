
cc.Class({
    extends: cc.Component,

    properties: {

        Rope: cc.Node,
        RopeRound: cc.Node,
        Door: cc.Node,
        Bg_win: cc.Node,
        Run_audio: cc.AudioClip,
        Fun_audio: cc.AudioClip,
        Win_audio: cc.AudioClip,
        Break_rope: cc.AudioClip,
        Hand: cc.Node,
        Bg_black: cc.Node,
        Canva: cc.Node,
        RopeKing: cc.Node,
        RopeMan: cc.Node,
        AllStore: cc.Node,
        Cusur: cc.Node,

    },


    onLoad() {

        this.resPosition = true;

        this.direction = null;
        this.flag = null,
            this.TypeMan = 0;
        this.IsDie = false;
        this.runAudio = null;

        this.Status_ngang_doc = null;
        this.Status_ngang_docFlag = null;

        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;

        if (screen_width < screen_height) {
            this.Status_ngang_doc = 'doc';
        } else {
            this.Status_ngang_doc = 'ngang';
        }

    },

    start() {

        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;

    },

    CutRope() {

        this.TypeMan = 2;

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        // cc.audioEngine.stopAll(this.Fly_audio);
        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 3) {

            if (this.IsDie == false) {
                this.Rope.getComponent(sp.Skeleton).loop = false;
                selfCollider.getComponent(sp.Skeleton).loop = false;
                selfCollider.getComponent(sp.Skeleton).animation = 'Casual/rope/Rope_Break';
                cc.audioEngine.play(this.Break_rope, false, 1)
                setTimeout(() => {
                    this.Rope.getComponent(sp.Skeleton).animation = 'break';
                }, 500);

                setTimeout(() => {

                    selfCollider.getComponent(sp.Skeleton).loop = true;
                    selfCollider.getComponent(sp.Skeleton).animation = 'Casual/Move/Run01';
                    this.resPosition = false;
                    this.direction = 'right'
                    this.flag = 'run';
                    this.runAudio = cc.audioEngine.play(this.Run_audio, true, 1);

                }, 800);
            }
        }
        else if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 78) {

            cc.audioEngine.stop(this.runAudio);
            selfCollider.getComponent(sp.Skeleton).loop = false;
            selfCollider.getComponent(sp.Skeleton).animation = 'Casual/win/end_win1';

            this.Door.getComponent(sp.Skeleton).animation = 'idle_open';
            cc.audioEngine.play(this.Fun_audio, false, 1);

            setTimeout(() => {

                this.Bg_win.active = true;
                this.Bg_win.getComponent(cc.Animation).play();
                this.Bg_black.getComponent(cc.Animation).play();
                cc.audioEngine.play(this.Win_audio, false, 1);
                this.AllStore.active = true;

                // this.Bg_win._children[0].opacity = 200;
                // this.Bg_win._children[1].active = true;
                // // this.Bg_win._children[1].getComponent(cc.Animation).play();
                // this.Bg_win._children[2].active = true;
                // this.Bg_win._children[3].active = true;

                // setTimeout(() => {

                //     this.Bg_win._children[4].active = true;
                //     // this.Bg_win._children[4].getComponent(cc.Animation).play();

                // }, 500);

            }, 1000);
        }

    },

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 30 || otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 20 || otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 10 || otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 0) {
        } else {
            this.flag = 'fly';
            this.node.getComponent(sp.Skeleton).animation = 'Casual/Fly';
            // cc.audioEngine.stopAll(this.Run_audio);
            // cc.audioEngine.play(this.Fly_audio, true, 1);
        }
    },

    Click_buton_next() {

        // cc.audioEngine.play(this.Click_audio, false, 1);
    },

    update() {

        if (this.flag == 'run') {
            if (this.direction == 'right') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(100, 0);
            } else {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100, 0);
            }
        }
        else if (this.flag == 'fly') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
        }


        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;
        let PositionMan = this.node.getPosition();

        if (screen_width < screen_height) {
            this.Status_ngang_docFlag = 'doc';
        } else {
            this.Status_ngang_docFlag = 'ngang';
        }

        if (this.Status_ngang_docFlag != this.Status_ngang_doc) {

            this.Status_ngang_doc = this.Status_ngang_docFlag;

            // this.node.setPosition(PositionMan);

            console.log('rotate');

        }

        if (screen_width < screen_height) {

            this.Hand.scale = 0.15;


        } else {

            this.Hand.scale = 0.25;

        }

        this.node.getComponent(cc.RigidBody).type = this.TypeMan;
    },
    
});
