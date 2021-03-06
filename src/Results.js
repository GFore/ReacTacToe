import React, { Component } from 'react';
import NivoPieChart from './NivoPieChart.js';
import NivoBarChart from './NivoBarChart.js';
import NivoLineChart from './NivoLineChart.js';
import { colorP1, colorP2, colorTie, colorTextSecondary} from './constants';

class Results extends Component {
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
    const { results, games, playerOneIsX, clearResults } = this.props; // p1Wins, p2Wins, ties}
    const played = results.p1Wins + results.p2Wins + results.ties;
    const maxValue = Math.max(results.p1Wins, results.p2Wins, results.ties)

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
    
    const myData = [
      {id: 'p1', data: []},
      {id: 'p2', data: []},
      {id: 'ties', data: []},
    ];

    const lineData = myData.map(line => {
      games.forEach(game => {
        let talley;
        switch (line.id) {
          case 'p1':
            talley = game.results.p1Wins;
            break;
          case 'p2':
            talley = game.results.p2Wins;
            break;
          default:
          talley = game.results.ties;
        }

        line.data.push({x: game.id, y: talley})
      });
      return line;
    });

    if (played > 0) {
      return (
        <div className="game-results">
          <h4>Game Results</h4>
          <div className="result-block" style={{backgroundColor: colorP1}}>
            <div className="result-subblock">
              <h5>PLAYER 1</h5>
              {playerOneIsX ? 'X' : 'O'}
            </div>
            <div className="result-subblock">
              <h5>WINS</h5>
              {results.p1Wins}
            </div>
            <div className="result-subblock">
              <h5>WIN %</h5>
              {((results.p1Wins / played) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="result-block" style={{backgroundColor: colorP2}}>
            <div className="result-subblock">
              <h5>PLAYER 2</h5>
              {playerOneIsX ? 'O' : 'X'}
            </div>
            <div className="result-subblock">
              <h5>WINS</h5>
              {results.p2Wins}
            </div>
            <div className="result-subblock">
              <h5>WIN %</h5>
              {((results.p2Wins / played) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="result-block" style={{backgroundColor: colorTie, color: colorTextSecondary }}>
            <div className="result-subblock">
              <h5>GAMES PLAYED</h5>
              {played}
            </div>
            <div className="result-subblock">
              <h5>TIES</h5>
              {results.ties}
            </div>
            <div className="result-subblock">
            <h5>TIE %</h5>{((results.ties / played) * 100).toFixed(1)}%<br />
            </div>
          </div>
          <div className="result-block-button">
            <button
              className="clear-button"
              onClick={() => clearResults()}
            >
              Clear Game Results Data
            </button>
          </div>
          <div className="chartSelection">
    
            <label>
              <input type="radio" name="chartType" value="pie"
                checked={this.state.selectedOption === "pie"}
                onChange={this.handleOptionChange}
              />
              {/* Pie */}
              <i className="fas fa-chart-pie"></i>
            </label>
            <label>
              <input type="radio" name="chartType" value="bar"
                checked={this.state.selectedOption === "bar"}
                onChange={this.handleOptionChange}
              />
              {/* Bar */}
              <i className="fas fa-chart-bar"></i>
            </label>
            <label>
              <input type="radio" name="chartType" value="line"
                checked={this.state.selectedOption === "line"}
                onChange={this.handleOptionChange}
              />
              <i className="fas fa-chart-line"></i>
              {/* Line */}
            </label>
          </div>
          <div className="pie">
            {this.state.selectedOption === "pie" ?
              <NivoPieChart data={pieData} colors={[colorP1, colorP2, colorTie]} />
              : (this.state.selectedOption === "bar" ?
                <NivoBarChart data={barData} maxValue={maxValue + 2} />
                :
                <NivoLineChart data={lineData} colors={[colorP1, colorP2, colorTie]} />
              )
            }
          </div>
          {/* <button onClick={() => clearResults()}>Clear Game Results Data</button> */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Results;