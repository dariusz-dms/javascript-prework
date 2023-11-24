function removePreviousResult() {
    let gameResults = document.getElementById('game-results');
    let results = gameResults.children;
    
    if (results.length >= 2) {
      let previousResult = results[results.length - 2];
      gameResults.removeChild(previousResult);
    }
  }