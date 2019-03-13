class Potion{

    constructor(potionInfo, player, callback){
        
        this.currentPotion = [0,0,0,0];
        this.dataColor = potionInfo.color;
        this.setNum = potionInfo.setnum;
        this.numbers= [];
        this.color=[];
        this.dom = [];
        this.player = player;
        this.callback = {
            click: callback
        }
        this.renderPotion = this.renderPotion.bind(this);
        this.fillPotionClick = this.fillPotionClick.bind(this);
    }
    renderPotion(){
        var copyColor = this.dataColor.concat();
        var potionContainer=$('<div>').addClass('potionContainer').click(this.fillPotionClick);
        for(var potioncontent = 0; potioncontent < 3; potioncontent++){
            var randomnum = Math.floor(Math.random()*this.setNum+2);
            var pIndex = Math.floor(Math.random()*copyColor.length);
            var temp=$('<div>',{
                'css':{
                    'background-color': copyColor[pIndex],
                },
                'class': 'potionslot'
            })
            var tempText = $('<p>',{ //text for change default 0
                'class': 'slotsleft ' + copyColor[pIndex] + this.player,
                'text': this.currentPotion[pIndex]
            })
            var fixedText = $('<p>',{ //text for numbers of target marbles
                'class': 'slotsleft ',
                'text': '/'+randomnum
            })
            
            this.numbers.push(randomnum);
            this.color.push(copyColor[pIndex]);
            $(temp).append(tempText, fixedText);
            potionContainer.append(temp); 
            this.dom = potionContainer;
            copyColor.splice(pIndex, 1);

        };  
        return potionContainer;
    }
    checkFilledStatus(){
        var potionNum= this.numbers;
        var filled= true;
        for(var numIndex=0; numIndex < potionNum.length; numIndex++){
            if(potionNum[numIndex] != 0){
                filled = false;
                return filled;
            }
        }
        return filled;
    }
    fillPotionClick(){

        this.callback.click(this);
    }

}