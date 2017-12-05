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
  const { createMainWindow } = require('./main-window')
  const openStoryOnStartup = require('./open-story-on-startup').default

  const mainWindow = createMainWindow()
  mainWindow.once('ready-to-show', () => {
    openStoryOnStartup(splashScreen)
      .then(initActivateHandler)
      .then(() => showMainWindow(mainWindow))
      .then(() => splashScreen.close())
      .catch(error => console.log(error))
  })
}

const initActivateHandler = () => {
  const { getMainWindow } = require('./main-window')
  app.on('activate', () => {
    if (getMainWindow() === null) {
      createMainWindow()
    }
  })
}

const showMainWindow = (mainWindow) => {
  mainWindow.maximize()
  mainWindow.show()
}

app.on('ready', initSplashScreen)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
