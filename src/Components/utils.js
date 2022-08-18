const storageAvailable = () => {
  // Modified from MDN code found at:
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
  let storage;
  try {
    storage = window['localStorage'];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

export const canUseLocalStorage = storageAvailable();

export const initializeLocalStorage = () => {
  // Initialize localStorage if user has not played before
  // The following if() is for handling the previous method of storing data to localStorage as 
  // separate properties and moves that existing data into a single ReacTacToe object property
  if (localStorage.P1 && localStorage.Games && !localStorage.ReacTacToe) {
    localStorage.ReacTacToe = JSON.stringify({
      P1: +localStorage.P1,
      P2: +localStorage.P2,
      Ties: +localStorage.Ties,
      Games: JSON.parse(localStorage.Games)
    });
  }

  if (!localStorage.ReacTacToe) {
    localStorage.ReacTacToe = JSON.stringify({
      P1: 0,
      P2: 0,
      Ties: 0,
      Games: [{
        id: 0,
        winner: '',
        squares: [],
        winningLine: '',
        results: {p1Wins: 0, p2Wins: 0, ties: 0},
      }]
    });
  }

  if (Object.keys(localStorage).includes("P1")) {
    // clear out old properties that are no longer used
    delete localStorage.P1;
    delete localStorage.P2;
    delete localStorage.Ties;
    delete localStorage.Games;
  }

  return JSON.parse(localStorage.ReacTacToe);
};

export const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner;
  winningLines.forEach(winningLine => {
    const [a, b, c] = winningLine;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = { player: squares[a], winningLine };
    }
  })

  return winner;
};
