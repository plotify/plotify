import { applyMiddleware, createStore } from 'redux'

import isDev from 'electron-is-dev'
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

const logState = () => {
  const separator = '---------------------------------------------------------------------'
  console.log(separator + '\n')
  console.log(store.getState())
  console.log('\n' + separator)
}

if (isDev) {
  logState()
  store.subscribe(logState)
}

export default store
