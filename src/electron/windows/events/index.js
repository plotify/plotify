import { bind as _ } from '../../shared/redux'
import blur from './blur'
import close from './close'
import closed from './closed'
import contextMenu from './context-menu'
import enterFullScreen from './enter-full-screen'
import focus from './focus'
import leaveFullScreen from './leave-full-screen'
import newWindow from './new-window'
import readyToShow from './ready-to-show'
import willNavigate from './will-navigate'

const initEventHandlers = (window) => {
  window.once('ready-to-show', _(readyToShow))
  window.once('closed', _(closed))
  window.on('close', _(close))
  window.on('enter-full-screen', enterFullScreen)
  window.on('leave-full-screen', leaveFullScreen)
  window.on('focus', _(focus))
  window.on('blur', _(blur))
  window.webContents.on('new-window', newWindow)
  window.webContents.on('will-navigate', willNavigate)
  window.webContents.on('context-menu', contextMenu)
}

export default initEventHandlers
