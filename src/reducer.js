import { AUTH } from './actionTypes';

const reducer = (state = {isAuthenticated: false}, action) => {
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

export { reducer };

