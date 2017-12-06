import 'babel-polyfill'

import { createMainWindow, getMainWindow } from './main-window'

import { app } from 'electron'
import createSplashScreen from './splash-screen'
import openStoryOnStartup from './open-story-on-startup'
import printWelcomeScreen from './versions'

printWelcomeScreen()

let splashScreen

const initSplashScreen = () => {
  splashScreen = createSplashScreen()
  splashScreen.once('ready-to-show', initApp)
}

const initApp = () => {
  registerRequestHandlers()
  initMainWindow()
}

const registerRequestHandlers = () => {
  require('./request-handlers')()
}

const initMainWindow = () => {
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
