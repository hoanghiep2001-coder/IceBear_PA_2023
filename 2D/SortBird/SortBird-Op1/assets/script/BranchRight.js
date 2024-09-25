
cc.Class({
    extends: cc.Component,

    properties: {
        point1: cc.Node,
        point2: cc.Node,
        point3: cc.Node,
        point4: cc.Node,
    },


    start () {
        this.isFull = 0;
        this.gameController = this.node.parent.getComponent("GamePlay").gc.getComponent("GameController");
    },

    sortBird(birdSelected){
        if(this.node.childrenCount == 0){
            this.moveBird(birdSelected, this.point1)
        }else if(this.node.childrenCount == 1){
            this.moveBird(birdSelected, this.point2)
        }else if(this.node.childrenCount == 2){
            this.moveBird(birdSelected, this.point3)
        }else if(this.node.childrenCount == 3){
            this.moveBird(birdSelected, this.point4)
        }
        birdSelected.parent = this.node;

        this.checkFull();
    },

    sortBirdStart(birdSelected){
        if(this.node.childrenCount == 0){
            this.moveBirdStart(birdSelected, this.point1)
        }else if(this.node.childrenCount == 1){
            this.moveBirdStart(birdSelected, this.point2)
        }else if(this.node.childrenCount == 2){
            this.moveBirdStart(birdSelected, this.point3)
        }else if(this.node.childrenCount == 3){
            this.moveBirdStart(birdSelected, this.point4)
        }
        birdSelected.parent = this.node;

        this.checkFull();
    },

    moveBird(birdSelected, point){
        this.gameController.playAudio(this.gameController.audioFlapSort);
        window.IS_CAN_CLICK = false;
        let randomTime = cc.math.randomRange(0.6, 0.8);
        birdSelected.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
        cc.tween(birdSelected)
        .to(randomTime, {position: cc.v2(point.x, point.y + 20)})
        .call(function(){
            birdSelected.scaleX = Math.abs(birdSelected.scaleX);
            birdSelected.getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
        })
        .to(0.7, {position: cc.v2(point.x, point.y)})
        .call(function(){
            birdSelected.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            window.IS_CAN_CLICK = true;
        })
        .start();
    },

    moveBirdStart(birdSelected, point){
        let randomTime = cc.math.randomRange(2, 2.5);
        birdSelected.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
        cc.tween(birdSelected)
        .to(randomTime, {position: cc.v2(point.x, point.y + 20)})
        .call(function(){
            birdSelected.scaleX = Math.abs(birdSelected.scaleX);
            birdSelected.getComponent(sp.Skeleton).setAnimation(0, "grounding", true);
        })
        .to(1, {position: cc.v2(point.x, point.y)})
        .call(function(){
            birdSelected.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
        })
        .start();
    },

    checkFull(){
        if(this.node.childrenCount == 4){
            let arrBird = this.node.children;
            if(arrBird[0].group == arrBird[1].group && arrBird[2].group == arrBird[3].group && arrBird[1].group == arrBird[2].group){
                this.isFull ++;

                if(this.isFull == 1){
                    window.SORT_COMPLETE ++;
                    this.isFull = 0;
                    this.scheduleOnce(function(){
                        this.exitBird(arrBird[0], cc.v2(0, 400));
                        this.exitBird(arrBird[1], cc.v2(0, 400));
                        this.exitBird(arrBird[2], cc.v2(0, 400));
                        this.exitBird(arrBird[3], cc.v2(0, 400));
                        this.gameController.updateProgress();
                    }, 1.6);

                    if(window.SORT_COMPLETE == 3){
                        this.scheduleOnce(function(){
                            this.gameController.showPopupInstall();
                        }, 2.5);
                    }
                }
                
            }
        }
    },

    exitBird(birdSelected, point){
        this.gameController.playAudio(this.gameController.audioFlap);
        window.IS_CAN_CLICK = false;
        let randomX = cc.math.randomRangeInt(100, 300);
        birdSelected.getComponent(sp.Skeleton).setAnimation(0, "fly", true);
        cc.tween(birdSelected)
        .to(1.5, {position: cc.v2(point.x - randomX, point.y + randomX/2)})
        .call(function(){
            birdSelected.destroy()
            window.IS_CAN_CLICK = true;
        })
        .start();

        //birdSelected.parent = this.node.parent;
    },

    // update (dt) {},
});
