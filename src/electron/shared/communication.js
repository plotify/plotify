import { requestBase, requestHandlerBase, requestHandlerOnceBase } from '../../shared/communication'

import { getMainWindow } from '../main-window'
import { ipcMain } from 'electron'

export const request = (name, payload) => (
  requestBase(getMainWindow().webContents, ipcMain, name, payload)
)

export const requestHandler = (name, handler) => {
  requestHandlerBase(ipcMain, name, handler)
}

export const requestHandlerOnce = (name, handler) => {
  requestHandlerOnceBase(ipcMain, name, handler)
}
