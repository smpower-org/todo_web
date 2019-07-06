import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './actionTypes'
import { postUsers } from './api'

function *fetchUsers() {
  try {
    yield put({ type: FETCH_USERS_LOADING, status: 'loading' })
    const url = 'http://localhost:8080/users'
    const result = yield call(() => postUsers(url))
    if (result.response) {
      yield put({ type: FETCH_USERS_FAILURE, payload: result.response.statusText, status: 'failure' })
    } else {
      yield put({ type: FETCH_USERS_SUCCESS, payload: result, status: 'success' })
    }
  } catch(error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error, status: 'failure' })
  }
}

function *watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsers)
}

export default function *usersAction() {
  yield all([
    watchFetchUsers(),
  ])
}
