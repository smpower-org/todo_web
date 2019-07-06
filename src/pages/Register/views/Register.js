import React from 'react'
import { connect } from 'react-redux'
import './style.scss'

@connect()
class Register extends React.Component {
  render() {
    return (
      <div>Register Component</div>
    )
  }
}

export { Register as View }
