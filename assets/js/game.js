
class Game{
    constructor(dataObj, domElement){
        // this.player = potionData.player; //temp
        // this.potionData = potionData;
        // this.playerpotions=[];
        this.data = dataObj;
        this.dispenser = null;
        this.dispenserContainerDom=$('.board-container');
        this.totalRows = null;
        
        this.players = [];
        this.reset = this.reset.bind(this);
        this.audio = new Audio('sound/clap.mp3');
     
        this.passCollectMarbles = this.passCollectMarbles.bind(this);
        this.returnMarbles = this.returnMarbles.bind(this);   
        this.callBacksForPlayer ={
            returnMarbles: this.returnMarbles,
            getMarbles: this.passCollectMarbles
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
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    checkWin(checkFilled){
        if(checkFilled){
            $('#modal').toggleClass('hide');
            this.audio.play();
        }
    }
    changePlayer(potion){

        $('.player-area .playing').css('pointer-events', 'none');
        var player = potion.player;
        var currentPlay = '.player'+player+'-container';
        var currentText = '.playerText'+player;
        if(player === 0){
            var nextPlay = '.player1-container';
            var nexttext = '.playerText1';
        } else {
            var nextPlay = '.player0-container';
            var nexttext = '.playerText0';
        }
        $(currentText).css('visibility', 'hidden').text('Pick a marble to make explotion!');
        $(nexttext).css('visibility', 'visible').text('Pick a marble to make explotion!');
        $(currentPlay).css({
                'opacity': '0.5'
            }).toggleClass('playing');
    
        $(nextPlay).css({
            'opacity': '1'
        }).toggleClass('playing');
        $('.marble').toggleClass('marbleanima');
        $('.board-container').css('pointer-events', 'auto');
        $('.collector-box').empty();
    }
    selectPlay(){
        var nextplayer = Math.floor(Math.random()*this.player);
        var nextPlay = '.player'+nextplayer+'-container';
        $(nextPlay).css({
            'opacity': '0.5',
            'pointer-events': 'none'
        }).toggleClass('playing');
        var text = '.playerText'+ nextplayer;
        $(text).css('visibility', 'hidden');
        $('.player-area').css('pointer-events', 'none');
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







