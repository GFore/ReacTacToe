import React from 'react';
import SwapVert from '@material-ui/icons/SwapVert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { colorP1, colorP2 } from './constants';

const useStyles = makeStyles(() => ({
  gameInfo: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 300,
    minWidth: 150,
    marginBottom: 20,
  },
  narrowGameInfo: {
    width: 'clamp(270px, 75vw, 510px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gameStatus: {
    textAlign: 'center',
    fontSize: 20,
    padding: '0px 15px',
    '& > button': { fontSize: '1.5em', marginBottom: '0.83em' },
    '& h4': { margin: 0 },
    '& button.sortBtn': { padding: 2 },
  },
  narrowGameStatus: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    padding: 0,
    '& h2': { fontSize: 'clamp(28px, 8vw, 45px)', margin: '15px 0 20px' },
    '& h4': { margin: 0 },
    '& button.sortBtn': { padding: 2 },
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

const GameInfo = ({ hasNarrowView, moves, playerOneIsX, showWinner, sortMovesAscending, status, switchPlayers, updateState }) => {
  const classes = useStyles();
  const canSort = moves.length > 1;
  const colorX = playerOneIsX ? colorP1 : colorP2;
  const colorO = playerOneIsX ? colorP2 : colorP1;

  return (
    <div className={hasNarrowView ? classes.narrowGameInfo : classes.gameInfo}>
      <div className={hasNarrowView ? classes.narrowGameStatus : classes.gameStatus}>
        {(status.startsWith('X') || status.startsWith('O')) ?
          <Button
            onClick={showWinner}
            size="large"
            variant="contained"
            color="secondary"
            fullWidth
            style={{ backgroundColor: status.startsWith('X') ? colorX : colorO }}
          >
            {status}
          </Button>
          :
          <h2>{status}</h2>
        }
        {moves.length > 0 ?
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}><h4>Moves</h4></Grid>
            <Grid item xs={3} container justifyContent='flex-end'>
              {canSort &&
                <IconButton
                  className="sortBtn"
                  color="inherit"
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
