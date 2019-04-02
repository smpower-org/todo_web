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
