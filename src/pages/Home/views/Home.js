import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { View as Sider } from './Sider/'
import { View as Content } from './Content/'
import { View as UserBox } from './Userbox/'
import './style.scss'

@connect(state => ({
  login: state.login,
  userBox: state.userBox,
}))
class Home extends React.Component {
  render() {
    const { login, userBox } = this.props
    if (!login.auth) return <Redirect to="/login" />

    return (
      <div className="main">
        <div className="home">
          <Sider />
          <Content />
          { userBox.isUserboxExtended ? <UserBox /> : null }
        </div>
      </div>
    )
  }
}

export { Home as View }
