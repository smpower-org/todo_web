import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './style.scss'

@connect(state => ({ login: state.login }))
class Home extends React.Component {
  render() {
    const { login } = this.props
    if (!login.auth) return <Redirect to="/login" />

    return (
      <div>Home Component</div>
    )
  }
}

export { Home as View }
