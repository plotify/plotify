import 'babel-polyfill'

import { BrowserWindow, Menu, app, shell } from 'electron'
import { registerRequestHandlers, setShouldSaveState } from './saved-state'

import { createMenuTemplate } from './menu'
import initReload from './reload'
import isDev from 'electron-is-dev'
import path from 'path'
import printWelcomeScreen from './versions'
import { setMainWindow } from './shared/main-window'
import url from 'url'

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
  })

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  mainWindow.loadURL(url.format({
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
