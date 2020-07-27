/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//                                 State Variable
var scores, reoundScore, activePlayer, gameplaying;

var prevRoundScore;

init();

gameplaying = true;

//1. textContent without html
// document.querySelector("#current-" + activePlayer).textContent = dice;

//2. innerHTML with html
// document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//Change document.css
document.querySelector(".dice").style.display = "none";

//Roll Dice Event!!!!!!!
//                                                       Anonymous function
document.querySelector(".btn-roll").addEventListener("click", rollDice);

document.getElementById("dice-1").addEventListener("click", rollDice);

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gameplaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI Interface
        var dom_scores = document.querySelector("#score-" + activePlayer);

        dom_scores.textContent = scores[activePlayer];

        //***FEATURE 2*** Player can change the final score in the middle of the game.
        var input_value = document.querySelector(".final-score").value;
        var winning_score;
        //Undefined, 0, null or "" are COERCED to false, otherwise true
        if(input_value) {
            winning_score = input_value;
        } else if(input_value > 999) {
            winning_score = 100;
        }
        else {
            winning_score = 100;
        }

        //Check If Player wins the game
        if(scores[activePlayer] >= winning_score) {
            //Player wins

            gameplaying = false;

            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            //Next Player
            keepDice_nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {

    //reset previous value for both players
    prevRoundScore = [0, 0];

    //Next Player

    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    roundScore = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

function keepDice_nextPlayer() {

    //reset previous value for both players
    prevRoundScore = [0, 0];

    //Next Player
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    roundScore = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
    gameplaying = true;

    scores = [0, 0];
    roundScore = 0;
    prevRoundScore = [0, 0];
    activePlayer = 0; //0 is the first player and 1 will be the second.

    //DOM UI Data
    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.getElementById("name-0").textContent = "Player1";
    document.getElementById("name-1").textContent = "Player2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

    gameplaing = true;
}

function eraseOnePlayerScores() {
    scores[activePlayer] = 0;
    document.getElementById("score-" + activePlayer).textContent = 0;


    document.getElementById("current-" + activePlayer).textContent = 0;
}


function rollDice() {
    if(gameplaying) {
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        //3. Update the round score IF the rolled numer was NOT 1
        var dom_RoundScore = document.getElementById("current-" + activePlayer);

        if(dice !== 1) {
            //Challenger 1: if prev roll add this roll = 8, then erase all
            //of the active player's scores
            if(prevRoundScore[activePlayer] + dice === 8) {
                eraseOnePlayerScores();

                keepDice_nextPlayer();
            } else {
                //Add score
                roundScore += dice;

                prevRoundScore[activePlayer] = dice;

                dom_RoundScore.textContent = roundScore;
            }
        } else {
            keepDice_nextPlayer();
        }
    }
}