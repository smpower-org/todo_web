import {
  ADD_TODO_STARTED,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE
} from './actionTypes';
import { baseUrl, apis } from '../../config/';

const addTodoStart = () => ({
  type: ADD_TODO_STARTED,
  status: 'loading',
  message: ''
});

const addTodoSuccess = (resJson) => ({
  type: ADD_TODO_SUCCESS,
  resJson
});

const addTodoFailure = (error) => ({
  type: ADD_TODO_FAILURE,
  error
});

export const addTodo = (uid, list_id, text, token) => {
  return dispatch => {
    dispatch(addTodoStart());

    fetch(`${baseUrl}${apis.addTodo.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid, list_id, text})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(addTodoFailure({
        status: 200,
	message: '添加失败'
      }))
    }).then(resJson => {
      dispatch(addTodoSuccess(resJson));
    }).catch(error => {
      dispatch(addTodoFailure(error));
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch(addTodoStart());
  }
};

