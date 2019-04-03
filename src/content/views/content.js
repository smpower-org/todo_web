import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { view as Login } from '../../login/';
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

Content.contextTypes = {
  store: PropTypes.store
};
export default Content;
