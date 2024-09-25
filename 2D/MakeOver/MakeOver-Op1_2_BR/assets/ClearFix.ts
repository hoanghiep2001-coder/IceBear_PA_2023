const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // hiep be
    @property(cc.Boolean)
    isRotate: boolean = false;

    @property(cc.Node)
    character: cc.Node = null;

    @property(cc.Node)
    soapFace: cc.Node = null;

    // @property(cc.Node)
    // hand: cc.Node = null;
    start () {
        if(cc.winSize.width > cc.winSize.height) {
            this.isRotate = true;
            this.soapFace.y = 40
        } else {
            this.isRotate = false;
            this.soapFace.y = -10
        }

        this.scheduleOnce(() => {
            if(this.isRotate) {
                this.character.getComponent(cc.Animation).play("CharacterZoomWithRotate");   
            } else {
                this.character.getComponent(cc.Animation).play("CharacterZoomNoRotate");  
            }
        }, 3.5)

        // this.node.on(cc.Node.EventType.TOUCH_START, () => {
        //    this.hand.active = false
        // });
    }

}
