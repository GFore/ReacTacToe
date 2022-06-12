import React, { useState } from 'react';
import NivoPieChart from './NivoPieChart.js';
import NivoBarChart from './NivoBarChart.js';
import NivoLineChart from './NivoLineChart.js';
import { colorP1, colorP2, colorTie, colorTextSecondary} from './constants';

const getDetails = (games, results, playerOneIsX) => {
  const gameCount = results.p1Wins + results.p2Wins + results.ties;
  const maxValue = Math.max(results.p1Wins, results.p2Wins, results.ties);

  const summaryInfo = [
    {
      bgColor: colorP1, fColor: 'inherit',
      label1: 'PLAYER 1', value1: playerOneIsX ? 'X' : 'O',
      label2: 'WINS', value2: results.p1Wins,
      label3: 'WIN %', value3: `${((results.p1Wins / gameCount) * 100).toFixed(1)}%`,
    },
    {
      bgColor: colorP2, fColor: 'inherit',
      label1: 'PLAYER 2', value1: playerOneIsX ? 'O' : 'X',
      label2: 'WINS', value2: results.p2Wins,
      label3: 'WIN %', value3: `${((results.p2Wins / gameCount) * 100).toFixed(1)}%`,
    },
    {
      bgColor: colorTie, fColor: colorTextSecondary,
      label1: 'GAMES PLAYED', value1: gameCount,
      label2: 'TIES', value2: results.ties,
      label3: 'TIE %', value3: `${((results.ties / gameCount) * 100).toFixed(1)}%`,
    },
  ];

  const pieData = [
    { id: "P1 Wins", label: "Player 1 Wins", value: results.p1Wins, },
    { id: "P2 Wins", label: "Player 2 Wins", value: results.p2Wins, },
    { id: "Ties", label: "Tie Games", value: results.ties, }
  ];

  const barData = [
    { player: "P1 Wins", p1: results.p1Wins, p1Color: colorP1, p2: 0, p2Color: colorP2, ties: 0, tiesColor: colorTie },
    { player: "P2 Wins", p1: 0, p1Color: colorP1, p2: results.p2Wins, p2Color: colorP2, ties: 0, tiesColor: colorTie },
    { player: "Ties", p1: 0, p1Color: colorP1, p2: 0, p2Color: colorP2, ties: results.ties, tiesColor: colorTie }
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

  return { gameCount, maxValue, summaryInfo, barData, lineData, pieData };
};

const ResultsSummary = ({ clearResults, summaryInfo }) => (
  <React.Fragment>
    <h4>Game Results</h4>
    {summaryInfo.map((row, i) => (
      <div key={`results_row_${i}`} className="result-block" style={{backgroundColor: row.bgColor, color: row.fColor }}>
        <div><h5>{row.label1}</h5>{row.value1}</div>
        <div><h5>{row.label2}</h5>{row.value2}</div>
        <div><h5>{row.label3}</h5>{row.value3}</div>
      </div>
    ))}
    <div className="result-block-button">
      <button onClick={clearResults}>
        Clear Game History
      </button>
    </div>
  </React.Fragment>
);

const SelectChartType = ({ handleOptionChange, selectedOption }) => (
  <div className="chartSelection">
    {["pie", "bar", "line"].map(type => (
      <label key={`chart_type_${type}`}>
        <input type="radio" name="chartType" value={type}
          checked={selectedOption === type}
          onChange={handleOptionChange}
        />
        <i className={`fas fa-chart-${type}`}></i>
      </label>
    ))}
  </div>
);

const Results = ({ clearResults, games, playerOneIsX, results }) => {
  const [selectedOption, setSelectedOption] = useState('pie');
  const handleOptionChange = changeEvent => setSelectedOption(changeEvent.target.value);

  const { gameCount, maxValue, summaryInfo, barData, lineData, pieData } = getDetails(games, results, playerOneIsX);

  if (gameCount > 0) {
    return (
      <div className="game-results">
        <ResultsSummary clearResults={clearResults} summaryInfo={summaryInfo} />
        <SelectChartType handleOptionChange={handleOptionChange} selectedOption={selectedOption} />

        <div className="chartWrapper">
          {selectedOption === "pie" && <NivoPieChart data={pieData} colors={[colorP1, colorP2, colorTie]}/>}
          {selectedOption === "bar" && <NivoBarChart data={barData} maxValue={maxValue + 2}/>}
          {selectedOption === "line" && <NivoLineChart data={lineData} colors={[colorP1, colorP2, colorTie]}/>}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Results;
