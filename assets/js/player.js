class Player{
    constructor(potionData){
        this.player = potionData.player; //temp
        this.potionData = potionData;
        this.playerpotions=[];
    }
    generatePotion(){
        for(var player = 0; player < this.player; player++){
        var newPotion = new Potion(this.potionData, player, this.fillPotion);
        var potionNeedtoRender= newPotion.renderPotion();
        this.playerpotions.push(newPotion);
        var playIndex = '.player'+ player+'-has';
        $(playIndex).append(potionNeedtoRender);
        }
        this.selectPlay(); // randomly select
    }
    fillPotion(potion){
        var marblesArr = this.dispenser.collectedMarbles;
        var marbles = marblesArr.concat(); //copy the marbles array for slice
        for(var MIndex = 0; MIndex < marblesArr.length; MIndex++){ //check marbles
            for(var colorIndex =0; colorIndex < potion.color.length; colorIndex++){ //check colors
                if(marblesArr[MIndex].marbleColor === potion.color[colorIndex] && potion.numbers[colorIndex] > 0){

                    potion.numbers[colorIndex] -=1;
                    potion.currentPotion[colorIndex] +=1;
                    marbles.splice(MIndex, 1);
                    var textClass = '.' + potion.color[colorIndex] + potion.player;
                    $(textClass).text( potion.currentPotion[colorIndex]);
                }
            }
        }
        this.changePlayer(potion);
        var checkFilled = potion.checkFilledStatus();
        this.checkWin(checkFilled);
        this.dispenser.returnMarblesToRow(marbles); //the leftover marbles
    }
}