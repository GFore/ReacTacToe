import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gameBoard: {
    border: '3px rgba(218, 165, 32, 0.2) solid',
    marginBottom: 20,
    '& button': {
      color: theme.palette.common.black,
      border: '1px solid #999',
      float: 'left',
      fontSize: 140,
      fontWeight: 'bold',
      height: 190,
      width: 190,
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
    },
  },
  narrowGameBoard: {
    border: '3px rgba(218, 165, 32, 0.2) solid',
    marginBottom: 0,
    '& button': {
      color: theme.palette.common.black,
      border: '1px solid #999',
      float: 'left',
      fontSize: 'max(70px, 20vw)',
      fontWeight: 'bold',
      height: 'max(90px, 25vw)',
      width: 'max(90px, 25vw)',
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
    },
  },
}));

const Square = ({ colors, hilite, onClick, value }) => (
  <button onClick={onClick} style={{ backgroundColor: hilite ? colors[value] : 'whitesmoke', cursor: (!value && onClick) ? 'pointer' : 'default'}}>
    {value}
  </button>
);

const Board = ({ colors, hasNarrowView, highlighted, onClick, squares }) => {
  const classes = useStyles();

  const renderSquare = (i) => (
    <Square
      key={`square_${i}`}
      colors={colors}
      hilite={highlighted[i]}
      onClick={onClick ? () => onClick(i) : null}
      value={squares[i]}
    />
  );

  const renderBoard = () => {
    let board = [];

    for (let i = 0; i < 3; i++) {
      let rows = [];
      for (let j = (i * 3); j < (i+1)*3; j++) {
        rows.push(renderSquare(j))
      }
      
      board.push(<div key={`row_${i}`} style={(hasNarrowView && i === 0) ? { display: 'flex' } : null }>{rows}</div>)
    }
    return board;
  }

  return (
    <div className={hasNarrowView ? classes.narrowGameBoard : classes.gameBoard}>
      {renderBoard()}
    </div>
  );
};

export default Board;