import App from './App'
import { GET_SAVED_STATE } from '../shared/requests'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from './view/components/ThemeProvider'
import { createStore } from 'redux'
import reducers from './reducers'
import registerRequestHandlers from './request-handlers'
import { request } from './shared/communication'
import { setState } from './actions'
import { setStore } from './shared/store'

const store = createStore(reducers)
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
setStore(store)

registerRequestHandlers()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

request(GET_SAVED_STATE)
 .then(state => store.dispatch(setState(state)))
 .catch(() => Promise.resolve(undefined))
 .then(() => render())

render()
