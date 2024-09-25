const {ccclass, property} = cc._decorator;

@ccclass
export default class BgScale extends cc.Component {

    protected start(): void {
      
    }

    private setFitSize(): void {
      let bgWidth = this.node.width;
      let screen_width = cc.winSize.width;
      let screen_height = cc.winSize.height;
      if (screen_width != bgWidth) {
        this.node.width = screen_width;
        this.node.height = screen_height;
      }
  
      if (screen_width < screen_height) {
        this.node.width = screen_width + 100;
      }
    }

    protected update(dt: number): void {
      this.setFitSize();
    }

}
