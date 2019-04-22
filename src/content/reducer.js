import {
  GETDATA_STARTED,
  GETDATA_SUCCESS,
  GETDATA_FAILURE,
  UPDATE_DATA_CHECKED_STATUS,
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  UNCOMPLETE_TODO,
  TOGGLE_TODO_CHECKED,
  SELECT_TODO
} from './actionTypes';
import * as Status from './status';

let resJson = {};

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
	  taskItem.deleted = false;
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

      return resJson;
    case DELETE_TODO:
      // 删除一个 todo
      if (action.selectedTodo.length === 1) {
	resJson.data.forEach((listItem, listIndex) => {
	  if (action.selectedTodo[0].listId === listItem.id) {
	    listItem.dataList.forEach((taskItem, taskIndex) => {
	      if (action.selectedTodo[0].taskId === taskItem.id) {
		taskItem.selected = false;
		taskItem.deleted = true;
		listItem.uncompleted--;
	      }
	    });
	  }
	});
      }

      // @TODO 删除多个 todo

      return resJson;
    case COMPLETE_TODO:
      if (typeof action.selectedTodos !== 'undefined') {
	// 标记一个 todo 为已完成
	if (action.selectedTodos.length === 1) {
	  resJson.data.forEach((listItem, listIndex) => {
	    if (action.selectedTodos[0].listId === listItem.id) {
	      listItem.dataList.forEach((taskItem, taskIndex) => {
		if (action.selectedTodos[0].taskId === taskItem.id) {
		  taskItem.completed = true;
		  listItem.uncompleted--;
		}
	      });
	    }
	  });
	}

	// @TODO 标记多个 todo 为已完成
	if (action.selectedTodos.length >=2 ) {
	}
      }

      return resJson;
    case UNCOMPLETE_TODO:
      if (typeof action.selectedTodos !== 'undefined') {
	// 标记一个 todo 为未完成
	if (action.selectedTodos.length === 1) {
	  resJson.data.forEach((listItem, listIndex) => {
	    if (action.selectedTodos[0].listId === listItem.id) {
	      listItem.dataList.forEach((taskItem, taskIndex) => {
		if (action.selectedTodos[0].taskId === taskItem.id) {
		  taskItem.completed = false;
		  listItem.uncompleted++;
		}
	      });
	    }
	  });
	}

	// @TODO 标记多个 todo 为未完成
	if (action.selectedTodos.length >=2 ) {
	}
      }

      return resJson;
    case TOGGLE_TODO_CHECKED:
      resJson.data.forEach((listItem, listIndex) => {
        if (listItem.id === action.listId) {
	  listItem.dataList.forEach((taskItem, taskIndex) => {
	    if (taskItem.id === action.taskId) {
	      taskItem.completed = !taskItem.completed;
	    }
	  });
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

