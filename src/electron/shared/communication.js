import { requestBase, requestHandlerBase } from '../../shared/communication'

import { getMainWindow } from '../main-window'
import { ipcMain } from 'electron'

export const request = (name, payload) => (
  requestBase(getMainWindow().webContents, ipcMain, name, payload)
)

export const requestHandler = (name, handler) => {
  requestHandlerBase(ipcMain, name, handler)
}
