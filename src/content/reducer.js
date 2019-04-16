import {
  GETDATA_STARTED,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  UPDATE_DATA_CHECKED_STATUS
} from './actionTypes';
import * as Status from './status';

let resJson = {};

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case GETDATA_STARTED:
      return state;
    case GETDATA_SUCCESS:
      resJson = Object.assign({}, action.resJson);
      return {
        status: Status.SUCCESS,
	...action.resJson
      };
    case GETDATA_FAILURE:
      return {
        status: Status.FAILURE,
	...action.error
      };
    case UPDATE_DATA_CHECKED_STATUS:
      const taskList = resJson.data;
      taskList.map((item, index) => {
        if (index === action.index) {
	  item.checked = !item.checked;
	}
	return item;
      });
      return resJson;
    default:
      return state;
  }
};

