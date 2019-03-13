class Player{
    constructor(dataObj, player, callBack){
        this.data = dataObj;
        this.player = player;
        // this.potionData = potionData;
        this.playerpotions=[];
        this.callBack = callBack;
        this.collectMarbles = null;
        this.fillPotion = this.fillPotion.bind(this);
        this.getPotion = this.getPotion.bind(this);
    }
    generatePotion(){
        var newPotion = new Potion(this.data, this.player, this.getPotion);
        var potionNeedtoRender= newPotion.renderPotion();
        this.playerpotions.push(newPotion);
        var playIndex = '.player'+ this.player+'-has';
        $(playIndex).append(potionNeedtoRender);
    }
    fillPotion(potion){
        debugger;
        var marblesArr = this.collectMarbles;////////
        var marbles = marblesArr.concat(); //copy the marbles array for slice
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){ //check marbles
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){ //check colors
                if(marblesArr[MIndex].marbleColor === potion.color[colorIndex] && potion.numbers[colorIndex] > 0){

                    potion.numbers[colorIndex] -=1;
                    potion.initialPotion[colorIndex] +=1;
                    marbles.splice(MIndex, 1);
                    var textClass = '.' + potion.color[colorIndex] + potion.player;
                    $(textClass).text( potion.initialPotion[colorIndex]);
                }
            }
        }
        // this.changePlayer(potion);
        var checkFilled = potion.checkFilledStatus();
        // this.checkWin(checkFilled);
        this.returnMarbles(marbles) //the leftover marbles
    }
    returnMarbles(marbles){
        this.callBack(marbles);
    }
    getCollectMarbles(marbles){
        debugger;
        this.collectMarbles = marbles;
    }
    getPotion(potion){
        debugger;
        this.callBack.getMarbles(potion.player);
        this.fillPotion(potion);
    }
}