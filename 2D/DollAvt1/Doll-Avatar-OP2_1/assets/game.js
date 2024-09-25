const data = {
  style: "",
  hair: "",
};
cc.Class({
  extends: cc.Component,

  properties: {
    // button
    btnStyle1: cc.Button,
    btnStyle2: cc.Button,
    box1: cc.Button,
    box2: cc.Button,
    box3: cc.Button,
    box4: cc.Button,
    btnPlayNow: cc.Button,
    hideMask: cc.Button,

    //  Node
    txtChooseStyle: cc.Node,
    txtStyle: cc.Node,
    txtChooseHairStyle: cc.Node,
    logo: cc.Node,
    char1: cc.Node,
    char2: cc.Node,
    char3: cc.Node,
    char4: cc.Node,
    bg1: cc.Node,
    bg1l: cc.Node,
    bg1r: cc.Node,
    bg2: cc.Node,
    bg2l: cc.Node,
    bg2r: cc.Node,
    sign1: cc.Node,
    sign2: cc.Node,
    empty: cc.Node,
    hand: cc.Node,

    // audio
    bgAudio: cc.AudioClip,
    clickAudio: cc.AudioClip,
    takePhotoAudio: cc.AudioClip,
  },

  onLoad() {

    this.scheduleOnce(() => {
      this.hand.active = true
    }, 0.5)

    globalThis.that = this;
    this.btnStyle1.node.on("click", this.fChooseStyle, this.btnStyle1);
    this.btnStyle2.node.on("click", this.fChooseStyle, this.btnStyle2);
    this.box1.node.on("click", this.fChooseHair, this.box1);
    this.box2.node.on("click", this.fChooseHair, this.box2);
    this.box3.node.on("click", this.fChooseHair, this.box3);
    this.box4.node.on("click", this.fChooseHair, this.box4);
    this.btnPlayNow.node.on("click", this.installHandle, this);
    this.hideMask.node.on("click", this.installHandle, this);
  },

  fChooseStyle() {
    that.playAudio(that.clickAudio);
    if (this.name === "style1<Button>") {
      data.style = "1";

      that.scheduleOnce(() => {
        that.txtChooseHairStyle.active = true;
        that.box4.node.active = true;
        that.box3.node.active = true;
        that.btnStyle1.node.active = false;
        that.btnStyle2.node.active = false;
      }, 0);
    } else if (this.name === "style2<Button>") {
      data.style = "2";

      that.scheduleOnce(() => {
        that.txtChooseHairStyle.active = true;
        that.box1.node.active = true;
        that.box2.node.active = true;
        that.btnStyle1.node.active = false;
        that.btnStyle2.node.active = false;
      }, 0);
    }

    that.btnStyle1.node.getComponent(cc.Animation).play("fadeOutLeft");
    that.btnStyle2.node.getComponent(cc.Animation).play("fadeOutRight");
    that.txtChooseStyle.getComponent(cc.Animation).play("fadeOutText");
    that.txtStyle.getComponent(cc.Animation).play("fadeOutText");

    // hiep optimize MTG
    that.hand.active = false

    that.empty.on("touchend", () => {
      cc.audioEngine.stopAll();
      that.getComponent("GameController").installHandle();
    })
  },

  fChooseHair() {
  
    that.playAudio(that.clickAudio);
    if (this.name === "box1<Button>") {
      data.hair = "1";
      that.box1.node.getComponent(cc.Animation).play("fadeOutLeft");
      that.box2.node.getComponent(cc.Animation).play("fadeOutRight");
    }

    if (this.name === "box2<Button>") {
      data.hair = "2";
      that.box1.node.getComponent(cc.Animation).play("fadeOutLeft");
      that.box2.node.getComponent(cc.Animation).play("fadeOutRight");
    }

    if (this.name === "box3<Button>") {
      data.hair = "3";
      that.box3.node.getComponent(cc.Animation).play("fadeOutLeft");
      that.box4.node.getComponent(cc.Animation).play("fadeOutRight");
    }

    if (this.name === "box4<Button>") {
      data.hair = "4";
      that.box3.node.getComponent(cc.Animation).play("fadeOutLeft");
      that.box4.node.getComponent(cc.Animation).play("fadeOutRight");
    }

    that.txtChooseHairStyle.getComponent(cc.Animation).play("fadeOutText");

    that.scheduleOnce(() => {
      that.box1.node.active = false;
      that.box2.node.active = false;
      that.box3.node.active = false;
      that.box4.node.active = false;
      that.txtChooseHairStyle.active = false;
      that.logo.getComponent(cc.Animation).play("fadeOutText");
      that.fShowResult();
    }, 0);

    cc.log(data);
  },

  fShowResult() {
    cc.log("this is show result");
    if (data.style === "1" && data.hair === "3") {
      this.char3.active = true;
      this.bg1.active = true;
      this.bg1l.active = true;
      this.bg1r.active = true;
      this.sign2.active = true;
    }

    if (data.style === "1" && data.hair === "4") {
      this.char4.active = true;
      this.bg1.active = true;
      this.bg1l.active = true;
      this.bg1r.active = true;
      this.sign1.active = true;
    }

    if (data.style === "2" && data.hair === "1") {
      this.char1.active = true;
      this.bg2.active = true;
      this.bg2l.active = true;
      this.bg2r.active = true;
      this.sign2.active = true;
    }

    if (data.style === "2" && data.hair === "2") {
      this.char2.active = true;
      this.bg2.active = true;
      this.bg2l.active = true;
      this.bg2r.active = true;
      this.sign1.active = true;
    }

    this.tryAgain();
  },

  tryAgain() {
    cc.log("this is tryAgain");
    this.scheduleOnce(() => {
      this.playAudio(this.takePhotoAudio);
      this.hideMask.node.active = true;
      this.btnPlayNow.node.active = true;
      this.logo.getComponent(cc.Animation).play("showLogo");
      this.onFinish();
    }, 1.5);
  },

  start() {
    this.txtChooseHairStyle.active = false;
    this.box1.node.active = false;
    this.box2.node.active = false;
    this.box3.node.active = false;
    this.box4.node.active = false;
    this.char1.active = false;
    this.char2.active = false;
    this.char3.active = false;
    this.char4.active = false;
    this.bg1.active = false;
    this.bg1l.active = false;
    this.bg1r.active = false;

    this.sign1.active = false;
    this.sign2.active = false;

    this.bg2.active = false;
    // console.log(this.bg2);
    this.bg2l.active = false;
    this.bg2r.active = false;
    this.btnPlayNow.node.active = false;
    this.hideMask.node.active = false;
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
    if (
      cc.view.getFrameSize().width === 375 &&
      cc.view.getFrameSize().height === 812
    ) {
      // cc.log("ipx");
      this.btnStyle1.node.scale = 0.2;
      this.btnStyle2.node.scale = 0.2;
      this.box1.node.scale = 0.2;
      this.box2.node.scale = 0.2;
      this.box3.node.scale = 0.2;
      this.box4.node.scale = 0.2;
      this.char1.scale = 0.2;
      this.char2.scale = 0.23;
    } else {
      this.btnStyle1.node.scale = 0.25;
      this.btnStyle2.node.scale = 0.25;
      this.box1.node.scale = 0.25;
      this.box2.node.scale = 0.25;
      this.box3.node.scale = 0.25;
      this.box4.node.scale = 0.25;
      this.char1.scale = 0.25;
      this.char2.scale = 0.28;
    }

    if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
      // ngang
      this.btnStyle1.node.scale = 0.28;
      this.btnStyle2.node.scale = 0.28;

      this.box1.node.scale = 0.28;
      this.box2.node.scale = 0.28;
      this.box3.node.scale = 0.28;
      this.box4.node.scale = 0.28;

      this.txtChooseHairStyle.scale = 0.4;
      this.txtChooseStyle.scale = 0.4;
      this.txtStyle.scale = 0.4;

      this.char1.scale = 0.3;
      this.char2.scale = 0.33;
      this.char3.scale = 0.39;
      this.char4.scale = 0.39;
    } else {
      // doc
      this.btnStyle1.node.scale = 0.25;
      this.btnStyle2.node.scale = 0.25;

      this.box1.node.scale = 0.25;
      this.box2.node.scale = 0.25;
      this.box3.node.scale = 0.25;
      this.box4.node.scale = 0.25;

      this.txtChooseHairStyle.scale = 0.3;
      this.txtChooseStyle.scale = 0.3;
      this.txtStyle.scale = 0.3;

      this.char1.scale = 0.25;
      this.char2.scale = 0.28;
      this.char3.scale = 0.34;
      this.char4.scale = 0.34;
    }
  },
});
