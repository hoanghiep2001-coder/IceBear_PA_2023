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
    background: cc.Node = null;
    @property(cc.Node)
    FirstStep: cc.Node = null;
    @property(cc.Node)
    SecondStep: cc.Node = null;
    @property(cc.Node)
    ThirdStep: cc.Node = null;
    @property(cc.Node)
    DollBase: cc.Node = null;
    @property(cc.Node)
    OutFit: cc.Node = null;
    @property(cc.Node)
    nextBtn: cc.Node = null;
    @property(cc.Node)
    Mathching_Doll: cc.Node = null;
    @property(cc.Node)
    Gojo: cc.Node = null;
    @property(cc.Node)
    Bg_Matching: cc.Node = null;
    @property(cc.Node)
    Matching_Text: cc.Node = null;
    @property(cc.Node)
    CTA: cc.Node = null;


    // node
    @property(cc.Node)
    hand_1: cc.Node = null;
    @property(cc.Node)
    hand_2: cc.Node = null;
    @property(cc.Node)
    hand_3: cc.Node = null;
    @property(cc.Node)
    nextBtn_Hrz: cc.Node = null;
    @property(cc.Node)
    nextBtn_Root: cc.Node = null;
    @property(cc.Node)
    Btn_Yes: cc.Node = null;
    @property(cc.Node)
    Btn_Cancel: cc.Node = null;
    @property(cc.Node)
    overlay: cc.Node = null;
    @property(cc.Label)
    percentageLabel: cc.Label = null;


    // array
    @property([cc.Node])
    Boxes: cc.Node[] = [];
    @property([cc.Node])
    Character_Outfits: cc.Node[] = [];
    @property([cc.Node])
    Mathching_Outfits: cc.Node[] = [];

    // Box
    @property(cc.Node)
    Box_Character: cc.Node = null;


    // Character
    @property(cc.Node)
    Character_DressDefault: cc.Node = null;
    @property(cc.Node)
    Character_BHair: cc.Node = null;
    @property(cc.Node)
    Character_Mathching_BHair: cc.Node = null;


    // effect
    @property(cc.ParticleSystem)
    Effect_Heart: cc.ParticleSystem = null;


    protected onLoad(): void {
        this.DollBase.active = false;
        this.SecondStep.active = false;
        this.Character_BHair.active = false;
        this.nextBtn.active = false;
        this.ThirdStep.active = false;
        this.Bg_Matching.active = false;
        this.CTA.active = false;
        this.nextBtn_Hrz.active = false;
    }


    protected start(): void {
        this.handleGamePlay();
    }


    private handleGamePlay(): void {
        // this.AudioManager.bgSound.play();
        // this.AudioManager.bgSound.loop = true;
        // Constants.bgSoundState = cc.audioEngine.play(this.AudioManager.bgSound, true, 1);
        this.FirstStep.getComponent(cc.Animation).play("FirstStep_Anim");

        // ironsource
        this.node.on(Constants.Event.touchStart, this.handleIronSourcePlaySound, this);

        this.scheduleOnce(() => {
            this.hand_1.getComponent(cc.Animation).play("Hand_ScaleAnim");
            Constants.isCanClick = true;
            this.registerEvent(1);
        }, 2);
    }


    public registerEvent(step: number): void {
        switch (step) {
            case 1:

                this.Box_Character.on(Constants.Event.touchStart, this.handleBoxCharacterClick, this);
                break;
            case 2:
                this.Boxes.forEach((box, index) => {
                    box.on(Constants.Event.touchStart, (() => {
                        this.handleBoxItemTouchStart(index)
                    }), this);
                });
                break;
            case 3:
                this.nextBtn_Root.on(Constants.Event.touchStart, this.handleShowMathchingScene, this);
                this.nextBtn_Hrz.on(Constants.Event.touchStart, this.handleShowMathchingScene, this);
                break;
            case 4:
                this.Btn_Yes.on(Constants.Event.touchStart, this.GameController.installHandle, this);
                this.Btn_Cancel.on(Constants.Event.touchStart, this.GameController.installHandle, this);

                // mtg & applovin
                // this.overlay.on(Constants.Event.touchStart, this.GameController.installHandle, this);
                break;
            default:
                break;
        }
    }


    private handleBoxCharacterClick(): void {
        if (!Constants.isCanClick) {
            return;
        }

        this.handleIronSourcePlaySound();
        Constants.isCanClick = false;
        if(Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        }


        this.hand_1.active = false;
        this.DollBase.active = true;
        this.SecondStep.active = true;

        this.getComponent(cc.Animation).play("GamePlay_Step2Anim");

        this.scheduleOnce(() => {
            Constants.isCanClick = true;
            this.FirstStep.active = false;
            Constants.isRotate
                ? this.DollBase.getComponent(cc.Animation).play("DollBase_HrzAnim")
                : this.DollBase.getComponent(cc.Animation).play("DollBase_Anim");
            this.registerEvent(2);
        }, 0.5);

        this.scheduleOnce(() => {
            this.hand_2.getComponent(cc.Animation).play("Hand_ScaleAnim");
        }, 1.5)
    }


    private handleBoxItemTouchStart(index: number): void {
        Constants.isFirstClick = true;


        if(Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
            let random = Math.round(Math.random()) + 1;
            random === 1
            ? cc.audioEngine.play(this.AudioManager.yeahSound, false, 1)
            : cc.audioEngine.play(this.AudioManager.wowSound, false, 1)
        }
        
        if (!this.nextBtn.active) {
            Constants.isRotate
                ? this.nextBtn_Hrz.active = true
                : this.nextBtn.active = true;

            Constants.isRotate
                ? this.nextBtn.getComponent(cc.Animation).play("NextBtn_Anim")
                : this.nextBtn_Hrz.getComponent(cc.Animation).play("Next_BtnAnim");

            this.registerEvent(3);
        }

        this.Effect_Heart.resetSystem();
        this.hand_2.active = false;
        this.Character_DressDefault.active = false;
        this.Character_BHair.active = false;
        this.Character_Mathching_BHair.active = false;
        this.Character_Outfits.forEach(outfit => outfit.active = false);
        this.Mathching_Outfits.forEach(outfit => outfit.active = false);
        this.Character_Outfits[index].active = true;
        this.Mathching_Outfits[index].active = true;

        if (index === 3) {
            this.Character_BHair.active = true;
            this.Character_Mathching_BHair.active = true;
        }
    }


    private handleShowMathchingScene(): void {
        Constants.isCanClick = false;

        if(Constants.ironSource.SoundState) {
            cc.audioEngine.play(this.AudioManager.clickSound, false, 1);
        }

        this.Bg_Matching.active = true;
        this.nextBtn_Root.active = false;
        this.ThirdStep.active = true;
        this.getComponent(cc.Animation).play("GamePlay_Step3Anim");
        this.ThirdStep.getComponent(cc.Animation).play("ThirdStep_Anim");

        this.scheduleOnce(() => {
            this.getComponent(cc.Animation).play("GamePlay_MatchingAnim");
            this.SecondStep.active = false;
        }, 1)



        // others -----------------
        // this.scheduleOnce(() => {
        //     Constants.matchingStep1 = true;
        // }, 2)
        // ------------------------



        // fix ironSource
        this.scheduleOnce(() => {
            Constants.matchingStep1 = false;

            if(Constants.ironSource.SoundState) {
                cc.audioEngine.play(this.AudioManager.yeahSound, false, 1);
            }

            this.percentageLabel.string = "10%";
        }, 2);

        this.scheduleOnce(() => {
            Constants.matchingStep2 = false;

            if(Constants.ironSource.SoundState) {
                cc.audioEngine.play(this.AudioManager.wowSound, false, 1);
            }

            this.percentageLabel.string = "20%";
        }, 4.3)

        this.scheduleOnce(() => {

            if(Constants.ironSource.SoundState) {
                cc.audioEngine.play(this.AudioManager.crySound, false, 1);
            }

            this.AudioManager.bgSound.volume = 0.2;

            this.scheduleOnce(() => {
                if(Constants.ironSource.SoundState) {
                    this.AudioManager.loseGame.play();
                    this.AudioManager.loseGame.volume = 2;
                }
            }, 0.5)

            this.Matching_Text.active = false;
            this.handleShowCTA();

            this.percentageLabel.string = "30%";
        }, 5.3)
    }


    private handleIronSourcePlaySound(): void {
        if (Constants.ironSource.isPlayBgSound) {
            return;
        }

        if (Constants.ironSource.SoundState) {
            this.AudioManager.bgSound.play();
        }

        Constants.ironSource.isPlayBgSound = true;
    }


    private handleMuteSoundIronSource(): void {
        Constants.ironSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)

        if (Constants.ironSource.State) {
            if (Constants.ironSource.State === 1 && !Constants.ironSource.SoundState && !Constants.ironSource.isEndGame) {
                Constants.ironSource.SoundState = true;
                this.AudioManager.bgSound.play();
            }

            if (Constants.ironSource.State === 2 && Constants.ironSource.SoundState) {
                Constants.ironSource.SoundState = false;
                cc.audioEngine.stopAll();
                this.AudioManager.bgSound.stop();
                this.AudioManager.loseGame.stop();
            }
        }
    }


    private handleShowCTA(): void {
        this.CTA.active = true;
        this.CTA.opacity = 0;

        this.scheduleOnce(() => {
        this.CTA.opacity = 255;

        }, 0.5)

        this.getComponent(cc.Animation).play("GamePlay_ShowCTA");
        this.hand_3.getComponent(cc.Animation).play("Hand_ScaleAnim");
        Constants.isCanClick = true;
        this.registerEvent(4);

        this.scheduleOnce(() => {
            this.AudioManager.bgSound.volume = 1;
        }, 3)
    }


    protected update(dt: number): void {

        // ironsource
        this.handleMuteSoundIronSource();

        if (Constants.matchingStep1) {
            if (Constants.percentage >= 10) {
                Constants.matchingStep1 = false;
                cc.audioEngine.play(this.AudioManager.yeahSound, false, 1);

                this.scheduleOnce(() => {
                    Constants.matchingStep2 = true;
                }, 1)
            }
            this.percentageLabel.string = String(Math.floor(Constants.percentage) + "%");
            Constants.percentage += 0.3;
        }


        if (Constants.matchingStep2) {
            if (Constants.percentage >= 20) {
                Constants.matchingStep2 = false;
                cc.audioEngine.play(this.AudioManager.wowSound, false, 1);

                this.scheduleOnce(() => {
                    Constants.matchingStep3 = true;
                }, 1)
            }
            this.percentageLabel.string = String(Math.floor(Constants.percentage) + "%");
            Constants.percentage += 0.3;
        }


        if (Constants.matchingStep3) {
            if (Constants.percentage >= 30) {
                Constants.matchingStep3 = false;
                cc.audioEngine.play(this.AudioManager.crySound, false, 1);
                this.AudioManager.bgSound.volume = 0.2;

                this.scheduleOnce(() => {
                    this.AudioManager.loseGame.play();
                    this.AudioManager.loseGame.volume = 2;
                }, 0.5)

                this.Matching_Text.active = false;
                this.handleShowCTA();
            }
            this.percentageLabel.string = String(Math.floor(Constants.percentage) + "%");
            Constants.percentage += 0.3;
        }
    }


}
