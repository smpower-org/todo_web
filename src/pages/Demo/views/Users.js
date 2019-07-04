import React from 'react'
import { Button } from 'antd'
import { FETCH_USERS } from '../actionTypes'

class Users extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isFetchUsersSuccess = this.props.users.status !== nextProps.users.status
    if (isFetchUsersSuccess) return true
    return false
  }

  render() {
    const { dispatch, users } = this.props

    return (
      <div className="users">
        <Button onClick={() => dispatch({ type: FETCH_USERS })}>Fetch Users</Button>
        <hr />
        <div className="content">
          { users.status === 'loading' ? '加载中……' : ''}
          { users.status === 'failure' ? '请求失败……' : ''}
          { users.status === 'success' ? (
            <div>
              <p>status: {users.status}</p>
            </div>
          ) : ''}
        </div>
      </div>
    )
  }
}

export default Users
