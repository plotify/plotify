import handleClosed from './closed'
import handleContextMenu from './context-menu'
import handleNewWindow from './new-window'
import handleWillNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.once('closed', handleClosed)
  window.webContents.on('new-window', handleNewWindow)
  window.webContents.on('will-navigate', handleWillNavigate)
  window.webContents.on('context-menu', handleContextMenu)
}

export default initEventHandlers
