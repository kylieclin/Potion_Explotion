$(document).ready(startApp);

var marbleClicked = false;
var potionClicked = true;

var newGame;
var gameData ={
    color: ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'],
    colorsInOnePotion: 3,
    setToFill: 4,
    player: 2
}

var domSelectors ={
    player0 :{
        container: '.player0-container',
        guideText: '.playerText0'
    },
    player1: {
        container: '.player1-container',
        guideText: '.playerText1'

    },
    playing: '.playing',
    pickMarbleText: 'Pick a marble to make explotion!',
    marbleClass: '.marble',
    marbleAnimation: 'marbleanima',
    gameBoard: '.board-container',
    collectBox: '.collector-box',
    resetBtn: '.reset-button'
}

function startApp(){
    newGame = new Game(gameData, domSelectors);
    newGame.createGameBoard();
    newGame.getGameRows();
    newGame.addEventListener(); 
    $('.button').click(showHideModal);
    
    
}

function showHideModal(){
    $('.popupContainer').toggleClass('hide');
}



