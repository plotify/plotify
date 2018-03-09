import { createSelector } from 'reselect'
import development from '../shared/development'
import { openAboutDialog } from '../../about'

const helpMenu = (development) => ({
  label: 'Hilfe',
  submenu: [
    development,
    { type: 'separator' },
    { label: 'Über Plotify', click: _openAboutDialog }
  ]
})

const _openAboutDialog = (_, window) => {
  openAboutDialog(window)
}

export default createSelector(
  development,
  helpMenu
)
