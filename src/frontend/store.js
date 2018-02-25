import { createStore as _createStore, applyMiddleware } from 'redux'
import { logInitialState, loggingMiddleware } from '../shared/logging/redux'

import isDev from 'electron-is-dev'
import reducer from './reducer'
import thunk from 'redux-thunk'

export const createStore = () => {
  const middleware = [thunk]

  if (isDev) {
    middleware.push(loggingMiddleware())
  }

  const store = _createStore(reducer, applyMiddleware(...middleware))

  if (isDev) {
    logInitialState(store)
  }

  return store
}

export default createStore()
