import { put, all } from 'redux-saga/effects'
import {
  TOGGLE_SIDER, TOGGLE_USERBOX,
} from './actionTypes'

function *toggleSider(action) {
  yield put({ type: TOGGLE_SIDER, isSiderExtended: action.isSiderExtended })
}

function *toggleUserbox(action) {
  yield put({ type: TOGGLE_USERBOX, isUserboxExtended: action.isUserboxExtended })
}

export default function *siderAction() {
  yield all([
    toggleSider(),
    toggleUserbox(),
  ])
}
