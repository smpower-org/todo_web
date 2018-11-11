import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './actionTypes';
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case LOGIN_STARTED:
      return {status: Status.LOADING};
    case LOGIN_SUCCESS:
      return {
	status: Status.SUCCESS,
	...action.resJson
      };
    case LOGIN_FAILURE:
      return {
        status: Status.FAILURE,
	...action.error
      };
    default:
      return state
  }
};
