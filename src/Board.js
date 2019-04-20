import React from 'react';

function Square(props) {
  return (
    <button className={`square ${props.hilite ? 'highlighted' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        hilite={this.props.highlighted[i]}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}              
      />
    );
  }

  renderBoard = () => {
    let board = [];

    for (let i = 0; i < 3; i++) {
      let rows = [];
      for (let j = (i * 3); j < (i+1)*3; j++) {
        rows.push(this.renderSquare(j))
      }
      
      board.push(<div className="board-row">{rows}</div>)
    }
    return board;
  }

  render() {
    return (
      <div>{this.renderBoard()}</div>
    );
  }
}

export default Board;