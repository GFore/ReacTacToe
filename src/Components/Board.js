import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => {
  // console.log({theme});
  return ({
    // whiteText: { color: theme.palette.common.white },
    gameBoard: {
      border: '3px rgba(218, 165, 32, 0.2) solid',
      '& button': {
        background: 'whitesmoke',
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
    narrowSquare: {
      fontSize: '90px !important',
      height: '25vw !important',
      width: '25vw !important',
    },
  });
});

const Square = ({ classes, colors, hasNarrowView, hilite, onClick, value }) => (
  <button
    className={hasNarrowView ? classes.narrowSquare : null}
    onClick={onClick}
    style={hilite ? { backgroundColor: colors[value]} : null}
  >
    {value}
  </button>
);

const Board = ({ colors, highlighted, /* mouseOverStep,*/ onClick, squares }) => {
  const classes = useStyles();
  const hasNarrowView = useMediaQuery(theme => theme.breakpoints.down(750));

  const renderSquare = (i) => (
    <Square
      classes={classes}
      colors={colors}
      hasNarrowView={hasNarrowView}
      hilite={highlighted[i]}
      key={`square_${i}`}
      onClick={() => onClick(i)}
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
      
      board.push(<div key={`row_${i}`}>{rows}</div>)
    }
    return board;
  }

  return (
    <div className={classes.gameBoard}>
      {renderBoard()}
    </div>
  );
};

export default Board;