import {
  DELETE_TODO_STARTED,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE
} from './actionTypes';

export default (state = {status: 'loading', message: ''}, action) => {
  switch(action.type) {
    case DELETE_TODO_STARTED:
      return {
        ...state,
	status: action.status,
	message: action.message
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
	...action.resJson
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
	...action.error
      };
    default:
      return state;
  }
};

