import handleNewWindow from './new-window'

const initEventHandlers = (window) => {
  window.webContents.on('new-window', handleNewWindow)
}

export default initEventHandlers
