
import { _decorator, Component, Node, VideoPlayer } from 'cc';
import { Constants } from '../Data/Constant';
const { ccclass, property } = _decorator;
 
@ccclass('VideoController')
export class VideoController extends Component {

    @property(VideoPlayer)
    Video: VideoPlayer = null;


    protected start(): void {
        if(Constants.forceReplay) {
            this.Video.node.active = false;
            return;
        };
        this.Video.node.on(VideoPlayer.EventType.READY_TO_PLAY, this.initVideo, this);
        this.Video.node.on(VideoPlayer.EventType.COMPLETED, this.onCompleteVideo, this);
    }


    private initVideo(): void {
        this.Video.volume = 0;
        this.Video.play();
    }

    private onCompleteVideo(): void {
        Constants.isCompleteVideo = true;
        this.Video.node.active = false;
    }
}

