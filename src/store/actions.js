import { all } from 'redux-saga/effects'
import { counterAction } from '@src/pages/Counter/'
import { usersAction } from '@src/pages/Demo/'
import { loginAction } from '@src/pages/Login/'
import { registerAction } from '@src/pages/Register/'

export default function* rootAction() {
  yield all([
    counterAction(),
    usersAction(),
    loginAction(),
    registerAction(),
  ])
}
