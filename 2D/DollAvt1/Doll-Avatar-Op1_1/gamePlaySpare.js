const a = {
  gender: "",
  style: "",
};

cc.Class({
  extends: cc.Component,

  properties: {
    // node
    gamePlay: cc.Node,
    genderNode: cc.Node,
    styleNode: cc.Node,
    showResult: cc.Node,
    logo: cc.Node,

    // text
    textChooseAvatar: cc.Node,
    textChooseStyle: cc.Node,

    // btn
    // ------
    btnFemale: cc.Button,
    btnMale: cc.Button,
    btnStart: cc.Button,
    bgMask: cc.Button,
    boxGothic: cc.Button,
    boxAnime: cc.Button,

    // male
    bgMale: cc.Node,
    maleAni: cc.Node,
    maleGothic: cc.Node,
    // Female
    bgFemale: cc.Node,
    femaleAni: cc.Node,
    femaleGothic: cc.Node,

    // audio
    bgAudio: cc.AudioClip,
    clickAudio: cc.AudioClip,
    takePhotoAudio: cc.AudioClip,
  },

  onLoad() {
    // listen event click
    this.btnFemale.node.on("click", this.pickFemale, this);
    this.btnMale.node.on("click", this.pickMale, this);

    this.boxGothic.node.on("click", this.pickGothic, this);
    this.boxAnime.node.on("click", this.pickAnime, this);
    this.btnStart.node.on("click", this.installHandle, this);
    this.bgMask.node.on("click", this.installHandle, this);
  },

  test() {
    cc.log("day la test");
  },

  pickFemale() {
    this.playAudio(this.clickAudio);
    a.gender = "female";
    cc.log(a);
    this.boxGothic.node.active = true;
    this.boxAnime.node.active = true;
    this.textChooseAvatar.active = false;
    this.textChooseStyle.active = true;
    this.genderNode.active = false;
    this.styleNode.active = true;
  },

  pickMale() {
    this.playAudio(this.clickAudio);
    a.gender = "male";
    cc.log(a);
    this.boxGothic.node.active = true;
    this.boxAnime.node.active = true;
    this.textChooseAvatar.active = false;
    this.textChooseStyle.active = true;
    this.genderNode.active = false;
    this.styleNode.active = true;
  },

  pickAnime() {
    this.playAudio(this.clickAudio);
    this.styleNode.active = false;
    a.style = "anime";
    cc.log(a);
    this.showGame();
  },

  pickGothic() {
    this.playAudio(this.clickAudio);
    this.styleNode.active = false;
    a.style = "gothic";
    cc.log(a);
    this.showGame();
  },

  showGame() {
    cc.log("show result");
    this.showResult.active = true;
    if (a.gender == "male" && a.style == "anime") {
      this.bgMale.active = true;
      this.maleAni.active = true;
    }
    if (a.gender == "male" && a.style == "gothic") {
      this.bgMale.active = true;
      this.maleGothic.active = true;
    }
    if (a.gender == "female" && a.style == "anime") {
      this.bgFemale.active = true;
      this.femaleAni.active = true;
    }
    if (a.gender == "female" && a.style == "gothic") {
      this.bgFemale.active = true;
      this.femaleGothic.active = true;
    }
    this.scheduleOnce(() => {
      this.playAudio(this.takePhotoAudio);
    }, 0.5);
    this.logo.getComponent(cc.Animation).play("scaleLogo");
    this.bgMask.node.active = true;
    this.btnStart.node.active = true;
    this.onFinish();
  },

  start() {
    this.textChooseStyle.active = false;
    this.boxGothic.node.active = false;
    this.boxAnime.node.active = false;
    this.styleNode.active = false;
    this.showResult.active = false;
    this.maleGothic.active = false;
    this.maleAni.active = false;
    this.femaleAni.active = false;
    this.femaleGothic.active = false;
    this.bgFemale.active = false;
    this.bgMale.active = false;
    this.bgMask.node.active = false;
    this.btnStart.node.active = false;
    this.playAudio(this.bgAudio);
    window.gameReady && window.gameReady();
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

  update(dt) {
    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      // horizontal
      this.bgFemale.width = 1024;
      this.bgFemale.height = 1024;
      this.bgMale.width = 1024;
      this.bgMale.height = 1024;
    } else {
      // vertical
      this.bgFemale.width = 500;
      this.bgFemale.height = 800;
      this.bgMale.width = 500;
      this.bgMale.height = 800;
    }
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
  },

  installHandle: function () {
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
          "https://play.google.com/store/apps/details?id=com.animedoll.avatarmaker"
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
        "https://play.google.com/store/apps/details?id=com.animedoll.avatarmaker"
      );
      return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  },
});
