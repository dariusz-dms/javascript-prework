{
  const maxResults = 3;

  {
    const gameResults = [];
    const movesHistory = [];

    const printMessage = (msg, containerId) => {
      const createDiv = () => {
        const div = document.createElement('div');
        div.innerHTML = msg;
        document.getElementById(containerId).appendChild(div);
      };
      createDiv();
    };

    const printResults = () => {
      const startIndex = Math.max(0, gameResults.length - maxResults);
      const recentResults = gameResults.slice(startIndex);
      
      document.getElementById('game-results').innerHTML = '';
      
      for (const result of recentResults) {
        printMessage(result, 'game-results');
      }
    };

    const printMovesHistory = () => {
      const getRecentMoves = () => {
        const startIndex = Math.max(0, movesHistory.length - maxResults);
        return movesHistory.slice(startIndex);
      };

      const recentMoves = getRecentMoves();

      const displayMovesHistory = () => {
        document.getElementById('moves-history').innerHTML = '';
        for (const move of recentMoves) {
          printMessage(move, 'moves-history');
        }
      };
      displayMovesHistory();
    };

    const getMoveName = (argMoveId) => {
      const getMoveType = () => {
        switch (argMoveId) {
          case 1:
            return 'kamień';
          case 2:
            return 'papier';
          case 3:
            return 'nożyce';
          default:
            return 'nieznany ruch';
        }
      };
      return getMoveType();
    };

    let consecutiveWins = 0;

    const playFanfare = (soundUrl) => {
      const playSound = () => {
        const sound = new Audio(soundUrl);
        sound.volume = 0.5;
        sound.play();
      };
      playSound();
    };

    const displayResult = (argComputerMove, argPlayerMove) => {
      const moveMsg = `Mój ruch to: ${argComputerMove}, Twój ruch to: ${argPlayerMove}`;
      movesHistory.push(moveMsg);
      printMovesHistory();

      if (argPlayerMove === 'nieznany ruch') {
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
    };

    const playGame = (playerInput) => {
      console.log('Wywołano funkcję playGame. Gracz wybrał: ' + playerInput);
      const randomNumber = Math.floor(Math.random() * 3 + 1);
      const computerMove = getMoveName(randomNumber);

      printMessage(`Mój ruch to: ${computerMove}`, 'moves-history');
      const playerMove = getMoveName(parseInt(playerInput));
      printMessage(`Twój ruch to: ${playerMove}`, 'moves-history');

      displayResult(computerMove, playerMove);
    };

    document.getElementById('play-rock').addEventListener('click', () => {
      console.log('Kliknięto guzik Kamień');
      playGame(1);
    });

    document.getElementById('play-paper').addEventListener('click', () => {
      console.log('Kliknięto guzik Papier');
      playGame(2);
    });

    document.getElementById('play-scissors').addEventListener('click', () => {
      console.log('Kliknięto guzik Nożyce');
      playGame(3);
    });
  }
}