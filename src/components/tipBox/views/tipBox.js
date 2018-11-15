import React, {Component} from 'react';

import './style.css';

class TipBox extends Component {
  render() {
    return (
      <span className="tip-box">{this.props.value}</span>
    );
  }
}

export default TipBox;
