import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import { setStore } from './shared/store'
import registerEventHandlers from './event-handlers'
import ThemeProvider from './view/components/ThemeProvider'
import App from './App'

const store = createStore(reducers)
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
setStore(store)

registerEventHandlers()

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
