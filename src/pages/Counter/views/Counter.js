import React from 'react'
import { Button } from 'antd'
import store from '@src/store/'
import {
  INCREMENT, DECREMENT
} from '../actionTypes'
import './style.scss'

class Counter extends React.Component {
  render() {
    const { counter } = store.getState()
    return (
      <div className="counter">
        <Button onClick={() => store.dispatch({type: INCREMENT})}>Increment</Button>
        {' '}
        <Button onClick={() => store.dispatch({type: DECREMENT})}>Decrement</Button>
        {' '}
        <Button>Increment after 1 second</Button>
        {' '}
        <Button>Decrement after 1 second</Button>
        <hr />
        <p>Clicked: {counter} times</p>
      </div>
    )
  }
}

export { Counter as View }
