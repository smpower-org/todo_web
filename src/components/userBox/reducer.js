import {
  SET_USERBOX_VISIBLE,
  SET_USERBOX_HIDDEN
} from './actionTypes';

export default (state = {isUserboxExtended: false}, action) => {
  switch(action.type) {
    case SET_USERBOX_VISIBLE:
      return {
        ...state,
	isUserboxExtended: true
      };
    case SET_USERBOX_HIDDEN:
      return {
        ...state,
	isUserboxExtended: false
      };
    default:
      return state;
  }
};

