import React, { Component } from 'react';
import {view as Navigation} from './navigation/';
import {view as Content} from './content/';
// import logo from './logo.svg';
import './App.css';
// import TestFetch from './testFetch';

class App extends Component {
  render() {
    return (
      <div className="App">
	<Navigation />
	<Content />
	{/*<header className="App-header">
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
	<TestFetch />*/}
      </div>
    );
  }
}

export default App;
