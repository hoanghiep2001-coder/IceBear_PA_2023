
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


export class Constants {

    // state    
    static isClickGameStart: boolean = false;
    static isRotate: boolean = false;
    static isCanClick: boolean = false;
    static isChooseDress: boolean = false;

    static resultState: number = null;
    static bgSoundState: number = null;
    static isClickChooseHair: boolean = false;
    static isClickChooseDress: boolean = false;


    // event
    static Event: typeof Event = Event;


    // ironSource
    static ironSource: typeof IronSource = IronSource;


    // Responsive
    static Responsive: typeof Responsive = Responsive;

}
