import { delay, put, takeEvery, all } from 'redux-saga/effects'
import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  DECREMENT_ASYNC
} from './actionTypes'

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
    watchDecrementAsync()
  ])
}