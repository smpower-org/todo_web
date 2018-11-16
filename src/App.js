import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {view as Register} from './register/';
import {view as Login} from './login/';
import {view as Navigation} from './navigation/';
import {view as Content} from './content/';
// import logo from './logo.svg';
import './App.css';
// import TestFetch from './testFetch';

class Main extends Component {
  componentWillMount() {
    if (!sessionStorage.isUserLogined) {
      this.props.history.replace('/login');
      return;
    }
  }

  render() {
    return (
      <div className="main">
	<Navigation />
	<Content />
      </div>
    );
  }
}

Main.contextTypes = {
  store: PropTypes.object
};

const routes = [
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    exact: true,
    path: '/',
    component: Main
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
	{
	  routes.map((item, index) => {
	    return (
	      <Route 
		key={index}
		exact={item.exact}
		path={item.path}
		component={item.component}
	      />
	    );
	  })
	}
      </div>
    );
  }
}

export default App;
