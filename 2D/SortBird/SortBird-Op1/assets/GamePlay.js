
cc.Class({
    extends: cc.Component,

    properties: {
        gc: cc.Node,

        branch_Left_1: cc.Node,
        branch_Left_2: cc.Node,
        branch_Left_3: cc.Node,
        branch_Right_1: cc.Node,
        branch_Right_2: cc.Node,
        branch_Right_3: cc.Node,

        bird1_1: cc.Node,
        bird1_2: cc.Node,
        bird1_3: cc.Node,
        bird1_4: cc.Node,
        bird2_1: cc.Node,
        bird2_2: cc.Node,
        bird2_3: cc.Node,
        bird2_4: cc.Node,
        bird3_1: cc.Node,
        bird3_2: cc.Node,
        bird3_3: cc.Node,
        bird3_4: cc.Node,

        hideMask: cc.Node,
    },

    onLoad () {
        this.gameController = this.gc.getComponent("GameController");
        // this.gameController.playAudio(this.gameController.audioBgMusic);
        
        this.branchLeft_1 = this.branch_Left_1.getComponent("BranchLeft");
        this.branchLeft_2 = this.branch_Left_2.getComponent("BranchLeft");
        this.branchLeft_3 = this.branch_Left_3.getComponent("BranchLeft");
        this.branchRight_1 = this.branch_Right_1.getComponent("BranchRight");
        this.branchRight_2 = this.branch_Right_2.getComponent("BranchRight");
        this.branchRight_3 = this.branch_Right_3.getComponent("BranchRight");

        window.ARR_BIRD_SELECTED = [];
        window.POSITION_BUTTON = 0;
        window.SORT_COMPLETE = 0;
        window.IS_CAN_CLICK = true;
        window.IS_COMPLETE_TUTORIAL = false;

        this.toStore();
    },


    toStore() {
       // mtg & applovin
       this.hideMask.on(cc.Node.EventType.TOUCH_START, () => {
        this.gameController.installHandle()
    }, this)
    },
    

    start(){
        this.initMapStart();
        
    },

    initMapStart(){
        this.branchLeft_1.sortBirdStart(this.bird1_1);
        this.branchLeft_1.sortBirdStart(this.bird1_2);
        this.branchLeft_1.sortBirdStart(this.bird2_1);
        this.branchLeft_1.sortBirdStart(this.bird2_2);

        this.branchLeft_3.sortBirdStart(this.bird3_1);
        this.branchLeft_3.sortBirdStart(this.bird3_2);
        this.branchLeft_3.sortBirdStart(this.bird3_3);

        this.branchRight_1.sortBirdStart(this.bird2_3);
        this.branchRight_1.sortBirdStart(this.bird2_4);

        this.branchRight_2.sortBirdStart(this.bird1_3);
        this.branchRight_2.sortBirdStart(this.bird3_4);
        this.branchRight_2.sortBirdStart(this.bird1_4);
    },

});
