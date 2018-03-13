import { focusWindow, getFocusedWindow, getWindowByStoryPath, getWindowEntities } from '../../windows'

import { basename } from 'path'
import { createSelector } from 'reselect'
import store from '../../store'

const prefix = 'window:'

const windowsMenu = (windows, focusedWindow) => ({
  label: 'Fenster',
  submenu: createSubmenu(windows, focusedWindow)
})

const createSubmenu = (windows, focusedWindow) => {
  const submenu = windows
    .filter((window) => window.ready === true)
    .sort(sortWindows)
    .map((window) => createMenuItem(window, focusedWindow))

  if (submenu.length !== 0) {
    return submenu
  } else {
    return emptySubmenu
  }
}

const sortWindows = (w1, w2) => {
  const w1s = w1.storyPath !== '' ? basename(w1.storyPath) : ''
  const w2s = w2.storyPath !== '' ? basename(w2.storyPath) : ''
  return w1s.localeCompare(w2s)
}

const createMenuItem = (window, focusedWindow) => ({
  type: 'checkbox',
  id: prefix + window.storyPath,
  label: formatStoryPath(window.storyPath),
  checked: isFocusedWindow(window, focusedWindow),
  enabled: !isFocusedWindow(window, focusedWindow),
  click: _focusWindow
})

const formatStoryPath = (storyPath) =>
  storyPath !== '' ? basename(storyPath, '.story') : '[Startbildschirm]'

const isFocusedWindow = (window, focusedWindow) =>
  focusedWindow !== undefined && focusedWindow.id === window.instance.id

// Keine anonyme Funktion, damit kein kompletter Neuaufbau der Menüleiste notwendig ist.
const _focusWindow = (menuItem) => {
  const windowId = menuItem.id.substring(prefix.length)
  const window = getWindowByStoryPath(store.getState(), windowId)
  focusWindow(window)
}

const emptySubmenu = [
  {
    label: 'Kein Fenster geöffnet',
    enabled: false
  }
]

export default createSelector(
  getWindowEntities,
  getFocusedWindow,
  windowsMenu
)
