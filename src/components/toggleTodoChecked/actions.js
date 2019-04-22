import {
  TOGGLE_TODO_CHECKED_STARTED,
  TOGGLE_TODO_CHECKED_SUCCESS,
  TOGGLE_TODO_CHECKED_FAILURE
} from './actionTypes';
import { baseUrl, apis } from '../../config/';

const toggleStarted = (toggleType) => ({
  type: TOGGLE_TODO_CHECKED_STARTED,
  status: 'loading',
  message: '',
  toggleType
});

const toggleSuccess = (resJson, toggleType) => ({
  type: TOGGLE_TODO_CHECKED_SUCCESS,
  resJson,
  toggleType
});

const toggleFailure = (error, toggleType) => ({
  type: TOGGLE_TODO_CHECKED_FAILURE,
  error,
  toggleType
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
    dispatch(toggleStarted('complete'));

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
	}, 'complete'));
      }
    }).then(resJson => {
      dispatch(toggleSuccess(resJson, 'complete'));
    }).catch(error => {
      dispatch(toggleFailure(error, 'complete'));
    });
  };
};

// 标记任务为未完成
export const uncomplete = (uid, selectedTodos, token) => {
  return dispatch => {
    dispatch(toggleStarted('uncomplete'));

    fetch(`${baseUrl}${apis.toggleTodoChecked.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid, selectedTodos})
    }).then(res => {
      if (res.status === 200) return res.json();
      else {
        dispatch({
	  status: res.status,
	  message: '标记失败'
	}, 'uncomplete');
      }
    }).then(resJson => {
      dispatch(toggleSuccess(resJson, 'uncomplete'));
    }).catch(error => {
      dispatch(toggleFailure(error, 'uncomplete'));
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch(toggleStarted());
  };
};

