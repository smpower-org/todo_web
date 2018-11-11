import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as registerReducer} from './register/';
import {reducer as loginReducer} from './login/';

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
