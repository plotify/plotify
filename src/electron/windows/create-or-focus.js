import { addWindow, getWindowByStoryPath, isWindowReady, setWindowStoryPath } from './windows'
import { focusSplashScreenIfExisting, showSplashScreen } from '../splash-screen'

import { BrowserWindow } from 'electron'
import { format } from 'url'
import initEventHandlers from './events'
import initMenu from '../menu'
import path from 'path'

// TODO Save state & reload
const createOrFocus = (storyPath = '') => {
  if (getWindowByStoryPath(storyPath)) {
    focusExistingWindowOrSplashScreen(storyPath)
    return
  }

  showSplashScreen()

  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#FAFAFA',
    show: false
  })

  addWindow(window)
  setWindowStoryPath(window, storyPath)
  initEventHandlers(window)
  initMenu()

  window.loadURL(format({
    pathname: path.join(__dirname, '../../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

const focusExistingWindowOrSplashScreen = (storyPath) => {
  const window = getWindowByStoryPath(storyPath)
  if (isWindowReady(window)) {
    focusWindow(window)
  } else {
    focusSplashScreenIfExisting()
  }
}

const focusWindow = (window) => {
  const maximized = window.isMaximized()
  if (window.isMinimized()) {
    window.restore()
  }
  if (maximized) {
    window.maximize()
  }
  window.focus()
}

/*
  setShouldSaveState(isDev)
  registerRequestHandlers()
  if (isDev) {
    initReload(mainWindow)
  }
*/

export default createOrFocus
