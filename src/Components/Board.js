import React from 'react';

const Square = ({ colors, hilite, onClick, value }) => (
  <button
    className={`square`}
    onClick={onClick}
    style={hilite ? { backgroundColor: colors[value]} : null}
  >
    {value}
  </button>
);

const Board = ({ colors, highlighted, mouseOverStep, onClick, squares }) => {
  const renderSquare = (i) => (
    <Square
      colors={colors}
      hilite={highlighted[i]}
      key={`square_${i}`}
      onClick={() => onClick(i)}
      value={squares[i]}
    />
  );

  const renderBoard = () => {
    let board = [];

    for (let i = 0; i < 3; i++) {
      let rows = [];
      for (let j = (i * 3); j < (i+1)*3; j++) {
        rows.push(renderSquare(j))
      }
      
      board.push(<div className="board-row" key={`row_${i}`}>{rows}</div>)
    }
    return board;
  }

  return (
    <div className="game-board">
      {renderBoard()}
    </div>
  );
};

export default Board;