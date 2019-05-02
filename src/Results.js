import React from 'react';
import MyResponsivePie from './PieChart.js';

// const data = [
//   {
//     "id": "stylus",
//     "label": "stylus",
//     "value": 289,
//   },
//   {
//     "id": "scala",
//     "label": "scala",
//     "value": 184,
//   },
//   {
//     "id": "php",
//     "label": "php",
//     "value": 12,
//   },
//   {
//     "id": "hack",
//     "label": "hack",
//     "value": 428,
//   },
//   {
//     "id": "java",
//     "label": "java",
//     "value": 323,
//   }
// ]

class Results extends React.Component {
  render() {
    const {results} = this.props; // p1Wins, p2Wins, ties}
    const played = results.p1Wins + results.p2Wins + results.ties;

    const pieData = [
      {
        "id": "p1Wins",
        "label": "Player 1 Wins",
        "value": results.p1Wins,
      },
      {
        "id": "p2Wins",
        "label": "Player 2 Wins",
        "value": results.p2Wins,
      },
      {
        "id": "ties",
        "label": "Tie Games",
        "value": results.ties,
      }
    ]

    if (played > 0) {
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
              P1 Win%<br />{((results.p1Wins / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="result-block">
            <div className="result-block">
              P2 Wins<br />{results.p2Wins}<br />
            </div>
            <div className="result-block">
              P2 Win%<br />{((results.p2Wins / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="result-block">
            <div className="result-block">
              Ties<br />{results.ties}<br />
            </div>
            <div className="result-block">
              Tie%<br />{((results.ties / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="pie">
            <MyResponsivePie data={pieData} colors={['darkOrange', 'cornflowerBlue', 'lightGoldenRodYellow']} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Results;