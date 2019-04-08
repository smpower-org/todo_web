import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Inbox from './inbox';
import Collection from './collection';

import './style.css';

class ListsToolbar extends Component {
  render() {
    const { taskList } = this.context.store.getState();
    if (taskList.status === 'loading') return false;

    return (
      <div className="lists-toolbar">
	<Inbox />
	<Collection dataTask={taskList.data} />
      </div>
    );
  }
}

ListsToolbar.contextTypes = {
  store: PropTypes.object
};

export default ListsToolbar;
