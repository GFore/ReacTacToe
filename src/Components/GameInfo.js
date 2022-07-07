import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew'; 
import Shuffle from '@material-ui/icons/Shuffle'; 
import SwapVert from '@material-ui/icons/SwapVert'; 
import Undo from '@material-ui/icons/Undo'; 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const GameInfo = ({ historyLength, moves, playerOneIsX, sortMovesAscending, status, switchPlayers, undoLastMove, updateState }) => {
  const hasMoves = historyLength !== 1;
  const cannotUndo = !hasMoves || !status.startsWith('Next');

  return (
    <div className="game-info">
      <ButtonGroup variant="contained" className='game-btn-group'>
        <Button title="Start New Game" onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}><Power /></Button>
        <Button
          className={hasMoves ? 'groove-left-shaded' : 'groove-left'}
          title="Switch Players"
          onClick={switchPlayers}
          disabled={hasMoves}
        >
          <Shuffle />
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
          className={hasMoves ? 'groove-left' : 'groove-left-shaded'}
          title={sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
          onClick={() => updateState({sortMovesAscending: !sortMovesAscending})}
          disabled={!hasMoves}
        >
          <SwapVert />
        </Button>
      </ButtonGroup>
      <div className="game-status">
        <h2>{status}</h2>
        <h4>Moves</h4>
      </div>
      <div className="move-list">
        {sortMovesAscending ? moves : moves.reverse()}
      </div>
    </div>
  );
};

export default GameInfo;
