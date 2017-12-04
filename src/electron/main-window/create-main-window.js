import { BrowserWindow, Menu } from 'electron'
import { registerRequestHandlers, setShouldSaveState } from './saved-state'

import { OPEN_STORY_REQUESTED } from '../../shared/story/requests'
import { createMenuTemplate } from './menu'
import { format } from 'url'
import initEventHandlers from './events'
import initReload from './reload'
import isDev from 'electron-is-dev'
import path from 'path'
import { request } from '../shared/communication'
import { setMainWindow } from './main-window'

setShouldSaveState(isDev)
registerRequestHandlers()

const menuTemplate = createMenuTemplate(process.platform)
const menu = Menu.buildFromTemplate(menuTemplate)

const createMainWindow = () => {
  Menu.setApplicationMenu(menu)

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    backgroundColor: '#FAFAFA',
    show: false
  })

  setMainWindow(mainWindow)

  mainWindow.on('closed', () => {
    setMainWindow(null)
  })

  mainWindow.once('ready-to-show', () => {
    if (!isDev) {
      openStory()
    }
  })

  initEventHandlers(mainWindow)

  mainWindow.loadURL(format({
    pathname: path.join(__dirname, '../../frontend/static/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  if (isDev) {
    initReload(mainWindow)
  }
}

const openStory = () => {
  if (process.argv.length > 1) {
    const args = process.argv.slice(1)
    const path = args.join('')
    request(OPEN_STORY_REQUESTED, path)
  }
}

export default createMainWindow
