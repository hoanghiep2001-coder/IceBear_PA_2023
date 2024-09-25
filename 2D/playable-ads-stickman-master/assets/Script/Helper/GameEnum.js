var EnEnemies = cc.Enum({
    None: 0,
    Zombie: 1,
    PoisonVine: 2
});

var EnFacing = cc.Enum({
  Left: 0,
  Right: 1,
});

var EnGameState = cc.Enum({
    
});

var EnWeapon = cc.Enum({
    None: 0,
    Sword: 1,
    Archer: 2
});

var EnStickMode = cc.Enum({
    Normal: 0,
    Sword: 1,
    Archer: 2
});

var EnStickState = cc.Enum({
    None: 100,
    Idle: 0,
    Run: 1,

    JumpStart: 2,
    JumpUp: 3,
    JumpDown: 4,
    JumpLanded: 5,

    DashA: 6,
    DashB: 7,

    Attack1: 8,
    Attack2: 9,
    Attack3: 10,
    Attack4: 11,

    Win: 12,
});

var EnEnemyState = cc.Enum({
    Idle: 0,
    Walk: 1,
    Attack: 2
});

module.exports.EnEnemies = EnEnemies;
module.exports.EnFacing = EnFacing;
module.exports.EnGameState = EnGameState;
module.exports.EnWeapon = EnWeapon;
module.exports.EnStickState = EnStickState;
module.exports.EnStickMode = EnStickMode;
module.exports.EnEnemyState = EnEnemyState;
