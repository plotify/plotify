import { OPEN_ABOUT_DIALOG } from '../../../shared/about/requests'
import { createSelector } from 'reselect'
import development from '../shared/development'
import { request } from '../../shared/communication'

const helpMenu = (development) => ({
  label: 'Hilfe',
  submenu: [
    development,
    { type: 'separator' },
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

const openAboutDialog = (_, window) => {
  request(window, OPEN_ABOUT_DIALOG)
}

export default createSelector(
  development,
  helpMenu
)
