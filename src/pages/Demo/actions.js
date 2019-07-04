import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  FETCH_USERS,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './actionTypes'
import { getUsers } from './api'

function *fetchUsers() {
  try {
    yield put({ type: FETCH_USERS_LOADING, status: 'loading' })
    const result = yield call(() => getUsers('https://api.github.com/users/github'))
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
