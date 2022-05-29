import Radium from 'radium';
import React, { Component } from 'react';

class MoveButton extends Component {

  styles = {
    ':hover': {
      backgroundColor: this.props.hoverColor
    }
  };

  render() {

    const {bolded, handleClick, handleMouse, label, disabled } = this.props;
    return (
      <button
        className={bolded ? 'bolded' : ''}
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouse()}
        onMouseLeave={() => handleMouse()}
        style={this.styles}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
}

MoveButton = Radium(MoveButton);
export default MoveButton;
