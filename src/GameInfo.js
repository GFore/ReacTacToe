import React from 'react';

const GameInfo = props => {

  const { status, sortMovesAscending, moves, historyLength, playerOneIsX, switchPlayers, updateState, undoLastMove } = props;

  return (
    <div className="game-info">
      <div className="game-status">
        <h2>{status}</h2>
      </div>
      <div className="move-list">
        <h4>Moves</h4>
        <hr />
        <div>
          <ol>{sortMovesAscending ? moves : moves.reverse()}</ol>
        </div>
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
          <i className={sortMovesAscending ? "fas fa-sort-down" : "fas fa-sort-up"}></i>
        </button>
      </div>
    </div>
  );
}

export default GameInfo;
