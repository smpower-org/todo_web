import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getData } from '../actions';
import Toolbar from './toolbar';
import Tasks from './tasks';

import './style.scss';

class Content extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = Object.assign({}, {
      // default params...
    }, this.getOwnState());
  }

  getOwnState() {
    return {
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  componentDidMount() {
    this.context.store.dispatch(getData(4, sessionStorage.getItem('token')));
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe(this.onChange);
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

