class Potion{
    constructor(data, player, callback){
        this.initialPotion = data.initial;
        this.dataColor = data.color;
        this.setToFill = data.setToFill;
        this.colorsInOnePotion = data.colorsInOnePotion;
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
        for(var potioncontent = 0; potioncontent < this.colorsInOnePotion; potioncontent++){
            var randomnum = Math.floor(Math.random()* this.setToFill + 2);
            var pIndex = Math.floor(Math.random()*copyColor.length);
            var temp=$('<div>',{
                'css':{
                    'background-color': copyColor[pIndex],
                },
                'class': 'potionslot'
            })
            var tempText = $('<p>',{ //text for change default 0
                'class': 'slotsleft ' + copyColor[pIndex] + this.player,
                'text': this.initialPotion[pIndex]
            })
            var fixedText = $('<p>',{ //text for numbers of target marbles
                'class': 'slotsleft ',
                'text': '/'+ randomnum
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
    checkFilledStatus(){ //need to change
        var filled= false;
        var fullpotion = 0;
        for(var numIndex=0; numIndex < this.numbers.length; numIndex++){
            if(this.numbers[numIndex] === this.initialPotion[numIndex]){
                fullpotion++;
            }
        }
        if(fullpotion === this.colorsInOnePotion){
            filled = true;
        }
        return filled;
    }
    fillPotionClick(){
        this.callback.click(this);
    }

}