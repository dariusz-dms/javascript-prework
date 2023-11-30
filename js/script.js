{
  const maxResults = 3;
  const MOVE_ROCK = 1;
  const MOVE_PAPER = 2;
  const MOVE_SCISSORS = 3;
  const UNKNOWN_MOVE = 'nieznany ruch';

  let gameResults = [];
  let movesHistory = [];

  function printMessage(msg, containerId) {
    const div = document.createElement('div');
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

  function printMovesHistory() {
    const startIndex = Math.max(0, movesHistory.length - maxResults);
    const recentMoves = movesHistory.slice(startIndex);

    document.getElementById('moves-history').innerHTML = '';

    for (const move of recentMoves) {
      printMessage(move, 'moves-history');
    }
  }

  function getMoveName(argMoveId) {
    switch (argMoveId) {
      case MOVE_ROCK:
        return 'kamień';
      case MOVE_PAPER:
        return 'papier';
      case MOVE_SCISSORS:
        return 'nożyce';
      default:
        return UNKNOWN_MOVE;
    }
  }

  let consecutiveWins = 0;

  function playFanfare(soundUrl) {
    const sound = new Audio(soundUrl);
    sound.volume = 0.5;
    sound.play();
  }

  function displayResult(argComputerMove, argPlayerMove) {
    const moveMsg = `Mój ruch to: ${argComputerMove}, Twój ruch to: ${argPlayerMove}`;
    movesHistory.push(moveMsg);
    printMovesHistory();

    if (argPlayerMove === UNKNOWN_MOVE) {
      gameResults.push('Wprowadź poprawny ruch!');
    } else if (argComputerMove === argPlayerMove) {
      gameResults.push('Remis!');
    } else if (
      (argComputerMove === 'kamień' && argPlayerMove === 'papier') ||
      (argComputerMove === 'papier' && argPlayerMove === 'nożyce') ||
      (argComputerMove === 'nożyce' && argPlayerMove === 'kamień')
    ) {
      consecutiveWins++;
      gameResults.push('Ty wygrywasz!');

      if (consecutiveWins === 2) {
        playFanfare('https://drive.google.com/uc?id=1G9Y1plAw_x3hC0ialxYqBtMLBmqo1EEW');
        consecutiveWins = 0;
      }
    } else {
      consecutiveWins = 0;
      gameResults.push('Komputer wygrywa!');
    }

    if (gameResults.length > maxResults) {
      gameResults.shift();
    }

    printResults();
  }

  function playGame(playerInput) {
    console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
    const randomNumber = Math.floor(Math.random() * 3 + 1);
    const computerMove = getMoveName(randomNumber);

    printMessage(`Mój ruch to: ${computerMove}`, 'moves-history');
    const playerMove = getMoveName(parseInt(playerInput));
    printMessage(`Twój ruch to: ${playerMove}`, 'moves-history');

    displayResult(computerMove, playerMove);

    printResults();
    printMovesHistory();
  }

  document.getElementById('play-rock').addEventListener('click', function () {
    console.log('Kliknięto guzik Kamień');
    playGame(MOVE_ROCK);
  });
  document.getElementById('play-paper').addEventListener('click', function () {
    console.log('Kliknięto guzik Papier');
    playGame(MOVE_PAPER);
  });
  document.getElementById('play-scissors').addEventListener('click', function () {
    console.log('Kliknięto guzik Nożyce');
    playGame(MOVE_SCISSORS);
  });
}