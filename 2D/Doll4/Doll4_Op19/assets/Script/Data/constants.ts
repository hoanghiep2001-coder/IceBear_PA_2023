
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


enum Responsive {
    HORIZONTAL_IPX = "horizontal_IPX",
    HORIZONTAL_TABLET = "horizontal_Tablet",
    VERTICAL_IPX = "vertical_IPX",
    VERTICAL_MOBILE = "vertical_Mobile",
}


enum SoundTrack {
    bgSound_1 = "bgSound_1",
    bgSound_2 = "bgSound_2",
    clickSound = "clickSound",
    GirlSound_1 = "GirlSound_1",
    GirlSound_2 = "GirlSound_2",
    CashSound = "CashSound",
    BrushSound = "BrushSound",
    ManLaughSound = "ManLaughSound",
    ManSound_1 = "ManSound_1",
    ManSound_2 = "ManSound_2",
    ManSound_3 = "ManSound_3",
    BlinkSound = "BlinkSound",
}


export class Constants {

    // state    
    static isClickGameStart: boolean = false;
    static isRotate: boolean = false;
    static isCanClick: boolean = false;
    static isClickBtnMakeUp: boolean = false;

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
