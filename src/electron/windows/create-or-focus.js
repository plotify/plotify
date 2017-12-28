import { BrowserWindow, dialog } from 'electron'
import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { addWindow, getWindowByStoryPath, isWindowReady, removeWindow, setWindowIsReady, setWindowStoryPath } from './windows'
import { closeSplashScreen, focusSplashScreenIfExisting, showSplashScreen } from '../splash-screen'
import { request, requestHandlerOnce } from '../shared/communication'

import { format } from 'url'
import initEventHandlers from './events'
import initMenu from '../menu'
import path from 'path'

// TODO Save state
// TODO Menu
// TODO closed-Event
// TODO reload
// TODO activate event (wahrscheinlich besser in main.js)
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

  window.once('ready-to-show', () => {
    setWindowIsReady(window)
    if (storyPath !== '') {
      openStory(window, storyPath)
        .then(() => showWindow(window))
        .catch((error) => showErrorAndCloseWindow(window, error))
    } else {
      showWindow(window)
    }
  })

  window.once('closed', () => {
    removeWindow(window)
  })
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

const showWindow = (window) => {
  window.maximize()
  window.show()
  closeSplashScreen()
}

const openStory = (window, storyPath) => {
  return new Promise((resolve, reject) => {
    requestHandlerOnce(OPEN_STORY_FINISHED, (handlerResolve, _, __, error) => {
      handlerResolve()
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
    request(window, OPEN_STORY_REQUESTED, storyPath)
  })
}

const showErrorAndCloseWindow = (window, error) => {
  removeWindow(window)
  dialog.showMessageBox({
    type: 'error',
    title: 'Die Geschichte konnte nicht geöffnet werden.',
    message: error,
    buttons: ['Schließen'],
    defaultId: 0
  }, () => window.destroy())
  closeSplashScreen()
}

/*
  mainWindow.once('ready-to-show', () => {
    if (menu === null) {
      const menuTemplate = createMenuTemplate(process.platform)
      menu = Menu.buildFromTemplate(menuTemplate)
      Menu.setApplicationMenu(menu)
    }
  })

  mainWindow.on('closed', () => {
    setMainWindow(null)
  })

  setShouldSaveState(isDev)
  registerRequestHandlers()
  if (isDev) {
    initReload(mainWindow)
  }
*/

export default createOrFocus
