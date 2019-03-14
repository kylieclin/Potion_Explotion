
class Game{
    constructor(dataObj, domSelectors){
        // this.player = potionData.player; //temp
        // this.potionData = potionData;
        // this.playerpotions=[];
        this.data = dataObj;
        this.dispenser = null;
        this.dispenserContainerDom=$('.board-container');
        this.totalRows = null;
        this.domSelectors = domSelectors;
        this.players = [];
        this.reset = this.reset.bind(this);
        this.audio = new Audio('sound/clap.mp3');
        this.checkWin = this.checkWin.bind(this);
        this.passCollectMarbles = this.passCollectMarbles.bind(this);
        this.returnMarbles = this.returnMarbles.bind(this);  
        this.changePlayer = this.changePlayer.bind(this); 
        this.callBacksForPlayer ={
            returnMarbles: this.returnMarbles,
            getMarbles: this.passCollectMarbles,
            checkWin: this.checkWin,
            changePlayer: this.changePlayer
        }
    }
    createPlayer(){
        for(var player = 0; player < this.data.player; player++){
            var newPlayer = new Player(this.data, player, this.callBacksForPlayer);
            newPlayer.generatePotion();
            this.players.push(newPlayer);
            console.log(this.players);
        }
    }
    passCollectMarbles(){
        return this.dispenser.collectedMarbles;
    }
    returnMarbles(marbles){
        this.dispenser.returnMarblesToRow(marbles);
    }
    createGameBoard(){
        this.dispenser = new Dispenser(5, this.domForCollectMarbles);
        this.dispenserContainerDom.append(this.dispenser.render());
        this.dispenser.determineMarblesInRowAmount();
        this.createPlayer();
        this.selectPlay();
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    checkWin(checkFilled){
        if(checkFilled){
            // $('#modal').toggleClass('hide');
            // this.audio.play();
            console.log('win');
        }
    }
    changePlayer(potion){
debugger;
        var player = potion.player;
        // $(this.domSelectors.playing).off('click')
        if(player === 0){
            var currentPlay = $(this.domSelectors.player0.container);
            var currentText = $(this.domSelectors.player0.guideText);
            var nextPlay = $(this.domSelectors.player1.container);
            var nexttext = $(this.domSelectors.player1.guideText);
        } else {
            var currentPlay = $(this.domSelectors.player1.container);
            var currentText = $(this.domSelectors.player1.guideText);
            var nextPlay = $(this.domSelectors.player0.container);
            var nexttext = $(this.domSelectors.player0.guideText);
        }
        currentText.css('visibility', 'hidden').text(this.domSelectors.pickMarbleText);
        nexttext.css('visibility', 'visible').text(this.domSelectors.pickMarbleText);
        currentPlay.css('opacity','0.5').toggleClass(this.domSelectors.playing);
        nextPlay.css('opacity','1').toggleClass(this.domSelectors.playing);
        $(this.domSelectors.marbleClass).toggleClass(this.domSelectors.marbleAnimation);
        // $(this.domSelectors.marbleClass).on('click', this);
        $(this.domSelectors.collectBox).empty();
        potionClicked= true;
        marbleClicked = false;
    }
    selectPlay(){
        debugger;
        var nextplayer = Math.floor(Math.random()*this.data.player);
        var nextPlay = '.player'+nextplayer+'-container';
        $(nextPlay).css({
            'opacity': '0.5'
        }).toggleClass('playing');
        var text = '.playerText'+ nextplayer;
        $(text).css('visibility', 'hidden');
    }
    domForCollectMarbles(){
        var marblesArr = this.collectedMarbles;
        for(var colorIndex = 0 ; colorIndex < marblesArr.length; colorIndex++){
            var colorDiv = $('<div>',{
                css:{
                    'background-color' : marblesArr[colorIndex].marbleColor,
                },
                class: 'collectedMarbles'
            })
            $('.collector-box').append(colorDiv);
        }
    }
    addEventListener(){
        $('.reset-button').click(this.reset);
    }
    reset(){
        location.reload();
        $('#modal').toggleClass('hide');
    }
}







