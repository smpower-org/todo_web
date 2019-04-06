import { GETDATA_STARTED, GETDATA_SUCCESS, GETDATA_FAILURE } from './actionTypes';
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case GETDATA_STARTED:
      return state;
    case GETDATA_SUCCESS:
      return {
        status: Status.SUCCESS,
	...action.resJson
      };
    case GETDATA_FAILURE:
      return {
        status: Status.FAILURE,
	...action.error
      };
    default:
      return state;
  }
};

