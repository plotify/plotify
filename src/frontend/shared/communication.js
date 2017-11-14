import { requestBase, requestHandlerBase } from '../../shared/communication'

import { getStore } from './store'
import { ipcRenderer } from 'electron'

export const request = (name, payload) => (
  requestBase(ipcRenderer, ipcRenderer, name, payload)
)

export const requestHandler = (name, handler) => (
  requestHandlerBase(ipcRenderer, name, (resolve, reject, payload) => {
    handler(resolve, reject, getStore().dispatch, payload)
  })
)
