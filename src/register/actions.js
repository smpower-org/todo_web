import {
  REGIST_STARTED, REGIST_SUCCESS, REGIST_FAILURE
} from './actionTypes';
import {baseUrl, apis} from '../config/';

const registStarted = () => ({
  type: REGIST_STARTED
});

const registSuccess = (resJson) => ({
  type: REGIST_SUCCESS,
  resJson
});

const registFailure = (err) => ({
  type: REGIST_FAILURE,
  err
});

export const regist = (username, email, password) => {
  return (dispatch) => {
    dispatch(registStarted());

    fetch(`${baseUrl}${apis.regist.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({username, email, password})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(registFailure());
    }).then(resJson => {
      dispatch(registSuccess(resJson));
    }).catch(err => {
      dispatch(registFailure(err));
    });
  };
};
