import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getData as getTaskListData } from '../actions';
import Toolbar from './toolbar';
import Tasks from './tasks';

import './style.scss';

class Content extends Component {
  componentDidMount() {
    const uid = parseInt(sessionStorage.getItem('uid'), 10);
    const token = sessionStorage.getItem('token');

    this.context.store.dispatch(getTaskListData(uid, token));
  }

  render() {
    return (
      <div className="content">
	<Toolbar />
	<Tasks />
      </div>
    );
  }
}

Content.contextTypes = {
  store: PropTypes.object
};

export default Content;

