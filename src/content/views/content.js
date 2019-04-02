import React, {Component} from 'react';
import Toolbar from './toolbar';
import Tasks from './tasks';

import './style.scss';

class Content extends Component {
  render() {
    return (
      <div className="content">
	<Toolbar />
	<Tasks />
      </div>
    );
  }
}

export default Content;
