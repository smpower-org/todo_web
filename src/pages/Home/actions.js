import { put, all } from 'redux-saga/effects'
import {
  TOGGLE_SIDER,
} from './actionTypes'

function *toggleSider(action) {
  yield put({ type: TOGGLE_SIDER, isSiderExtended: action.isSiderExtended })
}

export default function *siderAction() {
  yield all([
    toggleSider(),
  ])
}
