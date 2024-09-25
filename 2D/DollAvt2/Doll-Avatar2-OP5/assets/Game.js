const data = {
  hair: "",
  outfit: "",
};

cc.Class({
  extends: cc.Component,

  properties: {
    character: cc.Node,
    baseWithHair: cc.Node,
    baseNoHair: cc.Node,
    baseNude: cc.Node,
    bHair1: cc.Node,
    bHair2: cc.Node,
    bHair3: cc.Node,
    bHair4: cc.Node,
    bg01: cc.Node,
    bg02: cc.Node,
    bg03: cc.Node,
    bg04: cc.Node,

    fHair1: cc.Node,
    fHair2: cc.Node,
    fHair3: cc.Node,
    fHair4: cc.Node,

    btn: cc.Node,
    btn1: cc.Button,
    btn2: cc.Button,
    btn3: cc.Button,
    btn4: cc.Button,
    hideMask: cc.Button,
    tryAgainNode: cc.Node,
    download: cc.Button,

    outFit1: cc.Node,
    outFit2: cc.Node,
    outFit3: cc.Node,
    outFit4: cc.Node,

    logo0: cc.Node,
    hand: cc.Node,

    bgAudio: cc.AudioClip,
    clickAudio: cc.AudioClip,
    takePhotoAudio: cc.AudioClip,

    // ------ fix IS
    bg0: cc.Node,
    isDoneFirstClick: false,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.realHeight;
    this.realWidth;
    this.step = 0;
    globalThis.that = this;

    this.btn1.node.on("click", this.chooseHair, this.btn1);
    this.btn2.node.on("click", this.chooseHair, this.btn2);
    this.btn3.node.on("click", this.chooseHair, this.btn3);
    this.btn4.node.on("click", this.chooseHair, this.btn4);

    this.download.node.on("click", this.installHandle, this);
    this.hideMask.node.on("click", this.installHandle, this);

    this.bg0.on(cc.Node.EventType.TOUCH_START, () => {
      if(!this.isDoneFirstClick) {
        this.playAudio(this.bgAudio);
        this.isDoneFirstClick = true;
      }
    }); 

  },

  chooseHair() {
    if(!that.isDoneFirstClick) {
      that.playAudio(that.bgAudio);
      that.isDoneFirstClick = true;
    }

    that.playAudio(that.clickAudio);
    that.step++;
    if (that.step === 1) {
      if (this.name === "box1<Button>") {
        data.hair = "1";
      }
      if (this.name === "box2<Button>") {
        data.hair = "2";
      }
      if (this.name === "box3<Button>") {
        data.hair = "3";
      }
      if (this.name === "box4<Button>") {
        data.hair = "4";
      }
      that.hand.active = false;
      that.baseNoHair.active = true;
      that.render();
      that.btn.getComponent(cc.Animation).play("Btn2");
    }

    if (that.step === 2) {
      that.baseNoHair.active = false;
      that.baseNude.active = true;
      if (this.name === "box1<Button>") {
        data.outfit = "1";
      }
      if (this.name === "box2<Button>") {
        data.outfit = "2";
      }
      if (this.name === "box3<Button>") {
        data.outfit = "3";
      }
      if (this.name === "box4<Button>") {
        data.outfit = "4";
      }
      that.render();
      that.btn.getComponent(cc.Animation).play("Btn3");
      that.step++;
      that.scheduleOnce(() => {
        that.character.getComponent(cc.Animation).play("CharacterShow");
        that.tryAgain();
      }, 0.5);
    }
    that.baseWithHair.active = false;
  },

  render() {
    this.reset();
    switch (data.hair) {
      case "1":
        this.fHair1.active = true;
        this.bHair1.active = true;
        break;

      case "2":
        this.fHair2.active = true;
        this.bHair2.active = true;
        break;
      case "3":
        this.fHair3.active = true;
        this.bHair3.active = true;
        break;
      case "4":
        this.fHair4.active = true;
        this.bHair4.active = true;
        break;
      default:
        this.fHair1.active = false;
        this.fHair2.active = false;
        this.fHair3.active = false;
        this.fHair4.active = false;
        this.bHair1.active = false;
        this.bHair2.active = false;
        this.bHair3.active = false;
        this.bHair4.active = false;
        break;
    }

    switch (data.outfit) {
      case "1":
        this.outFit1.active = true;
        this.bg01.active = true;
        break;

      case "2":
        this.outFit2.active = true;
        this.bg02.active = true;
        break;
      case "3":
        this.outFit3.active = true;
        this.bg03.active = true;
        break;
      case "4":
        this.outFit4.active = true;
        this.bg04.active = true;
        break;
      default:
        this.outFit1.active = false;
        this.outFit2.active = false;
        this.outFit3.active = false;
        this.outFit4.active = false;
        break;
    }
  },

  reset() {
    this.bHair1.active = false;
    this.bHair2.active = false;
    this.bHair3.active = false;
    this.bHair4.active = false;
    this.fHair1.active = false;
    this.fHair2.active = false;
    this.fHair3.active = false;
    this.fHair4.active = false;
    this.outFit1.active = false;
    this.outFit2.active = false;
    this.outFit3.active = false;
    this.outFit4.active = false;
  },

  tryAgain() {
    this.logo0.active = false;
    this.playAudio(this.takePhotoAudio);
    if (cc.view.getFrameSize().height > cc.view.getFrameSize().width) {
      cc.tween(this.character)
        .to(1, {
          position: cc.v2(0, 0 - (this.realHeight - 480) / 2),
          scale: 1,
        })
        .start();
      this.step++;
    } else {
      cc.tween(this.character)
        .to(1, {
          position: cc.v2(0, 0),
          scale: 1,
        })
        .start();
      this.step++;
    }
    this.tryAgainNode.active = true;
    this.onFinish();
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

  start() {
    // this.playAudio(this.bgAudio);
    this.baseWithHair.active = true;
    this.baseNoHair.active = false;
    this.bg01.active = false;
    this.bg02.active = false;
    this.bg03.active = false;
    this.bg04.active = false;
    this.tryAgainNode.active = false;
    this.logo0.active = true;
    this.baseNude.active = false;
    this.reset();
    window.gameReady && window.gameReady();
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
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
  update(dt) {
    if (this.step === 3) {
      if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
        // horizontal
        this.realHeight = 480;
        this.realWidth =
          480 * (cc.view.getFrameSize().width / cc.view.getFrameSize().height);
      } else {
        this.realWidth = 320;
        this.realHeight =
          320 * (cc.view.getFrameSize().height / cc.view.getFrameSize().width);
      }
    }
    if (this.step === 4) {
      if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
        // horizontal
        this.character.y = 0;
      } else {
        this.character.y = (this.realHeight - 480) / -2;
      }
    }

    console.log(this.realWidth);

    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      this.realHeight = 480;
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
    }

    this.bg01.width = this.realWidth;
    this.bg01.height = this.realHeight;

    this.bg02.width = this.realWidth;
    this.bg02.height = this.realHeight;

    this.bg03.width = this.realWidth;
    this.bg03.height = this.realHeight;

    this.bg04.width = this.realWidth;
    this.bg04.height = this.realHeight;
  },
});
