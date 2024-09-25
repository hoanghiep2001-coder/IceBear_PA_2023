
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    game_Mobile: cc.Node = null;
    @property(cc.Node)
    game_Tablet: cc.Node = null;

    protected onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        if(cc.winSize.width > cc.winSize.height) {
            this.game_Tablet.active = true;
        } else {
            this.game_Mobile.active = true;
        }
    }
}
