import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew';
import Shuffle from '@material-ui/icons/Shuffle';
import SwapVert from '@material-ui/icons/SwapVert';
import Undo from '@material-ui/icons/Undo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
  gameInfo: {
    height: 573,
    border: '4px rgba(218, 165, 32, 0.2) solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  narrowGameInfo: {
    width: '75vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gameBtnGroup: {
    margin: 0,
    '& button': { flexGrow: 1 },
    '& button:hover': { color: 'rgb(104, 101, 9)'},
  },
  grooveLeft: { borderLeft: 'groove' },
  grooveLeftShaded: { backgroundColor: '#e0e0e0 !important', borderLeft: 'groove' },
  gameStatus: {
    textAlign: 'center',
    fontSize: 20,
    padding: '0px 15px',
    '& h4': { margin: 0 },
    '& button': { padding: 2 },
  },
  narrowGameStatus: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    padding: 0,
    '& h2': { margin: '15px 0 10px' },
    '& h4': { margin: 0 },
    '& button': { padding: 2 },
  },
  moveList: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    alignContent: 'flex-start',
    fontSize: 20,
    padding: '0 15px 5px',
    '& button': { color: 'white', fontWeight: 900 },
  },
  narrowMoveList: {
    display: 'flex',
    flex: '1 1 auto',
    alignSelf: 'center',
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 120,
    width: '100%',
    marginLeft: 0,
    padding: 0,
    fontSize: 14,
    '& button': { color: 'white', fontWeight: 900, width: '33%', padding: '5px 12px' },
  },
}));

const GameInfo = ({ hasNarrowView, historyLength, moves, playerOneIsX, sortMovesAscending, status, switchPlayers, undoLastMove, updateState }) => {
  const classes = useStyles();
  const hasMoves = historyLength !== 1;
  const cannotUndo = !hasMoves || !status.startsWith('Next');
  const canSort = moves.length > 1;

  return (
    <div className={hasNarrowView ? classes.narrowGameInfo : classes.gameInfo}>
      <ButtonGroup variant="contained" className={classes.gameBtnGroup}>
        <Button title="Start New Game" onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}>
          <Power />
        </Button>
        <Button
          className={cannotUndo ? classes.grooveLeftShaded : classes.grooveLeft}
          title="Undo Last Move"
          onClick={undoLastMove}
          disabled={cannotUndo}
        >
          <Undo />
        </Button>
        <Button
          className={hasMoves ? classes.grooveLeftShaded : classes.grooveLeft}
          title="Switch Players"
          onClick={switchPlayers}
          disabled={hasMoves}
        >
          <Shuffle />
        </Button>
      </ButtonGroup>
      <div className={hasNarrowView ? classes.narrowGameStatus : classes.gameStatus}>
        <h2>{status}</h2>
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}><h4>Moves</h4></Grid>
          <Grid item xs={3} container justifyContent='flex-end'>
            {canSort &&
              <IconButton
                color="inherit"
                disabled={!hasMoves}
                onClick={() => updateState({sortMovesAscending: !sortMovesAscending})}
                title={sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
              >
                <SwapVert />
              </IconButton>
            }
          </Grid>
        </Grid>
      </div>
      <div className={hasNarrowView ? classes.narrowMoveList : classes.moveList}>
        {moves}
      </div>
    </div>
  );
};

export default GameInfo;
