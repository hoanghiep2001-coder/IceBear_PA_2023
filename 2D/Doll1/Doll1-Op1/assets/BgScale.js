
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    
    // onLoad () {},

    start () {
       
    },

     update (dt) {
        this.setFitSize();
     },

     setFitSize(){
        let bgWidth = this.node.width;
       
        let screen_width  = cc.winSize.width;
        let screen_height  = cc.winSize.height;
        if((screen_width+10) != bgWidth){
            this.node.width = screen_width + 10;
            this.node.height = screen_height + 10;
        }
     },
});
