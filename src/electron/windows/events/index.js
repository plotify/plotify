import enterFullScreen from './enter-full-screen'
import handleClose from './close'
import handleClosed from './closed'
import handleContextMenu from './context-menu'
import handleNewWindow from './new-window'
import handleReadyToShow from './ready-to-show'
import handleWillNavigate from './will-navigate'
import leaveFullScreen from './leave-full-screen'

const initEventHandlers = (window) => {
  window.once('ready-to-show', handleReadyToShow)
  window.on('close', handleClose)
  window.once('closed', handleClosed)
  window.on('enter-full-screen', enterFullScreen)
  window.on('leave-full-screen', leaveFullScreen)
  window.webContents.on('new-window', handleNewWindow)
  window.webContents.on('will-navigate', handleWillNavigate)
  window.webContents.on('context-menu', handleContextMenu)
}

export default initEventHandlers
