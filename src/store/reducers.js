import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'
import { usersReducer } from '@src/pages/Demo/'
import { loginReducer } from '@src/pages/Login/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  users: usersReducer,
})

export default reducers
