$(document).ready(startApp);

var currPlayer = 'A';
var currPlayerDone = false;

var newGame;
var potion ={
    color: ['crimson', 'Gold', 'DodgerBlue', 'DarkSlateGray'],
    setnum: 4,
    player: 2
}

function startApp(){
    newGame = new Game(potion);
    newGame.createGameBoard();
    newGame.getGameRows();
    $('.button').click(showHideModal);
    newGame.addEventListener(); 
}

function showHideModal(){
    $('.popupContainer').toggleClass('hide');
}



