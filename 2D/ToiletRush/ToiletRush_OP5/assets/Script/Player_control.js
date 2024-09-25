const { log } = require('console');

cc.Class({
    extends: cc.Component,

    properties: {

        Main_Control: require('Main_game'),

        PositionToilet2: cc.Node,

        PositionToilet3: cc.Node,

        Fight: cc.Node,

        AttackAudio: cc.AudioClip,

        boy: cc.Node,

        girl: cc.Node,

        Win: cc.AudioClip

    },

    onLoad() {

        this.AttackAudioId = null;

        this.WinAudioId = false;

        this.FlagwWin = true;

        this.node.on(cc.Node.EventType.TOUCH_START, this.handleTouchStart, this);

    },

    handleTouchStart(event) {

        this.Main_Control.StartAudio();

        let isPlayer = event.target._name

        if (isPlayer == 'Boy2') {
            this.Main_Control.ColorMouse = 'RED';
        } else if (isPlayer == 'Girl') {
            this.Main_Control.ColorMouse = 'BLUE';
        }

        this.Main_Control.FlagDraw = true;

    },

    onBeginContact(contact, selfCollider, otherCollider) {

        if (selfCollider.node.getComponent(cc.PhysicsBoxCollider).tag == otherCollider.node.getComponent(cc.PhysicsBoxCollider).tag) {

            cc.audioEngine.play(this.Win, false, 1);

            setTimeout(() => {
                selfCollider.node._children[1].active = true;
            }, 200);

            if (otherCollider.node.name != 'asset_paper') {
                setTimeout(() => {
                    if (selfCollider.node._name != 'Girl') {
                        selfCollider.node._children[0].getComponent(sp.Skeleton).animation = 'toilet_rush/end_sit_toilet03';
                    } else {
                        selfCollider.node._children[0].getComponent(sp.Skeleton).animation = 'toilet/end_sit_toilet';
                    }
                }, 300);

                setTimeout(() => {

                    selfCollider.node.stopAllActions();

                    if (selfCollider.node._name == 'Boy2') {
                        selfCollider.node.setPosition(this.PositionToilet2.getPosition().x, this.PositionToilet2.getPosition().y + 20);

                        setTimeout(() => {
                            selfCollider.node.setPosition(this.PositionToilet2.getPosition().x, this.PositionToilet2.getPosition().y);
                            selfCollider.node._children[0].getComponent(sp.Skeleton).animation = 'toilet_rush/end_win2';
                        }, 800);
                    }
                    else {
                        selfCollider.node.setPosition(this.PositionToilet3.getPosition().x, this.PositionToilet3.getPosition().y + 5);

                        setTimeout(() => {
                            selfCollider.node._children[0].getComponent(sp.Skeleton).animation = 'win/end_win4';
                        }, 800);
                    }
                }, 200);

            }

        } else {

            if (otherCollider.node._name == 'Girl' || otherCollider.node._name == 'Boy2') {

                selfCollider.node.active = false;
                otherCollider.node.active = false;
                const centerPosition = selfCollider.node.getPosition().add(otherCollider.node.getPosition()).mul(0.5);
                this.Fight.setPosition(centerPosition.x, centerPosition.y - 50);
                this.Fight.active = true;

                this.AttackAudioId = cc.audioEngine.play(this.AttackAudio, false, 1);

                setTimeout(() => {

                    this.Main_Control.FlagFallRun = true;
                    cc.audioEngine.stop(this.AttackAudioId);

                    this.Main_Control.ReloadGame();

                }, 1200);
            }

        }

    },

    update(dt) {

        let check = this.girl._children[0].getComponent(sp.Skeleton).animation;
        let check1 = this.boy._children[0].getComponent(sp.Skeleton).animation;
        if (check == 'win/end_win4' && check1 == 'toilet_rush/end_win2') {
            if (this.FlagwWin) {
                this.FlagwWin = false;
                this.Main_Control.isWin = true;
                this.Main_Control.FalgOneCheckStatus = false;
            }
        }
    },
});