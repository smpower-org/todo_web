import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'

const reducers = combineReducers({
  counter: counterReducer
})

export default reducers
