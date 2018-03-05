import 'babel-polyfill'

import { closePreferences, openPreferences } from './preferences'
import { closeSplashScreen, showSplashScreen } from './splash-screen'
import { createOrFocus, getNumberOfWindows } from './windows'

import { app } from 'electron'
import { initDevToolsExtensions } from './development'
import { initMenu } from './menu'
import isDev from 'electron-is-dev'
import printWelcomeScreen from './versions'
import store from './store'

process.on('unhandledRejection', (error) => {
  console.warn('WARNING: Unhandled promise rejection:', error)
})

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
    paths.forEach((path) => store.dispatch(createOrFocus(path)))
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
    store.dispatch(createOrFocus(path))
  }
})

printWelcomeScreen()

const initSplashScreen = () => {
  const splashScreen = store.dispatch(showSplashScreen())
  splashScreen.on('ready-to-show', initDebugTools)
}

const initDebugTools = async () => {
  try {
    await initDevToolsExtensions()
  } finally {
    initApp()
  }
}

const initApp = async () => {
  initMenu()
  require('./request-handlers')()
  await store.dispatch(openPreferences())
  createWindows()
}

const createWindows = () => {
  loadingBackend = false
  getStoryPathsFromArguments(process.argv).forEach((path) => storyPaths.add(path))
  addDefaultPathIfEmpty(storyPaths)
  storyPaths.forEach((path) => store.dispatch(createOrFocus(path)))
  store.dispatch(closeSplashScreen())
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

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    try {
      await store.dispatch(closePreferences())
    } finally {
      app.quit()
    }
  }
})

app.on('activate', () => {
  if (!loadingBackend && getNumberOfWindows(store.getState()) === 0) {
    store.dispatch(createOrFocus(''))
  }
})
