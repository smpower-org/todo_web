import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { view as Content } from '../../content/';
import { view as Navigation } from '../../components/navigation/';
import { view as UserBox } from '../../components/userBox/';
import { actions as userboxActions } from '../../components/userBox/';

import './style.scss';

class Home extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hideUserbox = this.hideUserbox.bind(this);

    this.state = Object.assign({}, {
      // default params...
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      isAuthenticate: this.context.store.getState().auth.isAuthenticate,
      isUserboxExtended: this.context.store.getState().userbox.isUserboxExtended
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  hideUserbox(event) {
    const target = event.target;
    const dataSelector = target.getAttribute('data-selector');
    const isUserboxExtended = this.state.isUserboxExtended;

    switch(dataSelector) {
      case 'user-toolbar':
        break;
      default:
	if (isUserboxExtended) {
	  this.context.store.dispatch(
	    userboxActions.toggleUserboxStatus(false)
	  );
	}
	break;
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

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
    const isUserboxExtended = this.state.isUserboxExtended;

    return (
      isAuthenticate ? (
	<div className="main" onClick={this.hideUserbox}>
	  <Navigation />
	  <Content />
	  {
	    isUserboxExtended ? (
	      <UserBox />
	    ) : (
	      ''
	    )
	  }
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
