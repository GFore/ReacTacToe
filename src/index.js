import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js'

const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  sortMovesAscending: true,
  xIsNext: true,
  highlighted: Array(9).fill(false),
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState};
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();  // returns a shallow copy of this.state.squares array into new variable squares

        // return early if someone has won the game or if a Square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const newHighlighted = Array(9).fill(false);
        const winner = calculateWinner(squares);
        if (winner) {
          winner.winningLine.forEach(i => newHighlighted[i] = true);
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                pos: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            highlighted: newHighlighted,
        });
    }

    handleMouseOverStep(i) {
      const newHighlighted = Array(9).fill(false);
      newHighlighted[i] = !this.state.highlighted[i];
      this.setState({
        highlighted: newHighlighted,
      })
    }

    showWinner(line) {
      const newHighlighted = Array(9).fill(false);
      line.forEach(i => newHighlighted[i] = true);
      this.setState({
        highlighted: newHighlighted,
      })
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    undoLastMove() {
      if (this.state.history.length > 1) {
        this.setState({
          stepNumber: this.state.history.length - 2,
          xIsNext: !this.state.xIsNext,
          history: this.state.history.slice(0, this.state.history.length - 1),
          highlighted: Array(9).fill(false),
        });
      }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
          if (move === 0) {
            return (
              <li key={move}>
                  <button onClick={() => this.jumpTo(move)} >
                    Start
                  </button>
              </li>
            );
          }

          return (
            <li key={move}>
                <button
                  className={this.state.stepNumber === move ? 'bolded' : ''}
                  onClick={() => this.jumpTo(move)}
                  onMouseEnter={() => this.handleMouseOverStep(step.pos)}
                  onMouseLeave={() => this.handleMouseOverStep(step.pos)}
                >
                  {`${step.squares[step.pos]} in ${step.pos}`}
                </button>
            </li>
          );
        });
        
        let status;
        if (winner) {
            status = `${winner.player} WINS!!!`;
        } else if (!current.squares.includes(null)) {
            status = `Tie game!`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
        <div className="game">
            <div className="game-board">
              <h3 className="game-status">{status}</h3>
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                highlighted={this.state.highlighted}
                mouseOverStep={(i) => this.handleMouseOverStep(i)}
              />
              <div className="game-board-buttons">
                <button title="Undo Last Move" style={{ padding : "3px 4px", margin: "auto 1px" }}
                  onClick={() => this.undoLastMove()}
                >
                  <i className="fas fa-undo fa-sm"></i>
                </button>
                <button title="Start New Game"  style={{ padding : "3px 4px" }}
                  onClick={() => this.setState({...initialState})}
                >
                  <i className="fas fa-power-off"></i>
                </button>              
              </div>
            </div>
            <div className="game-info">
              <h4>
                Moves
                <button
                  title={this.state.sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
                  style={{ padding : "3px 5px" }}
                  onClick={() => this.setState({sortMovesAscending: !this.state.sortMovesAscending})}
                >
                  <i className={this.state.sortMovesAscending ? "fas fa-sort-down" : "fas fa-sort-up"}></i>
                </button>
              </h4>
              <div>
                <ol>{this.state.sortMovesAscending ? moves : moves.reverse()}</ol>
              </div>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], winningLine: lines[i] };
    }
  }
  return null;
}
  
ReactDOM.render(<Game />, document.getElementById('root'));