import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { request } from '../shared/communication'

// TODO Feedback geben
const help = () => ({
  label: 'Hilfe',
  submenu: [
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

export const openAboutDialog = (_, window, __) => {
  request(window, OPEN_ABOUT_DIALOG)
}

export default help
