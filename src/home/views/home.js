import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { view as Content } from '../../content/';
import { view as Navigation } from '../../components/navigation/';
import PropTypes from 'prop-types';

import './style.scss';

class Home extends Component {
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
      isAuthenticate: this.context.store.getState().auth.isAuthenticate
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAuthenticate !== nextState.isAuthenticate) return false;
    return true;
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe(this.onChange);
  }

  render() {
    const isAuthenticate = JSON.parse(sessionStorage.getItem('logged_in'));

    return (
      isAuthenticate ? (
	<div className="main">
	  <Navigation />
	  <Content />
	</div>
      ) : (
	<div className="no-auth-box">
	  <div className="no-auth">
	    <span>无权访问该页面，请</span>&nbsp;
	    <Link to="/login">登录</Link>
	  </div>
	</div>
      )
    );
  }
}

Home.contextTypes = {
  store: PropTypes.object
};

export default Home;
