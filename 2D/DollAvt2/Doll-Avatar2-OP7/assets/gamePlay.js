cc.Class({
  extends: cc.Component,

  properties: {
    bg0: cc.Node,
    doll: cc.Node,
    bgAudio: cc.AudioClip,
    hideMask: cc.Button,
    word: cc.Node,

    isDoneFirstClick: false,
  },


  start() {
    this.realHeight;
    this.realWidth;
    this.cloneY;
    this.dollWidth = this.doll.height * this.doll.scale;
    this.hideMask.node.on("click", this.installHandle, this);

    this.cloneY = this.doll.y;
    window.gameReady && window.gameReady();

    // this.bg0.on(cc.Node.EventType.TOUCH_START, () => {
    //   if(!this.isDoneFirstClick) {
    //     this.playAudio(this.bgAudio);
    //   }
    // });
  },

  update(dt) {
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.doll.scale = 0.45;
      this.doll.y = this.cloneY;
      this.realHeight = 480;
      this.word.position = cc.v2(-158, 170);
      this.word.angle = 0;
      this.realWidth =
        480 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
    } else {
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this.realWidth = 370;
      } else {
        this.realWidth = 320;
      }
      this.realHeight =
        this.realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);
      this.doll.scale = 0.4;
      this.doll.y = this.cloneY - (this.realHeight - 480) / 2;
      this.word.position = cc.v2(12, 188);
      this.word.angle = -27;
      // let newY =
      //   this.dollWidth / 2 -
      //   (this.realHeight / 2 - (this.realHeight / 480) * 96.78);
    }
    this.bg0.width = this.realWidth + 130;
    this.bg0.height = this.realHeight;
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
  },

  playAudio(audio) {
    switch (audio) {
      case this.bgAudio:
        this.playBg = cc.audioEngine.play(this.bgAudio, true, 1);
        break;
    }
  },

  installHandle: function () {
    cc.audioEngine.stopAll();
    this.onFinish();
    cc.log("installHandle");
    //If ad network is tiktok
    if (typeof playableSDK != "undefined") {
      window.playableSDK.openAppStore();
      return;
    }

    // If ad network is google ads
    if (typeof ExitApi != "undefined") {
      ExitApi.exit();
      return;
    }

    // If ad netwrok is ironsources
    if (typeof dapi != "undefined") {
      dapi.openStoreUrl();
      return;
    }

    // If ad network support MRAID 2.0
    if (typeof mraid != "undefined") {
      if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
        mraid.open(
          "https://play.google.com/store/apps/details?id=com.an.dollavatar.anime"
        );
        return;
      }

      // if (
      //   cc.sys.os == cc.sys.OS_IOS ||
      //   cc.sys.os == cc.sys.IPHONE ||
      //   cc.sys.os == cc.sys.IPAD
      // ) {
      //   mraid.open("https://itunes.apple.com/us/app/id1662447489?mt=8");
      //   return;
      // }

      mraid.open(
        "https://play.google.com/store/apps/details?id=com.an.dollavatar.anime"
      );
      return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  },
});
