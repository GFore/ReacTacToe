import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew';
import SwapVert from '@material-ui/icons/SwapVert';
import Undo from '@material-ui/icons/Undo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { colorP1, colorP2 } from './constants';

const useStyles = makeStyles(() => ({
  gameInfo: {
    border: '4px rgba(218, 165, 32, 0.2) solid',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 300,
    marginBottom: 20,
  },
  narrowGameInfo: {
    width: 'clamp(270px, 75vw, 510px)',
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
    '& h2': { fontSize: 'clamp(28px, 8vw, 45px)', margin: '15px 0 10px' },
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
    '& button.selectedP1': { border: '1px solid gray', backgroundColor: colorP1 },
    '& button.selectedP2': { border: '1px solid gray', backgroundColor: colorP2 },
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
    '& button.selectedP1': { border: '1px solid gray', backgroundColor: colorP1 },
    '& button.selectedP2': { border: '1px solid gray', backgroundColor: colorP2 },
  },
}));

const GameInfo = ({ hasNarrowView, historyLength, moves, playerOneIsX, showWinner, sortMovesAscending, status, switchPlayers, undoLastMove, updateState }) => {
  const classes = useStyles();
  const hasMoves = historyLength !== 1;
  const cannotUndo = !hasMoves || !status.startsWith('Next');
  const canSort = moves.length > 1;

  return (
    <div className={hasNarrowView ? classes.narrowGameInfo : classes.gameInfo}>
      <ButtonGroup variant="contained" className={classes.gameBtnGroup}>
        <Button
          title="Start New Game"
          onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}
          startIcon={<Power />}
        >
          New Game
        </Button>
        <Button
          className={cannotUndo ? classes.grooveLeftShaded : classes.grooveLeft}
          title="Undo Move"
          onClick={undoLastMove}
          disabled={cannotUndo}
          startIcon={<Undo />}
        >
          Undo Move
        </Button>
      </ButtonGroup>
      <div className={hasNarrowView ? classes.narrowGameStatus : classes.gameStatus}>
        <h2 onClick={showWinner ? () => showWinner() : null} style={showWinner ? { cursor: 'pointer' } : null}>{status}</h2>
        {moves.length > 0 ?
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
          :
          <Button
            title={`Set ${playerOneIsX ? 'Player 2' : 'Player 1'} to X`}
            onClick={switchPlayers}
            variant="contained"
            color="primary"
          >
            <Grid container direction='column' style={{ padding: 10 }}>
              <Grid item style={{ fontSize: '1rem' }}>{`Player 1: ${playerOneIsX ? 'X' : 'O'}`}</Grid>
              <Grid item style={{ fontSize: '1rem' }}>{`Player 2: ${playerOneIsX ? 'O' : 'X'}`}</Grid>
              <Grid item style={{ fontSize: '.75rem' }}>{`(${hasNarrowView ? 'tap' : 'click'} to swap sides)`}</Grid>
            </Grid>
          </Button>
        }
      </div>
      <div className={hasNarrowView ? classes.narrowMoveList : classes.moveList}>
        {moves}
      </div>
    </div>
  );
};

export default GameInfo;
