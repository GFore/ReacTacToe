import React from 'react';
import NivoPieChart from './NivoPieChart.js';
import NivoBarChart from './NivoBarChart.js';
import NivoLineChart from './NivoLineChart.js';
import { colorP1, colorP2, colorTie, colorTextSecondary} from './constants';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "pie"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    const {results} = this.props; // p1Wins, p2Wins, ties}
    const played = results.p1Wins + results.p2Wins + results.ties;
    const maxValue = Math.max(results.p1Wins, results.p2Wins, results.ties) + 2

    const pieData = [
      {
        id: "P1 Wins",
        label: "Player 1 Wins",
        value: results.p1Wins,
      },
      {
        id: "P2 Wins",
        label: "Player 2 Wins",
        value: results.p2Wins,
      },
      {
        id: "Ties",
        label: "Tie Games",
        value: results.ties,
      }
    ]
    const barData = [
      {
        player: "P1 Wins",
        p1: results.p1Wins,
        p1Color: colorP1,
        p2: 0,
        p2Color: colorP2,
        ties: 0,
        tiesColor: colorTie,
      },
      {
        player: "P2 Wins",
        p1: 0,
        p1Color: colorP1,
        p2: results.p2Wins,
        p2Color: colorP2,
        ties: 0,
        tiesColor: colorTie,
      },
      {
        player: "Ties",
        p1: 0,
        p1Color: colorP1,
        p2: 0,
        p2Color: colorP2,
        ties: results.ties,
        tiesColor: colorTie,
      }
    ];
    const lineData = [
      {
        "id": "p1",
        "color": "hsl(39, 70%, 50%)",
        "data": [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 2 },
          { x: 5, y: 2 },
          { x: 6, y: 2 },
          { x: 7, y: 3 },
          { x: 8, y: 4 },
          { x: 9, y: 4 },
          { x: 10, y: 5 },
          { x: 11, y: 5 }
        ]
      },
      {
        "id": "p2",
        "color": "hsl(39, 70%, 50%)",
        "data": [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
          { x: 6, y: 2 },
          { x: 7, y: 2 },
          { x: 8, y: 2 },
          { x: 9, y: 3 },
          { x: 10, y: 3 },
          { x: 11, y: 3 }
        ]
      },
      {
        "id": "ties",
        "color": "hsl(39, 70%, 50%)",
        "data": [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 2 },
          { x: 6, y: 2 },
          { x: 7, y: 2 },
          { x: 8, y: 2 },
          { x: 9, y: 2 },
          { x: 10, y: 2 },
          { x: 11, y: 3 }
        ]
      },
    ];

    if (played > 0) {
      return (
        <div className="game-results">
          <h4>Game Results</h4>
          <hr />
          <div className="result-block">Games Played: {played}<br /></div>
          <div className="result-block" style={{backgroundColor: colorP1}}>
            <div className="result-block">
              P1 Wins<br />{results.p1Wins}<br />
            </div>
            <div className="result-block">
              P1 Win%<br />{((results.p1Wins / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="result-block" style={{backgroundColor: colorP2}}>
            <div className="result-block">
              P2 Wins<br />{results.p2Wins}<br />
            </div>
            <div className="result-block">
              P2 Win%<br />{((results.p2Wins / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="result-block" style={{backgroundColor: colorTie, color: colorTextSecondary }}>
            <div className="result-block">
              Ties<br />{results.ties}<br />
            </div>
            <div className="result-block">
              Tie%<br />{((results.ties / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="chartSelection">
            Chart Type: 
            <label>
              <input type="radio" name="chartType" value="pie"
                checked={this.state.selectedOption === "pie"}
                onChange={this.handleOptionChange}
              />
              Pie
            </label>
            <label>
              <input type="radio" name="chartType" value="bar"
                checked={this.state.selectedOption === "bar"}
                onChange={this.handleOptionChange}
              />
              Bar
            </label>
            <label>
              <input type="radio" name="chartType" value="line"
                checked={this.state.selectedOption === "line"}
                onChange={this.handleOptionChange}
              />
              Line
            </label>
          </div>
          <div className="pie">
            {this.state.selectedOption === "pie" ?
              <NivoPieChart data={pieData} colors={[colorP1, colorP2, colorTie]} />
              : (this.state.selectedOption === "bar" ?
                <NivoBarChart data={barData} maxValue={maxValue} />
                :
                <NivoLineChart data={lineData} colors={[colorP1, colorP2, colorTie]} />
              )
            }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Results;