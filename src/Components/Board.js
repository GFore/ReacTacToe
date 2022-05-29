import React, { Component } from 'react';

function Square(props) {
  return (
    <button
      className={`square`}
      onClick={props.onClick}
      style={props.hilite ? { backgroundColor: props.colors[props.value]} : {}}
    >
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        hilite={this.props.highlighted[i]}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        colors={this.props.colors} 
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
      
      board.push(<div className="board-row" key={i}>{rows}</div>)
    }
    return board;
  }

  render() {
    return (
      <div className="game-board">{this.renderBoard()}</div>
    );
  }
}

export default Board;