import React from 'react'
import { Redirect } from 'react-router-dom'
import store from '@src/store/'
import './style.scss'

const Container = ({ location }) => {
  const { login } = store.getState()
  if (!login.auth) return <Redirect to="/login" />

  return (
    <div>Home</div>
  )
}

export { Container as View }
