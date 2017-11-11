import { getMainWindow } from './main-window'

export const event = (name, payload) => {
  const mainWindow = getMainWindow()
  mainWindow.webContents.send(name, payload)
}
