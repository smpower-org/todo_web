import React from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import './style.scss'

@connect()
class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <Toolbar />
      </div>
    )
  }
}

export { Content as View }
