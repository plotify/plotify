import { OPEN_ABOUT_DIALOG } from '../../shared/about/requests'
import { exportState } from '../development'
import { request } from '../shared/communication'
import { shell } from 'electron'

const help = () => ({
  label: 'Hilfe',
  submenu: [
    {
      label: 'Entwicklung',
      submenu: [
        { label: 'GitHub', click: openGitHub },
        { type: 'separator' },
        { label: 'State exportieren...', click: exportStateMenu },
        { type: 'separator' },
        { label: 'Werkzeuge', role: 'toggledevtools' }
      ]
    },
    { type: 'separator' },
    { label: 'Über Plotify', click: openAboutDialog }
  ]
})

const openAboutDialog = (_, window) => {
  request(window, OPEN_ABOUT_DIALOG)
}

const openGitHub = () => {
  const packageJson = require('../../package.json')
  shell.openExternal(packageJson.repository.url)
}

const exportStateMenu = (_, window) => {
  exportState(window)
}

export default help
