import React from 'react';

// function Square(props) {
//   return (
//     <button className={`square ${props.hilite ? 'highlighted' : ''}`} onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

class Results extends React.Component {
  // renderSquare(i) {
  //   return (
  //     <Square
  //       hilite={this.props.highlighted[i]}
  //       value={this.props.squares[i]}
  //       onClick={() => this.props.onClick(i)}
  //       key={i}         
  //     />
  //   );
  // }

  // renderBoard = () => {
  //   let board = [];

  //   for (let i = 0; i < 3; i++) {
  //     let rows = [];
  //     for (let j = (i * 3); j < (i+1)*3; j++) {
  //       rows.push(this.renderSquare(j))
  //     }
      
  //     board.push(<div className="board-row" key={i}>{rows}</div>)
  //   }
  //   return board;
  // }

  render() {
    const {results} = this.props; // p1Wins, p2Wins, ties}
    const played = results.p1Wins + results.p2Wins + results.ties;

    return (
      <div className="game-results">
        <h4>Game Results</h4>
        <hr />
        <div className="result-block">Games Played: {played}<br /></div>
        <div className="result-block">
          <div className="result-block">
            P1 Wins<br />{results.p1Wins}<br />
          </div>
          <div className="result-block">
            P1 Win%<br />{(results.p1Wins / played) * 100}<br />
          </div>
        </div>
        <div className="result-block">
          <div className="result-block">
            P2 Wins<br />{results.p2Wins}<br />
          </div>
          <div className="result-block">
            P2 Win%<br />{(results.p2Wins / played) * 100}<br />
          </div>
        </div>
        <div className="result-block">
          <div className="result-block">
            Ties<br />{results.ties}<br />
          </div>
          <div className="result-block">
            Tie%<br />{(results.ties / played) * 100}<br />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;