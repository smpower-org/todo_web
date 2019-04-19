import {
  GETDATA_STARTED,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  UPDATE_DATA_CHECKED_STATUS,
  ADD_TODO,
  TOGGLE_TODO_CHECKED,
  SELECT_TODO
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

      resJson.data.forEach((listItem, listIndex) => {
	listItem.dataList.forEach((taskItem, taskIndex) => {
	  taskItem.selected = false;
	});
      });

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

	// 切换列表时，将选中的任务项取消选中
	if (item.checked) {
	  // 如果点击的是同一个列表，则不会将已选中的任务项取消选中
	  if (index !== action.listIndex) {
	    item.dataList.forEach((taskItem, taskIndex) => {
	      if (taskItem.selected) taskItem.selected = false;
	    });
	  }
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
	  if (item.completed) matchedList.uncompleted--;
	  if (!item.completed) matchedList.uncompleted++;
	}
      });

      return resJson;
    case SELECT_TODO:
      const selectedTodo = action.selectedTodo;

      if (selectedTodo.length === 1) {
	const {listId, taskId} = selectedTodo[0];
	let selectedList = {};

	resJson.data.forEach((item, index) => {
	  if (listId === item.id) selectedList = item;
	});

	selectedList.dataList.forEach((item, index) => {
	  if (taskId === item.id) { 
	    item.selected = !item.selected;
	  } else item.selected = false;
	});
      }

      if (selectedTodo.length > 1) {
        console.log('选择多个 todo');
      }

      return resJson;
    default:
      return state;
  }
};

