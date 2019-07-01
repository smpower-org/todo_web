import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { View as Home } from './pages/Home/'
import { View as Login } from './pages/Login/'
import { View as Register } from './pages/Register/'
import { View as Counter } from './pages/Counter/'
import { View as NoMatch } from './pages/NoMatch/'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/counter" component={Counter} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
