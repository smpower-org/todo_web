import React, {Component} from 'react';
import {view as SearchToolbar} from './searchToolbar/';
import {view as UserToolbar} from './userToolbar/';
import {view as ListsToolbar} from './listsToolbar/';
import {view as CreateToolbar} from './createToolbar/';

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation active">
	<div className="navigation-inner">
	  <SearchToolbar />
	  <UserToolbar />
	  <ListsToolbar />
	  <CreateToolbar />
	</div>
      </div>
    );
  }
}

export default Navigation;
