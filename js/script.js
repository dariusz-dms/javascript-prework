function printMessage(msg, containerId) {
  let div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById(containerId).appendChild(div);
}

let consecutiveWins = 0;
let gameResults = [];

function playFanfare(soundUrl) {
  const sound = new Audio(soundUrl);
  sound.volume = 0.5;
  sound.play();
}

function displayResults() {
  document.getElementById('game-results').innerHTML = '';

  let startIndex = Math.max(0, gameResults.length - 3);
  for (let i = startIndex; i < gameResults.length; i++) {
    printMessage(gameResults[i], 'game-results');
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

  gameResults.push(resultMessage);
  displayResults();
}

function playGame(playerInput) {
  console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);

  if (!isNaN(parseInt(playerInput)) && parseInt(playerInput) >= 1 && parseInt(playerInput) <= 3) {
    let randomNumber = Math.floor(Math.random() * 3 + 1);
    let computerMove = getMoveName(randomNumber);
    let playerMove = getMoveName(parseInt(playerInput));
    displayResult(computerMove, playerMove);
  } else {
    console.log('Wprowadź poprawny ruch (1 - kamień, 2 - papier, 3 - nożyce)');
  }
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
Teraz funkcja playGame() sprawdza, czy wartość playerInput jest liczbą i czy mieści się w zakresie od 1 do 3 przed wywołaniem gry. Jeśli wartość jest spoza tego zakresu lub nie jest liczbą, wyświetli komunikat w konsoli, informujący użytkownika o konieczności wprowadzenia poprawnego ruchu.




User
wprowdz poprawki w ktorych zawsze bedzie liczba w zakresie od 1 do 3
ChatGPT
Oczywiście, można dodać obsługę takiej sytuacji. Możemy zastosować funkcję prompt() do pobrania danych od użytkownika w sposób bardziej interaktywny. Poniżej masz poprawiony kod:

javascript
Copy code
function printMessage(msg, containerId) {
  let div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById(containerId).appendChild(div);
}

let consecutiveWins = 0;
let gameResults = [];

function playFanfare(soundUrl) {
  const sound = new Audio(soundUrl);
  sound.volume = 0.5;
  sound.play();
}

function displayResults() {
  document.getElementById('game-results').innerHTML = '';

  let startIndex = Math.max(0, gameResults.length - 3);
  for (let i = startIndex; i < gameResults.length; i++) {
    printMessage(gameResults[i], 'game-results');
  }
}

function displayResult(argComputerMove, argPlayerMove) {
  let resultMessage = 'Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove;

  if (argComputerMove === argPlayerMove) {
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

  gameResults.push(resultMessage);
  displayResults();
}

function playGame(playerInput) {
  console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
  
  if (!isNaN(parseInt(playerInput)) && parseInt(playerInput) >= 1 && parseInt(playerInput) <= 3) {
    let randomNumber = Math.floor(Math.random() * 3 + 1);
    let computerMove = getMoveName(randomNumber);
    let playerMove = getMoveName(parseInt(playerInput));
    displayResult(computerMove, playerMove);
  } else {
    console.log('Wprowadź poprawny ruch (1 - kamień, 2 - papier, 3 - nożyce)');
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

function promptUser() {
  let playerInput = prompt('Wprowadź swój ruch: 1 - kamień, 2 - papier, 3 - nożyce');

  if (playerInput !== null) {
    playGame(playerInput);
  }
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

promptUser();