import { exportState, importState } from '../../development'

import { createSelector } from 'reselect'
import { isAnyWindowFocused } from '../../windows'

const developmentMenu = (enabled) => ({
  label: 'Entwicklung',
  enabled,
  submenu: [
    { label: 'State exportieren...', click: exportStateMenu, enabled },
    { label: 'State importieren...', click: importStateMenu, enabled },
    { type: 'separator' },
    { label: 'Werkzeuge', role: 'toggledevtools', enabled }
  ]
})

const exportStateMenu = (_, window) => {
  exportState(window)
}

const importStateMenu = (_, window) => {
  importState(window)
}

export default createSelector(
  isAnyWindowFocused,
  developmentMenu
)
