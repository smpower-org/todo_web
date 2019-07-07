import React from 'react'

import './style.css'

class TipBox extends React.Component {
  render() {
    return (
      <span className="tip-box">{this.props.value}</span>
    )
  }
}

export { TipBox as View }
