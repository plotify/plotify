import 'babel-polyfill'

import { BrowserWindow, Menu, app } from 'electron'
import { registerRequestHandlers, setShouldSaveState } from './saved-state'

import { createMenuTemplate } from './menu'
import { format } from 'url'
import initEventHandlers from './events/window'
import initReload from './reload'
import isDev from 'electron-is-dev'
import path from 'path'
import printWelcomeScreen from './versions'
import { setMainWindow } from './shared/main-window'

printWelcomeScreen()
setShouldSaveState(isDev)
registerRequestHandlers()

const menuTemplate = createMenuTemplate(process.platform)
const menu = Menu.buildFromTemplate(menuTemplate)

let mainWindow

const createWindow = () => {
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({ width: 900, height: 600 })
  setMainWindow(mainWindow)

  mainWindow.on('closed', () => {
    mainWindow = null
    setMainWindow(null)
  })

  initEventHandlers(mainWindow)

  mainWindow.loadURL(format({
    pathname: path.join(__dirname, '../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (isDev) {
    initReload(mainWindow)
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
