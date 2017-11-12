import printWelcomeScreen from './versions'
import { app, Menu, BrowserWindow, shell } from 'electron'
import { setMainWindow } from './shared/main-window'
import { createMenuTemplate } from './menu'
import url from 'url'
import path from 'path'
import watch from 'node-watch'
import isDev from 'electron-is-dev'

printWelcomeScreen()

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
    const frontend = path.join(__dirname, '../frontend/')
    watch(frontend, { recursive: true }, () => {
      mainWindow.webContents.reloadIgnoringCache()
    })
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
