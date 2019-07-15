$(document).ready(startApp);

var marbleClicked = false;
var potionClicked = true;

var newGame;
var gameData ={
    color: ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'],
    colorsInOnePotion: 3,
    setToFill: 1,
    player: 2,
    winGame: 3
}

var domSelectors ={
    player0 :{
        container: '.player0-container',
        guideText: '.guideBox0'
    },
    player1: {
        container: '.player1-container',
        guideText: '.guideBox1'

    },
    playerText: '.playerText',
    playing: 'playing',
    pickMarbleText: 'Pick a marble to make explotion!',
    marbleClass: '.marble',
    marbleAnimation: 'marbleanima',
    gameBoard: '.board-container',
    collectBox: '.collector-box',
    resetBtn: '.reset-button',
    scoreA: '.scoreA',
    scoreB: '.scoreB'
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
