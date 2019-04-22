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
import { baseUrl, apis } from '../config/';

export const getDataStarted = () => ({
  type: GETDATA_STARTED
});

export const getDataSuccess = (resJson) => ({
  type: GETDATA_SUCCESS,
  resJson
});

export const getDataFailure = (error) => ({
  type: GETDATA_FAILURE,
  error
});

export const getData = (uid, token) => {
  return dispatch => {
    getDataStarted();

    fetch(`${baseUrl}${apis.getData.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(getDataFailure());
    }).then(resJson => {
      resJson.data.forEach((item, index) => {
	item.dataList.forEach((taskItem, taskIndex) => {
	  taskItem.completed = false;
	});
      });

      dispatch(getDataSuccess(resJson));
    }).catch(error => {
      dispatch(getDataFailure(error));
    });
  };
};

export const updateCheckedStatus = (listIndex, taskIndex) => ({
  type: UPDATE_DATA_CHECKED_STATUS,
  listIndex,
  taskIndex
});

export const addTodo = (listIndex, taskId, text) => ({
  type: ADD_TODO,
  listIndex,
  taskId,
  text
});

export const deleteTodo = (selectedTodo) => ({
  type: DELETE_TODO,
  selectedTodo
});

// 标记任务为已完成
export const completeTodo = (selectedTodos) => ({
  type: COMPLETE_TODO,
  selectedTodos
});

// 标记任务为未完成
export const uncompleteTodo = (selectedTodos) => ({
  type: UNCOMPLETE_TODO,
  selectedTodos
});

export const toggleTodoChecked = (listId, taskId) => ({
  type: TOGGLE_TODO_CHECKED,
  listId,
  taskId
});

/**
  * @des 选择任务项
  * @params selectedTodo [Array]
  * @params selectedTodo[i] [Object]  - 选中的任务项
  * @params selectedTodo[i].listId - 选中的任务列表 id
  * @params selectedTodo[i].taskId - 选中的任务 id
**/
export const selectTodo = (selectedTodo) => ({
  type: SELECT_TODO,
  selectedTodo
});

