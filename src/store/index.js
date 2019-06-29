import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootAction from './actions'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
)
sagaMiddleware.run(rootAction)

export default store;
