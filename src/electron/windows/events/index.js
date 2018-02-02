import { bind as _ } from '../../shared/redux'
import close from './close'
import closed from './closed'
import contextMenu from './context-menu'
import newWindow from './new-window'
import readyToShow from './ready-to-show'
import willNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.once('ready-to-show', _(readyToShow))
  window.on('close', _(close))
  window.once('closed', _(closed))
  window.webContents.on('new-window', newWindow)
  window.webContents.on('will-navigate', willNavigate)
  window.webContents.on('context-menu', contextMenu)
}

export default initEventHandlers
