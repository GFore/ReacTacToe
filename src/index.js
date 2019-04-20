import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            sortMovesAscending: true,
            xIsNext: true,
            highlighted: Array(9).fill(false),
        };
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
        this.setState({
            history: history.concat([{
                squares: squares,
                pos: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleMouseOverStep(i) {
      const hiState = this.state.highlighted;
      const newHighlighted = hiState.slice();
      newHighlighted[i] = !newHighlighted[i];
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
                  // onFocus={() => this.handleFocus(step.pos)}
                  // onBlur={() => this.handleBlur(step.pos)}
                >
                  {`${step.squares[step.pos]} in ${step.pos}`}
                </button>
            </li>
          );
        });
        
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
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
            </div>
            <div className="game-info">
              <h4>Go to move #:</h4>
              <div>
                <ol>{this.state.sortMovesAscending ? moves : moves.reverse()}</ol>
              </div>
              <button onClick={() => this.setState({sortMovesAscending: !this.state.sortMovesAscending})}>Sort Moves</button>
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
      return squares[a];
    }
  }
  return null;
}
  
ReactDOM.render(<Game />, document.getElementById('root'));