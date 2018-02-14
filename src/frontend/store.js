import { applyMiddleware, createStore } from 'redux'
import { logInitialState, loggingMiddleware } from '../shared/logging/redux'

import isDev from 'electron-is-dev'
import reducers from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

if (isDev) {
  middleware.push(loggingMiddleware())
}

const store = createStore(reducers, applyMiddleware(...middleware))

if (isDev) {
  logInitialState(store)
}

export default store
