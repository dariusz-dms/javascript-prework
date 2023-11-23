function printMessage(msg) {
  let div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById('messages').appendChild(div);
  document.getElementById('play-fanfare').addEventListener('click', function () {
    playFanfare('https://pixabay.com/pl/sound-effects/success-fanfare-trumpets-6185/');
  });
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

let playerWins = 0; // Licznik zwycięstw gracza

function playFanfare(soundUrl) {
  const sound = new Audio(soundUrl);
  sound.volume = 0.5;
  sound.play();
}

function displayResult(argComputerMove, argPlayerMove) {
  printMessage('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove);

  if (argPlayerMove === 'nieznany ruch') {
    printMessage('Wprowadź poprawny ruch!');
  } else if (argComputerMove === argPlayerMove) {
    printMessage('Remis!');
  } else if (
    (argComputerMove === 'kamień' && argPlayerMove === 'papier') ||
    (argComputerMove === 'papier' && argPlayerMove === 'nożyce') ||
    (argComputerMove === 'nożyce' && argPlayerMove === 'kamień')
  ) {
    playerWins++;
    printMessage('Ty wygrywasz!');
    if (playerWins === 1) {
      playFanfare('https://pixabay.com/pl/sound-effects/success-fanfare-trumpets-6185/');
      playerWins = 0; // Zresetowanie licznika zwycięstw gracza
    }
  } else {
    playerWins = 0; // Zresetowanie licznika zwycięstw gracza, jeśli przegra lub jest remis
    printMessage('Komputer wygrywa!');
  }
}

function playGame(playerInput) {
  console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let computerMove = getMoveName(randomNumber);

  printMessage('Mój ruch to: ' + computerMove);
  let playerMove = getMoveName(parseInt(playerInput));
  printMessage('Twój ruch to: ' + playerMove);

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