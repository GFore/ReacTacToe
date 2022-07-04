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
      <div className="game-status"><h2>{status}</h2></div>
      <div className="move-list">
        <h4>Moves</h4>
        {sortMovesAscending ? moves : moves.reverse()}
      </div>
      <ButtonGroup variant="contained" className='game-btn-group'>
        <Button title="Start New Game" onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}><Power /></Button>
        <Button
          title="Switch Players"
          onClick={switchPlayers}
          disabled={hasMoves}
          style={hasMoves ? { backgroundColor: '#e0e0e0'} : null }
        >
          <Shuffle />
        </Button>
        <Button
          title="Undo Last Move"
          onClick={undoLastMove}
          disabled={cannotUndo}
          style={cannotUndo ? { backgroundColor: '#e0e0e0'} : null }
        >
          <Undo />
        </Button>
        <Button
          title={sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
          onClick={() => updateState({sortMovesAscending: !sortMovesAscending})}
          disabled={!hasMoves}
          style={hasMoves ? null : { backgroundColor: '#e0e0e0'}}
        >
          <SwapVert />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default GameInfo;
