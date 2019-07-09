import React from 'react'
import { connect } from 'react-redux'
import { TOGGLE_USERBOX } from '../../actionTypes'

@connect(state => ({ sider: state.sider }))
class UserToolbar extends React.Component {
  handleUserClick = () => {
    const { dispatch, sider } = this.props
    dispatch({ type: TOGGLE_USERBOX, isUserboxExtended: !sider.isUserboxExtended })
  }
  
  render() {
    const { isUserboxExtended } = this.props.sider
    return (
      <div className="user-toolbar" data-selector="user-toolbar">
        <div className="user" data-selector="user-toolbar" onClick={this.handleUserClick} >
          <i className="user-avatar" data-selector="user-toolbar"></i>
          {
            // taskList.status === 0 ? (
            //   <span className="user-name" data-selector="user-toolbar">{taskList.username}</span>
            // ) : (
            //   taskList.status === 'loading' ? (
            //     <span className="user-name" data-selector="user-toolbar">loading...</span>
            //   ) : (
            //     <span className="user-name" data-selector="user-toolbar">error...</span>
	          //   )
	          // )
          }
          <span className="user-name" data-selector="user-toolbar">username</span>
          <i className={isUserboxExtended ? 'user-arrow-icon active' : 'user-arrow-icon'} data-selector="user-toolbar"></i>
          <span className="sync" data-selector="user-toolbar"></span>
        </div>
        <div className="stream-counts">
          <i className="bell-icon"></i>
          <i className="conversation-icon"></i>
        </div>
      </div>
    )
  }
}

export default UserToolbar
