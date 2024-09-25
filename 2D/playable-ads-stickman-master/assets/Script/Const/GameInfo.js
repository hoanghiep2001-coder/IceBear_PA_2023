const {EnStickState, EnStickMode} = require("GameEnum");

var GameInfo = {
    IsPlaying : false,
    TotalEnemy: 0,
    TotalEnemyAlive: 0,
    StickState: EnStickState.Idle,
    StickMode: EnStickMode.Normal,

    // Button Action
    InputAttackDown: false,
    InputJumpDown: false,
    InputDashDown: false,
    InputMoveHorizontal: 0,

    GamePause: false,
    TutorialDoneStage1: false,
    TutorialStartStage2: false,
    TutorialDoneStage2: false,

    IsShowPopupInstall: false,
}

module.exports = GameInfo;