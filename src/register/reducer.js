import {
  REGIST_STARTED, REGIST_SUCCESS, REGIST_FAILURE
} from './actionTypes';
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case REGIST_STARTED:
      return {status: Status.LOADING};
    case REGIST_SUCCESS:
      return {
	status: Status.SUCCESS,
	...action.resJson
      };
    case REGIST_FAILURE:
      return {
        status: Status.FAILURE
      };
    default:
      return state;
  }
};
