    // 
    // if (this.step == 1) {
    //   this.impacts.forEach((impact, index) => {
    //     impact.on("touchend", () => {
    //       this.indexOfMaggot = index;
    //       this.step = 2;
    //       this.vibration();
    //       impact
    //         .getChildByName("Maggot")
    //         .getComponent(cc.Animation)
    //         .play("MaggotRun");
    //       impact.getChildByName("circle").active = false;
    //       this.scheduleOnce(() => {
    //         this.circleStep2.active = true;
    //       }, 1);
    //       this.impacts[0].off(cc.Node.EventType.TOUCH_END);
    //       this.impacts[1].off(cc.Node.EventType.TOUCH_END);
    //       this.registerEvent();
    //     });
    //   });
    // } else if (this.step == 2) {
    //   if (this.indexOfMaggot == 1) {
    //     this.impacts[0].on(cc.Node.EventType.TOUCH_END, () => {
    //       if (this.isClickedStep2) return;

    //       this.maggotStatus[0] = false;
    //       this.step = 3;
    //       this.isClickedStep2 = true;
    //       this.vibration();
    //       this.impacts[0]
    //         .getChildByName("Maggot")
    //         .getComponent(sp.Skeleton)
    //         .setAnimation(0, "action02_cream_scar", false);
    //       this.impacts[0].getChildByName("circle").active = false;
    //       this.impacts[0].off(cc.Node.EventType.TOUCH_END);

    //       this.registerEvent();
    //     });
    //   } else {
    //     this.impacts[1].on(cc.Node.EventType.TOUCH_END, () => {
    //       if (this.isClickedStep2) return;

    //       this.maggotStatus[1] = false;
    //       this.step = 3;
    //       this.isClickedStep2 = true;
    //       this.vibration();
    //       this.impacts[1]
    //         .getChildByName("Maggot")
    //         .getComponent(sp.Skeleton)
    //         .setAnimation(0, "action02_cream_scar", false);
    //       this.impacts[1].getChildByName("circle").active = false;
    //       this.impacts[1].off(cc.Node.EventType.TOUCH_END);

    //       this.registerEvent();
    //     });
    //   }

    //   this.impactStep2.on("touchend", () => {
    //     if (this.isClickedStep2) return;

    //     this.isClickedStep2 = true;
    //     this.step = 3;
    //     this.vibration();
    //     this.circleStep2.active = false;
    //     if (this.indexOfMaggot == 0) {
    //       this.maggots[1]
    //         .getComponent(sp.Skeleton)
    //         .setAnimation(0, "action02_cream_scar", false);
    //         this.maggotStatus[1] = false;

    //       this.registerEvent();
    //     } else {
    //       this.maggots[0]
    //         .getComponent(sp.Skeleton)
    //         .setAnimation(0, "action02_cream_scar", false);
    //         this.maggotStatus[0] = false;

    //       this.registerEvent();
    //     }
    //   });
    // } else {

      // others
      // const maggotObj = this.maggotStatus.reduce((acc, element, index) => {
      //   if (!acc.found && element === false) {
      //     acc.found = true;
      //     acc.index = index;
      //     acc.value = element;
      //   }
      //   return acc;
      // }, { found: false, index: -1, value: undefined });
      // this.impacts[maggotObj.index].on("touchend", () => {
      //   console.log("install");
        
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // });

      // mtg & applovin
      // this.background.on("touchend", () => {
      //   cc.audioEngine.stopAll();
      //   this.node.getComponent("GameController").installHandle();
      // })
    // }