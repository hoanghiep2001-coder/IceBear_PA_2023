
cc.Class({
    extends: cc.Component,

    properties: {
        // rope_main_control: require('Rope_control'),
        // rope_kingkong_control: require('Rope_control'),
        cursor: cc.Node,
        startPosition: null,
        Help_audio: cc.AudioClip,
        Bg_audio: cc.AudioClip,
        Click_audio: cc.AudioClip,
        ToStore: require('ToStore'),
        Bg_boss: cc.Node,
        Boss_Audio: cc.AudioClip,
        Cusur: cc.Node
    },

    onLoad() {
        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0, -500);

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_joinBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit

        this.CheckClick = false;
        this.Bg_audio_Id = null;
        this.Boss_audio_Id = null;
        this.MoveFlag = false;

        this.Position = null;

        this.PositionSub = null;

        this.node.on(cc.Node.EventType.TOUCH_START, this.SetPositionStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.Event_Mouse_Move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.Event_Mouse_End, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.Event_Cancel, this);

    },

    // SetPositionStart(event) {

    //     cc.audioEngine.play(this.Help_audio, false, 1);

    //     setTimeout(() => {

    //         if (this.CheckClick == false) {
    //             this.Bg_boss.active = true;
    //             this.Bg_boss.getComponent(cc.Animation).play();
    //             this.Bg_audio_Id = cc.audioEngine.play(this.Boss_Audio, true, 1);
    //         }

    //     }, 5000);

    //     setTimeout(() => {

    //         if (this.CheckClick == false) {
    //             this.ToStore.installHandle();
    //         }

    //     }, 15000);

    //     this.cursor.setPosition(event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)));

    //     this.startPosition = event.getLocation();

    //     cc.audioEngine.play(this.Click_audio, false, 1);

    // },

    SetPositionStart(event) {
        if (this.Bg_audio_Id == null) {
            cc.audioEngine.play(this.Help_audio, false, 1);
            this.Bg_audio_Id = cc.audioEngine.play(this.Bg_audio, true, 1);
            setTimeout(() => {

                if (this.CheckClick == false) {
                    this.Bg_boss.active = true;
                    this.Bg_boss.getComponent(cc.Animation).play();
                    this.Boss_audio_Id = cc.audioEngine.play(this.Boss_Audio, true, 1);
                }

            }, 5000);

            setTimeout(() => {

                if (this.CheckClick == false) {
                    this.ToStore.installHandle();
                }

            }, 15000);

            this.cursor.setPosition(event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)));
            this.startPosition = event.getLocation();
            cc.audioEngine.play(this.Click_audio, false, 1);
        }

    },

    Event_Mouse_Move(event) {

        var lastMousePosition = cc.v2(0, 0);

        this.cursor.active = true;
        // this.cursor.setPosition(this.startPosition.x - cc.winSize.width / 2, this.startPosition.y - cc.winSize.height / 2);
        this.startPosition = event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

        this.MoveFlag = true;

        this.Position = event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

        // var currentMousePosition = event.getLocation();

        // var mouseDelta = currentMousePosition.sub(lastMousePosition);
        // var mouseSpeed = mouseDelta.mag();

        // // Lưu trữ vị trí chuột hiện tại để sử dụng trong khung hình tiếp theo
        // // lastMousePosition = currentMousePosition;

        // // Sử dụng tốc độ di chuyển chuột theo ý của bạn
        // // Ví dụ: hiển thị tốc độ di chuyển chuột trong console
        // console.log("Mouse Speed:", mouseSpeed);

        // if(mouseSpeed < 100) {
        //     this.Cusur.getComponent(cc.PhysicsBoxCollider).size = cc.size(500, 500);
        // }else if(mouseSpeed < 200) {
        //     this.Cusur.getComponent(cc.PhysicsBoxCollider).size = cc.size(1000, 1000);
        // }else if(mouseSpeed < 300) {
        //     this.Cusur.getComponent(cc.PhysicsBoxCollider).size = cc.size(3000, 3000);
        // }
        // else if(mouseSpeed < 1000) {
        //     this.Cusur.getComponent(cc.PhysicsBoxCollider).size = cc.size(5000, 5000);
        // }


    },

    Event_Mouse_End() {
        this.cursor.active = false;
        this.cursor.getComponent(cc.ParticleSystem).resetSystem();
        this.MoveFlag = false;
    },

    Event_Cancel() {

        this.MoveFlag = false;

    },

    update() {

        if (this.Position != null) {

            let currentPosition = this.Cusur.getPosition();
            currentPosition.lerp(this.Position, 1, currentPosition);
            this.Cusur.setPosition(currentPosition);

        }


    }

});
