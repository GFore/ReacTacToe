import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TableChartIcon from '@material-ui/icons/TableChart';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';

import Board from './Board.js'
import GameInfo from './GameInfo.js'
import MoveButton from './MoveButton.js'
import Results from './Results.js'
import { colorP1, colorP2, colorTie } from './constants';
import { calculateWinner, canUseLocalStorage, initializeLocalStorage } from './utils';

const useStyles = makeStyles(() => ({
  game: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'darkslategray',
    color: 'whitesmoke',
    justifyContent: 'center',
    margin: 'auto',
    padding: 20,
  },
  gameHeader: {
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    marginBottom: 20,
    '& h1': { paddingRight: 8 },
    '& button.bottomMargin': { marginBottom: 8 },
  },
}));

if (canUseLocalStorage) initializeLocalStorage();
const initialState = {
  highlighted: Array(9).fill(false),
  history: [{squares: Array(9).fill(null)}],
  playerOneIsX: true,
  sortMovesAscending: true,
  stepNumber: 0,
  xIsNext: true,
};

const Game = () => {
  const [state, setState] = useState({
    ...initialState,
    results: { 
      p1Wins: canUseLocalStorage ? Number(localStorage.P1) : 0,
      p2Wins: canUseLocalStorage ? Number(localStorage.P2) : 0,
      ties: canUseLocalStorage ? Number(localStorage.Ties) : 0,
    },
    games: canUseLocalStorage ? JSON.parse(localStorage.Games) :
      [{
        id: 0,
        winner: '',
        squares: [],
        winningLine: '',
        results: {p1Wins: 0, p2Wins: 0, ties: 0},
      }],
  });
  const [showResults, setShowResults] = useState(true);

  const classes = useStyles();
  const hasNarrowView = useMediaQuery(theme => theme.breakpoints.down(800));
  const hasVeryNarrowView = useMediaQuery(theme => theme.breakpoints.down(325));

  const updateState = (update, resetInitial=false) => {
    setState(currentState => {
      if (resetInitial) {
        return ({
          ...currentState,
          ...initialState,
          ...update,
        });
      } else {
        return ({
          ...currentState,
          ...update,
        });
      }
    });
  };

  const clearResults = () => {
    if (window.confirm('Are you sure you want to delete the history of played games?')) {
      if(canUseLocalStorage) {
        localStorage.P1 = 0;
        localStorage.P2 = 0;
        localStorage.Ties = 0;
        localStorage.Games = JSON.stringify([{
          id: 0,
          winner: '',
          squares: [],
          winningLine: '',
          results: {p1Wins: 0, p2Wins: 0, ties: 0},
        }]);
      }
  
      setState({
        ...initialState,
        results: { p1Wins: 0, p2Wins: 0, ties: 0 },
        games: [{
          id: 0,
          winner: '',
          squares: [],
          winningLine: '',
          results: {p1Wins: 0, p2Wins: 0, ties: 0},
        }],
      });
    }
  };

  const handleClick = (i) => {
    const { stepNumber, xIsNext, games, playerOneIsX } = state;
    const history = state.history.slice(0, stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();

    // return early if someone has won the game or if a Square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    let addGame;
    let newHighlighted = Array(9).fill(false);
    let newResults = {};
    let result;
    let p1=0, p2=0, t=0;
    const winner = calculateWinner(squares);

    if (winner) {
      winner.winningLine.forEach(i => newHighlighted[i] = true);
      if (winner.player === 'X') {
        result = playerOneIsX ? 'p1Wins' : 'p2Wins';
      } else {
        result = playerOneIsX ? 'p2Wins' : 'p1Wins';
      }
      if (result === 'p1Wins') {
        p1++;
      } else {
        p2++;
      }
    } else if (!squares.includes(null)) {
      newHighlighted = Array(9).fill(true);
      result = 'ties';
      t++;
    }

    if (result) {
      const gameId = games.length;
      newResults[result] = state.results[result] + 1;
      addGame = {
        id: gameId,
        squares: squares,
        winner: result,
        winningLine: t === 0 ? winner.winningLine : null,
        results: {
          p1Wins: games[gameId-1].results.p1Wins + p1,
          p2Wins: games[gameId-1].results.p2Wins + p2,
          ties: games[gameId-1].results.ties + t}
      }

      if (canUseLocalStorage) {
        localStorage.P1 = +localStorage.P1 + p1;
        localStorage.P2 = +localStorage.P2 + p2;
        localStorage.Ties = +localStorage.Ties + t;
      }
    }

    if (addGame) {
      games.push(addGame);
      if (canUseLocalStorage) {
        localStorage.Games = JSON.stringify(games);
      }
    }

    setState(currentState => ({
      ...currentState,
      games: games,
      highlighted: newHighlighted,
      history: history.concat([{ squares: squares, pos: i }]),
      results: { ...currentState.results, ...newResults },
      stepNumber: history.length,
      xIsNext: !xIsNext,
    }));
  };

  const handleMouseOverStep = (i) => setState(currentState => {
    const newHighlighted = Array(9).fill(false);
    newHighlighted[i] = !currentState.highlighted[i];
    return ({
      ...currentState,
      highlighted: newHighlighted,
    })
  });

  const jumpTo = (step) => {
    setState(currentState => ({
      ...currentState,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    }));
  };

  const switchPlayers = () => {
    setState(currentState => ({
      ...currentState,
      xIsNext: true,
      playerOneIsX: !currentState.playerOneIsX,
    }));
  };

  const undoLastMove = () => {
    if (state.history.length > 1) {
      setState(currentState => ({
        ...currentState,
        highlighted: Array(9).fill(false),
        history: currentState.history.slice(0, currentState.history.length - 1),
        stepNumber: currentState.history.length - 2,
        xIsNext: !currentState.xIsNext,
      }));
    }
  };

  const { highlighted, history, stepNumber, playerOneIsX, xIsNext, results, games, sortMovesAscending } = state;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const colors = playerOneIsX ? { X: colorP1, O: colorP2 } : { X: colorP2, O: colorP1 };
        
  let status;
  if (winner) {
    status = `${winner.player} WINS!`;
  } else if (!current.squares.includes(null)) {
    status = `Tie!`;
    colors.X = colorTie;
    colors.O = colorTie;
  } else {
    status = `Next Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  const gameCompleted = status && !status.startsWith('Next');

  const moveBtns = history.map((step, move) => {
    if (move === 0) return null;

    return (
      <MoveButton
        key={`move_${move}`}
        handleClick={!gameCompleted ? () => jumpTo(move) : null}
        handleMouse={() => handleMouseOverStep(step.pos)}
        hoverColor={colors[step.squares[step.pos]]}
        label={`${move}. ${step.squares[step.pos]} in ${step.pos}`}
        selected={stepNumber === move}
      />
    );
  }).filter(x => x);

  const showWinner = () => {
    const newHighlighted = Array(9).fill(false);

    winner.winningLine.forEach(i => newHighlighted[i] = true);
    setState(currentState => ({
      ...currentState,
      highlighted: newHighlighted,
    }));
  };

  return (
    <React.Fragment>
      <AppBar className={classes.gameHeader} color="primary" position="static" style={hasVeryNarrowView ? { marginBottom: 10 } : null}>
        <ToolBar>
          <Grid container justifyContent={hasVeryNarrowView ? "center" : "space-between"}>
          <Typography variant="h4" component="h1" color="inherit">Reac-Tac-Toe</Typography>
          {hasNarrowView &&
            <Button color="primary" variant='contained' onClick={() => setShowResults(curr => !curr)} className={hasVeryNarrowView ? 'bottomMargin' : null}>
              {showResults ? 'Play' : 'Results'}
            </Button>
          }
          {!hasNarrowView && !showResults &&
            <IconButton color="inherit" onClick={() => setShowResults(true)} title="Show Game Results">
              <TableChartIcon />
            </IconButton>
          }
          </Grid>
        </ToolBar>
      </AppBar>
      <div className={classes.game}>
        {(!hasNarrowView || !showResults) &&
          <Board
            colors={colors}
            hasNarrowView={hasNarrowView}
            highlighted={highlighted}
            onClick={gameCompleted ? null : (i) => handleClick(i)}
            squares={current.squares}
          />
        }
        {(!hasNarrowView || !showResults) &&
          <GameInfo
            hasNarrowView={hasNarrowView}
            historyLength={history.length}
            moves={sortMovesAscending ? moveBtns : moveBtns.reverse()}
            playerOneIsX={playerOneIsX}
            sortMovesAscending={sortMovesAscending}
            status={status}
            switchPlayers={switchPlayers}
            undoLastMove={undoLastMove}
            updateState={(update, resetInitial) => updateState(update, resetInitial)}
            showWinner={winner ? () => showWinner() : null}
          />
        }
        {showResults &&
          <Results
            clearResults={clearResults}
            games={games}
            hasNarrowView={hasNarrowView}
            hasVeryNarrowView={hasVeryNarrowView}
            hideResults={() => setShowResults(false)}
            playerOneIsX={playerOneIsX}
            results={results}
          />
        }
      </div>
    </React.Fragment>
  );
};

export default Game;
