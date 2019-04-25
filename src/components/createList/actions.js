import {
  CREATELIST_START,
  CREATELIST_SUCCESS,
  CREATELIST_FAILURE
} from './actionTypes';
import {
  LOADING,
  SUCCESS,
  FAILURE
} from './status';
import { baseUrl, apis } from '../../config/';

const start = () => ({
  type: CREATELIST_START,
  status: LOADING,
  message: '',
  data: undefined
});

const success = (resJson) => ({
  type: CREATELIST_SUCCESS,
  status: SUCCESS,
  resJson
});

const failure = (error) => ({
  type: CREATELIST_FAILURE,
  status: FAILURE,
  error
});

export const createList = (uid, createdList, token) => {
  return dispatch => {
    dispatch(start());

    fetch(`${baseUrl}${apis.createList.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8',
	'Authorization': token
      },
      body: JSON.stringify({uid, createdList})
    }).then(res => {
      if (res.status === 200) return res.json();
      else {
	dispatch(failure({
	  status: res.status,
	  message: '创建失败'
	}));
      }
    }).then(resJson => {
      dispatch(success(resJson));
    }).catch(error => {
      dispatch(failure(error));
    });
  };
};

export const reset = () => {
  return dispatch => {
    dispatch(start());
  };
};

