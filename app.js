/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0,0];
let roundScore = 0;
let activePlayer = 0;
let rollButton = document.querySelector('.btn-roll')
let holdButton = document.querySelector('.btn-hold')
let newGameButton = document.querySelector('.btn-new')
let diceImage = document.querySelector('.dice')
let playerCurrent = document.querySelector(`#current-${activePlayer}`)
let playerScore = document.querySelector(`#score-${activePlayer}`)  
let playerMarker1 = document.getElementsByClassName(`player-0-panel`)
let playerMarker2 = document.getElementsByClassName(`player-1-panel`)
let playerName = document.querySelector(`#name-${activePlayer}`)

diceImage.style.display = 'none';

function checkWinner(playerNumber) {
    if (scores[playerNumber] >= 50) {
        playerName = document.querySelector(`#name-${playerNumber}`)
        playerName.innerHTML = 'WINNER!'
        rollButton.disabled = true;
        holdButton.disabled = true;
        changePlayer();
     }
     
}
function changePlayer(){
    playerCurrent = document.querySelector(`#current-${activePlayer}`)
    playerScore = document.querySelector(`#score-${activePlayer}`) 
    playerMarker1[0].classList.toggle('active')
    playerMarker2[0].classList.toggle('active')
    playerCurrent.innerHTML = 0
    diceImage.style.display = 'none';
}

function diceRolled() {
    let dice = Math.floor(Math.random() * 6) + 1
    console.log(dice)
    diceImage.src = `dice-${dice}.png`
    diceImage.style.display = 'block';

    if (dice === 1){
        playerCurrent.innerHTML = 0
        console.log('round lost')
        activePlayer = 1 - activePlayer
        roundScore = 0
        changePlayer();

        console.log(`New player is ${activePlayer}`)
        return;
    }
    roundScore += dice
    playerCurrent.innerHTML = roundScore
}
function holdClicked(){
    scores[activePlayer] += roundScore
    playerScore.innerHTML = scores[activePlayer]
    checkWinner(activePlayer);
    activePlayer = 1 - activePlayer
    roundScore = 0
    
    changePlayer();
    
    
    console.log(scores)
}






rollButton.addEventListener('click', diceRolled)
holdButton.addEventListener('click', holdClicked)
newGameButton.addEventListener('click', () => window.location.reload(false))



