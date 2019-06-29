import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

const Render = () => (
  ReactDOM.render(<App />, document.getElementById('root'))
)

Render()
store.subscribe(store)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
