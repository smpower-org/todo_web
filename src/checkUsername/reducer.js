import {
  CHECKUSERNAME_STARTED, CHECKUSERNAME_SUCCESS, CHECKUSERNAME_FAILURE
} from './actionTypes';
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case CHECKUSERNAME_STARTED:
      return {status: Status.LOADING};
    case CHECKUSERNAME_SUCCESS:
      return {
	status: Status.SUCCESS,
	...action.resJson
      };
    case CHECKUSERNAME_FAILURE:
      return {
        status: Status.FAILURE,
	...action.error
      };
    default:
      return state;
  }
};
