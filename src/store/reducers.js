import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'
import { usersReducer } from '@src/pages/Demo/'
import { loginReducer } from '@src/pages/Login/'
import { registerReducer } from '@src/pages/Register/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  users: usersReducer,
  register: registerReducer,
})

export default reducers
