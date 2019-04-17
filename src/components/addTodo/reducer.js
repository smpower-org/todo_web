import {
  ADD_TODO_STARTED,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE
} from './actionTypes';

export default (state = {status: 'loading', message: ''}, action) => {
  switch(action.type) {
    case ADD_TODO_STARTED:
      return {
        ...state,
	status: action.status,
	message: action.message
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
	...action.resJson
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
	...action.error
      };
    default:
      return state;
  }
};

