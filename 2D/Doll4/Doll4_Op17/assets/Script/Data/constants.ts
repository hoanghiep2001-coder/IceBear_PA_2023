
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
    HORIZONTAL_IPX: "horizontal_IPX",
    HORIZONTAL_TABLET: "horizontal_Tablet",
    VERTICAL_IPX: "vertical_IPX",
    VERTICAL_MOBILE: "vertical_Mobile",
    isDissapointed: false
    
}


export class Constants {

    // state    
    static isLastStep: boolean = false;
    static isClickGameStart: boolean = false;
    static isRotate: boolean = false;
    static isCanClick: boolean = false;
    static isFirstClick: boolean = false;

    static resultState: number = null;
    static bgSoundState: number = null;
    static step: number = null;
  


    // event
    static Event: typeof Event = Event;


    // ironSource
    static ironSource: typeof IronSource = IronSource;


    // Responsive
    static Responsive: typeof Responsive = Responsive;

}
