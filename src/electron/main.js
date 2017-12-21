import 'babel-polyfill'

import { closeSplashScreen, showSplashScreen } from './splash-screen'
import { createMainWindow, getMainWindow } from './main-window'

import { OPEN_STORY_REQUESTED } from '../shared/story/requests'
import { app } from 'electron'
import openStoryOnStartup from './open-story-on-startup'
import printWelcomeScreen from './versions'
import { request } from './shared/communication'

// macOS: Open story on startup:
// Make sure to listen for the open-file event very early in your application startup
// to handle this case (even before the ready event is emitted).
let loading = true
let macOsStoryPath
app.on('open-file', (event, path) => {
  event.preventDefault()
  if (loading) {
    macOsStoryPath = path
  } else {
    request(OPEN_STORY_REQUESTED, path)
  }
})

printWelcomeScreen()

const initSplashScreen = () => {
  showSplashScreen().once('ready-to-show', initApp)
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
    loading = false
    openStoryOnStartup(macOsStoryPath)
      .then(initActivateHandler)
      .then(() => showMainWindow(mainWindow))
      .then(() => closeSplashScreen())
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
