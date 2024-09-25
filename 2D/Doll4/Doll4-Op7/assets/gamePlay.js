cc.Class({
  extends: cc.Component,

  properties: {
    // node
    faceClean: cc.Node,
    faceMask: cc.Node,
    mouthSad: cc.Node,
    faceBeauty: cc.Node,
    boxChat: cc.Node,
    tootMakeUp: cc.Node,
    hand: cc.Node,
    lip02: cc.Node,
    lip03: cc.Node,
    logo: cc.Node,
    background: cc.Node,
    // button
    hideMask: cc.Button,
    btnItemBox1: cc.Button,
    btnItemBox2: cc.Button,
    btnItemBox3: cc.Button,
    btnItemBox4: cc.Button,
    btnItemBox5: cc.Button,
    // text
    textHelpHer: cc.Node,
    // audio
    bg: cc.AudioClip,
    click: cc.AudioClip,
    complete: cc.AudioClip,
    winner: cc.AudioClip,

    // state
    isFirstClick: false,
  },

  onLoad() {
    this.step = 0;
    this.doneStepTwo = false;
    this.doneStepThree = false;
    this.makeUp = this.tootMakeUp.getComponent(sp.Skeleton);
    this.btnItemBox1.node.on("click", this.brush, this);
    this.btnItemBox2.node.on("click", this.lip2, this);
    this.btnItemBox3.node.on("click", this.lip3, this);
    this.btnItemBox4.node.on("click", this.installHandle, this);
    this.btnItemBox5.node.on("click", this.installHandle, this);
    this.hideMask.node.on("click", this.installHandle, this);

    // ironsource
    // this.background.on("touchend", () => {
    //   if(this.isFirstClick) {
    //     return
    //   }

    //   this.isFirstClick = true;
    //   this.playAudio(this.bg);
    // });
  },

  brush() {
    if(this.step >= 1) {
      return
    }

    cc.log("brush face"); 
    this.playAudio(this.click);
    this.step = 1;
    this.makeUp.node.active = true;
    this.makeUp.node.scale = 0.38;
    this.makeUp.node.position = cc.v2(-6, -147);
    this.makeUp.animation = "clean";
    this.hand.active = false;

    // if(this.isFirstClick) {
    //   return
    // }

    // this.isFirstClick = true;
    // this.playAudio(this.bg);
  },

  lip2() {
    if(this.doneStepTwo) {
      return;
    }

    this.doneStepTwo = true;
    this.playAudio(this.click);
    cc.log("lip 2");
    this.makeUp.node.active = true;
    this.makeUp.animation = "lipstick01";
    this.makeUp.node.scale = 0.18;
    this.makeUp.node.position = cc.v2(-20, -115);

    this.btnItemBox3.node.off("click");
  },

  lip3() {
    if(this.doneStepThree) {
      return;
    }

    this.doneStepThree = true;
    this.playAudio(this.click);
    cc.log("lip 3");
    this.makeUp.node.active = true;
    this.makeUp.animation = "lipstick02";
    this.makeUp.node.scale = 0.18;
    this.makeUp.node.position = cc.v2(-20, -115);

    this.btnItemBox2.node.off("click");
  },

  start() {
    this.faceBeauty.active = false;
    this.makeUp.node.active = false;
    this.btnItemBox2.node.active = false;
    this.btnItemBox3.node.active = false;
    this.btnItemBox4.node.active = false;
    this.btnItemBox5.node.active = false;
    this.lip02.active = false;
    this.lip03.active = false;
    this.logo.active = false;
    this.hand.getComponent(cc.Animation).play("hand");
    this.hideMask.node.active = false;

    this.playAudio(this.bg);

    window.gameReady && window.gameReady();
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
  },

  installHandle: function () {
    cc.audioEngine.stopAll();
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
          "https://play.google.com/store/apps/details?id=com.makeupbattle.dressup"
        );
        return;
      }

      if (
        cc.sys.os == cc.sys.OS_IOS ||
        cc.sys.os == cc.sys.IPHONE ||
        cc.sys.os == cc.sys.IPAD
      ) {
        //mraid.open("https://itunes.apple.com/us/com.birdsort.colorpuzzle?mt=8");
        mraid.open("https://itunes.apple.com/us/app/id1627374569?mt=8");
        return;
      }

      mraid.open(
        "https://play.google.com/store/apps/details?id=com.makeupbattle.dressup"
      );
      return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  },

  update(dt) {
    this.makeUp.setCompleteListener(() => {
      if (this.step === 1) {
        this.makeUp.node.active = false;
        this.btnItemBox1.node.active = false;
        this.faceMask.active = false;
        this.faceBeauty.active = true;
        this.btnItemBox1.node.active = false;
        this.btnItemBox2.node.active = true;
        this.btnItemBox3.node.active = true;
        this.playAudio(this.complete);
        cc.log("brush done");
      }

      if (this.doneStepTwo) {
        this.makeUp.node.active = false;
        this.btnItemBox2.node.active = false;
        this.btnItemBox3.node.active = false;
        this.mouthSad.active = false;
        this.lip02.active = true;
        this.textHelpHer.active = false;
        this.boxChat.active = false;
        this.logo.active = true;
        this.playAudio(this.winner);
        this.btnItemBox4.node.active = true;
        this.btnItemBox5.node.active = true;


        this.hideMask.node.active = true;


        this.onFinish();
        cc.log("lips02 done");
      }

      if (this.doneStepThree) {
        this.makeUp.node.active = false;
        this.btnItemBox2.node.active = false;
        this.btnItemBox3.node.active = false;
        this.mouthSad.active = false;
        this.lip03.active = true;
        this.textHelpHer.active = false;
        this.boxChat.active = false;
        this.logo.active = true;
        this.btnItemBox4.node.active = true;
        this.btnItemBox5.node.active = true;


        this.hideMask.node.active = true;


        this.playAudio(this.winner);
        this.onFinish();
        cc.log("lips03 done");
      }
    });
  },

  playAudio(audio) {
    switch (audio) {
      case this.bg:
        this.playBg = cc.audioEngine.play(this.bg, true, 1);
        break;
      case this.click:
        this.playClick = cc.audioEngine.play(this.click, false, 1);
        break;
      case this.complete:
        this.playComplete = cc.audioEngine.play(this.complete, false, 1);
        break;
      case this.winner:
        this.playDrawn = cc.audioEngine.play(this.winner, false, 1);
        break;
    }
  },
});
