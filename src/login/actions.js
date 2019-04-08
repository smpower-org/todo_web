import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './actionTypes';
import {baseUrl, apis} from '../config/';

export const loginStarted = () => ({
  type: LOGIN_STARTED
});

export const loginSuccess = (resJson) => ({
  type: LOGIN_SUCCESS,
  resJson
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
});

export const login = (email, password) => {
  return (dispatch) => {
    loginStarted();

    fetch(`${baseUrl}${apis.login.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({email, password})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(loginFailure());
    }).then(resJson => {
      dispatch(loginSuccess(resJson));
    }).catch(error => {
      dispatch(loginFailure(error));
    });
  };
};

