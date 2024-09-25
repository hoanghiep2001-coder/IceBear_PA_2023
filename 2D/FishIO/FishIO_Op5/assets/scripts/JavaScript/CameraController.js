
cc.Class({
    extends: cc.Component,

    properties: {
      player: cc.Node,
      hideMask: cc.Node,
    },

    start () {
    },

     update (dt) {
        let targetPosition = this.player.getPosition();

        targetPosition.y = cc.misc.clampf(targetPosition.y, -100, 450);
        targetPosition.x = cc.misc.clampf(targetPosition.x, -500, 420);

        let currentPosition = this.node.getPosition();
        currentPosition.lerp(targetPosition, 0.2, currentPosition);
        this.node.setPosition(currentPosition);
        this.hideMask.setPosition(currentPosition);

     },
});
