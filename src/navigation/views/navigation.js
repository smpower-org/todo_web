import React, {Component} from 'react';
import {view as SearchToolbar} from './searchToolbar/';
import {view as UserToolbar} from './userToolbar/';

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation active">
	<div className="navigation-inner">
	  <SearchToolbar />
	  <UserToolbar />
	  <div className="lists-toolbar"></div>
	  <div className="create-toolbar"></div>
	</div>
      </div>
    );
  }
}

export default Navigation;
