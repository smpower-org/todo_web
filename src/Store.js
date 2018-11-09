import {createStore, combineReducers} from 'redux';

const reducer = combineReducers({
  test: {mes: 'Hello world.'}
});

export default createStore(reducer);
