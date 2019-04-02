import React, {Component} from 'react';

import './style.css';

class UserToolbar extends Component {
  render() {
    return (
      <div className="user-toolbar">
	<div className="user">
	  <i className="user-avatar"></i>
	  <span className="user-name">rf.wangchn</span>
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

export default UserToolbar;
