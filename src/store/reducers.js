import { combineReducers } from 'redux'
import { counterReducer, usersReducer } from '@src/pages/Counter/'
import { loginReducer } from '@src/pages/Login/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  users: usersReducer,
})

export default reducers
