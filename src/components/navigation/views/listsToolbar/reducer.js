import {
  SET_TASKLIST_CHECKED_STATUS
} from './actionTypes';

export default (state = {}, action) => {
  switch(action.type) {
    case 'SET_TASKLIST_CHECKED_STATUS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

