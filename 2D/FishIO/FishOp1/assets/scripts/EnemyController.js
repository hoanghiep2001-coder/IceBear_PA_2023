
cc.Class({
    extends: cc.Component,

    properties: {
        arrPoint: [cc.Node],
        arrEnemy: [cc.Prefab],
        indexEnemy: 0,
        indexPoint: 0,
        player: cc.Node,
    },

    onLoad () {},

    start () {
    },

    startCreateEnemy(){
        this.schedule(function(){
            this.spawnEnemy();
        }, 0.01, 22, 0);

        this.schedule(function(){
            this.spawnEnemy();
        }, 1, 20, 3);
    },

    randomPoint(){
        this.indexPoint = cc.math.randomRangeInt(0, this.arrPoint.length);
    },

    randomEnemy(){
        //this.indexEnemy = 5
        this.indexEnemy = cc.math.randomRangeInt(0, this.arrEnemy.length);
    },

    spawnEnemy(){
        if(!this.player.getComponent("PlayerController").isLive) return;
        this.randomEnemy();
        this.randomPoint();

        let enemy = cc.instantiate(this.arrEnemy[this.indexEnemy]);
        enemy.parent = this.node;
        enemy.setPosition(cc.v2(this.arrPoint[this.indexPoint].getPosition().x, this.arrPoint[this.indexPoint].getPosition().y));

    },

    //update (dt) {},
});
