import {
  DELETE_TODO_STARTED,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE
} from './actionTypes';
import { baseUrl, apis } from '../../config/';

const deleteStart = () => ({
  type: DELETE_TODO_STARTED,
  status: 'loading',
  message: ''
});

const deleteSuccess = (resJson) => ({
  type: DELETE_TODO_SUCCESS,
  resJson
});

const deleteFailure = (error) => ({
  type: DELETE_TODO_FAILURE,
  error
});

export const deleteTodo = (uid, selectedTodos, token) => {
  return dispatch => {
    dispatch(deleteStart());

    fetch(`${baseUrl}${apis.deleteTodo.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid, selectedTodos})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(deleteFailure({
        status: 200,
	message: '删除失败'
      }));
    }).then(resJson => {
      dispatch(deleteSuccess(resJson));
    }).catch(error => {
      dispatch(deleteFailure(error));
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch(deleteStart());
  };
};

