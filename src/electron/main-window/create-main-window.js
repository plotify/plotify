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

const menuTemplate = createMenuTemplate(process.platform)
const menu = Menu.buildFromTemplate(menuTemplate)

const createMainWindow = () => {
  Menu.setApplicationMenu(menu)

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#FAFAFA',
    show: false
  })

  setMainWindow(mainWindow)

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
