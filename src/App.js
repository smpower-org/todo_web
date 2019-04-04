import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { view as Home } from './home/';
import { view as Login } from './login/';
import { view as NoMath } from './404/';

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

  render() {
    const {isAuthenticate} = this.state;

    return (
      <div className="App">
	<Switch>
	  <Route 
	    exact
	    path="/"
	    render={() => {
	      return isAuthenticate ? (
		<Redirect to="/home" />
	      ) : (
		<Redirect to="/login" />
	      );
	    }}
	  />
	  <Route 
	    path="/home"
	    component={Home}
	  />
	  <Route 
	    exact
	    path="/login"
	    component={Login}
	  />
	  <Route component={NoMath} />
	</Switch>
	{
	  /*
	  <Switch>
	    <Route 
	      exact
	      path="/"
	      render={({history}) => {
		return isAuthenticate ? (
		  <Redirect to="/home" />
		) : (
		  <Redirect to="/login" />
		)}
	      }
	    />
	    <Route 
	      exact
	      path="/login"
	      component={Login}
	    />
	    <Route
	      exact
	      path="/home"
	      component={Home}
	    />
	    <Route 
	      component={({history}) => <NoMath />}
	    />
	  </Switch>
	  */
	}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }
}

App.contextTypes = {
  store: PropTypes.object
};

export default App;
