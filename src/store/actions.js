import { all } from 'redux-saga/effects'
import { counterAction } from '@src/pages/Counter/'

export default function* rootAction() {
  yield all([
    counterAction(),
  ])
}
