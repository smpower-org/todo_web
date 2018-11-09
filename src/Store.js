import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as registerReducer} from './register/';

const reducer = combineReducers({
  register: registerReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
