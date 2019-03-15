
class Game{
    constructor(dataObj, domSelectors){
        this.data = dataObj;        
        this.domSelectors = domSelectors;
        this.dispenser = null;
        this.totalRows = null;
        this.players = [];
        this.playing = null;
        this.audio = new Audio('sound/clap.mp3');
//================== BIND ==================//
        this.reset = this.reset.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.passCollectMarbles = this.passCollectMarbles.bind(this);
        this.returnMarbles = this.returnMarbles.bind(this);  
        this.changePlayer = this.changePlayer.bind(this);
        this.domForCollectMarbles = this.domForCollectMarbles.bind(this);
        this.addBadge = this.addBadge.bind(this);
//================== CALLBACKS ==================//
        this.callBacksForPlayer ={
            returnMarbles: this.returnMarbles,
            getMarbles: this.passCollectMarbles,
            checkWin: this.checkWin,
            changePlayer: this.changePlayer,
            addBadge: this.addBadge
        }
    }
    createPlayer(){
        for(var player = 0; player < this.data.player; player++){
            var newPlayer = new Player(this.data, player, this.callBacksForPlayer);
            newPlayer.generatePotion();
            this.players.push(newPlayer);
        }
    }
    passCollectMarbles(player){
        debugger;
        if(player === this.playing){
            potionClicked= true;
            marbleClicked = false;
            return this.dispenser.collectedMarbles;
        } else {
            console.log('its not your turn!');
        }
    }
    returnMarbles(marbles){
        this.dispenser.returnMarblesToRow(marbles);
    }
    createGameBoard(){
        debugger;
        this.dispenser = new Dispenser(5, this.domForCollectMarbles);
        $(this.domSelectors.gameBoard).append(this.dispenser.render());
        this.dispenser.determineMarblesInRowAmount();
        this.createPlayer();
        this.selectPlay();
    }
    getGameRows(){
        this.totalRows =this.dispenser.getRows();
    }
    addBadge(player){
        var badge = $('<img>').attr('src', 'image/badge.png').addClass('badge')
        if(player === 0){
            $(this.domSelectors.scoreA).append(badge);
        } else {
            $(this.domSelectors.scoreB).append(badge);
        }
    }
    checkWin(score){
        if(score === 2){
            $('#modal').toggleClass('hide');
            this.audio.play();
            console.log('win');

        }
    }
    changePlayer(potion){
        if(potion.player === 0){
            var currentPlay = $(this.domSelectors.player0.container);
            var currentText = $(this.domSelectors.player0.guideText);
            var nextPlay = $(this.domSelectors.player1.container);
            var nexttext = $(this.domSelectors.player1.guideText);
            this.playing = 1;
        } else {
            var currentPlay = $(this.domSelectors.player1.container);
            var currentText = $(this.domSelectors.player1.guideText);
            var nextPlay = $(this.domSelectors.player0.container);
            var nexttext = $(this.domSelectors.player0.guideText);
            this.playing = 0;
        }
        currentText.hide().text(this.domSelectors.pickMarbleText);
        nexttext.show('slow').text(this.domSelectors.pickMarbleText);
        currentPlay.fadeTo('slow','0.5').toggleClass(this.domSelectors.playing);
        nextPlay.fadeTo('slow','1').toggleClass(this.domSelectors.playing);
        $(this.domSelectors.marbleClass).toggleClass(this.domSelectors.marbleAnimation);
        $(this.domSelectors.collectBox).empty();
    }
    selectPlay(){
        debugger;
        var nextplayer = Math.floor(Math.random()*this.data.player);
        if(nextplayer === 0){
            $(this.domSelectors.player0.container).fadeTo('slow', '0.5').toggleClass(this.domSelectors.playing);
            $(this.domSelectors.player0.guideText).hide();
            this.playing = 1;
        } else {
            $(this.domSelectors.player1.container).fadeTo('slow', '0.5').toggleClass(this.domSelectors.playing);
            $(this.domSelectors.player1.guideText).hide();
            this.playing = 0;
        }
    }
    domForCollectMarbles(){
        debugger;
        var marblesArr = this.dispenser.collectedMarbles;
        for(var colorIndex = 0 ; colorIndex < marblesArr.length; colorIndex++){
            var colorDiv = $('<div>',{
                css:{
                    'background-color' : marblesArr[colorIndex].marbleColor,
                },
                class: 'collectedMarbles'
            })
            $(this.domSelectors.collectBox).append(colorDiv);
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







