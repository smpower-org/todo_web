import { put, all } from 'redux-saga/effects'
import {
  TOGGLE_SIDER_VISIBLE, TOGGLE_USERBOX_VISIBLE,
} from './actionTypes'

function *toggleSider(action) {
  yield put({ type: TOGGLE_SIDER_VISIBLE, isSiderExtended: action.isSiderExtended })
}

function *toggleUserbox(action) {
  yield put({ type: TOGGLE_USERBOX_VISIBLE, isUserboxExtended: action.isUserboxExtended })
}

export default function *siderAction() {
  yield all([
    toggleSider(),
    toggleUserbox(),
  ])
}
