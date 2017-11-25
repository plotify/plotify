import handleNewWindow from './new-window'
import handleWillNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.webContents.on('new-window', handleNewWindow)
  window.webContents.on('will-navigate', handleWillNavigate)
}

export default initEventHandlers
