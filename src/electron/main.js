import 'babel-polyfill'

import { closeSplashScreen, showSplashScreen } from './splash-screen'

import { app } from 'electron'
import { createOrFocus } from './windows'
import isDev from 'electron-is-dev'
import printWelcomeScreen from './versions'

let loadingBackend = true
let storyPaths = new Set()

const isSecondInstance = app.makeSingleInstance((argv, _) => {
  const path = getStoryPathFromArguments(argv)
  if (loadingBackend) {
    if (path) {
      storyPaths.add(path)
    }
  } else {
    createOrFocus(path)
  }
})

if (isSecondInstance) {
  app.quit()
}

app.on('open-file', (event, path) => {
  event.preventDefault()
  if (loadingBackend) {
    storyPaths.add(path)
  } else {
    createOrFocus(path)
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
  loadingBackend = false
  storyPaths.add(getStoryPathFromArguments(process.argv))
  storyPaths.forEach(createOrFocus)
  closeSplashScreen()
  /*
  const mainWindow = createMainWindow()
  mainWindow.once('ready-to-show', () => {
    loading = false
    openStoryOnStartup(macOsStoryPath)
      .then(initActivateHandler)
      .then(() => showMainWindow(mainWindow))
      .then(() => closeSplashScreen())
      .catch(error => console.log(error))
  })
  */
}

const getStoryPathFromArguments = (argv) => {
  if (isDev) {
    return ''
  } else {
    return argv.slice(1).join('')
  }
}

/*
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
*/

app.on('ready', initSplashScreen)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
