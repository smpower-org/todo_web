import React, {Component} from 'react';

class Inbox extends Component {  // 收件箱
  render() {
    return (
      <ul className="lists-toolbar-inbox">
	<li className="lists-toolbar-inbox-item">
	  <i className="lists-toolbar-inbox-icon"></i>
	  <span className="lists-toolbar-inbox-title">Inbox</span>
	  <span className="lists-toolbar-inbox-count">2</span>
	</li>
      </ul>
    );
  }
}

export default Inbox;
