import React, { Component } from 'react';
import { 
  BroserRouter as Router,
  Route,
  Redirect,
  withRouter 
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { view as Register } from './register/';
import { view as Login } from './login/';
import { view as Navigation } from './navigation/';
import { view as Content } from './content/';
import './App.css';

class Main extends Component {
  componentWillMount() {
    // if (!sessionStorage.isUserLogined) {
    //   this.props.history.replace('/login');
    //   return;
    // }
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
  constructor() {
    super(...arguments);

    this.state = Object.assign({}, {
      // default params...
    }, this.getOwnState());
  }

  getOwnState() {
    return {
      isAuthenticated: this.context.store.getState().auth.isAuthenticated
    };
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
	{
	  // routes.map((item, index) => {
	  //   return (
	  //     <Route 
	  //       key={index}
	  //       exact={item.exact}
	  //       path={item.path}
	  //       component={item.component}
	  //     />
	  //   );
	  // })
	}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  componentWillMount() {
    this.setState({
      unsubscribe: this.context.store.subscribe(this.onChange)
    });
  }
}

App.contextTypes = {
  store: PropTypes.object
};

export default App;
