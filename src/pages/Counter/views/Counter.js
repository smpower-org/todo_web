import React from 'react'
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
        <button onClick={() => store.dispatch({type: INCREMENT})}>Increment</button>
        {' '}
        <button onClick={() => store.dispatch({type: DECREMENT})}>Decrement</button>
        {' '}
        <button>Increment after 1 second</button>
        {' '}
        <button>Decrement after 1 second</button>
        <hr />
        <p>Clicked: {counter} times</p>
      </div>
    )
  }
}

export { Counter as View }
