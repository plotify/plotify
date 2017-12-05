import 'babel-polyfill'

import { app } from 'electron'
import createSplashScreen from './splash-screen'
import printWelcomeScreen from './versions'

printWelcomeScreen()

let splashScreen

const initSplashScreen = () => {
  splashScreen = createSplashScreen()
  splashScreen.once('ready-to-show', initApp)
}

const initApp = () => {
  registerRequestHandlers()
  createMainWindow()
}

const registerRequestHandlers = () => {
  require('./request-handlers').default()
}

const createMainWindow = () => {
  const { createMainWindow, getMainWindow } = require('./main-window')

  const mainWindow = createMainWindow()

  mainWindow.once('ready-to-show', () => {
    splashScreen.close()
    splashScreen = null

    app.on('activate', () => {
      if (getMainWindow() === null) {
        createMainWindow()
      }
    })
  })
}

app.on('ready', initSplashScreen)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
