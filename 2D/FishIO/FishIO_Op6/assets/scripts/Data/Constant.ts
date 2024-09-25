import { _decorator, Component, Node} from 'cc';
const { ccclass, property } = _decorator;

const Event = {
    touchStart: "touchstart",
    touchMove: "touchmove",
    touchEnd: "touchend",
    touchCancel: "touchcancel",
}

 
const IronSource = {
    SoundState: true,
    State: 1,
    isEndGame: false,
    isPlayBgSound: false,
}


const Responsive = {
    HORIZONTAL_IPX: "horizontal_IPX",
    HORIZONTAL_TABLET: "horizontal_Tablet",
    VERTICAL_IPX: "vertical_IPX",
    VERTICAL_MOBILE: "vertical_Mobile",
}


enum SoundTrack {
    bgSound = "bgSound",
    videoSound = "videoSound",
    eatSound = "eatSound",
    dieSound = "dieSound",
    whooseSound = "whooseSound"
}


export class Constants {

    // state    
    static isPlayGame = false;
    static isReplay = false;
    static forceReplay = false;
    static flagReplay = false;
    static isPlaySound = false;
    static isRotate = false;
    static isCompleteVideo = false;
    static toStore = false;
    static isTouching = false;
    static score = 20;

    // event
    static Event = Event;


    // soundTrack
    static SoundTrack: typeof SoundTrack = SoundTrack;


    // ironSource
    static ironSource = IronSource;


    // Responsive
    static Responsive = Responsive;
}
