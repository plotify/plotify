import { BrowserWindow, Menu } from 'electron'
import { registerRequestHandlers, setShouldSaveState } from './saved-state'

import { createMenuTemplate } from './menu'
import { format } from 'url'
import initEventHandlers from './events'
import initReload from './reload'
import isDev from 'electron-is-dev'
import path from 'path'
import { setMainWindow } from './main-window'

setShouldSaveState(isDev)
registerRequestHandlers()

let menu = null

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#FAFAFA',
    show: false
  })

  setMainWindow(mainWindow)

  mainWindow.once('ready-to-show', () => {
    if (menu === null) {
      const menuTemplate = createMenuTemplate(process.platform)
      menu = Menu.buildFromTemplate(menuTemplate)
      Menu.setApplicationMenu(menu)
    }
  })

  mainWindow.on('closed', () => {
    setMainWindow(null)
  })

  initEventHandlers(mainWindow)

  mainWindow.loadURL(format({
    pathname: path.join(__dirname, '../../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (isDev) {
    initReload(mainWindow)
  }

  return mainWindow
}

export default createMainWindow
