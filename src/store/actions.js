import { all } from 'redux-saga/effects'
import { counterAction } from '@src/pages/Counter/'
import { loginAction } from '@src/pages/Login/'

export default function* rootAction() {
  yield all([
    counterAction(),
    loginAction(),
  ])
}
