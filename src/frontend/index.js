import 'babel-polyfill'

import { applyMiddleware, createStore } from 'redux'

import App from './App'
import { GET_SAVED_STATE } from '../shared/requests'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ThemeProvider from './view/components/ThemeProvider'
import { openWelcomeSection } from './welcome/actions'
import reducers from './reducers'
import registerRequestHandlers from './request-handlers'
import { request } from './shared/communication'
import { setState } from './actions'
import { setStore } from './shared/store'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))
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

store.dispatch(openWelcomeSection())
render()
