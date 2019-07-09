import React from 'react'
import { connect } from 'react-redux'
import { TOGGLE_USERBOX_VISIBLE } from '../../actionTypes'

@connect(state => ({ userBox: state.userBox }))
class UserToolbar extends React.Component {
  handleUserClick = () => {
    const { dispatch, userBox } = this.props
    dispatch({ type: TOGGLE_USERBOX_VISIBLE, isUserboxExtended: !userBox.isUserboxExtended })
  }
  
  render() {
    const { isUserboxExtended } = this.props.userBox
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
