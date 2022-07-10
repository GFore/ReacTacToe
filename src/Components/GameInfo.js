import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew'; 
import Shuffle from '@material-ui/icons/Shuffle'; 
import SwapVert from '@material-ui/icons/SwapVert'; 
import Undo from '@material-ui/icons/Undo'; 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const GameInfo = ({ historyLength, moves, playerOneIsX, sortMovesAscending, status, switchPlayers, undoLastMove, updateState }) => {
  const hasMoves = historyLength !== 1;
  const cannotUndo = !hasMoves || !status.startsWith('Next');
  const canSort = moves.length > 1;

  return (
    <div className="game-info">
      <ButtonGroup variant="contained" className='game-btn-group'>
        <Button title="Start New Game" onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}>
          <Power />
        </Button>
        <Button
          className={cannotUndo ? 'groove-left-shaded' : 'groove-left'}
          title="Undo Last Move"
          onClick={undoLastMove}
          disabled={cannotUndo}
        >
          <Undo />
        </Button>
        <Button
          className={hasMoves ? 'groove-left-shaded' : 'groove-left'}
          title="Switch Players"
          onClick={switchPlayers}
          disabled={hasMoves}
        >
          <Shuffle />
        </Button>
      </ButtonGroup>
      <div className="game-status">
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
                style={{ padding: 2 }}
                title={sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
              >
                <SwapVert />
              </IconButton>
            }
          </Grid>
        </Grid>
      </div>
      <div className="move-list">
        {sortMovesAscending ? moves : moves.reverse()}
      </div>
    </div>
  );
};

export default GameInfo;
