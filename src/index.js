import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board.js'
import MoveButton from './MoveButton.js'
import Results from './Results.js'
import { colorP1, colorP2, colorTie } from './constants';

const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  sortMovesAscending: true,
  xIsNext: true,
  highlighted: Array(9).fill(false),
  playerOneIsX: true,
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ...initialState,
          results: {p1Wins: 0, p2Wins: 0, ties: 0},
          games: [{
            id: 0,
            winner: '',
            squares: [],
            winningLine: '',
            results: {p1Wins: 0, p2Wins: 0, ties: 0},
          }],
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

        const games = this.state.games.slice();
        let addGame;
        let newHighlighted = Array(9).fill(false);
        let newResults = {};
        let result;
        let p1=0, p2=0, t=0;
        const winner = calculateWinner(squares);

        if (winner) {
          winner.winningLine.forEach(i => newHighlighted[i] = true);
          if (winner.player === 'X') {
            result = this.state.playerOneIsX ? 'p1Wins' : 'p2Wins';
          } else {
            result = this.state.playerOneIsX ? 'p2Wins' : 'p1Wins';
          }
          if (result === 'p1Wins') {
            p1++;
          } else {
            p2++;
          }
        } else if (!squares.includes(null)) {
          newHighlighted = Array(9).fill(true);
          result = 'ties';
          t++;
        }

        if (result) {
          newResults[result] = this.state.results[result] + 1;
          addGame = {
            id: games.length,
            squares: squares,
            winner: result,
            winningLine: t === 0 ? winner.winningLine : null,
            results: {
              p1Wins: games[games.length-1].results.p1Wins + p1,
              p2Wins: games[games.length-1].results.p2Wins + p2,
              ties: games[games.length-1].results.ties + t}
          }
        }

        if (addGame) {
          // console.log("addGame >>>> ", addGame);
          games.push(addGame);
        }

        this.setState({
          games: games,
          history: history.concat([{
              squares: squares,
              pos: i,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
          highlighted: newHighlighted,
          results: {...this.state.results, ...newResults}
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

    switchPlayers() {
      this.setState({
        xIsNext: true,
        playerOneIsX: !this.state.playerOneIsX,
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
        const colors = this.state.playerOneIsX ? { X: colorP1, O: colorP2 } : { X: colorP2, O: colorP1 };

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
                <MoveButton
                  bolded={this.state.stepNumber === move}
                  handleClick={() => this.jumpTo(move)}
                  handleMouse={() => this.handleMouseOverStep(step.pos)}
                  label={`${step.squares[step.pos]} in ${step.pos}`}
                  hoverColor={colors[step.squares[step.pos]]}
                />
            </li>
          );
        });
        
        let status;
        if (winner) {
            status = `${winner.player} WINS!`;
        } else if (!current.squares.includes(null)) {
            status = `Tie game!`;
            colors.X = colorTie;
            colors.O = colorTie;
        } else {
            status = `Next turn: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
        <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                highlighted={this.state.highlighted}
                mouseOverStep={(i) => this.handleMouseOverStep(i)}
                colors={colors}
              />
            </div>
            <div className="game-info">
              <div  className="game-status">
                <h2>{status}</h2>
                {this.state.playerOneIsX ? 'P1: X ' : 'P1: O '}
                {this.state.playerOneIsX ? ' P2: O ' : ' P2: X '}
              </div>
              <div className="move-list">
                <h4>Moves</h4>
                <hr />
                <div>
                  <ol>{this.state.sortMovesAscending ? moves : moves.reverse()}</ol>
                </div>
              </div>
              <div className="game-board-buttons">
                <button title="Start New Game"  style={{}}
                  onClick={() => this.setState({...initialState, playerOneIsX: this.state.playerOneIsX})}
                >
                  <i className="fas fa-power-off"></i>
                </button>
                <button title="Switch Players"
                    onClick={() => this.switchPlayers()}
                    disabled={this.state.history.length !== 1}
                >
                  <i className="fas fa-random"></i>
                </button>
                <button title="Undo Last Move"
                  onClick={() => this.undoLastMove()}
                  disabled={this.state.history.length === 1}
                >
                  <i className="fas fa-undo fa-sm"></i>
                </button>
                <button
                    title={this.state.sortMovesAscending ? "Sort Moves Descending" : "Sort Moves Ascending"}
                    onClick={() => this.setState({sortMovesAscending: !this.state.sortMovesAscending})}
                    disabled={this.state.history.length === 1}
                  >
                    <i className={this.state.sortMovesAscending ? "fas fa-sort-down" : "fas fa-sort-up"}></i>
                  </button>
              </div>
            </div>

            <Results results={this.state.results} games={this.state.games} />
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