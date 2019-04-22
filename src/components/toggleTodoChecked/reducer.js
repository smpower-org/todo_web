import {
  TOGGLE_TODO_CHECKED_STARTED,
  TOGGLE_TODO_CHECKED_SUCCESS,
  TOGGLE_TODO_CHECKED_FAILURE
} from './actionTypes';

export default (state = {status: 'loading', message: ''}, action) => {
  switch(action.type) {
    case TOGGLE_TODO_CHECKED_STARTED:
      return {
        ...state,
	status: action.status,
	message: action.message
      };
    case TOGGLE_TODO_CHECKED_SUCCESS:
      return {
        ...state,
	...action.resJson,
	toggleType: action.toggleType
      };
    case TOGGLE_TODO_CHECKED_FAILURE:
      return {
        ...state,
	...action.error
      };
    default:
      return state;
  }
}

