import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class UserToolbar extends Component {
  render() {
    const taskList = this.context.store.getState().taskList;

    return (
      <div className="user-toolbar">
	<div className="user">
	  <i className="user-avatar"></i>
	  {
	    taskList.status === 0 ? (
	      <span className="user-name">{taskList.username}</span>
	    ) : (
	      taskList.status === 'loading' ? (
		<span className="user-name">loading...</span>
	      ) : (
		<span className="user-name">error...</span>
	      )
	    )
	  }
	  <i className="user-arrow-icon"></i>
	  <span className="sync"></span>
	</div>
	<div className="stream-counts">
	  <i className="bell-icon"></i>
	  <i className="conversation-icon"></i>
	</div>
      </div>
    );
  }
}

UserToolbar.contextTypes = {
  store: PropTypes.object
};

export default UserToolbar;
