
const { ccclass, property } = cc._decorator;

const Event = {
    touchStart: "touchstart",
    touchMove: "touchmove",
    touchEnd: "touchend",
    touchCancel: "touchcancel"
}


const IronSource = {
    // ironsource 
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


export class Constants {

    // state    
    static isClickGameStart = false;
    static isPlaySound = false;
    static isRotate = false;
    static isCanClick = false;
    static matchingStep1 = false;
    static matchingStep2 = false;
    static matchingStep3 = false;
    static isFirstClick = false;

    static resultState = null;
    static bgSoundState = null;
    static step = null;
    static percentage = 0;


    // event
    static Event = Event;


    // ironSource
    static ironSource = IronSource;


    // Responsive
    static Responsive = Responsive;
}
