import React, {Component} from 'react';
import Inbox from './inbox';
import Collection from './collection';

import './style.css';

class ListsToolbar extends Component {
  render() {
    return (
      <div className="lists-toolbar">
	<Inbox />
	<Collection />
      </div>
    );
  }
}

export default ListsToolbar;
