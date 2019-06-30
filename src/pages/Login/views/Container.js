import React from 'react'
import Login from './Login'
import './style.scss'

const Container = ({ location }) => (
  <div>
    <Login location={location} />
  </div>
)

export { Container as View }
