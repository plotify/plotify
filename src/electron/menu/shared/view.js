import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../../shared/view/requests'
import { disableDarkTheme, enableDarkTheme, isDarkThemeEnabled } from '../../preferences'
import { getWindows, isAnyWindowFocused } from '../../windows'

import { createSelector } from 'reselect'
import { request } from '../../shared/communication'
import store from '../../store'

const viewMenu = (menuLabel, darkThemeEnabled, enabled) => ({
  label: menuLabel,
  submenu: [
    { label: 'Vergrößern', role: 'zoomin', enabled },
    { label: 'Verkleinern', role: 'zoomout', enabled },
    { label: 'Originalgröße', role: 'resetzoom', enabled },
    { type: 'separator' },
    {
      label: 'Nachtmodus',
      type: 'checkbox',
      checked: darkThemeEnabled,
      click: toggleDarkTheme,
      enabled
    },
    { type: 'separator' },
    { label: 'Vollbild', role: 'togglefullscreen', enabled }
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

export default (menuLabel) => createSelector(
  () => menuLabel,
  isDarkThemeEnabled,
  isAnyWindowFocused,
  viewMenu
)
