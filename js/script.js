const maxResults = 3;
let gameResults = [];

function printMessage(msg, containerId) {
  let div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById(containerId).appendChild(div);
}

function printResults() {
  const startIndex = Math.max(0, gameResults.length - maxResults);
  const recentResults = gameResults.slice(startIndex);

  document.getElementById('game-results').innerHTML = '';

  for (const result of recentResults) {
    printMessage(result, 'game-results');
  }
}

function getMoveName(argMoveId) {
  if (argMoveId === 1) {
    return 'kamień';
  } else if (argMoveId === 2) {
    return 'papier';
  } else if (argMoveId === 3) {
    return 'nożyce';
  } else {
    return 'nieznany ruch';
  }
}

let consecutiveWins = 0;

function playFanfare(soundUrl) {
  const sound = new Audio(soundUrl);
  sound.volume = 0.5;
  sound.play();
}

function displayResult(argComputerMove, argPlayerMove) {
  let resultMessage = '';

  if (argPlayerMove === 'nieznany ruch') {
    resultMessage = 'Wprowadź poprawny ruch!';
  } else if (argComputerMove === argPlayerMove) {
    resultMessage = 'Remis!';
    gameResults.push('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove + ' - Remis!');
  } else if (
    (argComputerMove === 'kamień' && argPlayerMove === 'papier') ||
    (argComputerMove === 'papier' && argPlayerMove === 'nożyce') ||
    (argComputerMove === 'nożyce' && argPlayerMove === 'kamień')
  ) {
    resultMessage = 'Ty wygrywasz!';
    gameResults.push('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove + ' - Ty wygrywasz!');
  } else {
    resultMessage = 'Komputer wygrywa!';
    gameResults.push('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove + ' - Komputer wygrywa!');
  }

  if (gameResults.length > maxResults) {
    gameResults.shift();
  }

  printResults();
}

function playGame(playerInput) {
  console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let computerMove = getMoveName(randomNumber);

  printMessage('Mój ruch to: ' + computerMove, 'messages');
  let playerMove = getMoveName(parseInt(playerInput));
  printMessage('Twój ruch to: ' + playerMove, 'messages');

  displayResult(computerMove, playerMove);
}

document.getElementById('play-rock').addEventListener('click', function () {
  console.log('Kliknięto guzik Kamień'); 
  playGame(1);
});
document.getElementById('play-paper').addEventListener('click', function () {
  console.log('Kliknięto guzik Papier'); 
  playGame(2);
});
document.getElementById('play-scissors').addEventListener('click', function () {
  console.log('Kliknięto guzik Nożyce');
  playGame(3);
});