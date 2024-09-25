const { ccclass, property } = cc._decorator;
@ccclass
export default class AudioManger extends cc.Component {
      // sounds
  @property(cc.AudioClip)
  bgSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  itemSound: cc.AudioClip = null;
  @property(cc.AudioClip)
  dirtySound: cc.AudioClip = null;
}
