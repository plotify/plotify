import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'
import { disableDarkTheme, enableDarkTheme } from '../preferences'

import { Menu } from 'electron'
import { getWindows } from '../windows'
import { request } from '../shared/communication'
import store from '../store'

const view = () => ({
  label: 'Ansicht',
  submenu: [
    { label: 'Vergrößern', role: 'zoomin' },
    { label: 'Verkleinern', role: 'zoomout' },
    { label: 'Standardgröße', role: 'resetzoom' },
    { type: 'separator' },
    { label: 'Nachtmodus', type: 'checkbox', checked: false, click: toggleDarkTheme },
    { type: 'separator' },
    { label: 'Vollbild', role: 'togglefullscreen' }
  ]
})

const toggleDarkTheme = (menuItem, window, _) => {
  if (menuItem.checked) {
    store.dispatch(enableDarkTheme())
  } else {
    store.dispatch(disableDarkTheme())
  }
  const name = menuItem.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  for (let window of getWindows(store.getState())) {
    request(window, name)
  }
  unityWorkaround()
}

// Workaround: Unter Unity aktualisiert sich die Checkbox nicht.
const unityWorkaround = () => {
  Menu.setApplicationMenu(Menu.getApplicationMenu())
}

export default view
