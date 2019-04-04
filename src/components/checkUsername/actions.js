import {
  CHECKUSERNAME_STARTED, CHECKUSERNAME_SUCCESS, CHECKUSERNAME_FAILURE
} from './actionTypes';
import {baseUrl, apis} from '../../config/';

export const checkUsernameStarted = () => ({
  type: CHECKUSERNAME_STARTED
});

export const checkUsernameSuccess = (resJson) => ({
  type: CHECKUSERNAME_SUCCESS,
  resJson
});

export const checkUsernameFailure = (error) => ({
  type: CHECKUSERNAME_FAILURE,
  error
});

export const checkUsername = (username) => {
  return (dispatch) => {
    dispatch(checkUsernameStarted());

    fetch(`${baseUrl}${apis.checkUsername.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({username})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(checkUsernameFailure());
    }).then(resJson => {
      dispatch(checkUsernameSuccess(resJson));
    }).catch(error => {
      dispatch(checkUsernameFailure(error));
    });
  };
};
