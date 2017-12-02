import handleNewWindow from './new-window'
import handleReadyToShow from './ready-to-show'
import handleWillNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.once('ready-to-show', handleReadyToShow)
  window.webContents.on('new-window', handleNewWindow)
  window.webContents.on('will-navigate', handleWillNavigate)
}

export default initEventHandlers
