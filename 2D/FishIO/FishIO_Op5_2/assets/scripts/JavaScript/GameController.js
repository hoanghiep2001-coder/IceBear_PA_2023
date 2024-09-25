const { Constants } = require("../Data/Constant");

cc.Class({
  extends: cc.Component,

  properties: {
    isStartGame: false,
    isNoIntro: false,

    //audio
    audioClick: cc.AudioClip,
    sharkSound: cc.AudioClip,
    whooseSound: cc.AudioClip,
    transformSound: cc.AudioClip,
    audioAtk: cc.AudioClip,
    audioUpgrade: cc.AudioClip,
    audioWarning: cc.AudioClip,
    audioBgMusic: cc.AudioClip,
    audioEat: cc.AudioClip,
    audioBossAtk: cc.AudioClip,
  },

  onLoad() {},

  start() {
    window.gameReady && window.gameReady();

    // if (this.isNoIntro) {
    //   if (!Constants.isPlaySound) {
    //     cc.audioEngine.play(this.audioBgMusic, true, 1);
    //   }

    //   Constants.isPlaySound = true;
    // } else {
    //   if (!Constants.isPlaySound) {
    //     cc.audioEngine.play(this.audioBgMusic, true, 1);
    //   }
    //   Constants.isPlaySound = true;
    //   this.scheduleOnce(() => {
    //     cc.audioEngine.play(this.sharkSound, false, 0.6);
    //   }, 0.5);

    //   this.scheduleOnce(() => {
    //     cc.audioEngine.play(this.whooseSound, false, 1);
    //   }, 2.5);
    // }

    this.scheduleOnce(() => {
      this.isStartGame = true;
    }, 1);
  },

  handleIronSourcePlaySound() {
    if (Constants.ironSource.isPlayBgSound) {
      return;
    }

    if (Constants.ironSource.SoundState) {
      cc.audioEngine.play(this.audioBgMusic, true, 1);
    }

    Constants.ironSource.isPlayBgSound = true;
  },

  handleMuteSoundIronSource() {
    Constants.ironSource.State = parseInt(
      localStorage.getItem("cocosSoundState"),
      10
    );

    if (Constants.ironSource.State) {
      if (
        Constants.ironSource.State === 1 &&
        !Constants.ironSource.SoundState &&
        !Constants.ironSource.isEndGame
      ) {
        Constants.ironSource.SoundState = true;
        cc.audioEngine.play(this.audioBgMusic, true, 1);
      }

      if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
        Constants.ironSource.SoundState = false;
        cc.audioEngine.stopAll();
      }
    }
  },

  onFinish() {
    window.gameEnd && window.gameEnd();
  },

  playAudio(audio) {
    if (Constants.ironSource.SoundState) {
      if (audio === this.audioClick) {
        cc.audioEngine.play(this.audioClick, false, 1);
      } else if (audio === this.audioAtk) {
        cc.audioEngine.play(this.audioAtk, false, 0.5);
      } else if (audio === this.audioUpgrade) {
        cc.audioEngine.play(this.audioUpgrade, false, 0.5);
      } else if (audio === this.audioWarning) {
        cc.audioEngine.play(this.audioWarning, false, 0.5);
      } else if (audio === this.audioBgMusic) {
        cc.audioEngine.play(this.audioBgMusic, true, 1);
      } else if (audio === this.audioEat) {
        cc.audioEngine.play(this.audioEat, false, 1);
      } else if (audio === this.audioBossAtk) {
        cc.audioEngine.play(this.audioBossAtk, false, 0.5);
      }
    }
  },

  stopAudio() {
    cc.audioEngine.stopAll();
  },

  installHandle() {
    console.log("install");
    cc.audioEngine.stopAll();
    Constants.ironSource.isEndGame = true;
    window.gameEnd && window.gameEnd();
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
          "https://play.google.com/store/apps/details?id=com.fishio.hungryfish"
        );
        return;
      }

      if (
        cc.sys.os == cc.sys.OS_IOS ||
        cc.sys.os == cc.sys.IPHONE ||
        cc.sys.os == cc.sys.IPAD
      ) {
        mraid.open("https://itunes.apple.com/us/app/id6445980017?mt=8");
        return;
      }

      mraid.open(
        "https://play.google.com/store/apps/details?id=com.fishio.hungryfish"
      );
      return;
    }
    // If ad network is mindwork. window alway avaiable so skip undefined check
    window.install && window.install();
  },

  update() {
    this.handleMuteSoundIronSource();
  },
});
