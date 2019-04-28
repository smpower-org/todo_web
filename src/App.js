import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { view as Home } from './home/';
import { view as Login } from './login/';
import { view as Register } from './register/';
import { view as NoMath } from './404/';
import { view as Modal } from './components/modal/';

import './App.scss';

class App extends Component {
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
      <div className="App">
	<Switch>
	  <Route 
	    exact
	    strict
	    path="/wundertodo/"
	    render={() => {
	      return isAuthenticate ? (
		<Redirect to="/home" />
	      ) : (
		<Redirect to="/login" />
	      );
	    }}
	  />
	  <Route 
	    exact
	    path="/login"
	    component={Login}
	  />
	  <Route 
	    exact
	    path="/register"
	    component={Register}
	  />
	  <Route 
	    path="/home"
	    component={Home}
	  />
	  <Route component={NoMath} />
	</Switch>
	<Modal />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object
};

export default App;
