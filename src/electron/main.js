import 'babel-polyfill'

import { closePreferences, initPreferences } from './preferences'
import { closeSplashScreen, showSplashScreen } from './splash-screen'

import { app } from 'electron'
import { createOrFocus } from './windows'
import initDevToolsExtensions from './dev-tools-extensions'
import isDev from 'electron-is-dev'
import printWelcomeScreen from './versions'

let loadingBackend = true
let storyPaths = new Set()

const isSecondInstance = app.makeSingleInstance((argv, _) => {
  const paths = getStoryPathsFromArguments(argv)
  if (paths.length === 0) {
    paths.push('')
  }
  if (loadingBackend) {
    paths.forEach((path) => storyPaths.add(path))
  } else {
    paths.forEach(createOrFocus)
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
  const init = () => {
    registerRequestHandlers()
    initPreferences().then(() => {
      createWindows()
    })
  }
  initDevToolsExtensions()
    .then(() => init())
    .catch(() => init())
}

const registerRequestHandlers = () => {
  require('./request-handlers')()
}

const createWindows = () => {
  loadingBackend = false
  getStoryPathsFromArguments(process.argv).forEach((path) => storyPaths.add(path))
  addDefaultPathIfEmpty(storyPaths)
  storyPaths.forEach(createOrFocus)
  closeSplashScreen()
}

const getStoryPathsFromArguments = (argv) => {
  if (isDev) {
    return []
  } else {
    return argv.slice(1)
  }
}

const addDefaultPathIfEmpty = (paths) => {
  if (paths.size === 0) {
    paths.add('')
  }
}

app.on('ready', initSplashScreen)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closePreferences()
      .then(() => app.quit())
      .catch(() => app.quit())
  }
})
