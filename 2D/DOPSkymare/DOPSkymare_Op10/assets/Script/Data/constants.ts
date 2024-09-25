
const { ccclass, property } = cc._decorator;

enum Event {
    touchStart = "touchstart",
    touchMove = "touchmove",
    touchEnd = "touchend",
    touchCancel = "touchcancel"
}


const IronSource = {
    // ironsource 
    SoundState: true,
    State: 1,
    isEndGame: false,
    isPlayBgSound: false,
}


const Responsive = {
    calculated: 0,
    currentDevice: "",
}


enum SoundTrack {
    bgSound = "bgSound",
    drawSound = "drawSound",
    successSound = "successSound",
    moveSound = "moveSound",
}


export class Constants {

    // state    
    static currentLv: number = 1;
    static isClickGameStart: boolean = false;
    static isRotate: boolean = false;
    static isCanTouch: boolean = false;
    static isDoneLevel1: boolean = false;
    static isDoneLevel2: boolean = false;
    static drawSoundState: number = null;

    static step: number = 1;


    // event
    static Event: typeof Event = Event;


    // SoundTrack
    static SoundTrack: typeof SoundTrack = SoundTrack;


    // ironSource
    static ironSource: typeof IronSource = IronSource;


    // Responsive
    static Responsive: typeof Responsive = Responsive;

}
