import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { view as Home } from './home/';
import { view as Login } from './login/';
// import { view as AuthExample } from './components/auth/';

import './App.css';

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

  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
	{/*
	  <Home />
	*/}
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
