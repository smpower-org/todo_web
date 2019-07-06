import React from 'react'
import { Button, List } from 'antd'
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
              <List
              itemLayout="horizontal"
              dataSource={users.payload.data}
              renderItem={item => (
                <List.Item>
                  <div>
                    <p>{item.name}</p>
                    <p>age: {item.age}</p>
                    <p>sex: {item.sex}</p>
                    <p>country: {item.country}</p>
                  </div>
                </List.Item>
              )}
            />
            </div>
          ) : ''}
        </div>
      </div>
    )
  }
}

export default Users
