import { createSelector } from 'reselect'
import development from '../shared/development'
import { openAboutDialog } from '../../about'

const applicationName = require('../../../package.json').productName

const plotifyMenu = (development) => ({
  label: applicationName,
  submenu: [
    { label: 'Über ' + applicationName, click: _openAboutDialog },
    { type: 'separator' },
    development,
    { type: 'separator' },
    { label: applicationName + ' ausblenden', role: 'hide' },
    { label: 'Andere ausblenden', role: 'hideothers' },
    { label: 'Alle einblenden', role: 'unhide' },
    { type: 'separator' },
    { label: applicationName + ' beenden', role: 'quit' }
  ]
})

const _openAboutDialog = (_, window) => {
  openAboutDialog(window)
}

export default createSelector(
  development,
  plotifyMenu
)
