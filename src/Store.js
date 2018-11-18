import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as registerReducer} from './register/';
import {reducer as loginReducer} from './login/';
import {reducer as checkUsernameReducer} from './checkUsername/';

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  checkUsername: checkUsernameReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
