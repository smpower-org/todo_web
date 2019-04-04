import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as authReducer } from './components/auth/';
import { reducer as registerReducer } from './register/';
import { reducer as loginReducer } from './login/';
import { reducer as checkUsernameReducer } from './components/checkUsername/';
import { reducer as checkEmailReducer } from './components/checkEmail/';
import { reducer as navigationReducer } from './components/navigation/';

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  checkUsername: checkUsernameReducer,
  checkEmail: checkEmailReducer,
  navigation: navigationReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
