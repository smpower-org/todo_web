import {
  GETDATA_STARTED,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  UPDATE_DATA_CHECKED_STATUS,
  ADD_TODO,
  TOGGLE_TODO_CHECKED
} from './actionTypes';
import * as Status from './status';

let resJson = {};
let matchedList;

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case GETDATA_STARTED:
      return {
        ...state,
	status: action.status,
	message: '' 
      };
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
    case ADD_TODO:
      const { listIndex, taskId, text } = action;
      const listItem = resJson.data[listIndex];
      listItem.uncompleted++;

      listItem.dataList.unshift({
        id: taskId,
	text
      });

      return state;
    case TOGGLE_TODO_CHECKED:
      matchedList = resJson.data[action.listIndex];

      matchedList.dataList.forEach((item, index) => {
	if (item.id === action.taskIndex) {
	  item.completed = !item.completed;
	}
      });

      return resJson;
    default:
      return state;
  }
};

