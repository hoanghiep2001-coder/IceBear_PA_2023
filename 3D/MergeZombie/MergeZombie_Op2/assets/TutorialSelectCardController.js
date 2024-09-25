
cc.Class({
    extends: cc.Component,

    properties: {
      hand:cc.Node,
      cardDino:cc.Node,
      cardTanker:cc.Node,
      handPositionFrom: cc.Node,
      handPositionTo: cc.Node,
    },

  
    start () {
       this.InitTutorial();
    },

    InitTutorial(){
      cc.Tween.stopAll();
      
      const cardDinoPosition = this.handPositionFrom.getPosition();
      const cardDinoPositionPingPong = cc.v3(cardDinoPosition.x, cardDinoPosition.y - 15, cardDinoPosition.z)

      const cardTankerPosition = this.handPositionTo.getPosition();
      const cardTankerPositionPingPong = cc.v3(cardTankerPosition.x, cardTankerPosition.y - 15, cardTankerPosition.z)

      cc.tween(this.hand).repeatForever(
            cc.tween()
                .to(0, {position: cardDinoPosition, angle: -180})
                .repeat(3, (
                    cc.tween()
                        .to(0.5, {position: cardDinoPositionPingPong})
                        .to(0.5, {position: cardDinoPosition })
                ))
                .to(0, {position: cardTankerPosition})
                .repeat(3, (
                    cc.tween()
                        .to(0.5, {position: cardTankerPositionPingPong})
                        .to(0.5, {position: cardTankerPosition })
                ))
      ).start();
    }
    
});
