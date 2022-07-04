import Radium from 'radium';
import React from 'react';
import Button from '@material-ui/core/Button';

let MoveButton = ({ bolded, disabled, handleClick, handleMouse, hoverColor, label }) => {
  const styles = {
    ':hover': {
      backgroundColor: hoverColor
    }
  };

  return (
    <Button
      className={bolded ? 'bolded' : ''}
      onClick={handleClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      style={styles}
      disabled={disabled}
      variant="outlined"
    >
      {label}
    </Button>
  );
};

MoveButton = Radium(MoveButton);
export default MoveButton;
