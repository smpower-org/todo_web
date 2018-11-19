import {
  CHECKEMAIL_STARTED, CHECKEMAIL_SUCCESS, CHECKEMAIL_FAILURE
} from './actionTypes';
import {baseUrl, apis} from '../config/';

const checkEmailStarted = () => ({
  type: CHECKEMAIL_STARTED
});

const checkEmailSuccess = (resJson) => ({
  type: CHECKEMAIL_SUCCESS,
  resJson
});

const checkEmailFailure = (error) => ({
  type: CHECKEMAIL_FAILURE,
  error
});

export const checkEmail = (email) => {
  return (dispatch) => {
    dispatch(checkEmailStarted());

    fetch(`${baseUrl}${apis.checkEmail.path}`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({email})
    }).then(res => {
      if (res.status === 200) return res.json();
      else dispatch(checkEmailFailure('向后台验证邮箱时出错'));
    }).then(resJson => {
      dispatch(checkEmailSuccess(resJson));
    }).catch(error => {
      dispatch(checkEmailFailure(error));
    });
  };
};
