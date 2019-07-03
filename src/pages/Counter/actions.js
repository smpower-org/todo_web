import { delay, put, call, takeEvery, all } from 'redux-saga/effects'
import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  DECREMENT_ASYNC,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from './actionTypes'

const getData = (url) => {
  return fetch(url)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(response => response)
    .catch(error => error)
}

function* fetchUsers(action) {
  try {
    const result = yield call(() => getData('https://api.github.com/users/github'))
    console.log(result)
    yield put({ type: GET_USERS_SUCCESS, payload: result })
  } catch(err) {
    yield put({ type: GET_USERS_FAILURE, payload: err})
  }
}

function* watchFetchUsers() {
  yield takeEvery(GET_USERS, fetchUsers)
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: INCREMENT })
}
function* decrementAsync() {
  yield delay(1000)
  yield put({ type: DECREMENT })
}

function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync)
}
function* watchDecrementAsync() {
  yield takeEvery(DECREMENT_ASYNC, decrementAsync)
}

export default function* counterAction() {
  yield all([
    watchIncrementAsync(),
    watchDecrementAsync(),
    watchFetchUsers(),
  ])
}