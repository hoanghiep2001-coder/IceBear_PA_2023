import { Constants } from "../Data/constants";
import AudioManager from "./AudioManager";
import { GameController } from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    // Component
    @property(GameController)
    GameController: GameController = null;
    @property(AudioManager)
    AudioManager: AudioManager = null;


    // Container
    @property(cc.Node)
    Room: cc.Node = null;
    @property(cc.Node)
    DollBase: cc.Node = null;
    @property(cc.Node)
    UI: cc.Node = null;
    @property(cc.Node)
    Decor: cc.Node = null;
    @property(cc.Node)
    Items: cc.Node = null;
    @property(cc.Node)
    CTA: cc.Node = null;


    // node
    @property(cc.Node)
    Btn_Play: cc.Node = null;
    @property(cc.Node)
    Btn_Next: cc.Node = null;
    @property(cc.Node)
    Hand_1: cc.Node = null;
    @property(cc.Node)
    Hand_2: cc.Node = null;
    @property(cc.Node)
    Text_WantSanta: cc.Node = null;
    @property(cc.Node)
    Text_ChooseItem: cc.Node = null;
    @property(cc.Node)
    Text_Win: cc.Node = null;
    @property(cc.Node)
    Text_Lose: cc.Node = null;
    @property(cc.Node)
    Btn_CTA_playNow: cc.Node = null;
    @property(cc.Node)
    Btn_CTA_playMore: cc.Node = null;
    @property(cc.Node)
    Overlay: cc.Node = null;


    // array
    @property([cc.Node])
    Boxes: cc.Node[] = [];
    @property([cc.Node])
    Items_Dresses: cc.Node[] = [];


    // character
    @property(cc.Node)
    character_HairDefault: cc.Node = null;
    @property(cc.Node)
    character_BackHairDefault: cc.Node = null;
    @property([cc.Node])
    character_Hairs: cc.Node[] = [];
    @property([cc.Node])
    character_BackHairs: cc.Node[] = [];
    @property(cc.Node)
    character_DressDefault: cc.Node = null;
    @property(cc.Node)
    character_SubDress: cc.Node = null;
    @property([cc.Node])
    character_Dresses: cc.Node[] = [];
    @property(cc.Node)
    character_Mount: cc.Node = null;
    @property(cc.Node)
    character_MountDefault: cc.Node = null;
    @property([cc.Node])
    character_Mounts: cc.Node[] = [];
    @property(cc.Node)
    character_Shoe: cc.Node = null;
    @property([cc.Node])
    character_Shoes: cc.Node[] = [];
    @property([cc.Node])
    character_Hats: cc.Node[] = [];
    @property([cc.Node])
    character_Wings: cc.Node[] = [];

    // effect
    @property(cc.ParticleSystem)
    Effect_Heart: cc.ParticleSystem = null;


    protected onLoad(): void {
        // this.Decor.active = false;
        this.Items.active = false;
        this.Btn_Next.active = false;
        this.Items_Dresses.forEach(dress => dress.opacity = 0);
        this.CTA.active = false;
        this.Text_Lose.active = false;
        this.Text_Win.active = false;
    }


    protected start(): void {
        this.handleGamePlay();
    }


    private handleGamePlay(): void {
        cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.getComponent(cc.Animation).play("GamePlay_OpenAnim");

        this.scheduleOnce(() => {
            this.Btn_Play.getComponent(cc.Animation).play("BtnPlay_ScaleAnim");
            Constants.isCanClick = true;
            this.registerEvent(1);
        }, 1)
    }


    private registerEvent(step: number): void {
        switch (step) {
            case 1:
                this.Btn_Play.on(Constants.Event.touchStart, this.GameController.installHandle, this);

                // mtg & applovin
                this.Room.on(Constants.Event.touchStart, this.GameController.installHandle, this);
                break;
            // case 2:
            //     this.Boxes.forEach((box, index) => {
            //         box.on(cc.Node.EventType.TOUCH_START, (() => {
            //             this.handleTouchBoxEvent(index);
            //         }), this);
            //     });
            //     break;
            // case 3:
            //     this.Btn_Next.on(cc.Node.EventType.TOUCH_START, this.handleCheckResult, this);
            //     break;
            // case 4:
                // this.Btn_CTA_playMore.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
                // this.Btn_CTA_playNow.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);

                // mtg & applovin
                // this.Overlay.on(cc.Node.EventType.TOUCH_START, this.GameController.installHandle, this);
                // break;
            default:
                break;
        }
    }


    private onBtnPlayTouchStart(): void {
        // ironsource
        this.handleIronSourcePlaySound();
        Constants.isClickGameStart = true;
        this.Hand_1.getComponent(cc.Animation).play("Hand_PickItemAnim");

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.yeahSound, false, 1);
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        }

        if(!Constants.isRotate) {
            this.getComponent(cc.Animation).play("GamePlay_ShowItemAnim");
        } else {
            this.getComponent(cc.Animation).play("Hrz_GamePlay_ShowItemAnim");
        }


        this.Btn_Play.off(cc.Node.EventType.TOUCH_START);
        this.Items.active = true;

        this.scheduleOnce(() => {
            this.registerEvent(2);
        }, 2)
    }


    private handleTouchBoxEvent(index: number): void {
        if (!Constants.isCanClick) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
            cc.audioEngine.play(this.AudioManager.wowSound, false, 1);
        }

        Constants.isCanClick = false;
        this.Effect_Heart.resetSystem();

        this.scheduleOnce(() => {
            Constants.isCanClick = true;
        }, 0.5)

        switch (Constants.isChooseDress) {
            case true:
                if (!Constants.isClickChooseDress) {
                    this.Hand_1.active = false;
                    this.Hand_2.active = true;
                    this.Hand_2.getComponent(cc.Animation).play("Hand_PickItemAnim_2");

                    if(!Constants.isRotate) {
                        this.UI.getComponent(cc.Animation).play("UI_ToggleNextBtnAnim");
                    } else {
                        this.UI.getComponent(cc.Animation).play("Hrz_UI_ToggleNextBtnAnim");
                    }

                    this.Btn_Next.active = true;
                }

                Constants.isClickChooseDress = true;
                Constants.resultState = index;
                this.Hand_1.active = false;
                this.Hand_2.active = true;
                this.Hand_2.getComponent(cc.Animation).play("Hand_PickItemAnim_2");
                this.character_SubDress.active = false;
                this.character_Wings.forEach(wing => wing.active = false);
                this.character_Hats.forEach(hat => hat.active = false);
                this.character_Shoes.forEach(shoe => shoe.active = false);
                this.character_Dresses.forEach(dress => dress.active = false);
                this.FilterDress(index);
                break;
            case false:
                if (!Constants.isClickChooseHair) {
                    this.Hand_1.active = false;
                    this.Hand_2.active = true;
                    this.Hand_2.getComponent(cc.Animation).play("Hand_PickItemAnim_2");

                    if(!Constants.isRotate) {
                        this.UI.getComponent(cc.Animation).play("UI_ToggleNextBtnAnim");
                    } else {
                        this.UI.getComponent(cc.Animation).play("Hrz_UI_ToggleNextBtnAnim");
                    }

                    this.Btn_Next.active = true;
                    this.registerEvent(3);
                }

                Constants.isClickChooseHair = true;
                this.character_Hairs.forEach(hair => hair.active = false);
                this.character_BackHairs.forEach(hair => hair.active = false);
                this.character_HairDefault.active = false;
                this.character_Hairs[index].active = true;

                if (index === 0) {
                    this.character_BackHairDefault.active = false;
                    this.character_BackHairs[0].active = true;
                }

                if (index === 2) {
                    this.character_BackHairDefault.active = false;
                    this.character_BackHairs[1].active = true;
                }
                break;
            default:
                break;
        }
    }


    private FilterDress(index: number): void {
        this.character_DressDefault.active = false;
        this.character_Dresses[index].active = true;
        this.character_Shoes[index].active = true;

        switch (index) {
            case 0:
                this.character_Hats[0].active = true;
                break;
            case 1:
                this.character_Wings[0].active = true;
                break;
            case 2:
                this.character_Wings[1].active = true;
                this.character_Hats[2].active = true;
                break;
            case 3:
                this.character_Wings[2].active = true;
                this.character_SubDress.active = true;
                break;
            default:
                break;
        }
    }


    private handleCheckResult(): void {
        if (!Constants.isCanClick) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        }

        this.Hand_2.active = false;
        if (Constants.isClickChooseHair && !Constants.isChooseDress) {
            Constants.isCanClick = false;
            Constants.isChooseDress = true;

            Constants.isRotate 
            ?  this.UI.getComponent(cc.Animation).play("Hrz_UI_ToggleNextBtnAnim_Reverse")
            :  this.UI.getComponent(cc.Animation).play("UI_ToggleNextBtnAnim_Reverse");

            this.scheduleOnce(() => {
                Constants.isRotate 
                ?  this.UI.getComponent(cc.Animation).play("Hrz_UI_SwapItems")
                :  this.UI.getComponent(cc.Animation).play("UI_SwapItems");
            }, 1)


            this.scheduleOnce(() => {
                Constants.isCanClick = true;
                this.Hand_1.active = true;
            }, 2)
        } else {
            this.Btn_Next.active = false;
            Constants.isRotate 
            ?  this.UI.getComponent(cc.Animation).play("Hrz_UI_SwapItems_2")
            :  this.UI.getComponent(cc.Animation).play("UI_SwapItems_2");

            this.scheduleOnce(() => {
                Constants.isRotate 
                ?  this.getComponent(cc.Animation).play("Hrz_GamePlay_ShowResult")
                :  this.getComponent(cc.Animation).play("GamePlay_ShowResult");
            }, 1)
            
            if (Constants.resultState === 0) {
                this.win();
                return;
            }

            this.lose();
        }
    }


    private lose(): void {
        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.loseSound, false, 1);
        }

        this.registerEvent(4);
        this.character_MountDefault.active = false;
        this.character_Mount.active = true;
        this.character_Mounts[0].active = true;
        this.Effect_Heart.resetSystem();
        this.CTA.active = true;
        this.CTA.getComponent(cc.Animation).play("CTA_Anim");
        this.Btn_CTA_playNow.active = false;
        
        this.scheduleOnce(() => {
            this.Text_Lose.active = true;
            this.Text_Lose.getComponent(cc.Animation).play("Result_TextAnim");
        }, 1.5)

        this.scheduleOnce(() => {
            this.Btn_CTA_playMore.getComponent(cc.Animation).play("BtnPlay_ScaleAnim");
        }, 3)
    }


    private win(): void {
        if (Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.winGame, false, 1);
        }

        this.registerEvent(4);
        this.Effect_Heart.resetSystem();
        this.character_MountDefault.active = false;
        this.character_Mount.active = true;
        this.character_Mounts[1].active = true;
        this.character_Mounts[0].active = false;
        this.CTA.active = true;
        this.CTA.getComponent(cc.Animation).play("CTA_Anim");
        this.Btn_CTA_playMore.active = false;

        this.scheduleOnce(() => {
            this.Text_Win.active = true;
            this.Text_Win.getComponent(cc.Animation).play("Result_TextAnim");
        }, 1)

        this.scheduleOnce(() => {
            this.Btn_CTA_playMore.getComponent(cc.Animation).play("BtnPlay_ScaleAnim");
        }, 3)
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            Constants.bgSoundState = cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                cc.audioEngine.stopAll();
            }
        }
    }


    protected update(dt: number): void {

        // ironsource
        // this.handleMuteSoundIronSource();
    }


}
