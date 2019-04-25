import {
  CREATELIST_START,
  CREATELIST_SUCCESS,
  CREATELIST_FAILURE
} from './actionTypes';

export default (state = {status: 'loading', message: '', data: undefined}, action) => {
  switch(action.type) {
    case CREATELIST_START:
      return {
	...state,
	status: action.status,
	message: action.message,
	data: action.data
      };
    case CREATELIST_SUCCESS:
      return {
	...state,
	...action.resJson
      };
    case CREATELIST_FAILURE:
      return {
        ...state,
	...action.error
      };
    default:
      return state;
  }
};

