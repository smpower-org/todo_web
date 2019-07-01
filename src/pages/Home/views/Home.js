import React from 'react'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
  render() {
    const { login } = this.props
    if (!login.auth) return <Redirect to="/login" />

    return (
      <div>Home Component</div>
    )
  }
}

export default Home
