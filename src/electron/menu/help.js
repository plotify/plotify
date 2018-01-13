import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { request } from '../shared/communication'

// TODO Feedback geben
const help = () => ({
  label: 'Hilfe',
  submenu: [
    {
      label: 'Entwicklung',
      submenu: [
        { label: 'Werkzeuge', role: 'toggledevtools' }
      ]
    },
    { type: 'separator' },
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

const openAboutDialog = (_, window, __) => {
  request(window, OPEN_ABOUT_DIALOG)
}

export default help
