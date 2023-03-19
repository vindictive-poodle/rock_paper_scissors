'use strict';

const buttons = document.querySelectorAll('.option');
const resultsContainer = document.querySelector('.results');
const winLoseMessage = document.querySelector('.message');
const options = ['rock', 'paper', 'scissors'];
const userWin = ['rs', 'pr', 'sp'];
const ties = ['rr', 'pp', 'ss'];
const scores = { you: 0, comp: 0, draw: 0 };

// Place an event listener on each button
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const computerChoice = computerSelection();
    determineWinningCombo(event, computerChoice);
    if (gameOver()) {
      winLoseMessage.appendChild(document.createTextNode(determineGameWinner()));
      resetData();
    }
    newGameStarted();
  });
});

// Determines if game is over
//  returns true if game gameOver
//  else returns false
function gameOver () {
  let count = 0;

  for (const score in scores) {
    count += scores[score];
  }

  if (count === 5) return true;
  else return false;
}

// Checks to see if user started a new game
function newGameStarted () {
  if (winLoseMessage.textContent.length && countScores() === 1) {
    while (winLoseMessage.firstChild) winLoseMessage.removeChild(winLoseMessage.firstChild);
  }
}

// Adds up and returns score
function countScores () {
  let count = 0;

  for (const score in scores) {
    count += scores[score];
  }
  return count;
}

// Resets all data objects
function resetData () {
  for (const score in scores) {
    scores[score] = 0;
  }
}

// Determines the final game winner
//  returns string of winner
function determineGameWinner () {
  if (scores.you === scores.comp) return 'Draw';
  else if (scores.you > scores.comp) return 'You Win';
  else return 'You Lose';
}

// Compares possible winning combinations
//  updates results container html based on winning combo
function determineWinningCombo (event, computerChoice) {
  let currentPlay = event.target.textContent[0].toLowerCase();
  const resultString = event.target.textContent.toLowerCase();
  currentPlay += computerChoice[0].toLowerCase();

  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }

  resultsContainer.appendChild(document.createTextNode(resultString + ' '));
  if (userWin.includes(currentPlay)) {
    const span = createSpanElement('beats');
    resultsContainer.appendChild(span);

    scores.you += 1;
  } else if (ties.includes(currentPlay)) {
    const span = createSpanElement('ties');
    resultsContainer.appendChild(span);

    scores.draw += 1;
  } else {
    const span = createSpanElement('loses to');
    resultsContainer.appendChild(span);

    scores.comp += 1;
  }

  resultsContainer.appendChild(document.createTextNode(' ' + computerChoice));
  updateScores();
}

// Updates html values of player scores
function updateScores () {
  for (const score in scores) {
    const player = document.querySelector(`.${score}`);
    const spanElement = document.createElement('span');
    spanElement.appendChild(document.createTextNode(scores[score]));
    spanElement.setAttribute('class', 'glow');
    while (player.firstChild) player.removeChild(player.firstChild);
    player.appendChild(document.createTextNode(`${score[0].toUpperCase() + score.substring(1)}: `));
    player.appendChild(spanElement);
  }
}

// Creates and returns a span element
function createSpanElement (symbol) {
  const spanElement = document.createElement('span');
  spanElement.appendChild(document.createTextNode(symbol));
  spanElement.setAttribute('class', 'glow');

  return spanElement;
}

// Randomly chooses a play for computer and returns value
function computerSelection () {
  return options[getRandomNumber()];
}

// Generates and returns a random number
function getRandomNumber () {
  return Math.floor(Math.random() * options.length);
}

// Initial call to update scores when page loads
updateScores();
