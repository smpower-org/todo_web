import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'
import { loginReducer } from '@src/pages/Login/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
})

export default reducers
