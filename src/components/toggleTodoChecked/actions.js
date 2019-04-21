import {
  TOGGLE_TODO_CHECKED_STARTED,
  TOGGLE_TODO_CHECKED_SUCCESS,
  TOGGLE_TODO_CHECKED_FAILURE
} from './actionTypes';
import { baseUrl, apis } from '../../config/';

const toggleStarted = () => ({
  type: TOGGLE_TODO_CHECKED_STARTED,
  status: 'loading',
  message: ''
});

const toggleSuccess = (resJson) => ({
  type: TOGGLE_TODO_CHECKED_SUCCESS,
  resJson
});

const toggleFailure = (error) => ({
  type: TOGGLE_TODO_CHECKED_FAILURE,
  error
});

export const toggleTodoChecked = (listIndex, taskId, uid, token) => {
  return dispatch => {
    dispatch(toggleStarted());

    fetch(`${baseUrl}${apis.toggleTodoChecked.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({listIndex, taskId, token, uid})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(toggleFailure({
        status: 200,
	message: '标记失败'
      }));
    }).then(resJson => {
      dispatch(toggleSuccess(resJson));
    }).catch(error => {
      dispatch(toggleFailure(error));
    });
  };
};

// 标记任务为已完成
export const complete = (uid, selectedTodos, token) => {
  return dispatch => {
    dispatch(toggleStarted());

    fetch(`${baseUrl}${apis.toggleTodoChecked.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8',
	Authorization: token
      },
      body: JSON.stringify({uid, selectedTodos})
    }).then(res => {
      if (res.status === 200) return res.json();
      else {
        dispatch(toggleFailure({
	  status: res.status,
	  message: '标记失败'
	}));
      }
    }).then(resJson => {
      dispatch(toggleSuccess(resJson));
    }).catch(error => {
      dispatch(toggleFailure(error));
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch(toggleStarted());
  };
};

