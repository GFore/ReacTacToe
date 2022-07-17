import React from 'react';
import Power from '@material-ui/icons/PowerSettingsNew';
import Undo from '@material-ui/icons/Undo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  boardWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  gameBoard: {
    border: '3px rgba(218, 165, 32, 0.2) solid',
    marginBottom: 0,
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
      height: 'clamp(90px, 25vw, 170px)',
      width: 'clamp(90px, 25vw, 170px)',
      marginRight: -1,
      marginTop: -1,
      padding: 0,
      textAlign: 'center',
    },
  },
  btnWrapper: {
    padding: '0 4px',
    '& h2': { flex: '1 1 auto', margin: 0, textAlign: 'center' },
  },
  grooveLeft: { borderLeft: 'groove' },
  grooveLeftShaded: { backgroundColor: '#e0e0e0 !important', borderLeft: 'groove' },
}));

const Square = ({ colors, hilite, onClick, value }) => (
  <button onClick={onClick} style={{ backgroundColor: hilite ? colors[value] : 'whitesmoke', cursor: (!value && onClick) ? 'pointer' : 'default'}}>
    {value}
  </button>
);

const Board = ({ cannotUndo, colors, hasNarrowView, highlighted, onClick, playerOneIsX, showWinner, squares, status, undoLastMove, updateState }) => {
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
    <div className={classes.boardWrapper}>
      <div className={hasNarrowView ? classes.narrowGameBoard : classes.gameBoard}>
        {renderBoard()}
      </div>
      <Grid container justifyContent='flex-start' className={classes.btnWrapper}>
        <ButtonGroup variant="contained">
          <Button
            title="Start New Game"
            onClick={() => updateState({playerOneIsX: playerOneIsX}, true)}
            startIcon={<Power />}
            color={!status.startsWith('Next') ? 'primary' : 'default'}
          >
            {cannotUndo ? 'New Game' : 'Start Over'}
          </Button>
          <Button
            className={cannotUndo ? classes.grooveLeftShaded : classes.grooveLeft}
            title="Undo Move"
            onClick={undoLastMove}
            disabled={cannotUndo}
            startIcon={<Undo />}
            // color="primary"
          >
            Undo Move
          </Button>
        </ButtonGroup>
        <h2 onClick={showWinner ? () => showWinner() : null} style={showWinner ? { cursor: 'pointer' } : null}>{status}</h2>
      </Grid>
    </div>
  );
};

export default Board;