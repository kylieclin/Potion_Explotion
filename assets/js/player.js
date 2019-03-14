class Player{
    constructor(dataObj, player, callBack){
        this.data = dataObj;
        this.player = player;
        // this.potionData = potionData;
        this.playerpotions=[];
        
        this.collectMarbles = null;
        // this.returnMarbles = this.returnMarbles.bind(this);
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
        var marblesArr = this.collectMarbles;////////
        var marbles = []; 
        var fill = false;
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){ //check marbles
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){ //check colors
                if(marblesArr[MIndex].marbleColor === potion.color[colorIndex] && potion.initialPotion[colorIndex] < potion.numbers[colorIndex]){
                    potion.initialPotion[colorIndex] +=1;
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
        this.callBack.checkWin(potion.checkFilledStatus());
        this.callBack.returnMarbles(marbles); //the leftover marbles
        this.callBack.changePlayer(potion);
    }
    getPotion(potion){
        // debugger;
        this.collectMarbles = this.callBack.getMarbles(potion.player);
        this.fillPotion(potion);
    }
}