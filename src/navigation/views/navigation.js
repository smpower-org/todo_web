import React, {Component} from 'react';
import {view as SearchToolbar} from './searchToolbar/';
import {view as UserToolbar} from './userToolbar/';
import {view as ListsToolbar} from './listsToolbar/';

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation active">
	<div className="navigation-inner">
	  <SearchToolbar />
	  <UserToolbar />
	  <ListsToolbar />
	  <div className="create-toolbar"></div>
	</div>
      </div>
    );
  }
}

export default Navigation;
