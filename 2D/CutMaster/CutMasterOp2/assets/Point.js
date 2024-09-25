let isPlay = false;
cc.Class({
  extends: cc.Component,

  properties: {
    background: cc.Node,
    firstTouch: false,
    isPlay: false,
  },

  onLoad() {
    this.GamePlay = this.node.parent.getComponent("gamePlay");
    this.Character =
      this.node.parent.children[3].children[8].getComponent("Character");
    this.AudioManager = this.Character.getComponent("AudioManager");

    this.background.on("touchend", () => {
      this.schedule(function () {
        if (!isPlay && !this.firstTouch) {
          this.AudioManager.playhelpSound();
        }
      }, 4);
  
      this.scheduleOnce(function () {
        if (!isPlay && !this.firstTouch) {
          this.AudioManager.playhelpSound();
        }
      }, 1);
      this.firstTouch = true
      // this.scheduleOnce(() => {
      //   if (!isPlay) {
      //     this.Character.cutRope();
      //     isPlay = true;
  
      //     this.GamePlay.Rope.forEach((ropeItem) => {
      //       ropeItem.active = false;
      //     });
      //     this.GamePlay.CutSpine.active = true;
      //   }
      // }, 10)
    })
  },

  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.tag === 5) {
      if(!isPlay) {
        this.Character.cutRope();
      }
      isPlay = true;
      this.GamePlay.Rope.forEach((ropeItem) => {
        ropeItem.active = false;
      });
      this.GamePlay.CutSpine.active = true;
    }
  },
});
