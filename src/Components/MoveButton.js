import Radium from 'radium';
import React from 'react';
import Button from '@material-ui/core/Button';
import { colorP1, colorP2 } from './constants';

let MoveButton = ({ disabled, handleClick, handleMouse, handleMouseLeave, hoverColor, label, selected }) => {
  const selectedClass = hoverColor === colorP1 ? "selectedP1" : (hoverColor === colorP2 ? "selectedP2" : '');

  return (
    <Button
      className={selected ? selectedClass : ''}
      onClick={handleClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      variant="outlined"
    >
      {label}
    </Button>
  );
};

MoveButton = Radium(MoveButton);
export default MoveButton;
