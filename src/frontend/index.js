import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from './view/components/ThemeProvider'
import { createStore } from 'redux'
import reducers from './reducers'
import registerRequestHandlers from './request-handlers'
import { setStore } from './shared/store'

const store = createStore(reducers)
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
setStore(store)

registerRequestHandlers()

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
