
cc.Class({
    extends: cc.Component,

    properties: {
        camera: cc.Node,
        
    },

    start(){
        
    },

     update (dt) {
        this.node.setPosition(this.camera.getPosition());
     },

   

});
