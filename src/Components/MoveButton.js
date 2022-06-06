import Radium from 'radium';
import React from 'react';

let MoveButton = ({ bolded, disabled, handleClick, handleMouse, hoverColor, label }) => {
  const styles = {
    ':hover': {
      backgroundColor: hoverColor
    }
  };

  return (
    <button
      className={bolded ? 'bolded' : ''}
      onClick={handleClick}
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
      style={styles}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

MoveButton = Radium(MoveButton);
export default MoveButton;
