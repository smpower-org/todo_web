import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { View as Boundle } from './components/Bundle/'
import { View as Counter } from './pages/Counter/'
import { View as Demo } from './pages/Demo/'
import './App.scss'

// Home component
const Home = props => (
  <Boundle load={ () => import('./pages/Home/') }>
    { Home => <Home { ...props } /> }
  </Boundle>
)

// Login component
const Login = props => (
  <Boundle load={ () => import('./pages/Login/') }>
    { Login => <Login { ...props } /> }
  </Boundle>
)

// Register component
const Register = props => (
  <Boundle load={() => import('./pages/Register/')}>
    { Register => <Register { ...props } /> }
  </Boundle>
)

// NoMatch component
const NoMatch = props => (
  <Boundle load={ () => import('./pages/NoMatch/') }>
    { NoMatch => <NoMatch { ...props } /> }
  </Boundle>
)

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/counter" component={ Counter } />
        <Route path="/demo" component={ Demo } />
        <Route component={ NoMatch } />
      </Switch>
    </div>
  )
}

export default App
