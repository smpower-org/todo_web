import React from 'react'
import { Button } from 'antd'
import {
  INCREMENT, DECREMENT, INCREMENT_ASYNC, DECREMENT_ASYNC
} from '../actionTypes'
import './style.scss'

class Counter extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.counter !== nextProps.counter) return true
    else return false
  }

  render() {
    const { dispatch, counter } = this.props
    return (
      <div className="counter">
        <Button onClick={() => dispatch({ type: INCREMENT })}>Increment</Button>
        {' '}
        <Button onClick={() => dispatch({ type: DECREMENT })}>Decrement</Button>
        {' '}
        <Button onClick={() => dispatch({ type: INCREMENT_ASYNC })}>Increment after 1 second</Button>
        {' '}
        <Button onClick={() => dispatch({ type: DECREMENT_ASYNC })}>Decrement after 1 second</Button>
        <hr />
        <p>Clicked: {counter} times</p>
      </div>
    )
  }
}

export default Counter
