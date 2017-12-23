import { requestBase, requestHandlerBase, requestHandlerOnceBase } from '../../shared/communication'

import { getWindowByWebContents } from '../windows'
import { ipcMain } from 'electron'

export const request = (receiverWindow, name, payload) => (
  requestBase(receiverWindow.webContents, ipcMain, name, payload)
)

export const requestHandler = (name, handler) => {
  requestHandlerBase(ipcMain, name, (resolve, reject, sender, payload) => {
    const senderWindow = getWindowByWebContents(sender)
    handler(resolve, reject, senderWindow, payload)
  })
}

export const requestHandlerOnce = (name, handler) => {
  requestHandlerOnceBase(ipcMain, name, (resolve, reject, sender, payload) => {
    const senderWindow = getWindowByWebContents(sender)
    handler(resolve, reject, senderWindow, payload)
  })
}
