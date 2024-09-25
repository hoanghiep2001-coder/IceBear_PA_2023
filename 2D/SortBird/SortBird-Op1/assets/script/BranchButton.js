
cc.Class({
    extends: cc.Component,

    properties: {
       branchTree: cc.Node,
       pos:0
    },


    // onLoad () {},

    start () {
        this.node.on("click", this.ClickButtonBranch, this);
        this.isMoveBird = false;
        this.gameController = this.node.parent.parent.getComponent("GamePlay").gc.getComponent("GameController");
    },

    ClickButtonBranch(){


        if(!window.IS_COMPLETE_TUTORIAL){
            this.gameController.handTut.getComponent(cc.Animation).play("HandAnim2");
            this.gameController.activeBranchRight1Button();
            if(this.pos == 4){
                this.gameController.activeBranchButton();
                window.IS_COMPLETE_TUTORIAL = true;
                this.gameController.handTut.active = false;
            }
        }
        if(window.IS_CAN_CLICK){

            // to Store
            this.gameController.installHandle();
            return;

            if(window.ARR_BIRD_SELECTED.length == 0){
                this.arrBirdSelected = [];
                let isContinue = true;
                if(this.branchTree.childrenCount > 0){
                    let arrBird = this.branchTree.children;
                    for(let i= (arrBird.length - 1); i >= 0; i--){
                        if(isContinue){
                            if(this.arrBirdSelected.length > 0){
                                for(let j=0; j<this.arrBirdSelected.length; j++){
                                    if(this.arrBirdSelected[j].group == arrBird[i].group){
                                        this.arrBirdSelected.push(arrBird[i]);
                                        break;
                                    }else {
                                        isContinue = false;
                                    }
                                }
                            }else{
                                this.arrBirdSelected.push(arrBird[i])
                            }
                        }else{
                            break;
                        }
                    }
        
                    for(let i=0; i< this.arrBirdSelected.length; i++){
                        let bird = this.arrBirdSelected[i];
                        bird.getComponent(sp.Skeleton).setAnimation(0, "touching", true);
                    }
                    this.gameController.playAudio(this.gameController.audioTweet);
                }
                window.ARR_BIRD_SELECTED = this.arrBirdSelected;
                window.POSITION_BUTTON = this.pos;
            }else{
                if(window.POSITION_BUTTON == this.pos){
                    this.DeSelectedBird();
                }else{
                    this.CheckMoveBird();
                    // sort bird to other branch
                    if(this.isMoveBird){
                        if(this.pos <= 3){
                            // branch left
                            for(let i=0; i<window.ARR_BIRD_SELECTED.length; i++){
                                this.branchTree.getComponent("BranchLeft").sortBird(window.ARR_BIRD_SELECTED[i]);
                            }
                        }else{
                            // branch right
                            for(let i=0; i<window.ARR_BIRD_SELECTED.length; i++){
                                this.branchTree.getComponent("BranchRight").sortBird(window.ARR_BIRD_SELECTED[i]);
                            }
                        }
                        window.ARR_BIRD_SELECTED = [];
                        window.POSITION_BUTTON = 0;
                        this.arrBirdSelected = [];
                    }else{
                        this.DeSelectedBird();
                    }
                }
            }
        }
    },

    CheckMoveBird(){
        this.isMoveBird = false;
        if(this.branchTree.childrenCount == 0 ) {
            this.isMoveBird = true;
            return;
        }

        if(this.branchTree.childrenCount + window.ARR_BIRD_SELECTED.length > 4){
            this.isMoveBird = false;
            return;
        }else{
            if(this.branchTree.children[this.branchTree.childrenCount - 1].group == window.ARR_BIRD_SELECTED[0].group){
                this.isMoveBird = true;
                return;
            }else{
                this.isMoveBird = false;
                return;
            }
        }
    },

    DeSelectedBird(){
        if(window.ARR_BIRD_SELECTED.length > 0){
            for(let i=0; i< window.ARR_BIRD_SELECTED.length; i++){
                let bird = window.ARR_BIRD_SELECTED[i];
                bird.getComponent(sp.Skeleton).setAnimation(0, "idle", true)
                let randomTime = cc.math.randomRangeInt(7, 10);
                bird.getComponent(sp.Skeleton).timeScale = randomTime/10;
            }
        }

        this.arrBirdSelected = [];
        window.ARR_BIRD_SELECTED = [];
        window.POSITION_BUTTON = 0;
    }
    // update (dt) {},
});
