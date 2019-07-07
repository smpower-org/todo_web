import { put, call, takeEvery, all } from 'redux-saga/effects'
import { postRegister } from './api'
import {
  REGISTER,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actionTypes'

function *register(action) {
  try {
    yield put({ type: REGISTER_LOADING, status: 'loading' })
    const url = 'http://localhost:8080/register'
    const result = yield call(() => postRegister(url, action.data))
    if (result.response) {
      yield put({
        type: REGISTER_FAILURE,
        status: 'failure',
        payload: result.response.statusText,
      })
    } else {
      yield put({
        type: REGISTER_SUCCESS,
        status: 'success',
        payload: result,
      })
    }
  } catch(error) {
    yield put({ type: REGISTER_FAILURE, payload: error, status: 'failure' })
  }
}

function *watchRegister() {
  yield takeEvery(REGISTER, register)
}

export default function *registerAction() {
  yield all([
    watchRegister(),
  ])
}
