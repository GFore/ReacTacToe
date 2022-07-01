import React from 'react';
import SwapVert from '@material-ui/icons/SwapVert'; 

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
        <i className="fas fa-power-off"></i>
      </button>
      <button title="Switch Players"
        onClick={() => switchPlayers()}
        disabled={historyLength !== 1}
      >
        <i className="fas fa-random"></i>
      </button>
      <button title="Undo Last Move"
        onClick={() => undoLastMove()}
        disabled={historyLength === 1 || !status.startsWith('Next')}
      >
        <i className="fas fa-undo fa-sm"></i>
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
