import 'babel-polyfill'

import { createMainWindow, getMainWindow } from './main-window'

import { app } from 'electron'
import printWelcomeScreen from './versions'

printWelcomeScreen()

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (getMainWindow() === null) {
    createMainWindow()
  }
})
