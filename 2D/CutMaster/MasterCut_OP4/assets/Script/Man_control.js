
cc.Class({
    extends: cc.Component,

    properties: {

        Bg_win: cc.Node,
        Run_audio: cc.AudioClip,
        Fun_audio: cc.AudioClip,
        Win_audio: cc.AudioClip,
        Hand: cc.Node,
        Bg_black: cc.Node,
        Canva: cc.Node,
        AllStore: cc.Node,
        Cusur: cc.Node,
        // BushLeft: cc.Node,
        // BushRight: cc.Node

    },


    onLoad() {

        this.Hiden = false;

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

        this.flag = 'run';
        this.direction = 'right';

        this.ManNode = this.node;

        // setTimeout(() => {
        //     this.node.getComponent(cc.PhysicsBoxCollider).sensor = true;
        // }, 5000);

    },

    start() {

        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;

        this.CutRope();

    },

    CutRope() {

        this.TypeMan = 2;

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        // cc.audioEngine.stopAll(this.Fly_audio);
        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 1) {

            this.flag = 'run';
            this.direction = 'left';
            this.node.scaleX = -0.2;

        }

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 100) {

            this.node.scaleX = 0.2;
            this.flag = 'run';
            this.direction = 'right';

        }

        if (otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 1 || otherCollider.getComponent(cc.PhysicsBoxCollider).tag == 100) {

            if (this.Hiden) {
                this.node.active = false;
                
                // setTimeout(() => {

                //     this.BushLeft.getComponent(sp.Skeleton).animation = 'bush_idle2';
                //     this.BushRight.getComponent(sp.Skeleton).animation = 'bush_idle2';

                // }, 1000);

            }

        }


    },

    onEndContact(contact, selfCollider, otherCollider) {

    },

    Click_buton_next() {

        // cc.audioEngine.play(this.Click_audio, false, 1);
    },

    update() {

        if (this.flag == 'run') {
            if (this.direction == 'right') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(50, 0);
            } else {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
            }

        }
        else if (this.flag == 'fly') {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
        }

        if (this.flag == 'runFlash') {
            if (this.direction == 'right') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(150, 0);
            } else {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-150, 0);
            }

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
