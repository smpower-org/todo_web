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

// 用户从注册模块注册成功加载登录模块时，调用该方法可清除注册时的 Store 状态，
// 解决再返回注册模块输入用户名时主动跳转到登录模块的问题
export const clearStore = () => {
  return (dispatch) => {
    dispatch(registStarted());
  };
};
