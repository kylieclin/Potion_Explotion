class Player{
    constructor(dataObj, player, callBack){
        this.data = dataObj;
        this.player = player;
        this.playerpotions=[]; 
        this.oldMarbles = [];
        this.collectMarbles = null;
//================== BIND ==================//
        this.fillPotion = this.fillPotion.bind(this);
        this.getPotion = this.getPotion.bind(this);
        this.callBack = callBack;
    }
    generatePotion(){
        var newPotion = new Potion(this.data, this.player, this.getPotion);
        var potionNeedtoRender= newPotion.renderPotion();
        this.playerpotions.push(newPotion);
        var playIndex = '.player'+ this.player+'-has';
        $(playIndex).append(potionNeedtoRender);
    }
    fillPotion(potion){
        // debugger;
        var marblesArr = this.collectMarbles;
        var marbles = []; 
        var fill = false;
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){ //check marbles
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){ //check colors
                if(marblesArr[MIndex].marbleColor === potion.color[colorIndex] && potion.initialPotion[colorIndex] < potion.numbers[colorIndex]){
                    potion.initialPotion[colorIndex] +=1;
                    this.oldMarbles.push(marblesArr[MIndex]);
                    var textClass = '.' + potion.color[colorIndex] + potion.player;
                    $(textClass).text( potion.initialPotion[colorIndex]);
                    fill = true;
                    break;
                } 
            }
            console.log(potion.initialPotion);
            if(fill === false){
               marbles.push(marblesArr[MIndex]); 
            }
            fill = false;
        }

        if(potion.checkFilledStatus()){
            debugger;
            this.generatePotion();
            potion.dom.hide();
            for(var index in this.oldMarbles){
                marbles.push(this.oldMarbles[index]);
            }
            //badge ++
        }
        this.callBack.checkWin();
        this.callBack.returnMarbles(marbles); //the leftover marbles
        this.callBack.changePlayer(potion);
    }
    getPotion(potion){
        // debugger;
        this.collectMarbles = this.callBack.getMarbles(potion.player);
        this.fillPotion(potion);
    }
}