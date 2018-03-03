import { OPEN_ABOUT_DIALOG } from '../../../shared/about/requests'
import { createSelector } from 'reselect'
import development from '../shared/development'
import { request } from '../../shared/communication'

const applicationName = require('../../../package.json').productName

const plotifyMenu = (development) => ({
  label: applicationName,
  submenu: [
    { label: 'Über ' + applicationName, click: openAboutDialog },
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

const openAboutDialog = (_, window) => {
  request(window, OPEN_ABOUT_DIALOG)
}

export default createSelector(
  development,
  plotifyMenu
)
