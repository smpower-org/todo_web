import {SET_NAVIGATION_STATUS} from './actionTypes';

export default (state = {isNavigationExtended: true}, action) => {
  switch(action.type) {
    case SET_NAVIGATION_STATUS:
      return {...state, isNavigationExtended: action.navigationStatus};
    default:
      return state;
  }
};
