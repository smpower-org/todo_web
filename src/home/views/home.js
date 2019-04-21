import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { view as Content } from '../../content/';
import { view as Navigation } from '../../components/navigation/';
import { view as UserBox } from '../../components/userBox/';
import { view as TaskToolBox } from '../../components/taskToolBox/';
import { actions as userboxActions } from '../../components/userBox/';
import { actions as taskToolBoxActions } from '../../components/taskToolBox/';

import './style.scss';

class Home extends Component {
  constructor() {
    super(...arguments);

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hideBox = this.hideBox.bind(this);

    this.state = Object.assign({}, {
      // default params...
    }, this.getOwnState());
  }

  getOwnState() {
    const store = this.context.store;

    return {
      isAuthenticate: store.getState().auth.isAuthenticate,
      isUserboxExtended: store.getState().userbox.isUserboxExtended,
      isTaskToolBoxVisible: store.getState().taskToolBox.isTaskToolBoxVisible
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  hideBox(event) {
    const target = event.target;
    const dataSelector = target.getAttribute('data-selector');
    const { isUserboxExtended, isTaskToolBoxVisible } = this.state;

    switch(dataSelector) {
      case 'user-toolbar':
        break;
      case 'task-tool-box':
	break;
      default:
	if (isUserboxExtended) {
	  this.context.store.dispatch(
	    userboxActions.hide()
	  );
	}

	if (isTaskToolBoxVisible) {
	  this.context.store.dispatch(
	    taskToolBoxActions.hidden()
	  );
	}

	break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isUserboxExtended !== nextState.isUserboxExtended ||
      this.state.isTaskToolBoxVisible !== nextState.isTaskToolBoxVisible
    ) return true;
    return false;
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
    const { isUserboxExtended, isTaskToolBoxVisible } = this.state;

    return (
      isAuthenticate ? (
	<div className="main" onClick={this.hideBox}>
	  <Navigation />
	  <Content />
	  {
	    isUserboxExtended ? (
	      <UserBox />
	    ) : (
	      ''
	    )
	  }
	  {
	    isTaskToolBoxVisible ? (
	      <TaskToolBox />
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
