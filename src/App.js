import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {view as Register} from './register/';
import {view as Login} from './login/';
import {view as Navigation} from './navigation/';
import {view as Content} from './content/';
// import logo from './logo.svg';
import './App.css';
// import TestFetch from './testFetch';

const Main = () => (
  <div className="main">
    <Navigation />
    <Content />
    {
      /*<header className="App-header">
	  <img src={logo} className="App-logo" alt="logo" />
	  <p>
	    Edit <code>src/App.js</code> and save to reload.
	  </p>
	  <a
	    className="App-link"
	    href="https://reactjs.org"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    Learn React
	  </a>
	</header>
	<TestFetch />*/
    }
  </div>
);

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
    path: '/main',
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
