import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import ThemeProvider from './theme/ThemeProvider'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers)
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
