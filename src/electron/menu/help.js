import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { request } from '../shared/communication'
import { shell } from 'electron'

const help = () => ({
  label: 'Hilfe',
  submenu: [
    {
      label: 'Entwicklung',
      submenu: [
        { label: 'GitHub', click: openGitHub },
        { label: 'Fehler melden', click: reportBug },
        { type: 'separator' },
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

const openGitHub = () => {
  const packageJson = require('../../package.json')
  shell.openExternal(packageJson.repository.url)
}

const reportBug = () => {
  const packageJson = require('../../package.json')
  shell.openExternal(packageJson.bugs.url)
}

export default help
