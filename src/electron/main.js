const { app, Menu, BrowserWindow, shell } = require('electron')
const createMenuTemplate = require('./menu')
const url = require('url')
const path = require('path')

const versions = ' Versions\n' +
  '--------------------------\n' +
  ' Electron:  ' + process.versions.electron + '\n' +
  ' Chromium:  ' + process.versions.chrome + '\n' +
  ' Node:      ' + process.versions.node + '\n' +
  ' V8:        ' + process.versions.v8 + '\n'
console.log(versions)

const menuTemplate = createMenuTemplate(process.platform)
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 900, height: 600 })

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
