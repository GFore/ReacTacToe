import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew'; 
import Shuffle from '@material-ui/icons/Shuffle'; 
import SwapVert from '@material-ui/icons/SwapVert'; 
import Undo from '@material-ui/icons/Undo'; 

const GameInfo = ({ historyLength, moves, playerOneIsX, sortMovesAscending, status, switchPlayers, undoLastMove, updateState }) => (
  <div className="game-info">
    <div className="game-status"><h2>{status}</h2></div>
    <div className="move-list">
      <h4>Moves</h4>
      <hr />
      <ol>{sortMovesAscending ? moves : moves.reverse()}</ol>
    </div>
    <div className="game-board-buttons">
      <button title="Start New Game"
        onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}
      >
        <Power />
      </button>
      <button title="Switch Players"
        onClick={() => switchPlayers()}
        disabled={historyLength !== 1}
      >
        <Shuffle />
      </button>
      <button title="Undo Last Move"
        onClick={() => undoLastMove()}
        disabled={historyLength === 1 || !status.startsWith('Next')}
      >
        <Undo />
      </button>
      <button
        title={sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
        onClick={() => updateState({sortMovesAscending: !sortMovesAscending})}
        disabled={historyLength === 1}
      >
        <SwapVert />
      </button>
    </div>
  </div>
);

export default GameInfo;
