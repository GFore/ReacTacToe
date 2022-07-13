import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NivoPieChart from './NivoPieChart.js';
import NivoBarChart from './NivoBarChart.js';
import NivoLineChart from './NivoLineChart.js';
import { colorP1, colorP2, colorTie, colorTextSecondary} from './constants';

const useStyles = makeStyles(() => ({
  gameResults: {
    flex: '1 1 auto',
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    padding: '10px 15px 0',
    marginBottom: 20,
    maxWidth: 500,
    '& h4': {
      textAlign: 'center',
      margin: '10px 0 15px',
      opacity: 1,
      fontSize: 20,
    },
  },
  narrowGameResults: {
    borderRadius: 20,
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    padding: '10px 15px 0',
    '& h4': {
      textAlign: 'center',
      margin: '10px 0 15px',
      opacity: 1,
      fontSize: 20,
    },
  },
  resultBlock: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '3px 5px',
    padding: 5,
    '& > div': {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      margin: '3px 5px',
      padding: '2px 5px',
      fontSize: 'larger',
      width: '33%',
    },
    '& h5': {
      margin: '0 0 5px 0',
      fontSize: 'x-small',
      fontStyle: 'italic',
      fontWeight: 'lighter',
    },
  },
  chartSelection: {
    margin: '15px auto 5px',
    display: 'flex',
    justifyContent: 'center',
    '& > div': { margin: 0, width: '75%' },
    '& button': { flexGrow: 1, padding: '10px 16px' },
    '& button:hover': { color: 'rgb(104, 101, 9)' },
  },
  disabledBtn: { color: 'white !important', borderTop: '1px solid gray', borderBottom: '1px solid gray' },
  grooveLeft: { borderLeft: 'groove' },
  chartWrapper: { height: 280, width: 280, margin: '0 auto' },
  narrowChartWrapper: { height: 220, width: 220, margin: '0 auto' },
}));


const getDetails = (chartType, games, results, playerOneIsX) => {
  const gameCount = results.p1Wins + results.p2Wins + results.ties;
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

  let chartData;
  let chartParams = { colors: [colorP1, colorP2, colorTie] };

  switch (chartType) {
    case "pie": {
      chartData = [
        { id: "P1 Wins", label: "Player 1 Wins", value: results.p1Wins, },
        { id: "P2 Wins", label: "Player 2 Wins", value: results.p2Wins, },
        { id: "Ties", label: "Tie Games", value: results.ties, }
      ];
      break;
    }
    case "bar": {
      chartData = [
        { player: "P1 Wins", p1: results.p1Wins, p1Color: colorP1, p2: 0, p2Color: colorP2, ties: 0, tiesColor: colorTie },
        { player: "P2 Wins", p1: 0, p1Color: colorP1, p2: results.p2Wins, p2Color: colorP2, ties: 0, tiesColor: colorTie },
        { player: "Ties", p1: 0, p1Color: colorP1, p2: 0, p2Color: colorP2, ties: results.ties, tiesColor: colorTie }
      ];
      chartParams = { maxValue: Math.max(results.p1Wins, results.p2Wins, results.ties) };
      break;
    }
    default: {
      const myData = [{id: 'p1', data: []}, {id: 'p2', data: []}, {id: 'ties', data: []}];
    
      chartData = myData.map(line => {
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

      chartParams.maxValue = Math.max(results.p1Wins, results.p2Wins, results.ties);
    }
  } 

  return { gameCount, summaryInfo, chartData, chartParams };
};

const ResultsSummary = ({ classes, summaryInfo }) => (
  <React.Fragment>
    <h4>Game Results</h4>
    {summaryInfo.map((row, i) => (
      <div key={`results_row_${i}`} className={classes.resultBlock} style={{backgroundColor: row.bgColor, color: row.fColor }}>
        <div><h5>{row.label1}</h5>{row.value1}</div>
        <div><h5>{row.label2}</h5>{row.value2}</div>
        <div><h5>{row.label3}</h5>{row.value3}</div>
      </div>
    ))}
  </React.Fragment>
);

const SelectChartType = ({ chartType, classes, clearResults, handleOptionChange }) => (
  <div className={classes.chartSelection}>
    <ButtonGroup variant="contained">
      {["pie", "bar", "line"].map(type => (
        <Button
          key={`chart_type_${type}`}
          className={chartType === type ? classes.disabledBtn : null }
          onClick={() => handleOptionChange(type)}
          disabled={chartType === type}
          title={`${type.toUpperCase()} CHART`}
        >
          <i className={`fas fa-chart-${type}`}></i>
        </Button>
      ))}
      <Button className={classes.grooveLeft} onClick={clearResults} title={'Clear Game History'}>
        <i className={`fas fa-trash`}></i>
      </Button>
    </ButtonGroup>
  </div>
);

const DisplayChart = ({ cName, data, params, type }) => {
  switch (type) {
    case "pie": return <div className={cName}><NivoPieChart data={data} {...params} /></div>;
    case "bar": return <div className={cName}><NivoBarChart data={data} {...params} /></div>;
    case "line": return <div className={cName}><NivoLineChart data={data} {...params} /></div>;
    default: return null;
  }
};

const Results = ({ clearResults, games, hasNarrowView, hasVeryNarrowView, playerOneIsX, results }) => {
  const [chartType, setChartType] = useState('pie');
  const classes = useStyles();

  const { gameCount, summaryInfo, chartData, chartParams } = getDetails(chartType, games, results, playerOneIsX);

  if (!gameCount) return null;

  return (
    <div className={hasNarrowView ? classes.narrowGameResults : classes.gameResults} style={hasVeryNarrowView ? { padding: 0, backgroundColor: 'unset' } : null}>
      <ResultsSummary classes={classes} summaryInfo={summaryInfo}/>
      <SelectChartType chartType={chartType} classes={classes} clearResults={clearResults} handleOptionChange={e => setChartType(e)}/>
      <DisplayChart cName={hasVeryNarrowView ? classes.narrowChartWrapper : classes.chartWrapper} data={chartData} params={chartParams} type={chartType}/>
    </div>
  );
};

export default Results;
