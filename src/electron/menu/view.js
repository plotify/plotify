import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'

import { Menu } from 'electron'
import { getWindows } from '../windows'
import { request } from '../shared/communication'

// TODO Nachtmodus checked=true/false abhängig davon, ob der Nachtmodus bereits aktiviert ist.
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

// TODO Theme von neuen Fenstern setzen.
const toggleDarkTheme = (menuItem, window, _) => {
  const name = menuItem.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  for (let window of getWindows()) {
    request(window, name)
  }
  unityWorkaround()
}

// Workaround: Unter Unity aktualisiert sich die Checkbox nicht.
const unityWorkaround = () => {
  Menu.setApplicationMenu(Menu.getApplicationMenu())
}

export default view
