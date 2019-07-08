import { put, all } from 'redux-saga/effects'
import {
  TOGGLE_SIDER,
} from './actionTypes'

function *toggleSider() {
  yield put({ type: TOGGLE_SIDER })
}

export default function *siderAction() {
  yield all([
    toggleSider(),
  ])
}
