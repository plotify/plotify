import { OPEN_ABOUT_DIALOG } from '../../../shared/about/requests'
import development from '../shared/development'
import { request } from '../../shared/communication'

const menu = () => ({
  label: 'Hilfe',
  submenu: [
    development(),
    { type: 'separator' },
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

const openAboutDialog = (_, window) => {
  request(window, OPEN_ABOUT_DIALOG)
}

const staticMenu = menu()

export default () => staticMenu
