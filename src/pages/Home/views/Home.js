import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Sider from './Sider'
import Content from './Content'
import './style.scss'

@connect(state => ({ login: state.login }))
class Home extends React.Component {
  render() {
    const { login } = this.props
    if (!login.auth) return <Redirect to="/login" />

    return (
      <div>
        <Sider />
        <Content />
      </div>
    )
  }
}

export { Home as View }
