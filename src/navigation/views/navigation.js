import React, {Component} from 'react';
import {view as SearchToolbar} from './searchToolbar/';

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation active">
	<div className="navigation-inner">
	  <SearchToolbar />
	  <div className="user-toolbar"></div>
	  <div className="lists-toolbar"></div>
	  <div className="create-toolbar"></div>
	</div>
      </div>
    );
  }
}

export default Navigation;
