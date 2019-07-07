import { put, call, takeEvery, all } from 'redux-saga/effects'
import {
  LOGIN,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './actionTypes'
import { postLogin } from './api'

function *login(action) {
  console.log(action)
  try {
    yield put({ type: LOGIN_LOADING, status: 'loading' })
    const url = 'http://localhost:8080/login'
    const result = yield call(() => postLogin(url, action.data))
    if (result.response) {
      yield put({
        type: LOGIN_FAILURE,
        status: 'failure',
        payload: result.response.statusText,
      })
    } else {
      yield put({
        type: LOGIN_SUCCESS,
        status: 'success',
        payload: result,
      })
    }
  } catch(error) {
    yield put({ type: LOGIN_FAILURE, payload: error, status: 'failure' })
  }
}

function *watchLogin() {
  yield takeEvery(LOGIN, login)
}

export default function *loginAction() {
  yield all([
    watchLogin(),
  ])
}
