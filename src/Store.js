import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as registerReducer} from './register/';
import {reducer as loginReducer} from './login/';
import {reducer as checkUsernameReducer} from './checkUsername/';
import {reducer as checkEmailReducer} from './checkEmail/';

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  checkUsername: checkUsernameReducer,
  checkEmail: checkEmailReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
