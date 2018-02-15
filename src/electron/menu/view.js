import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../shared/view/requests'
import { disableDarkTheme, enableDarkTheme, isDarkThemeEnabled } from '../preferences'

import { createSelector } from 'reselect'
import { getWindows } from '../windows'
import { request } from '../shared/communication'
import store from '../store'

const viewMenu = (darkThemeEnabled) => ({
  label: 'Ansicht',
  submenu: [
    { label: 'Vergrößern', role: 'zoomin' },
    { label: 'Verkleinern', role: 'zoomout' },
    { label: 'Standardgröße', role: 'resetzoom' },
    { type: 'separator' },
    {
      label: 'Nachtmodus',
      type: 'checkbox',
      checked: darkThemeEnabled,
      click: toggleDarkTheme
    },
    { type: 'separator' },
    { label: 'Vollbild', role: 'togglefullscreen' }
  ]
})

// Keine anonyme Funktion, damit kein kompletter Neuaufbau der Menüleiste notwendig ist.
const toggleDarkTheme = (menuItem) => {
  if (menuItem.checked) {
    store.dispatch(enableDarkTheme())
  } else {
    store.dispatch(disableDarkTheme())
  }
  const name = menuItem.checked ? ENABLE_DARK_THEME : DISABLE_DARK_THEME
  for (let window of getWindows(store.getState())) {
    request(window, name)
  }
}

const enabledState = viewMenu(true)
const disabledState = viewMenu(false)

const selector = createSelector(
  isDarkThemeEnabled,
  (enabled) => enabled ? enabledState : disabledState
)

export default selector
