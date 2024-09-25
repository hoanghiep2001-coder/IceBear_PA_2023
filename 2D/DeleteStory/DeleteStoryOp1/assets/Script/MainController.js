cc.Class({
    extends: cc.Component,

    properties: {
        currentLevel: {
            type: cc.Integer,
            default: 0
        },
        levels: {
            type: [cc.Integer],
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.parent = null;
        cc.game.addPersistRootNode(this.node);
    },

    start() {
        // Mindwork game ready callback
        window.gameReady && window.gameReady();

        const level = this.levels[this.currentLevel];
        cc.director.loadScene("Level" + level, () => {
            cc.log("Scene loaded");
        });
    },

    hasNext: function() {
        return this.currentLevel < this.levels.length - 1;
    },

    nextLevel: function() {
        this.currentLevel++;
        return this.levels[this.currentLevel];
    }
});
