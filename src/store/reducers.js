import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'
import { loginReducer } from '@src/pages/Login/'
import { usersReducer } from '@src/pages/Demo/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  users: usersReducer,
})

export default reducers
