import { applyMiddleware, createStore } from 'redux'

import isDev from 'electron-is-dev'
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

if (isDev) {
  store.subscribe(() => {
    const separator = '---------------------------------------------------------------------'
    console.log(separator + '\n')
    console.log(store.getState())
    console.log('\n' + separator)
  })
}

export default store
