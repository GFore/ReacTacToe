import Radium from 'radium';
import React from 'react';

class MoveButton extends React.Component {

  styles = {
    ':hover': {
      backgroundColor: this.props.hoverColor
    }
  };

  render() {
    return (
      <button
        className={this.props.bolded ? 'bolded' : ''}
        onClick={() => this.props.handleClick()}
        onMouseEnter={() => this.props.handleMouse()}
        onMouseLeave={() => this.props.handleMouse()}
        style={this.styles}
      >
        {this.props.label}
      </button>
    );
  }
}

MoveButton = Radium(MoveButton);
export default MoveButton;
