import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'

import { Menu } from 'electron'
import { bind as _ } from '../shared/redux'
import { getWindows } from '../windows'
import { request } from '../shared/communication'
import { setDarkThemeEnabled } from '../preferences'

const view = () => ({
  label: 'Ansicht',
  submenu: [
    { label: 'Vergrößern', role: 'zoomin' },
    { label: 'Verkleinern', role: 'zoomout' },
    { label: 'Standardgröße', role: 'resetzoom' },
    { type: 'separator' },
    { label: 'Nachtmodus', type: 'checkbox', checked: false, click: _(toggleDarkTheme) },
    { type: 'separator' },
    { label: 'Vollbild', role: 'togglefullscreen' }
  ]
})

// TODO Theme von neuen Fenstern setzen.
const toggleDarkTheme = (menuItem, window, _) => (_, getState) => {
  setDarkThemeEnabled(menuItem.checked)
  const name = menuItem.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  for (let window of getWindows(getState())) {
    request(window.instance, name)
  }
  unityWorkaround()
}

// Workaround: Unter Unity aktualisiert sich die Checkbox nicht.
const unityWorkaround = () => {
  Menu.setApplicationMenu(Menu.getApplicationMenu())
}

export default view
