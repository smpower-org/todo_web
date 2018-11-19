import React, {Component} from 'react';

import './style.css';

class CreateToolbar extends Component {
  render() {
    return (
      <div className="create-toolbar">
	<div className="create-toolbar-inner">
	  <i className="create-toolbar-icon"></i>
	  <span className="create-toolbar-title">Create list</span>
	</div>
      </div>
    );
  }
}

export default CreateToolbar;
