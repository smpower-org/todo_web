import {
  TOGGLE_TASKLIST_VISIBLE
} from './actionTypes';

export default (state = {isTasklistVisible: false}, action) => {
  switch(action.type) {
    case TOGGLE_TASKLIST_VISIBLE:
      return {
	...state,
	isTasklistVisible: action.isTasklistVisible
      };
    default:
      return state;
  }
};

