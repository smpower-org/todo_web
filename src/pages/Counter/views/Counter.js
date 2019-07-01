import React from 'react'
import { Button } from 'antd'
import store from '@src/store/'
import {
  INCREMENT, DECREMENT, INCREMENT_ASYNC, DECREMENT_ASYNC
} from '../actionTypes'
import './style.scss'

class Counter extends React.Component {
  render() {
    const { counter } = store.getState()
    return (
      <div className="counter">
        <Button onClick={() => store.dispatch({ type: INCREMENT })}>Increment</Button>
        {' '}
        <Button onClick={() => store.dispatch({ type: DECREMENT })}>Decrement</Button>
        {' '}
        <Button onClick={() => store.dispatch({ type: INCREMENT_ASYNC })}>Increment after 1 second</Button>
        {' '}
        <Button onClick={() => store.dispatch({ type: DECREMENT_ASYNC })}>Decrement after 1 second</Button>
        <hr />
        <p>Clicked: {counter} times</p>
      </div>
    )
  }
}

export { Counter as View }
