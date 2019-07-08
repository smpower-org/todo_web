import { combineReducers } from 'redux'
import { counterReducer } from '@src/pages/Counter/'
import { usersReducer } from '@src/pages/Demo/'
import { loginReducer } from '@src/pages/Login/'
import { registerReducer } from '@src/pages/Register/'
import { siderReducer } from '@src/pages/Home/'

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  users: usersReducer,
  register: registerReducer,
  sider: siderReducer,
})

export default reducers
