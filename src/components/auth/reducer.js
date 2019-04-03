import { SET_AUTHENTICATE_STATUS } from './actionTypes';

export default (state = {isAuthenticate: false}, action) => {
  switch(action.type) {
    case SET_AUTHENTICATE_STATUS:
      return { ...state, isAuthenticate: action.isAuthenticate };
    default:
      return state;
  }
};

