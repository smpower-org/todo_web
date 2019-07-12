import { put, all } from 'redux-saga/effects'
import {
  TOGGLE_SIDER_VISIBLE,
  TOGGLE_USERBOX_VISIBLE,
  TOGGLE_MOREBOX_VISIBLE,
} from './actionTypes'

function *toggleSider(action) {
  yield put({ type: TOGGLE_SIDER_VISIBLE, isSiderExtended: action.isSiderExtended })
}

function *toggleUserbox(action) {
  yield put({ type: TOGGLE_USERBOX_VISIBLE, isUserboxExtended: action.isUserboxExtended })
}

function *toggleMorebox(action) {
  console.log(action)
  yield put({ type: TOGGLE_MOREBOX_VISIBLE, isMoreboxExtended: action.isMoreboxExtended })
}

export default function *siderAction() {
  yield all([
    toggleSider(),
    toggleUserbox(),
    toggleMorebox(),
  ])
}
