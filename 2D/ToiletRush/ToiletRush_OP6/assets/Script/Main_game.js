
cc.Class({
    extends: cc.Component,

    properties: {

        ToStoreRq: require('ToStore'),

        graphics_boy1: cc.Graphics,

        graphics_boy2: cc.Graphics,

        graphics_girl: cc.Graphics,

        Mouse: cc.Node,

        Boy02: cc.Node,

        Girl: cc.Node,

        ToStore: cc.Node,

        Hint1: cc.Node,

        Hint2: cc.Node,

        Hand1: cc.Node,

        Hand2: cc.Node,

        ClickAllStore: cc.Node,

        // Responsive

        ViewGameNgang: cc.Node,

        ViewGameDoc: cc.Node,

        // ViewEndGameDoc: cc.Node,

        // ViewEndGameNgang: cc.Node,

        // ReloadGameNgang: cc.Node,

        // ReloadGameDoc: cc.Node,

        Toilet_BlackBoy: cc.Node,

        Toilet_BlackGirl: cc.Node,

        PlayerGr: [cc.Node],


        // Audio
        BgAudio: cc.AudioClip,

        DrawAudio: cc.AudioClip,

        RunAudio: cc.AudioClip,

    },

    onLoad() {

        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0, 0);

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_joinBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit

        this.handleTouchMove();

        this.node.on(cc.Node.EventType.TOUCH_START, this.GuideGame, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.handleTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.HandleTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.HandleTouchEnd, this);

        this.DrawAudioId = null;

        this.Flag_Fail = false;

        this.AudioBg_Id = null;

        this.FalgOneCheckStatus = true;

        this.Flag_FailOne = true;

        this.isWin = false;

        this.ColorMouse = '#df664b';

        this.FlagDraw = false;

        this.FlagRemoveDraw = null;

        this.FlagLockScreen = false;

        this.FlagLockDrawBoy2 = false;
        this.FlagLockDrawGirl = false;

        this.ArrPositionMoveBoy2 = [];
        this.ArrPositionMoveGirl = [];

        this.intarval2 = null;
        this.intarval3 = null;

        this.FlagFallRun = false;

        this.FlagOne = false;


        this.Flagpending = true;

        this.CountDrawDone = 0;

        this.StartAudio();

    },

    LockScreen() {

        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;

        if (screen_width < screen_height) {
            this.FlagLockScreen = 'doc';
        }
        else {
            this.FlagLockScreen = 'ngang';
        }

        // Vô hiệu hóa chế độ tự động full màn hình
        // Kích thước màn hình cố định ban đầu
        var designWidth = screen_width;
        var designHeight = screen_height;

        // Đặt kích thước màn hình cố định ban đầu
        cc.view.setDesignResolutionSize(designWidth, designHeight, cc.ResolutionPolicy.SHOW_ALL);

        // Lắng nghe sự kiện resize để điều chỉnh màn hình khi thay đổi kích thước
        cc.view.setResizeCallback(() => {
            // Đặt lại kích thước màn hình cố định
            cc.view.setDesignResolutionSize(designWidth, designHeight, cc.ResolutionPolicy.SHOW_ALL);
        });


    },

    HandleTouchEnd() {

        this.LockScreen();

        cc.audioEngine.stop(this.DrawAudioId);
        this.DrawAudioId = null;

        let flagRemove = true;

        if (this.FlagRemoveDraw != null) {

            if (this.FlagRemoveDraw == 'asset_toilet_boy2') {
                if (this.ColorMouse == 'RED') {
                    this.FlagLockDrawBoy2 = true;
                    flagRemove = false;
                    this.Toilet_BlackBoy.active = false;
                    this.Toilet_BlackBoy.scale = 0;
                    ++this.CountDrawDone;
                }
            }


            if (this.FlagRemoveDraw == 'asset_toilet_girl') {
                if (this.ColorMouse == 'BLUE') {
                    this.FlagLockDrawGirl = true;
                    flagRemove = false;
                    this.Toilet_BlackGirl.active = false;
                    this.Toilet_BlackGirl.scale = 0;
                    ++this.CountDrawDone;
                }
            }

        }

        if (flagRemove) {

            if (this.ColorMouse == 'RED') {
                if (this.FlagLockDrawBoy2 == false) {
                    this.graphics_boy1.clear(true);
                    this.ArrPositionMoveBoy2 = [];

                    this.Toilet_BlackBoy.active = false;
                }
            } else if (this.ColorMouse == 'BLUE') {
                if (this.FlagLockDrawGirl == false) {
                    this.graphics_boy2.clear(true);
                    this.ArrPositionMoveGirl = [];

                    this.Toilet_BlackGirl.active = false;
                }
            }

        }

        this.FlagDraw = false;

        if (this.FlagLockDrawBoy2 && this.FlagLockDrawGirl) {

            if (this.Flagpending) {
                this.Flagpending = false; { }

                this.MoveStart();

            }

        }

    },

    MoveStart() {


        cc.audioEngine.play(this.RunAudio, false, 1);

        this.Boy02._children[0].getComponent(sp.Skeleton).animation = 'Run_Toilet01';
        this.Girl._children[0].getComponent(sp.Skeleton).animation = 'toilet/Run_Toilet03';

        this.Move(this.Boy02, this.ArrPositionMoveBoy2);
        this.Move(this.Girl, this.ArrPositionMoveGirl);


    },

    GuideGame() {

        this.StartAudio();

    },



    Move(nodeMove, ArrPositionMove) {

        const actions = [];
        for (let i = 0; i < ArrPositionMove.length - 1; i++) {
            const startPos = ArrPositionMove[i];
            const moveSpeed = 300;
            const endPos = ArrPositionMove[i + 1];
            const distance = startPos.sub(endPos).mag();
            const moveDuration = distance / moveSpeed;

            const moveAction = cc.moveTo(moveDuration, endPos);

            let screen_width = cc.winSize.width;
            let screen_height = cc.winSize.height;

            let angle;

            if (endPos.x > startPos.x) {
                if (screen_width < screen_height) {
                    angle = 0.807;
                } else {
                    angle = 1.143;
                }
            } else {
                if (screen_width < screen_height) {
                    angle = -0.807;
                } else {
                    angle = -1.143;
                }
            }

            const scaleXAction = cc.callFunc(() => {
                nodeMove.scaleX = angle; // Thay đổi scaleX tại mỗi điểm dừng
            });

            const spawnAction = cc.spawn(moveAction, scaleXAction);

            // actions.push(spawnAction); Chạy và xoay hướng
            actions.push(moveAction);

        }

        // Tạo sequence từ các action di chuyển và thay đổi scaleX
        const sequence = cc.sequence(actions);

        // Áp dụng sequence vào node
        nodeMove.runAction(sequence);

    },

    ToiletBlackGirlActive() {

        this.Toilet_BlackGirl.active = true;

    },

    ToiletBlackBoyActive() {

        this.Toilet_BlackBoy.active = true;

    },

    Store() {
        if (this.CountDrawDone == 1) {
            this.ToStoreRq.installHandle();
        }
    },

    handleTouchMove(event) {



        if (this.DrawAudioId == null) {

            if (this.FlagDraw)
                this.DrawAudioId = cc.audioEngine.play(this.DrawAudio, true, 1);


        }

        const _this = this;

        cc.Canvas.instance.node.on(
            cc.Node.EventType.TOUCH_START,
            (e) => {
                this.cancel = false;
                this.startPos1 = e.touch.getLocation();
                this.startPos = e.touch.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                this.Mouse.setPosition(this.startPos);

            },
        );

        //  event firee when user move on the screen
        cc.Canvas.instance.node.on(
            cc.Node.EventType.TOUCH_MOVE,
            (e) => {
                this.cancel = false;
                if (cc.winSize.width < cc.winSize.height) {
                    _this.graphics_boy2.lineWidth = 13;
                    _this.graphics_girl.lineWidth = 13;
                } else {
                    _this.graphics_boy2.lineWidth = 16;
                    _this.graphics_girl.lineWidth = 16;
                }

                if (this.ColorMouse == 'RED') {
                    _this.graphics_boy1.moveTo(
                        _this.startPos1.x - cc.winSize.width / 2,
                        _this.startPos1.y - cc.winSize.height / 2
                    );
                    _this.graphics_boy1.lineTo(
                        e.touch.getLocation().x - cc.winSize.width / 2,
                        e.touch.getLocation().y - cc.winSize.height / 2
                    );
                } else if (this.ColorMouse == 'BLUE') {
                    _this.graphics_boy2.moveTo(
                        _this.startPos1.x - cc.winSize.width / 2,
                        _this.startPos1.y - cc.winSize.height / 2
                    );
                    _this.graphics_boy2.lineTo(
                        e.touch.getLocation().x - cc.winSize.width / 2,
                        e.touch.getLocation().y - cc.winSize.height / 2
                    );
                }

                this.Mouse.setPosition(e.touch.getLocation().x - cc.winSize.width / 2,
                    e.touch.getLocation().y - cc.winSize.height / 2);
                _this.startPos1 = e.touch.getLocation();


                if (this.FlagDraw) {

                    if (this.FlagLockDrawGirl == false) {
                        _this.graphics_boy2.stroke();
                        this.Store();
                    }
                    if (this.FlagLockDrawBoy2 == false) {
                        _this.graphics_boy1.stroke();
                        this.Store();
                    }
                }

            },
        );

        if (this.ColorMouse == 'RED') {
            if (this.FlagLockDrawBoy2 == false) {
                this.ArrPositionMoveBoy2.push(event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2 - 40)));
            }
        }
        if (this.ColorMouse == 'BLUE') {
            if (this.FlagLockDrawGirl == false) {
                this.ArrPositionMoveGirl.push(event.getLocation().subSelf(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2 - 40)));
            }
        }

    },

    StartAudio() {

        if (this.AudioBg_Id == null) {
            this.AudioBg_Id = cc.audioEngine.play(this.BgAudio, false, 1);
        }

    },

    StopAudio() {

        cc.audioEngine.stop(this.AudioBg_Id);

    },

    ReloadGame() {

        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;

        if (screen_width < screen_height) {
            this.ReloadGameDoc.active = true;
        } else {
            this.ReloadGameNgang.active = true;
        }

        this.ClickAllStore.active = true;

    },

    update(dt) {

        if (this.FlagLockDrawBoy2 && this.FlagLockDrawGirl) {

            setTimeout(() => {

                if (this.FalgOneCheckStatus) {

                    this.FlagFallRun = true;

                    this.FalgOneCheckStatus = false;
                    this.Boy02.stopAllActions();
                    this.Girl.stopAllActions();
                    this.PlayerGr.forEach(element => {
                        let check = element._children[0].getComponent(sp.Skeleton).animation;
                        if (check == 'Run_Toilet01') {
                            this.Flag_Fail = true;
                            element._children[0].getComponent(sp.Skeleton).animation = 'toilet_rush/end_lose';
                        } else if (check == 'toilet/Run_Toilet03') {
                            this.Flag_Fail = true;
                            element._children[0].getComponent(sp.Skeleton).animation = 'toilet/end_lose';
                        }
                    });

                    setTimeout(() => {
                        cc.director.loadScene(cc.director.getScene().name);
                    }, 1200);

                }
            }, 5000);
        }

        let screen_width = cc.winSize.width;
        let screen_height = cc.winSize.height;

        if (this.FlagLockScreen == false) {
            if (screen_width < screen_height) {
                this.ViewGameDoc.active = true;
                this.ViewGameNgang.active = false;
            } else {
                this.ViewGameDoc.active = false;
                this.ViewGameNgang.active = true;
            }
        } else {
            if (this.FlagLockScreen == 'doc') {
                this.ViewGameDoc.active = true;
                this.ViewGameNgang.active = false;
            } else {
                this.ViewGameDoc.active = false;
                this.ViewGameNgang.active = true;
            }
        }

        if (this.isWin) {
            this.FalgOneCheckStatus = false;
            this.isWin = false;
            let screen_width = cc.winSize.width;
            let screen_height = cc.winSize.height;

            if (screen_width < screen_height) {
                this.ViewEndGameDoc.active = true;
                this.ViewEndGameDoc.getComponent(cc.Animation).play();
            } else {
                this.ViewEndGameNgang.active = true;
                this.ViewEndGameNgang.getComponent(cc.Animation).play();
            }

            setTimeout(() => {
                this.ClickAllStore.active = true;
            }, 1000);
        }

    },
});
