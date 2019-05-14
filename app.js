/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScores, activePlayer, gamePlaying, prevDice;

init();

 
document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying){
    if(prevDice.length > 1){
      prevDice.shift();
    }
    var dice = Math.floor(Math.random() * 6) +1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if(dice === prevDice[0] && dice === 6){
      prevDice.pop();
      nextPlayer()
      console.log('2 6 in a row!');
    }
    else if(dice !== 1) {
      roundScores += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScores;
      prevDice.push(dice);
      console.log(prevDice);
    } else {
      nextPlayer();
    }
  }
});

 document.querySelector('.btn-hold').addEventListener('click', function(){
   if (gamePlaying){
     scores[activePlayer] += roundScores;
     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
     if(scores[activePlayer] >= document.getElementById("winningScore").value){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
   }
 });
 
 document.querySelector('.btn-new').addEventListener('click', init);
 
 function init(){
   scores = [0,0];
   roundScores = 0;
   activePlayer = 0;
   prevDice = [];
   gamePlaying = true;
   document.querySelector('.dice').style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
 }

 function nextPlayer(){
   prevDice = [];
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScores = 0;
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-0-panel').classList.toggle('active'); 
   document.querySelector('.player-1-panel').classList.toggle('active');
   setTimeout(function(){ document.querySelector('.dice').style.display = 'none'; }, 500);
   
 }

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice '</em>';
