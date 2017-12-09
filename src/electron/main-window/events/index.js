import handleContextMenu from './context-menu'
import handleNewWindow from './new-window'
import handleWillNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.webContents.on('new-window', handleNewWindow)
  window.webContents.on('will-navigate', handleWillNavigate)
  window.webContents.on('context-menu', handleContextMenu)
}

export default initEventHandlers
