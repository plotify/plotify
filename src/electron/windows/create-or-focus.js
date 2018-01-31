import { addWindow, getWindowByStoryPath, isWindowReady, setWindowStoryPath } from './windows'
import { focusSplashScreenIfExisting, showSplashScreen } from '../splash-screen'

import { BrowserWindow } from 'electron'
import { format } from 'url'
import initEventHandlers from './events'
import initMenu from '../menu'
import { initReload } from '../development'
import isDev from 'electron-is-dev'
import path from 'path'
import store from '../store'

const createOrFocus = (storyPath = '') => {
  if (getWindowByStoryPath(storyPath)) {
    focusExistingWindowOrSplashScreen(storyPath)
    return
  }

  store.dispatch(showSplashScreen())

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

  if (isDev) {
    initReload(window)
  }

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
    store.dispatch(focusSplashScreenIfExisting())
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

export default createOrFocus
