import {
  CHECKEMAIL_STARTED, CHECKEMAIL_SUCCESS, CHECKEMAIL_FAILURE
} from './actionTypes';
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case CHECKEMAIL_STARTED:
      return {status: Status.LOADING};
    case CHECKEMAIL_SUCCESS:
      return {
        status: Status.SUCCESS,
	...action.resJson
      };
    case CHECKEMAIL_FAILURE:
      return {
        status: Status.FAILURE,
	...action.resJson
      };
    default:
      return state;
  }
};
