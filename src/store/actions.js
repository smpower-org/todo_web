import { all } from 'redux-saga/effects'
import { counterAction } from '@src/pages/Counter/'
import { usersAction } from '@src/pages/Demo/'

export default function* rootAction() {
  yield all([
    counterAction(),
    usersAction(),
  ])
}
