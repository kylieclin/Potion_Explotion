$(document).ready(startApp);

var currPlayer = 'A';
var currPlayerDone = false;

var newGame;
var data ={
    color: ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'],
    initial:  [0,0,0,0],
    colorsInOnePotion: 3,
    setToFill: 4,
    player: 2
}

function startApp(){
    newGame = new Game(data);
    newGame.createGameBoard();
    newGame.getGameRows();
    $('.button').click(showHideModal);
    newGame.addEventListener(); 
    
}

function showHideModal(){
    $('.popupContainer').toggleClass('hide');
}



