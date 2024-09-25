const { Constants } = require("./Data/Constant");

cc.Class({
  extends: cc.Component,

  properties: {
    gameNode: cc.Node,
    bg0: cc.Node,
    bg1: cc.Node,
    bg0: cc.Node,
    bg2: cc.Node,
    characterNode: cc.Node,
    char1: cc.Node,
    char2: cc.Node,
    heart: cc.Node,
    boxNode: cc.Node,
    box1: cc.Button,
    doll1: cc.Node,
    doll3: cc.Node,
    box2: cc.Button,
    doll2: cc.Node,
    doll4: cc.Node,
    tryAgainNode: cc.Node,
    hideMask: cc.Node,
    btnDownload: cc.Button,
    logo: cc.Node,
    text1: cc.Node,
    text2: cc.Node,
    mask: cc.Button,

    bgAudio: cc.AudioClip,
    clickAudio: cc.AudioClip,
    saveAudio: cc.AudioClip,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.realHeight;
    this.realWidth;
    this.step = 0;
    globalThis.that = this;
    this.box1.node.on("click", this.handle, this.box1);
    this.box2.node.on("click", this.handle, this.box2);
    this.btnDownload.node.on("click", this.installHandle, this);    
    this.mask.node.on("click", this.handleIronSourcePlaySound, this);
  },


  start() {
    window.gameReady && window.gameReady();
    
    this.bg1.active = false;
    this.bg2.active = false;
    this.characterNode.active = false;
    this.doll3.active = false;
    this.doll4.active = false;
    this.tryAgainNode.active = false;
    this.text2.active = false;
    this.logo.active = true;
    this.boxNode.active = true;
    this.doll1.active = true;
    this.doll2.active = true;
    // this.mask.node.active = false;
    // this.playAudio(this.bgAudio);
    
  },


  handle() {
    that.playAudio(that.clickAudio);
    that.step++;

    that.handleIronSourcePlaySound();

    if (that.step === 1) {
      that.characterNode.active = true;
      that.logo.active = false;
      that.doll1.active = false;
      that.doll2.active = false;
      that.doll3.active = true;
      that.doll4.active = true;
      that.text1.active = false;
      that.text2.active = true;
      that.mask.node.active = true;
      if (this.name === "box1<Button>") {
        console.log("box1");
        that.char2.active = false;
        // that.bg1.active = true;
      } else if (this.name === "box2<Button>") {
        console.log("box2");
        that.char1.active = false;
        // that.bg2.active = true;
      }

      // mtg & applovin
      // that.mask.node.on("click", that.installHandle, that);
    } else if (that.step === 2) {
      // that.boxNode.active = false;
      // that.text2.active = false;
      // that.bg0.active = false;
      that.onFinish();
      that.installHandle();
      // that.tryAgainF();
      // that.scheduleOnce(() => {
      //   that.tryAgainF();
      // }, 0.5);
      //   if (this.name === "box1<Button>") {
      //   } else if (this.name === "box2<Button>") {
      //   }
    }
  },

  tryAgainF() {
    // this.playAudio(this.saveAudio);
    // this.logo.getComponent(cc.Animation).play("show");
    // this.logo.active = true;
    // this.tryAgainNode.active = true;
    // if (cc.view.getFrameSize().height > cc.view.getFrameSize().width) {
    //   cc.tween(this.characterNode)
    //     .to(0.8, {
    //       position: cc.v2(0, this.realHeight / -2),
    //       scale: 1.2,
    //     })
    //     .start();
    //   this.step++;
    // } else {
    //   cc.tween(this.characterNode)
    //     .to(1, {
    //       position: cc.v2(0, -240),
    //       scale: 1,
    //     })
    //     .start();
    //   this.step++;
    // }
    // this.onFinish();
  },


  update(dt) {
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

    this.bg1.width = this.realWidth;
    this.bg2.width = this.realWidth;

    this.bg1.height = this.realHeight;
    this.bg2.height = this.realHeight;

    // if (this.step === 3) {
    //   this.characterNode.y = this.realHeight / -2;
    // }
  },

  playAudio(audio) {
    if(Constants.ironSource.SoundState) {
      switch (audio) {
        case this.bgAudio:
          this.playBg = cc.audioEngine.play(this.bgAudio, true, 1);
          break;
        case this.clickAudio:
          this.playClick = cc.audioEngine.play(this.clickAudio, false, 1);
          break;
        case this.saveAudio:
          this.saveAudioPlay = cc.audioEngine.play(this.saveAudio, false, 1);
          break;
      }
    }

  },


  handleIronSourcePlaySound() {
    if (Constants.ironSource.isPlayBgSound) {
        return;
    }

    if (Constants.ironSource.SoundState) {
        that.playAudio(that.bgAudio);
    }

    Constants.ironSource.isPlayBgSound = true;
},


 handleMuteSoundIronSource() {
    Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

    if (Constants.ironSource.State) {
        if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
            Constants.ironSource.SoundState = true;
            that.playAudio(that.bgAudio);
        }

        if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
            Constants.ironSource.SoundState = false;
            cc.audioEngine.stopAll();
        }
    }
},


  installHandle: function () {
    cc.audioEngine.stopAll();
    console.log("install");
    Constants.ironSource.isEndGame = true;
    window.gameEnd && window.gameEnd();
    

    //If ad network is tiktok
    if (typeof (playableSDK) != "undefined") {
        window.playableSDK.openAppStore();
        return;
    }

    // If ad network is google ads
    if (typeof (ExitApi) != "undefined") {
        ExitApi.exit();
        return;
    }

    // If ad netwrok is ironsources
    if (typeof (dapi) != "undefined") {
        dapi.openStoreUrl();
        return;
    }

    // If ad network support MRAID 2.0
    if (typeof (mraid) != "undefined") {
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
            mraid.open("https://play.google.com/store/apps/details?id=com.chibidoll.donnastar");
            return;
        }

        if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
            mraid.open("https://itunes.apple.com/us/app/id1586572421?mt=8");
            return;
        }

        mraid.open("https://play.google.com/store/apps/details?id=com.chibidoll.donnastar");
        return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  },

  onFinish() {
    console.log("ket thuc");
    window.gameEnd && window.gameEnd();
  },

  update(dt) {
    this.handleMuteSoundIronSource();
  }
});
