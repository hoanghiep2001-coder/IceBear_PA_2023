cc.Class({
  extends: cc.Component,

  properties: {
    bg0: cc.Node,
    bg1: cc.Node,
    bg2: cc.Node,
    bg3: cc.Node,
    bg4: cc.Node,

    box1: cc.Button,
    box2: cc.Button,
    textChooseCharacter: cc.Node,
    logo: cc.Node,
    doll1: cc.Node,
    doll2: cc.Node,
    text1: cc.Node,
    text2: cc.Node,
    shape1: cc.Node,
    shape2: cc.Node,
    shape3: cc.Node,
    shape4: cc.Node,
    char1: cc.Node,
    char2: cc.Node,
    char3: cc.Node,
    char4: cc.Node,
    btnDownload: cc.Button,
    hideMask: cc.Button,

    bgAudio: cc.AudioClip,
    clickAudio: cc.AudioClip,
    takePhotoAudio: cc.AudioClip,
    isFirstClickDone: false,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.step = 0;
    this.style = 0;
    this.realHeight;
    this.realWidth;
    globalThis.that = this;
    this.box1.node.on("click", this.handle, this.box1);
    this.box2.node.on("click", this.handle, this.box2);
    this.btnDownload.node.on("click", this.installHandle, this);
    // this.hideMask.node.on("click", this.installHandle, this);
  },

  handle() {
    that.step++;
    if(!that.isFirstClickDone) {
      that.playAudio(that.bgAudio);
      that.isFirstClickDone = true;  
    }
    that.playAudio(that.clickAudio);
    if (that.step === 1) {
      that.textChooseCharacter.active = false;
      that.doll1.active = false;
      that.doll2.active = false;
      that.text1.active = false;
      that.text2.active = false;
      if (this.name === "box1<Button>") {
        that.style = 1;
        that.shape1.active = true;
        that.shape2.active = true;
      }

      if (this.name === "box2<Button>") {
        that.style = 2;
        that.shape3.active = true;
        that.shape4.active = true;
      }
    } else if (that.step === 2) {
      that.box1.node.active = false;
      that.box2.node.active = false;
      that.logo.active = false;
      if (this.name === "box1<Button>") {
        if (that.style === 1) {
          that.char1.active = true;
          that.bg1.active = true;
        }

        if (that.style === 2) {
          that.char3.active = true;
          that.bg3.active = true;
        }
      }

      if (this.name === "box2<Button>") {
        console.log("box2");
        if (that.style === 1) {
          that.char2.active = true;
          that.bg2.active = true;
        }

        if (that.style === 2) {
          that.char4.active = true;
          that.bg4.active = true;
        }
      }

      that.scheduleOnce(() => {
        that.tryNode();
      }, 1);
    }
  },

  tryNode() {
    this.playAudio(this.takePhotoAudio);
    this.hideMask.node.active = true;
    this.btnDownload.node.active = true;
    this.logo.active = true;
    this.onFinish();
  },

  start() {
    this.bg0.active = true;
    this.bg1.active = false;
    this.bg2.active = false;
    this.bg3.active = false;
    this.bg4.active = false;

    this.shape1.active = false;
    this.shape2.active = false;
    this.shape3.active = false;
    this.shape4.active = false;
    this.char1.active = false;
    this.char2.active = false;
    this.char3.active = false;
    this.char4.active = false;

    this.btnDownload.node.active = false;
    this.hideMask.node.active = false;
    // this.playAudio(this.bgAudio);

    this.bg0.on(cc.Node.EventType.TOUCH_START, () => {
      if(!this.isFirstClickDone) {
        this.playAudio(this.bgAudio);
        this.isFirstClickDone = true;
      }
    });

    window.gameReady && window.gameReady();
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
  },

  update(dt) {
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.realHeight = 480;
      this.realWidth =
        480 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
      this.char1.y = -59.325;
      this.char2.y = -65.625;
      this.char3.y = -98.46;
      this.char4.y = -86.1;
    } else {
      if (cc.view.getFrameSize().height / cc.view.getFrameSize().width < 1.4) {
        this.realWidth = 370;
      } else {
        this.realWidth = 320;
      }
      this.realHeight =
        this.realWidth *
        (cc.view.getFrameSize().height / cc.view.getFrameSize().width);
      this.char1.y = -59.325 - (this.realHeight - 480) / 2;
      this.char2.y = -65.625 - (this.realHeight - 480) / 2;
      this.char3.y = -98.46 - (this.realHeight - 480) / 2;
      this.char4.y = -86.1 - (this.realHeight - 480) / 2;
    }

    this.bg0.width = this.realWidth;
    this.bg0.height = this.realHeight;

    this.bg1.width = this.realWidth;
    this.bg1.height = this.realHeight;

    this.bg2.width = this.realWidth;
    this.bg2.height = this.realHeight;

    this.bg3.width = this.realWidth;
    this.bg3.height = this.realHeight;

    this.bg4.width = this.realWidth;
    this.bg4.height = this.realHeight;
  },

  playAudio(audio) {
    switch (audio) {
      case this.bgAudio:
        this.playBg = cc.audioEngine.play(this.bgAudio, true, 1);
        break;
      case this.clickAudio:
        this.playClick = cc.audioEngine.play(this.clickAudio, false, 1);
        break;
      case this.takePhotoAudio:
        this.playTakePhoto = cc.audioEngine.play(this.takePhotoAudio, false, 1);
        break;
    }
  },

  installHandle: function () {
    cc.log("installHandle");
    cc.audioEngine.stopAll();
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
      //   mraid.open("https://itunes.apple.com/us/app/id1629383984?mt=8");
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

  //   playAudio(audio) {
  //     switch (audio) {
  //       case this.bgAudio:
  //         this.playBg = cc.audioEngine.play(this.bgAudio, true, 1);
  //         break;
  //       case this.clickAudio:
  //         this.playClick = cc.audioEngine.play(this.clickAudio, false, 1);
  //         break;
  //       case this.takePhotoAudio:
  //         this.playTakePhoto = cc.audioEngine.play(this.takePhotoAudio, false, 1);
  //         break;
  //     }
  //   },
});
