import { requestBase, requestHandlerBase } from '../../shared/communication'

import { ipcRenderer } from 'electron'
import store from '../store'

export const request = (name, payload) => (
  requestBase(ipcRenderer, ipcRenderer, name, payload)
)

export const requestHandler = (name, handler) => (
  requestHandlerBase(ipcRenderer, name, (resolve, reject, _, payload) => {
    handler(resolve, reject, payload, store.dispatch, store.getState())
  })
)
