function printMessage(msg) {
  let div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById('messages').appendChild(div);
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
let gameResults = []; // Przechowywanie wyników gry

function playFanfare(soundUrl) {
  const sound = new Audio(soundUrl);
  sound.volume = 0.5;
  sound.play();
}

function displayResults() {
  document.getElementById('messages').innerHTML = ''; // Wyczyszczenie wyników przed wyświetleniem nowych

  let startIndex = Math.max(0, gameResults.length - 3); // Indeks początkowy
  for (let i = startIndex; i < gameResults.length; i++) {
    printMessage(gameResults[i]);
  }
}

function displayResult(argComputerMove, argPlayerMove) {
  let resultMessage = 'Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove;

  if (argPlayerMove === 'nieznany ruch') {
    resultMessage = 'Wprowadź poprawny ruch!';
  } else if (argComputerMove === argPlayerMove) {
    resultMessage = 'Remis!';
  } else if (
    (argComputerMove === 'kamień' && argPlayerMove === 'papier') ||
    (argComputerMove === 'papier' && argPlayerMove === 'nożyce') ||
    (argComputerMove === 'nożyce' && argPlayerMove === 'kamień')
  ) {
    consecutiveWins++;
    resultMessage = 'Ty wygrywasz!';

    if (consecutiveWins === 2) {
      playFanfare('https://drive.google.com/uc?id=1G9Y1plAw_x3hC0ialxYqBtMLBmqo1EEW');
      consecutiveWins = 0;
    }
  } else {
    consecutiveWins = 0;
    resultMessage = 'Komputer wygrywa!';
  }

  gameResults.push(resultMessage); // Dodanie wyniku do tablicy wyników
  displayResults(); // Wyświetlenie trzech ostatnich wyników
}

function playGame(playerInput) {
  console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let computerMove = getMoveName(randomNumber);

  let playerMove = getMoveName(parseInt(playerInput));

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