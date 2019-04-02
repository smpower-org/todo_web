import { AUTH } from './actionTypes';

export default (state = {isAuthenticated: false}, action) => {
  console.log(state);

  switch(action.type) {
    case AUTH:
      return { ...state, isAuthenticated: !action.isAuthenticated };
    break;
    default:
      return state;
      break;
  }
};

