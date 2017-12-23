import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { addWindow, getWindowByStoryPath, isWindowReady, removeWindow, setWindowIsReady, setWindowStoryPath } from './windows'
import { closeSplashScreen, focusSplashScreenIfExisting, showSplashScreen } from '../splash-screen'
import { request, requestHandlerOnce } from '../shared/communication'

import { BrowserWindow } from 'electron'
import { format } from 'url'
import initEventHandlers from './events'
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

  window.loadURL(format({
    pathname: path.join(__dirname, '../../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    setWindowIsReady(window)
    if (storyPath !== '') {
      openStory(window, storyPath).then(() => showWindow(window))
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
    const maximized = window.isMaximized()
    if (window.isMinimized()) {
      window.restore()
    }
    if (maximized) {
      window.maximize()
    }
    window.focus()
  } else {
    focusSplashScreenIfExisting()
  }
}

const showWindow = (window) => {
  window.maximize()
  window.show()
  closeSplashScreen()
}

const openStory = (window, storyPath) => {
  return new Promise((resolve, reject) => {
    requestHandlerOnce(OPEN_STORY_FINISHED, () => {
      resolve()
    })
    request(window, OPEN_STORY_REQUESTED, storyPath)
  })
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
